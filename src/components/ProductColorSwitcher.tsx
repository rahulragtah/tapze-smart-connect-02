import { CornerLeftDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";


interface colorVariant {
  id: string;
  productId: string;
  colorName: string;
  colorImage:string;
  colorId:string;
}
// const cardVariants = [
//   {
//     id: "black",
//     name: "Black",
//     //color: "#000000",
//     image: "/lovable-uploads/black-swatch.png"
//   },
//   {
//     id: "silver",
//     name: "Silver",
//     //color: "#C0C0C0",
//     image: "/lovable-uploads/silver-swatch.png"
//   },
//   {
//     id: "golden",
//     name: "Golden",
//     //color: "#FFD700",
//     image: "/lovable-uploads/golden-swatch.png"
//   },
//   {
//     id: "rosegold",
//     name: "Rose Gold",
//     //color: "#DEA193",
//     image: "/lovable-uploads/rosegold-swatch.png"
//   }
// ];

interface ProductColorSwitcherProps {
  onColorChange?: (color: string) => void;
}

const ProductColorSwitcher = ({ onColorChange }: ProductColorSwitcherProps) => {
const { productId } = useParams();
 
  const [selectedColor, setSelectedColor] = useState("golden"); // Default color
  const [productColor, setProductColor] = useState<colorVariant[]>([]); // Default color

  useEffect(() => {
     // Fetch offers
     console.log("current procide ", productId)
    fetch('https://tapze.in/tapzeservice/productColorApi.php?productId=' + productId)
      .then(response => response.json())
      .then(data => {
        setProductColor(data);
        console.log('ProductColorSwitcher for all  product', productColor);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
    
  }, [productId]
); // Empty dependency array = run once on mount

  const handleColorClick = (variant: colorVariant) => {
    if (variant.colorName !== selectedColor) {
      setSelectedColor(variant.colorId);
      onColorChange?.(variant.colorName);
      //alert(`You selected ${variant.name} color.`);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">
        Color: <span className="text-gray-300">{productColor.find(v => v.colorId === selectedColor)?.colorName}</span>
      </h4>

      <div className="flex gap-2">
        {productColor.map((variant) => (
          <button
            key={variant.colorId}
            onClick={() => handleColorClick(variant)}
            className={`relative w-12 h-12 rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
              selectedColor === variant.colorId
                ? 'border-purple-500 ring-2 ring-purple-500/20'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={variant.colorImage}
              alt={variant.colorName}
              className="w-full h-full object-cover"
            />
            {selectedColor === variant.colorId && (
              <div className="absolute inset-0 bg-purple-500/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColorSwitcher;
