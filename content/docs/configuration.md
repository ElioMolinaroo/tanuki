+++
title = "Configuration"
description = "Configure Tanuki for your needs."
weight = 2
+++

# Configuration

Tanuki is highly configurable through your `config.toml` file. This page covers all available options.

## Basic Configuration

At minimum, add the theme to your config:

```toml
theme = "tanuki"
base_url = "https://your-site.com"
title = "My Documentation"
description = "Documentation for my awesome project"
```

## Theme Mode

Tanuki supports three modes. Set the mode in the `[extra]` section:

```toml
[extra]
mode = "docs"  # Options: "docs", "book", "site"
```

### Documentation Mode

Perfect for API docs, technical guides, and reference material:

```toml
[extra]
mode = "docs"

[extra.docs]
versioned = true
versions = [
    { version = "2.0", path = "/docs/2.0", latest = true },
    { version = "1.0", path = "/docs/1.0", latest = false },
]
```

### Book Mode

Ideal for tutorials, courses, and long-form content:

```toml
[extra]
mode = "book"

[extra.book]
show_landing = true
show_toc = true
```

### Site Mode

For blogs, portfolios, and landing pages:

```toml
[extra]
mode = "site"

[extra.site]
show_hero = true
posts_per_page = 10
```

## Navigation

Configure the header navigation:

```toml
[extra]
nav_links = [
    { name = "Docs", url = "/docs" },
    { name = "Guide", url = "/guide" },
    { name = "Blog", url = "/blog" },
]
```

## Theme Settings

Control the theme toggle behavior:

```toml
[extra]
default_theme = "auto"      # "light", "dark", or "auto"
show_theme_toggle = true    # Show/hide the toggle button
```

## Social Links

Add social media links to the footer:

```toml
[extra]
github = "https://github.com/your-org/your-repo"

social_links = [
    { name = "Twitter", url = "https://twitter.com/you", icon = "twitter" },
    { name = "Discord", url = "https://discord.gg/xxx", icon = "message-circle" },
]
```

## Search

Enable full-text search:

```toml
build_search_index = true

[search]
include_title = true
include_description = true
include_path = true
include_content = true
```

## Complete Example

Here's a complete `config.toml` for documentation mode:

```toml
base_url = "https://docs.example.com"
title = "My Project Docs"
description = "Documentation for My Project"
theme = "tanuki"

compile_sass = true
minify_html = true
build_search_index = true

[markdown]
highlight_code = true
highlight_theme = "css"

[extra]
mode = "docs"
author = "Your Name"
github = "https://github.com/your-org/your-project"
show_theme_toggle = true

nav_links = [
    { name = "Guide", url = "/guide" },
    { name = "API", url = "/api" },
    { name = "Examples", url = "/examples" },
]

[extra.docs]
versioned = true
versions = [
    { version = "2.0", path = "/docs/2.0", latest = true },
]
```
