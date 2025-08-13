import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const sanitize = (val: string) => val.replace(/\D/g, "").slice(0, 10);

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { className, containerClassName, onChange, defaultValue, value, placeholder = "10-digit mobile number", ...props },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = sanitize(e.target.value);
      // mutate the value before passing along so RHF gets sanitized value
      e.target.value = cleaned;
      onChange?.(e);
    };

    return (
      <div className={cn("relative", containerClassName)}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 select-none">
          <img
            src="/flags/in.svg"
            alt="India flag"
            width={18}
            height={12}
            className="h-3.5 w-5 rounded-sm shadow-sm"
            loading="lazy"
          />
          <span className="ml-2 text-sm text-foreground/80">+91</span>
        </div>
        <Input
          ref={ref}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          placeholder={placeholder}
          autoComplete="tel"
          className={cn("pl-20", className)}
          defaultValue={typeof defaultValue === "string" ? sanitize(defaultValue) : defaultValue}
          value={typeof value === "string" ? sanitize(value) : value}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
