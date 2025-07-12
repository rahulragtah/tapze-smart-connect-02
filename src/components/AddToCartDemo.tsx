
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const AddToCartDemo = () => {
  const { addItem } = useCart();

  const sampleProducts = [
    {
      id: 'nfc-card-basic',
      name: 'Basic NFC Card',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'
    },
    {
      id: 'nfc-card-premium',
      name: 'Premium NFC Card',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'
    },
    {
      id: 'nfc-card-business',
      name: 'Business NFC Card',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-6">
      {sampleProducts.map((product) => (
        <div key={product.id} className="bg-card border rounded-lg p-4 space-y-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
          </div>
          <Button 
            onClick={() => addItem(product)}
            className="w-full"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AddToCartDemo;
