# Iqra Society Blog

A modern, multilingual blog built with [Astro](https://astro.build), featuring i18n support and optional WordPress CMS integration. The site uses a custom color scheme inspired by seekersguidance.org.

## Features

- 🌍 **Multilingual Support**: English, Arabic, and Indonesian
- 🎨 **Custom Theme**: Light and dark mode with carefully selected color palette
- 📝 **WordPress CMS Integration**: Optional integration with WordPress REST API
- 🚀 **Fast Performance**: Built with Astro for optimal speed
- 📱 **Responsive Design**: Mobile-first, works on all devices
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and sitemap support
- 📰 **RSS Feed**: Automatic RSS feed generation
- ♿ **Accessible**: WCAG compliant design

## Color Scheme

### Light Theme
- Text: `#050315` - rgb(5, 3, 21)
- Background: `#fafffa` - rgb(250, 255, 250)
- Primary: `#0C4036` - rgb(12, 64, 54)
- Secondary: `#edffd2` - rgb(237, 255, 210)
- Accent: `#97BF41` - rgb(151, 191, 65)

### Dark Theme
- Text: `#ebe9fc` - rgb(235, 233, 252)
- Background: `#131313` - rgb(19, 19, 19)
- Primary: `#97bf40` - rgb(151, 191, 64)
- Secondary: `#0C4036` - rgb(12, 64, 54)
- Accent: `#43c090` - rgb(67, 192, 144)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/perdagingan/iqrasocietyblog.git
cd iqrasocietyblog
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure WordPress integration:
```bash
cp .env.example .env
# Edit .env and set your WORDPRESS_URL
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:4321`

## Project Structure

```
/
├── public/              # Static assets
│   └── images/         # Image files
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   └── LanguageSwitcher.astro
│   ├── content/        # Content collections
│   │   ├── blog/      # Blog posts (markdown)
│   │   └── config.ts  # Content schema
│   ├── layouts/        # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── lib/            # Utilities
│   │   ├── i18n.ts    # Internationalization
│   │   └── wordpress.ts # WordPress integration
│   ├── pages/          # Routes
│   │   ├── index.astro
│   │   ├── blog/
│   │   ├── about.astro
│   │   └── contact.astro
│   └── styles/         # Global styles
│       └── global.css
└── astro.config.mjs    # Astro configuration
```

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run astro` | Run Astro CLI commands |

## WordPress CMS Integration

This site supports optional integration with WordPress as a headless CMS:

1. Set your WordPress site URL in `.env`:
```
WORDPRESS_URL=https://your-wordpress-site.com
```

2. Use the WordPress client in your pages:
```typescript
import { createWordPressClient } from '../lib/wordpress';

// Initialize the client with your WordPress URL
const wpClient = createWordPressClient(import.meta.env.WORDPRESS_URL);

const posts = await wpClient.getPosts(10, 1);
const post = await wpClient.getPostBySlug('my-post-slug');
```

The WordPress integration uses axios and the WordPress REST API directly for better security and reliability.

Available methods:
   - `getPosts(perPage, page)` - Fetch all posts
   - `getPostBySlug(slug)` - Fetch single post
   - `getPostsByCategory(categoryId)` - Fetch posts by category
   - `searchPosts(query)` - Search posts

## Adding Blog Posts

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
pubDate: 2025-12-07
author: "Author Name"
tags: ["tag1", "tag2"]
lang: "en"
---

Your content here...
```

## Internationalization

The site supports three languages:
- English (en) - Default
- Arabic (ar)
- Indonesian (id)

Content is automatically routed based on language prefix:
- `/` - English
- `/ar/` - Arabic
- `/id/` - Indonesian

## Deployment

Build the site:
```bash
npm run build
```

The built site will be in the `./dist/` directory, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or issues, please open an issue on GitHub or contact us at info@iqrasociety.org.
