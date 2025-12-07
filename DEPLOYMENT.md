# Deployment Guide

This guide covers deploying your Iqra Society Blog to various hosting platforms.

## Prerequisites

Before deploying, ensure:
- All code is committed to your Git repository
- The site builds successfully locally (`npm run build`)
- You have an account on your chosen hosting platform

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment for Astro sites with automatic builds and deployments.

#### Steps:

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Astro and configure build settings
6. Add environment variables if using WordPress integration:
   - `WORDPRESS_URL=https://your-wordpress-site.com`
7. Click "Deploy"

#### Custom Domain:

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 2. Netlify

Netlify is another excellent option with continuous deployment.

#### Steps:

1. Push your code to a Git repository
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "Add new site" > "Import an existing project"
4. Connect to your Git provider and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables if needed
7. Click "Deploy site"

#### Custom Domain:

1. Go to Site settings > Domain management
2. Add custom domain and configure DNS

### 3. GitHub Pages

For static sites, GitHub Pages offers free hosting.

#### Steps:

1. Install the GitHub Pages adapter:
   ```bash
   npm install -D @astrojs/adapter-static
   ```

2. Update `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import mdx from '@astrojs/mdx';
   import sitemap from '@astrojs/sitemap';

   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/iqrasocietyblog',
     integrations: [mdx(), sitemap()],
     i18n: {
       defaultLocale: 'en',
       locales: ['en', 'ar', 'id'],
       routing: {
         prefixDefaultLocale: false
       }
     }
   });
   ```

3. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v3
   ```

4. Enable GitHub Pages in repository settings

### 4. Cloudflare Pages

Cloudflare Pages offers fast global CDN with generous free tier.

#### Steps:

1. Push code to GitHub/GitLab
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Click "Create a project"
4. Connect your Git account and select repository
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Add environment variables if needed
7. Click "Save and Deploy"

### 5. Self-Hosted (VPS/Dedicated Server)

For complete control, deploy to your own server.

#### Requirements:
- A server with Node.js installed
- Web server (Nginx/Apache)
- SSL certificate (Let's Encrypt recommended)

#### Steps:

1. Build the site locally:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to your server:
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/iqrasocietyblog/
   ```

3. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       root /var/www/iqrasocietyblog;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. Enable SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Post-Deployment Checklist

- [ ] Test all pages and navigation
- [ ] Verify theme switcher works
- [ ] Test language switcher
- [ ] Check mobile responsiveness
- [ ] Verify RSS feed is accessible
- [ ] Test blog post pages
- [ ] Confirm sitemap is generated
- [ ] Check meta tags and SEO
- [ ] Test WordPress integration (if enabled)
- [ ] Monitor for any console errors

## Continuous Deployment

Most platforms offer automatic deployments on Git push. Configure branch protection and test in staging before deploying to production.

## Environment Variables

If using WordPress integration, set these environment variables on your hosting platform:

- `WORDPRESS_URL`: Your WordPress site URL (e.g., `https://blog.example.com`)
- `PUBLIC_SITE_URL`: Your deployed site URL (e.g., `https://iqrasociety.org`)

## Troubleshooting

### Build Fails

1. Check Node.js version (18+ required)
2. Verify all dependencies are installed
3. Review build logs for specific errors
4. Test build locally first

### 404 Errors

1. Ensure base path is configured correctly
2. Check routing configuration
3. Verify all links use relative paths

### Slow Loading

1. Enable CDN on your hosting platform
2. Configure caching headers
3. Optimize images
4. Use the built-in Astro optimizations

## Support

For deployment issues:
1. Check the [Astro deployment docs](https://docs.astro.build/en/guides/deploy/)
2. Review hosting platform documentation
3. Open an issue on the repository

## Security Considerations

- Always use HTTPS
- Keep dependencies updated
- Set proper CSP headers
- Use environment variables for sensitive data
- Enable DDoS protection on your hosting platform
