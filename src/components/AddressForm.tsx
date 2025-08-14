import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AddressFormProps {
  address?: {
    id?: number;
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  };
  onSave: (address: any) => void;
  onCancel: () => void;
}

const AddressForm = ({ address, onSave, onCancel }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    type: address?.type || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    isDefault: address?.isDefault || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: address ? "Address Updated" : "Address Added",
        description: "Your address has been saved successfully.",
      });
      
      onSave({ ...formData, id: address?.id });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="type">Address Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select address type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter street address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="Enter ZIP code"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isDefault"
            checked={formData.isDefault}
            onCheckedChange={(checked) => handleInputChange("isDefault", checked)}
          />
          <Label htmlFor="isDefault">Set as default address</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : address ? "Update Address" : "Add Address"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;