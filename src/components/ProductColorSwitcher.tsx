
import { Link, useParams } from "react-router-dom";

const cardVariants = [
  {
    id: "classic-black",
    name: "Classic Black",
    color: "#000000",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
  },
  {
    id: "premium-metal",
    name: "Premium Metal",
    color: "#C0C0C0",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  },
  {
    id: "transparent-glass",
    name: "Transparent Glass",
    color: "#E0E0E0",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop"
  }
];

const ProductColorSwitcher = () => {
  const { productId } = useParams();

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Style: <span className="text-black">{cardVariants.find(v => v.id === productId)?.name}</span></h4>
      
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
