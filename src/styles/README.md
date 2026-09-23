# Mantine theme and styles

The UI uses Mantine 8, Mantine style props, and CSS Modules.

- `theme.ts`: theme exported publicly as `hollerTheme`; defines lime primary color
  and component defaults/overrides. Font loading is the host's responsibility.
- `holler.css`: shared shell/background styles, Mantine input overrides, and
  sentence-case badge labels.
- `globals.css`: preview host stylesheet, including Mantine package styles.
- `assets.d.ts`: CSS Module type declarations for standalone TypeScript checks.
- `../ui/styles.css`: handoff entry point for core/dates styles and shared CSS.

In the destination React app, import the generated UI stylesheet once and use
MantineProvider. Merge the theme and included PostCSS configuration with the
host's existing setup. Review global overrides for conflicts with host components.
See the [integration guide](../../docs/react-integration.md).
