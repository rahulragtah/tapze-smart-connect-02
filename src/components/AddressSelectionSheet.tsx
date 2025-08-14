import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, MapPin } from 'lucide-react';
import AddressForm from './AddressForm';

interface Address {
  id?: number;
  type: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: number;
}

interface AddressSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onAddAddress: (address: Address) => void;
}

const AddressSelectionSheet: React.FC<AddressSelectionSheetProps> = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
    onClose();
  };

  const handleAddNewAddress = (newAddress: any) => {
    const addressData: Address = {
      type: newAddress.type,
      name: newAddress.name,
      line1: newAddress.address,
      line2: '',
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.zipCode,
      isDefault: newAddress.isDefault ? 1 : 0
    };
    
    onAddAddress(addressData);
    setShowAddForm(false);
    onClose();
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col" style={{ zIndex: 60 }}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {showAddForm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddForm(false)}
                className="h-8 w-8 -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <MapPin className="w-5 h-5" />
            {showAddForm ? 'Add New Address' : 'Select Shipping Address'}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {showAddForm ? (
            <AddressForm
              onSave={handleAddNewAddress}
              onCancel={handleCancelAdd}
            />
          ) : (
            <div className="space-y-4">
              {/* Add New Address Button */}
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-0 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus className="h-8 w-8" />
                    <span className="font-medium">Add New Address</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Saved Addresses */}
              {addresses.map((address, index) => (
                <Card 
                  key={address.id || index} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAddress?.id === address.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleSelectAddress(address)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={address.isDefault ? 'default' : 'secondary'}>
                            {address.type || 'Address'}
                          </Badge>
                          {address.isDefault === 1 && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.line1}
                          {address.line2 && `, ${address.line2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {addresses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No saved addresses found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first address to continue
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Continue Button - Only show when not adding new address and address is selected */}
        {!showAddForm && selectedAddress && (
          <div className="border-t bg-background p-4 mt-auto">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
              onClick={onClose}
            >
              Continue with Selected Address
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddressSelectionSheet;