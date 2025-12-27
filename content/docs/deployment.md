+++
title = "Deployment"
description = "Deploy your Tanuki-powered site."
weight = 5
+++

# Deployment

Tanuki-powered sites can be deployed anywhere that supports static hosting. This guide covers popular deployment options.

## Building for Production

First, build your site:

```bash
zola build
```

This creates a `public/` directory with your complete site.

## GitHub Pages

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install Zola
        uses: taiki-e/install-action@v2
        with:
          tool: zola@0.19.2

      - name: Build
        run: zola build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Configuration

Set your base URL in `config.toml`:

```toml
base_url = "https://username.github.io/repo-name"
```

## Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `zola build`
3. Set output directory: `public`
4. Add environment variable: `ZOLA_VERSION` = `0.19.2`

## Netlify

### Using netlify.toml

Create `netlify.toml` in your project root:

```toml
[build]
  command = "zola build"
  publish = "public"

[build.environment]
  ZOLA_VERSION = "0.19.2"

[context.production.environment]
  ZOLA_VERSION = "0.19.2"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## Vercel

Create `vercel.json`:

```json
{
  "build": {
    "env": {
      "ZOLA_VERSION": "0.19.2"
    }
  }
}
```

Use the Zola build command in project settings.

## Docker

For containerized deployments:

```dockerfile
FROM ghcr.io/getzola/zola:v0.19.2 as builder
WORKDIR /app
COPY . .
RUN zola build

FROM nginx:alpine
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
```

Build and run:

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

## Custom Server

For any static file server:

1. Build: `zola build`
2. Serve the `public/` directory
3. Configure 404 handling to serve `404.html`

### Nginx Example

```nginx
server {
    listen 80;
    server_name docs.example.com;
    root /var/www/docs/public;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
}
```

### Caddy Example

```caddyfile
docs.example.com {
    root * /var/www/docs/public
    file_server
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
```

## Performance Tips

### Optimize Images

Before deploying, optimize images:

```bash
# Using imagemagick
find static/images -name "*.png" -exec convert {} -strip -quality 85 {} \;

# Using oxipng for PNG
oxipng -o 3 static/images/*.png
```

### Enable Compression

Most hosts handle this automatically, but ensure gzip/brotli is enabled.

### Cache Headers

Set long cache times for static assets. Example for Cloudflare Pages:

```toml
# In netlify.toml or _headers file
[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Monitoring

After deployment, verify:

- [ ] All pages load correctly
- [ ] Theme toggle works
- [ ] Search functions properly
- [ ] Navigation links work
- [ ] Mobile layout is correct
