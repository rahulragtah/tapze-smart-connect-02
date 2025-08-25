# Prerender.io Integration for Tapze

This implementation adds prerender.io service integration to enable proper server-side rendering for search engines and social media crawlers.

## Setup Instructions

### 1. Get Prerender.io Token
1. Sign up at [https://prerender.io/](https://prerender.io/)
2. Get your API token from the dashboard
3. Add the token to your environment variables

### 2. Environment Configuration
Create a `.env` file in your project root:
```env
REACT_APP_PRERENDER_TOKEN=your_prerender_token_here
```

### 3. Deploy Configuration

#### For Netlify:
Add these redirects to your `public/_redirects` file:
```
# Prerender.io integration for bots
/*    https://service.prerender.io/https://yoursite.com/:splat  200  X-Prerender-Token: YOUR_TOKEN  User-Agent: *bot*,*crawler*,*spider*,*facebook*,*twitter*
/*    /index.html   200
```

#### For Vercel:
Add to your `vercel.json`:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "https://service.prerender.io/https://yoursite.com/$1",
      "headers": {
        "X-Prerender-Token": "YOUR_TOKEN"
      },
      "continue": true,
      "important": true,
      "caseSensitive": false,
      "methods": ["GET"],
      "has": [
        {
          "type": "header",
          "key": "user-agent",
          "value": ".*(bot|crawler|spider|facebook|twitter).*"
        }
      ]
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### For Apache (.htaccess):
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Check if it's a bot
    RewriteCond %{HTTP_USER_AGENT} (bot|crawler|spider|facebook|twitter) [NC]
    RewriteCond %{REQUEST_METHOD} GET
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteRule ^(.*)$ https://service.prerender.io/https://yoursite.com/$1 [P,E=prerender_token:YOUR_TOKEN]
    
    # Normal requests
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx:
```nginx
location / {
    set $prerender 0;
    if ($http_user_agent ~* "(bot|crawler|spider|facebook|twitter)") {
        set $prerender 1;
    }
    
    if ($prerender = 1) {
        proxy_pass https://service.prerender.io/https://yoursite.com$request_uri;
        proxy_set_header X-Prerender-Token YOUR_TOKEN;
        break;
    }
    
    try_files $uri $uri/ /index.html;
}
```

## Features Implemented

### 1. Bot Detection
- Automatically detects search engine bots and social media crawlers
- Supports all major bots: Google, Bing, Facebook, Twitter, LinkedIn, etc.

### 2. Prerender Service Integration
- `PrerenderService` class handles all prerender logic
- Automatic redirection for bots to prerender.io
- Configurable token and service URL

### 3. SEO Components
- `SEOPrerender` component for enhanced meta tags
- `PrerenderDetector` for bot detection and handling
- `usePrerender` hook for prerender state management

### 4. Performance Optimizations
- Critical page preloading
- Animation disabling during prerendering
- Proper cache headers for prerendered content

## Testing

### Test Bot Detection:
```javascript
// In browser console
navigator.userAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
location.reload();
```

### Test Social Media Crawlers:
Use tools like:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Test Search Engine Crawling:
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

## Monitoring

The service automatically adds these meta tags for monitoring:
- `prerender-spa-fallback`: Indicates SPA capability
- `prerender-status-code`: HTTP status for prerender
- `prerender-ready`: Signals when prerendering is complete

## Troubleshooting

### Common Issues:

1. **Token not working**: Verify your prerender.io token is correct
2. **Pages not prerendering**: Check your server configuration
3. **Social media not showing preview**: Use debugging tools to test
4. **SEO not improving**: Allow 2-4 weeks for search engines to recrawl

### Debug Mode:
Add `?debug=1` to any URL to see prerender debug information.

## Cost Optimization

- Free tier: 1,000 prerenders/month
- Pages are cached for 24 hours by default
- Only critical pages are preloaded automatically
- Bot detection prevents unnecessary prerenders

## Security

- API token is only exposed to prerender.io servers
- No sensitive data is cached in prerendered pages
- HTTPS enforced for all prerender requests