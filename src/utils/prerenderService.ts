// Prerender.io service integration for SEO and social media crawlers
export class PrerenderService {
  private static readonly PRERENDER_URL = 'https://service.prerender.io';
  private static readonly PRERENDER_TOKEN = process.env.REACT_APP_PRERENDER_TOKEN || '';
  
  // Bot user agents that should be served prerendered content
  private static readonly BOT_USER_AGENTS = [
    'googlebot',
    'yahoo',
    'bingbot',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkshare',
    'w3c_validator',
    'redditbot',
    'applebot',
    'whatsapp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'skypeuripreview',
    'nuzzel',
    'discordbot',
    'google-structureddatatestingtool',
    'lighthouse',
    'chrome-lighthouse'
  ];

  // Extensions that should be ignored
  private static readonly IGNORED_EXTENSIONS = [
    '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg',
    '.gif', '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip',
    '.mp3', '.rar', '.exe', '.wmv', '.doc', '.avi', '.ppt',
    '.mpg', '.mpeg', '.tif', '.wav', '.mov', '.psd', '.ai',
    '.xls', '.mp4', '.m4a', '.swf', '.dat', '.dmg', '.iso',
    '.flv', '.m4v', '.torrent', '.woff', '.ttf', '.svg', '.webp'
  ];

  /**
   * Check if the current request should be prerendered
   */
  static shouldPrerender(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const url = window.location.href;
    
    // Check if it's a bot
    const isBot = this.BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
    
    // Check if URL has ignored extensions
    const hasIgnoredExtension = this.IGNORED_EXTENSIONS.some(ext => url.includes(ext));
    
    // Don't prerender if it has ignored extensions
    if (hasIgnoredExtension) return false;
    
    // Check for _escaped_fragment_ parameter (old AJAX crawling scheme)
    const hasEscapedFragment = url.includes('_escaped_fragment_');
    
    return isBot || hasEscapedFragment;
  }

  /**
   * Redirect to prerender.io service
   */
  static redirectToPrerender(): void {
    if (!this.shouldPrerender()) return;
    
    const currentUrl = encodeURIComponent(window.location.href);
    const prerenderUrl = `${this.PRERENDER_URL}/${currentUrl}`;
    
    // Add prerender token if available
    const headers: Record<string, string> = {};
    if (this.PRERENDER_TOKEN) {
      headers['X-Prerender-Token'] = this.PRERENDER_TOKEN;
    }
    
    // Fetch prerendered content
    fetch(prerenderUrl, { headers })
      .then(response => response.text())
      .then(html => {
        // Replace current page content with prerendered HTML
        document.documentElement.innerHTML = html;
        
        // Execute any scripts in the prerendered content
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src) {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.async = script.async;
            newScript.defer = script.defer;
            document.head.appendChild(newScript);
          } else if (script.textContent) {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.head.appendChild(newScript);
          }
        });
      })
      .catch(error => {
        console.warn('Prerender.io service failed:', error);
        // Continue with normal client-side rendering
      });
  }

  /**
   * Initialize prerender service
   */
  static init(): void {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Check if we should prerender immediately
    if (this.shouldPrerender()) {
      this.redirectToPrerender();
    }
    
    // Add meta tag to indicate prerender capability
    const meta = document.createElement('meta');
    meta.name = 'prerender-spa-fallback';
    meta.content = 'true';
    document.head.appendChild(meta);
  }

  /**
   * Check if current user agent is a bot
   */
  static isBot(): boolean {
    if (typeof navigator === 'undefined') return false;
    const userAgent = navigator.userAgent.toLowerCase();
    return this.BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
  }

  /**
   * Get prerender URL for a specific page
   */
  static getPrerenderUrl(url: string): string {
    const encodedUrl = encodeURIComponent(url);
    return `${this.PRERENDER_URL}/${encodedUrl}`;
  }

  /**
   * Preload critical pages for better performance
   */
  static preloadCriticalPages(): void {
    const criticalPages = [
      window.location.origin,
      `${window.location.origin}/buy-nfc-card`,
      `${window.location.origin}/how-it-works`,
      `${window.location.origin}/pricing`,
      `${window.location.origin}/contact`
    ];
    
    if (this.PRERENDER_TOKEN) {
      criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = this.getPrerenderUrl(page);
        link.as = 'document';
        document.head.appendChild(link);
      });
    }
  }
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PrerenderService.init());
  } else {
    PrerenderService.init();
  }
}