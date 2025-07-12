
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ClientLogosCarousel = () => {
  const logos = [
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { name: "Uber", url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Trusted by <span className="text-gradient">100+ brands</span> across India
          </h2>
          <p className="text-gray-400 text-lg">
            Join the leading companies that have revolutionized their networking
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {logos.map((logo, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="glass rounded-xl p-6 h-24 flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                  <img 
                    src={logo.url} 
                    alt={logo.name}
                    className="max-h-8 max-w-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            And many more companies trust Tapze for their networking needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;
