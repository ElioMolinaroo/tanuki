+++
title = "Installation"
description = "How to install Tanuki in your Zola project."
weight = 1
+++

# Installation

This guide walks you through installing the Tanuki theme in your Zola project.

## Prerequisites

Before you begin, ensure you have:

- [Zola](https://www.getzola.org) 0.19.0 or later installed
- A Zola site initialized (`zola init my-site`)
- Git installed (for submodule installation)

## Installation Methods

### Method 1: Git Submodule (Recommended)

The recommended approach uses Git submodules, making updates easy:

```bash
cd your-zola-site
git submodule add https://github.com/raskell-io/tanuki themes/tanuki
```

To update the theme later:

```bash
git submodule update --remote themes/tanuki
```

### Method 2: Manual Download

If you prefer not to use Git submodules:

1. Download the latest release from [GitHub](https://github.com/raskell-io/tanuki/releases)
2. Extract the archive
3. Copy the contents to `themes/tanuki/` in your Zola site

### Method 3: Clone Directly

For development or contribution:

```bash
git clone https://github.com/raskell-io/tanuki themes/tanuki
```

## Verification

After installation, verify the theme is recognized:

```bash
zola build
```

If successful, you should see output like:

```
Building site...
-> Creating 5 pages and 2 sections
Done in 150ms.
```

## Next Steps

Now that Tanuki is installed, proceed to [Configuration](/docs/configuration) to customize your site.
