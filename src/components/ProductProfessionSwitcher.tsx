import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProfessionVariant {
  id: string;
  productId: string;
  professionName: string;
  professionId: string;
}

interface ProductProfessionSwitcherProps {
  onProfessionChange?: (profession: string) => void;
}

const ProductProfessionSwitcher = ({ onProfessionChange }: ProductProfessionSwitcherProps) => {
  const { productId } = useParams();
  const [selectedProfession, setSelectedProfession] = useState("");
  const [professions, setProfessions] = useState<ProfessionVariant[]>([]);

  // Default professions for predesignedpvrcard
  const defaultProfessions = [
    { id: "1", productId: productId || "", professionName: "Doctor", professionId: "doctor" },
    { id: "2", productId: productId || "", professionName: "CA", professionId: "ca" },
    { id: "3", productId: productId || "", professionName: "Preprinted", professionId: "preprinted" }
  ];

  useEffect(() => {
    // For predesignedpvrcard, use default professions
    if (productId === "predesignedpvrcard") {
      setProfessions(defaultProfessions);
      if (defaultProfessions.length > 0 && !selectedProfession) {
        setSelectedProfession(defaultProfessions[0].professionId);
        onProfessionChange?.(defaultProfessions[0].professionName);
      }
    } else {
      // For other products that might have professions, fetch from API
      fetch(`https://tapze.in/tapzeservice/productProfessionApi.php?productId=${productId}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            setProfessions(data);
            if (!selectedProfession) {
              setSelectedProfession(data[0].professionId);
              onProfessionChange?.(data[0].professionName);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching professions:', error);
          // Fallback to empty array if API fails
          setProfessions([]);
        });
    }
  }, [productId]);

  const handleProfessionClick = (profession: ProfessionVariant) => {
    if (profession.professionId !== selectedProfession) {
      setSelectedProfession(profession.professionId);
      onProfessionChange?.(profession.professionName);
    }
  };

  // Don't render if no professions available
  if (professions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">
        Profession: <span className="text-gray-300">{professions.find(p => p.professionId === selectedProfession)?.professionName}</span>
      </h4>

      <div className="flex gap-2 flex-wrap">
        {professions.map((profession) => (
          <Badge
            key={profession.professionId}
            variant={selectedProfession === profession.professionId ? "default" : "outline"}
            className={`cursor-pointer transition-all hover:scale-105 px-4 py-2 ${
              selectedProfession === profession.professionId
                ? 'bg-purple-500 text-white border-purple-500'
                : 'border-gray-300 text-gray-300 hover:border-purple-400 hover:text-purple-400'
            }`}
            onClick={() => handleProfessionClick(profession)}
          >
            {profession.professionName}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProductProfessionSwitcher;