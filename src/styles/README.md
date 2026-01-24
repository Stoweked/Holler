# Styles & Theme

## 📌 Overview

This project uses **Mantine UI v7** as the primary styling solution, leveraging its theming engine and CSS modules for custom overrides. We avoid utility classes (like Tailwind) in favor of Mantine's style props and dedicated CSS modules.

## 📂 Internal Structure

```
src/styles/
├── globals.css          # Global CSS resets & root variables
├── theme.ts             # Mantine theme configuration object
└── README.md            # Documentation
```

## 🎨 Theme Configuration (`theme.ts`)

The `theme` object exports a `createTheme()` result that defines:

- **Typography**: Font families (Inter, etc.) and heading sizes.
- **Components**: Default props and styles for Mantine components (e.g., all Buttons have a specific radius).

## 🖌️ CSS Modules

For complex styles that cannot be achieved via Mantine props (like `mt="md"`), we use CSS Modules (`*.module.css`).

- **Naming Convention**: `ComponentName.module.css`
- **Usage**: `import classes from './ComponentName.module.css';`

## 🔗 Resources

- [Mantine Theming](https://mantine.dev/theming/mantine-provider/)
- [CSS Modules with Next.js](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
