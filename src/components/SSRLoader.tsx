import React, { useEffect } from 'react';

interface SSRLoaderProps {
  onHydrated?: () => void;
}

const SSRLoader: React.FC<SSRLoaderProps> = ({ onHydrated }) => {
  useEffect(() => {
    // Remove the initial HTML loader once React has hydrated
    const removeInitialLoader = () => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
      onHydrated?.();
    };

    // Small delay to ensure smooth transition
    const timer = setTimeout(removeInitialLoader, 50);
    
    return () => clearTimeout(timer);
  }, [onHydrated]);

  return null; // This component doesn't render anything
};

export default SSRLoader;