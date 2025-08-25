import React, { useEffect } from 'react';

// Type definitions for Performance API
interface PerformanceEntryWithProcessing extends PerformanceEntry {
  processingStart?: number;
}

interface PerformanceEntryWithLayout extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
}

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images
      const criticalImages = [
        '/lovable-uploads/main-banner.png',
        '/lovable-uploads/vcard27.png',
        '/lovable-uploads/vcard28.png',
        '/lovable-uploads/vcard29.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Prefetch next likely pages
    const prefetchPages = () => {
      const highPriorityPages = [
        '/buy-nfc-card',
        '/how-it-works',
        '/pricing',
        '/contact'
      ];

      highPriorityPages.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical analytics
      const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="hotjar"]');
      scripts.forEach(script => {
        if (script instanceof HTMLScriptElement) {
          script.defer = true;
        }
      });
    };

    // Run optimizations after initial render
    const timer = setTimeout(() => {
      preloadCriticalResources();
      prefetchPages();
      optimizeThirdPartyScripts();
    }, 1000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  // Performance monitoring
  useEffect(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      // Monitor Core Web Vitals
      const observePerformance = () => {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                const entryWithProcessing = entry as PerformanceEntryWithProcessing;
                if (entryWithProcessing.processingStart) {
                  console.log('FID:', entryWithProcessing.processingStart - entry.startTime);
                }
              });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                const entryWithLayout = entry as PerformanceEntryWithLayout;
                if (!entryWithLayout.hadRecentInput && entryWithLayout.value !== undefined) {
                  console.log('CLS:', entryWithLayout.value);
                }
              });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            // Silently fail if PerformanceObserver is not supported
          }
        }
      };

      // Run after page load
      if (document.readyState === 'complete') {
        observePerformance();
      } else {
        window.addEventListener('load', observePerformance);
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;