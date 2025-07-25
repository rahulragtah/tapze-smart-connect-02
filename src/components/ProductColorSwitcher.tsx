
import { Link, useParams } from "react-router-dom";

const cardVariants = [
  {
    id: "black",
    name: "Black",
    color: "#000000",
    image: "/lovable-uploads/black-swatch.png"
  },
  {
    id: "silver",
    name: "Silver",
    color: "#C0C0C0",
    image: "/lovable-uploads/silver-swatch.png"
  },
  {
    id: "golden",
    name: "Golden",
    color: "#FFD700",
    image: "/lovable-uploads/golden-swatch.png"
  },
  {
    id: "rosegold",
    name: "Rose Gold",
    color: "#DEA193",
    image: "/lovable-uploads/rosegold-swatch.png"
  }
  
];

const ProductColorSwitcher = () => {
  const { productId } = useParams();

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Color: <span className="text-gray-300">{cardVariants.find(v => v.id === productId)?.name}</span></h4>
      
      <div className="flex gap-2">
        {cardVariants.map((variant) => (
          <Link
            key={variant.id}
            to={`/products/${variant.id}`}
            className={`relative w-12 h-12 rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
              productId === variant.id 
                ? 'border-purple-500 ring-2 ring-purple-500/20' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={variant.image}
              alt={variant.name}
              className="w-full h-full object-cover"
            />
            {productId === variant.id && (
              <div className="absolute inset-0 bg-purple-500/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSwitcher;
