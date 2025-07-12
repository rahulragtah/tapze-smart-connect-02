
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  heroImage: string;
  name: string;
}

const ProductGallery = ({ heroImage, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSticky, setIsSticky] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mock gallery images - in real app, these would come from props
  const galleryImages = [
    {
      url: heroImage,
      alt: `${name} - Front view`,
      type: "image"
    },
    {
      url: heroImage.replace("1200x800", "1200x800&blur=1"),
      alt: `${name} - Back view`,
      type: "image"
    },
    {
      url: heroImage.replace("1200x800", "1200x800&sepia=1"),
      alt: `${name} - Usage scenario`,
      type: "image"
    },
    {
      url: heroImage.replace("1200x800", "1200x800&grayscale=1"),
      alt: `${name} - Packaging`,
      type: "image"
    },
    {
      url: heroImage,
      alt: `${name} - How it works`,
      type: "video"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const galleryHeight = galleryRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Stop being sticky when we reach the bottom of the container
      const shouldBeSticky = containerRect.bottom > galleryHeight + 100;
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div ref={containerRef} className="lg:flex lg:flex-col lg:gap-4">
      <div 
        ref={galleryRef}
        className={`flex flex-col lg:flex-row gap-4 ${
          isSticky ? 'lg:sticky lg:top-20' : ''
        } transition-all duration-200`}
      >
        {/* Thumbnail Strip */}
        <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-96 pb-2 lg:pb-0">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-purple-500 ring-2 ring-purple-500/20' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="order-1 lg:order-2 flex-1 relative">
          <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden relative group">
            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
            />
            
            {/* Zoom Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/50 text-white p-2 rounded-full">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Floating Card Mockup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center relative transform hover:rotate-6 transition-transform duration-300">
                <div className="text-white font-bold text-lg">TAPZE</div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  TAP
                </div>
              </div>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
