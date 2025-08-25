import { useEffect, useState } from 'react';
import { PrerenderService } from '@/utils/prerenderService';

interface PrerenderHookReturn {
  isBot: boolean;
  shouldPrerender: boolean;
  isPrerendering: boolean;
}

/**
 * Hook for handling prerender logic and bot detection
 */
export const usePrerender = (): PrerenderHookReturn => {
  const [isBot, setIsBot] = useState(false);
  const [shouldPrerender, setShouldPrerender] = useState(false);
  const [isPrerendering, setIsPrerendering] = useState(false);

  useEffect(() => {
    const botDetected = PrerenderService.isBot();
    const prerenderNeeded = PrerenderService.shouldPrerender();
    
    setIsBot(botDetected);
    setShouldPrerender(prerenderNeeded);
    
    if (prerenderNeeded) {
      setIsPrerendering(true);
      
      // Add prerender-specific optimizations
      document.documentElement.setAttribute('data-prerendering', 'true');
      
      // Disable animations for prerendering
      const style = document.createElement('style');
      style.textContent = `
        [data-prerendering="true"] * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.appendChild(style);
      
      // Signal when prerendering is complete
      setTimeout(() => {
        setIsPrerendering(false);
        document.documentElement.removeAttribute('data-prerendering');
        
        // Add prerender ready meta tag
        const readyMeta = document.createElement('meta');
        readyMeta.name = 'prerender-ready';
        readyMeta.content = 'true';
        document.head.appendChild(readyMeta);
      }, 2000); // Give 2 seconds for content to load
    }
  }, []);

  return {
    isBot,
    shouldPrerender,
    isPrerendering
  };
};