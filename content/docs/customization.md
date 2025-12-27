+++
title = "Customization"
description = "Customize the look and feel of Tanuki."
weight = 3
+++

# Customization

Tanuki is built with customization in mind. This guide covers how to make the theme your own.

## Colors

### Using Catppuccin Accents

The theme uses Catppuccin's color palette. You can change the accent color by overriding CSS variables:

```css
/* In your custom.css */
:root {
  --color-accent: var(--ctp-pink);
  --color-accent-hover: var(--ctp-pink);
}
```

Available accent colors from Catppuccin:

| Variable | Light (Latte) | Dark (Mocha) |
|----------|---------------|--------------|
| `--ctp-rosewater` | #dc8a78 | #f5e0dc |
| `--ctp-flamingo` | #dd7878 | #f2cdcd |
| `--ctp-pink` | #ea76cb | #f5c2e7 |
| `--ctp-mauve` | #8839ef | #cba6f7 |
| `--ctp-red` | #d20f39 | #f38ba8 |
| `--ctp-maroon` | #e64553 | #eba0ac |
| `--ctp-peach` | #fe640b | #fab387 |
| `--ctp-yellow` | #df8e1d | #f9e2af |
| `--ctp-green` | #40a02b | #a6e3a1 |
| `--ctp-teal` | #179299 | #94e2d5 |
| `--ctp-sky` | #04a5e5 | #89dceb |
| `--ctp-sapphire` | #209fb5 | #74c7ec |
| `--ctp-blue` | #1e66f5 | #89b4fa |
| `--ctp-lavender` | #7287fd | #b4befe |

## Typography

### Custom Fonts

To use your own fonts:

1. Add your font files to `static/fonts/`
2. Create a custom stylesheet:

```css
/* static/css/custom.css */
@font-face {
  font-family: 'Your Font';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

:root {
  --font-sans: 'Your Font', system-ui, sans-serif;
  --font-mono: 'Your Mono Font', monospace;
}
```

3. Include it in your config:

```toml
[extra]
stylesheets = ["css/custom.css"]
```

## Layout

### Adjusting Content Width

Override the content max-width:

```css
.main-content {
  max-width: 80ch;  /* Default is 72ch */
}
```

### Sidebar Width

For docs/book mode:

```css
.sidebar {
  width: 280px;  /* Default is 260px */
}
```

## Components

### Custom Code Blocks

Add language labels and customize code styling:

```css
.code-block {
  border-radius: 12px;  /* More rounded corners */
}

.code-block__label {
  background: var(--ctp-surface0);
}
```

### Button Styles

Customize button appearance:

```css
.btn {
  border-radius: 9999px;  /* Pill-shaped buttons */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Adding Custom CSS

The cleanest way to add custom styles:

1. Create `static/css/custom.css`
2. Add your overrides
3. Include in `config.toml`:

```toml
[extra]
stylesheets = ["css/custom.css"]
```

## Adding Custom JavaScript

For custom interactivity:

1. Create `static/js/custom.js`
2. Add your scripts
3. Include in `config.toml`:

```toml
[extra]
scripts = ["js/custom.js"]
```

## Logo and Branding

Add your logo to the header:

```toml
[extra]
logo = "images/logo.svg"  # Path relative to static/
```

## Favicon

Set your favicon:

```toml
[extra]
favicon = "favicon.ico"
```

For full favicon support, add multiple sizes to `static/`:

- `favicon.ico` (32x32)
- `apple-touch-icon.png` (180x180)
- `favicon-32x32.png`
- `favicon-16x16.png`
