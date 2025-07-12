
import ProductOrderTimeline from "./ProductOrderTimeline";
import ProductCustomization from "./ProductCustomization";

const ProductOrderTimelineContainer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900/50 to-black border-y border-gray-800">
      <div className="max-w-7xl mx-auto">
        <ProductOrderTimeline />
        <ProductCustomization />
      </div>
    </div>
  );
};

export default ProductOrderTimelineContainer;
