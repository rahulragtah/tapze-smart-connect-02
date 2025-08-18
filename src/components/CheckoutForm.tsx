import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { State, City } from 'country-state-city';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormData) => void;
  placeOrderButtonRef?: React.RefObject<HTMLButtonElement>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, placeOrderButtonRef }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CheckoutFormData>();
  const [stateOptions, setStateOptions] = useState<{ name: string; isoCode: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null);

  useEffect(() => {
    const st = State.getStatesOfCountry('IN').map(s => ({ name: s.name, isoCode: s.isoCode }));
    setStateOptions(st);
    setValue('country', 'India');
  }, [setValue]);

  const handleZipBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${val}`)
        .then(res => res.json())
        .then(data => {
          const result = data?.[0];
          if (result?.Status === 'Success' && result.PostOffice?.length) {
            const po = result.PostOffice[0];
            const matchedState = State.getStatesOfCountry('IN').find(s => s.name.toLowerCase() === po.State.toLowerCase());
            if (matchedState) {
              setSelectedStateCode(matchedState.isoCode);
              setValue('state', matchedState.name);
              const cities = City.getCitiesOfState('IN', matchedState.isoCode).map(c => c.name);
              setCityOptions(cities);
              setValue('city', po.District);
            }
          }
        });
    }
  };

  const {
    ref: emailRef,
    onChange: emailOnChange,
    ...emailRest
  } = register('email', {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
  });

  const {
    ref: zipRef,
    onChange: zipOnChange,
    ...zipRest
  } = register('zipCode', {
    required: 'PIN code is required',
    minLength: { value: 6, message: 'Enter 6 digits' },
    maxLength: { value: 6, message: 'Enter 6 digits' },
    pattern: { value: /^\d{6}$/, message: 'Enter a valid 6-digit PIN' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" {...register('firstName', { required: 'First name is required' })} />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" {...register('lastName', { required: 'Last name is required' })} />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" ref={emailRef} {...emailRest} onChange={emailOnChange} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="col-span-2">
            <Label htmlFor="phone">Phone *</Label>
            <PhoneInput id="phone" {...register('phone', { required: 'Phone is required' })} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input id="address" {...register('address', { required: 'Address is required' })} />
          </div>
          <div>
            <Label htmlFor="apartment">Apartment</Label>
            <Input id="apartment" {...register('apartment')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">PIN Code *</Label>
              <Input id="zipCode" maxLength={6} ref={zipRef} {...zipRest} onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); zipOnChange(e); }} onBlur={handleZipBlur} />
              {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
            </div>
            <div>
              <Label>State *</Label>
              <Select onValueChange={(val) => setValue('state', val)}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {stateOptions.map((s) => <SelectItem key={s.isoCode} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City *</Label>
              <Select onValueChange={(val) => setValue('city', val)}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {cityOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input id="country" value="India" readOnly {...register('country')} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border-t bg-background p-4 mt-4">
        <Button ref={placeOrderButtonRef} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Place Order
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;