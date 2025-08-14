import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { State, City } from 'country-state-city';

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
    address: address?.address || "",
    apartment: "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    country: "India",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stateOptions, setStateOptions] = useState<{ name: string; isoCode: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const st = State.getStatesOfCountry('IN').map(s => ({ name: s.name, isoCode: s.isoCode }));
    setStateOptions(st);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleZipCodeChange = async (value: string) => {
    // Only allow numeric input and max 6 digits
    let val = value.replace(/\D/g, '');
    if (val.length > 6) val = val.slice(0, 6);
    
    handleInputChange('zipCode', val);

    // Auto-fill state and city when PIN is 6 digits
    if (val.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        const result = data?.[0];
        
        if (result?.Status === 'Success' && Array.isArray(result.PostOffice) && result.PostOffice.length) {
          const po = result.PostOffice[0];
          const stateName = po.State as string;
          const district = po.District as string;

          const matchedState = State.getStatesOfCountry('IN').find(s => s.name.toLowerCase() === stateName.toLowerCase());
          if (matchedState) {
            setSelectedStateCode(matchedState.isoCode);
            handleInputChange('state', matchedState.name);
            const cities = City.getCitiesOfState('IN', matchedState.isoCode).map(c => c.name);
            const uniqueCities = Array.from(new Set([district, ...cities]));
            setCityOptions(uniqueCities);
            handleInputChange('city', district);
          } else {
            handleInputChange('state', stateName);
            setCityOptions([district]);
            handleInputChange('city', district);
          }
        }
      } catch (err) {
        console.error('PIN lookup failed', err);
      }
    }
  };

  const handleStateChange = (value: string) => {
    handleInputChange('state', value);
    // Reset PIN and city when state changes
    handleInputChange('zipCode', '');
    handleInputChange('city', '');

    const st = State.getStatesOfCountry('IN').find(s => s.name === value);
    if (st) {
      setSelectedStateCode(st.isoCode);
      const cities = City.getCitiesOfState('IN', st.isoCode).map(c => c.name);
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  const handleCityChange = (value: string) => {
    handleInputChange('city', value);
    // Reset PIN when city changes
    handleInputChange('zipCode', '');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter a valid 6-digit PIN';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: address ? "Address Updated" : "Address Added",
        description: "Your address has been saved successfully.",
      });
      
      onSave({ 
        ...formData, 
        id: address?.id,
        // Set some defaults for backward compatibility
        type: 'Home',
        name: '',
        isDefault: false
      });
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
        {/* Address first */}
        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="House no., street, area"
            className={errors.address ? 'border-destructive' : ''}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
          <Input
            id="apartment"
            value={formData.apartment}
            onChange={(e) => handleInputChange("apartment", e.target.value)}
            placeholder="Apartment, suite, floor (optional)"
          />
        </div>

        {/* PIN Code & State */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode">PIN Code *</Label>
            <Input
              id="zipCode"
              inputMode="numeric"
              value={formData.zipCode}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              placeholder="6-digit PIN code"
              maxLength={6}
              className={errors.zipCode ? 'border-destructive' : ''}
            />
            {errors.zipCode && (
              <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>State *</Label>
            <Select value={formData.state} onValueChange={handleStateChange}>
              <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {stateOptions.map((s) => (
                  <SelectItem key={s.isoCode} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-destructive mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        {/* City & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City *</Label>
            <Select value={formData.city} onValueChange={handleCityChange}>
              <SelectTrigger className={errors.city ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {cityOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-sm text-destructive mt-1">{errors.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              readOnly
              className="bg-muted"
            />
          </div>
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