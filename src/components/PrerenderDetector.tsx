import React, { useEffect, useState } from 'react';
import { PrerenderService } from '@/utils/prerenderService';

interface PrerenderDetectorProps {
  children: React.ReactNode;
}

/**
 * Component that detects bots and handles prerendering
 */
const PrerenderDetector: React.FC<PrerenderDetectorProps> = ({ children }) => {
  const [isBot, setIsBot] = useState(false);
  const [isPrerendering, setIsPrerendering] = useState(false);

  useEffect(() => {
    const botDetected = PrerenderService.isBot();
    const shouldPrerender = PrerenderService.shouldPrerender();
    
    setIsBot(botDetected);
    setIsPrerendering(shouldPrerender);

    if (shouldPrerender) {
      // Add prerender meta tags immediately for bots
      const prerenderMeta = document.createElement('meta');
      prerenderMeta.name = 'prerender-status-code';
      prerenderMeta.content = '200';
      document.head.appendChild(prerenderMeta);

      // Add bot-specific meta tags
      const botMeta = document.createElement('meta');
      botMeta.name = 'robots';
      botMeta.content = 'index, follow';
      document.head.appendChild(botMeta);

      // Preload critical resources for faster rendering
      PrerenderService.preloadCriticalPages();
    }
  }, []);

  // For bots, we want to ensure content is rendered quickly
  if (isBot) {
    return (
      <div data-prerender="true" data-bot-detected="true">
        {children}
      </div>
    );
  }

  return (
    <div data-prerender={isPrerendering ? "true" : "false"}>
      {children}
    </div>
  );
};

export default PrerenderDetector;