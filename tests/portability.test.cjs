/* eslint-disable @typescript-eslint/no-require-imports -- Node test runner uses a CJS source-transpilation hook. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Compile source in memory for Node's test runner; no Next runtime or new dependency.
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  if (/^(next(?:\/|$)|@supabase\/)/.test(request)) throw new Error(`Platform dependency loaded: ${request}`);
  if (request.startsWith('@/')) request = path.resolve('src', request.slice(2));
  return resolveFilename.call(this, request, ...args);
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
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { ServicesProvider, useServices } = require('../src/lib/services/ServicesProvider.tsx');
const { NavigationProvider, useSearchParams, usePathname } = require('../src/lib/navigation/NavigationProvider.tsx');
const { AppLink } = require('../src/components/shared/AppLink.tsx');
const { createPreviewServices } = require('../src/lib/adapters/fixtures/createPreviewServices.ts');
const { ContactType } = require('../src/features/contacts/types/contact.ts');
const contact = { id: 'preview-person', email: 'example@example.test', full_name: 'Example Person', contactType: ContactType.Person, favorite: false };

test('portable providers and links render without loading Next or Supabase', () => {
  const services = createPreviewServices();
  function Probe() {
    assert.equal(useServices(), services);
    const params = useSearchParams();
    return React.createElement(AppLink, { href: '/dashboard?view=list' }, `${usePathname()}: ${params.get('project')}`);
  }
  const html = renderToStaticMarkup(React.createElement(ServicesProvider, { services },
    React.createElement(NavigationProvider, { value: { pathname: '/dashboard', search: 'project=demo%20project', router: { push() {}, replace() {} } } },
      React.createElement(Probe))));
  assert.match(html, /href="\/dashboard\?view=list"/);
  assert.match(html, /\/dashboard: demo project/);
});

test('missing services fail explicitly instead of silently using a live backend', () => {
  function Probe() { useServices(); return null; }
  assert.throws(() => renderToStaticMarkup(React.createElement(Probe)), /ServicesProvider/);
});

test('preview data is isolated and read-only mutations report failure', async () => {
  const services = createPreviewServices({ contacts: [contact], projects: [] });
  const contacts = await services.getContacts();
  contacts[0].full_name = 'Changed';
  assert.equal((await services.getContacts())[0].full_name, 'Example Person');
  assert.deepEqual(await services.getProjects(), []);
  assert.equal((await services.searchGlobalContacts('example')).length, 1);
  assert.equal((await services.searchGlobalContacts('x')).length, 0);
  assert.match((await services.addContact(contact.id, contact.contactType)).error, /read-only/);
  await assert.rejects(services.saveWaiver({ title: 'Test', content: '', type: 'conditional', payment_type: 'progress' }), /read-only/);
  await assert.rejects(services.uploadAvatar(new FormData()), /read-only/);
  assert.equal((await services.getContacts()).length, 1);
});

test('fixture transactions preserve filtering and sorting without server actions', async () => {
  const services = createPreviewServices();
  const all = await services.getTransactions({});
  assert.ok(all.length > 0);
  const sample = all[0];
  const filtered = await services.getTransactions({ type: sample.type, minAmount: sample.amount, maxAmount: sample.amount });
  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((transaction) => transaction.type === sample.type && transaction.amount === sample.amount));
  const sorted = await services.getTransactions({ sortBy: 'Amount (Low to High)' });
  assert.deepEqual(sorted.map((t) => t.amount), all.map((t) => t.amount).sort((a, b) => a - b));
});
