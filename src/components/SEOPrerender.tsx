import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { PrerenderService } from '@/utils/prerenderService';

interface SEOPrerenderProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  children?: React.ReactNode;
}

/**
 * Enhanced SEO component with prerender optimization
 */
const SEOPrerender: React.FC<SEOPrerenderProps> = ({
  title = 'Tapze - Premium NFC Business Cards',
  description = 'Create your digital business card with Tapze. Share contacts, social links, and personal brand with a single tap. Premium NFC business cards for modern professionals.',
  keywords = 'NFC business card, digital business card, smart business card, contactless networking, Tapze',
  image = 'https://tapze.in/lovable-uploads/meta-image.png',
  url,
  type = 'website',
  structuredData,
  children
}) => {
  const location = useLocation();
  const currentUrl = url || `https://tapze.in${location.pathname}`;
  const isBot = PrerenderService.isBot();

  useEffect(() => {
    // Add prerender-specific meta tags for better crawling
    if (PrerenderService.shouldPrerender()) {
      // Add last modified date
      const lastModMeta = document.createElement('meta');
      lastModMeta.httpEquiv = 'last-modified';
      lastModMeta.content = new Date().toISOString();
      document.head.appendChild(lastModMeta);

      // Add cache control for prerender
      const cacheMeta = document.createElement('meta');
      cacheMeta.httpEquiv = 'cache-control';
      cacheMeta.content = 'public, max-age=3600';
      document.head.appendChild(cacheMeta);
    }
  }, []);

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Prerender specific tags */}
        {isBot && (
          <>
            <meta name="prerender-spa-fallback" content="true" />
            <meta name="prerender-status-code" content="200" />
          </>
        )}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content="Tapze" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@tapze" />
        <meta name="twitter:creator" content="@tapze" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://service.prerender.io" />
        <link rel="preconnect" href="https://tapze.in" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      </Helmet>
      {children}
    </>
  );
};

export default SEOPrerender;