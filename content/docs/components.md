+++
title = "Components"
description = "UI components available in Tanuki."
weight = 4
+++

# Components

Tanuki includes a variety of UI components to enhance your content.

## Buttons

Use button classes for call-to-action elements:

```html
<a href="/docs" class="btn btn--primary">Get Started</a>
<a href="/demo" class="btn btn--secondary">View Demo</a>
<button class="btn btn--ghost">Cancel</button>
```

### Button Sizes

```html
<a class="btn btn--primary btn--sm">Small</a>
<a class="btn btn--primary">Default</a>
<a class="btn btn--primary btn--lg">Large</a>
```

## Cards

Display content in card format:

```html
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__description">Card description goes here.</p>
</div>
```

### Card Grid

```html
<div class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## Code Blocks

Code blocks are automatically enhanced with:

- Syntax highlighting
- Language label
- Copy button
- Line numbers (optional)

~~~markdown
```rust
fn main() {
    println!("Hello, world!");
}
```
~~~

Renders as:

```rust
fn main() {
    println!("Hello, world!");
}
```

## Tables

Tables are styled automatically:

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Users | 1 | 10 | Unlimited |
| Storage | 1GB | 100GB | 1TB |
| Support | Community | Email | 24/7 Phone |

## Blockquotes

Standard blockquotes:

> This is a blockquote. It can contain **bold**, *italic*, and `code`.

### Admonitions

Use GitHub-style alerts:

```markdown
> **Note**: This is informational.

> **Warning**: Be careful here.

> **Tip**: Here's a helpful hint.
```

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task Lists

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Keyboard Shortcuts

Display keyboard shortcuts:

```html
Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.
```

Renders as: Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.

## Horizontal Rules

Separate sections with:

```markdown
---
```

---

## Images

Images are responsive by default:

```markdown
![Alt text](/images/screenshot.png)
```

### Image with Caption

```html
<figure>
  <img src="/images/screenshot.png" alt="Screenshot">
  <figcaption>A helpful caption</figcaption>
</figure>
```

## Details/Accordion

Use the HTML `<details>` element:

```html
<details>
  <summary>Click to expand</summary>
  Hidden content goes here.
</details>
```

<details>
  <summary>Click to expand</summary>

  This content is hidden until you click the summary. It can contain any markdown, including:

  - Lists
  - Code blocks
  - Images

</details>
