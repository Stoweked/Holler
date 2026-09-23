/* eslint-disable @typescript-eslint/no-require-imports -- Exercises exported TSX source in Node without a framework. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const originalResolve = Module._resolveFilename;
const originalSource = path.resolve('src') + path.sep;
Module._resolveFilename = function (request, ...args) {
  if (/^(next(?:\/|$)|@supabase\/|@aws-sdk\/|aws-amplify(?:\/|$)|@\/|react-oidc-context$|oidc-client-ts$)/.test(request)) {
    throw new Error(`Host dependency reached from React handoff: ${request}`);
  }
  const resolved = originalResolve.call(this, request, ...args);
  if (resolved.startsWith(originalSource)) throw new Error(`Original source reached: ${resolved}`);
  return resolved;
};
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 },
    });
    module._compile(outputText, filename);
  };
}
// Node renders behavior/markup only; the destination bundler supplies real CSS Modules.
require.extensions['.css'] = (module) => { module.exports = {}; };

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { MantineProvider } = require('@mantine/core');
const { HollerDashboard, TransactionsTable, TransactionItem } = require('../build/react-ui/src/ui/index.ts');
const transaction = {
  id: 'handoff-transaction', type: 'Sent', status: 'Completed', amount: 125,
  date: '2026-09-22T12:00:00Z', from: { type: 'self', name: 'You' },
  to: { type: 'external', name: 'React Integration Customer' }, bankAccount: 'Checking',
};
function render(component, props) {
  return renderToStaticMarkup(React.createElement(MantineProvider, { env: 'test' },
    React.createElement(component, props)));
}

test('exported row renders with Mantine alone, with no application providers', () => {
  const html = render(TransactionItem, { transaction, onClick() {} });
  assert.match(html, /React Integration Customer/);
  assert.match(html, /125\.00/);
  assert.match(html, /View transactions details/);
});

test('dashboard renders supplied data and header actions without an auth gate', () => {
  const html = render(HollerDashboard, {
    transactions: [transaction], onTransactionClick() {},
    headerActions: React.createElement('button', null, 'Host account action'),
  });
  assert.match(html, /Host account action/);
  assert.match(html, /React Integration Customer/);
  assert.doesNotMatch(html, /Sign in|Log in/);
});

test('host loading and failure states do not show stale rows as current results', () => {
  const props = { transactions: [transaction], onTransactionClick() {} };
  const loading = render(TransactionsTable, { ...props, loading: true });
  assert.match(loading, /Loading transactions/);
  assert.doesNotMatch(loading, /React Integration Customer|No transactions found/);
  const failed = render(TransactionsTable, { ...props, error: 'Unable to reach the service', onRetry() {} });
  assert.match(failed, /Unable to reach the service/);
  assert.match(failed, /Try again/);
  assert.doesNotMatch(failed, /React Integration Customer|No transactions found/);
});

test('empty and filtered-empty states are distinct and reset is opt-in', () => {
  const props = { transactions: [], onTransactionClick() {} };
  const empty = render(TransactionsTable, props);
  assert.match(empty, /Your transactions will appear here/);
  assert.doesNotMatch(empty, /Reset all filters/);
  const filtered = render(TransactionsTable, { ...props, hasActiveFilters: true, onResetFilters() {} });
  assert.match(filtered, /Try adjusting your transaction filters/);
  assert.match(filtered, /Reset all filters/);
});
