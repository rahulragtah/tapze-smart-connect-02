// SEO Optimization Utilities

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noIndex?: boolean;
  alternateUrl?: string;
}

export const generateMetaTags = (props: SEOProps) => {
  const baseUrl = 'https://tapze.in';
  const defaultImage = `${baseUrl}/lovable-uploads/meta-image.png`;
  
  return {
    title: props.title,
    description: props.description,
    keywords: props.keywords || 'NFC business cards, digital networking, smart cards, contact sharing, professional networking',
    canonicalUrl: props.canonicalUrl || baseUrl,
    ogImage: props.ogImage || defaultImage,
    ogType: props.ogType || 'website',
    robots: props.noIndex ? 'noindex, nofollow' : 'index, follow',
    structuredData: props.structuredData,
    alternateUrl: props.alternateUrl
  };
};

export const generateStructuredData = (type: 'website' | 'product' | 'article' | 'organization', data: any) => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type.charAt(0).toUpperCase() + type.slice(1)
  };

  switch (type) {
    case 'website':
      return {
        ...baseStructure,
        name: data.name || 'Tapze',
        url: data.url || 'https://tapze.in',
        description: data.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://tapze.in/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };

    case 'product':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: 'Tapze'
        },
        offers: {
          '@type': 'Offer',
          url: data.url,
          price: data.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Tapze'
          }
        },
        aggregateRating: data.rating && {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          reviewCount: data.rating.count
        }
      };

    case 'article':
      return {
        ...baseStructure,
        headline: data.headline,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Organization',
          name: 'Tapze'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Tapze',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tapze.in/lovable-uploads/vcard27.png'
          }
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished
      };

    case 'organization':
      return {
        ...baseStructure,
        name: 'Tapze',
        url: 'https://tapze.in',
        description: 'Premium NFC business cards with smart mobile software for instant contact sharing',
        logo: 'https://tapze.in/lovable-uploads/vcard27.png',
        foundingDate: '2023',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          url: 'https://tapze.in/contact'
        },
        sameAs: [
          'https://tapze.in'
        ]
      };

    default:
      return baseStructure;
  }
};

export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/lovable-uploads/main-banner.png', as: 'image' },
    { href: '/lovable-uploads/vcard27.png', as: 'image' },
    { href: '/lovable-uploads/vcard28.png', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

export const prefetchNextPages = (pages: string[]) => {
  pages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
};

export const measureCoreWebVitals = () => {
  if ('web-vitals' in window) {
    // This would require the web-vitals library
    // For now, we'll use the PerformanceObserver API directly
  }
};