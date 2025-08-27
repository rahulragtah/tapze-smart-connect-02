import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, X } from "lucide-react";


interface CouponCodeSectionProps {
  appliedCoupon: string;
  couponDiscount: number;
  validCoupons: Record<string, { discount: number; type: string }>;
  onApply: (code: string) => void;
  onRemove: () => void;
}

const CouponCodeSection: React.FC<CouponCodeSectionProps> = ({
  appliedCoupon,
  couponDiscount,
  validCoupons,
  onApply,
  onRemove,
}) => {
  const [localCoupon, setLocalCoupon] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5" />
          Coupon Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {appliedCoupon}
              </Badge>
              <span className="text-sm text-green-700">
                {validCoupons[appliedCoupon as keyof typeof validCoupons]?.type ===
                "percentage"
                  ? `${couponDiscount}% off`
                  : `₹${couponDiscount} off`}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLocalCoupon(""); // clear local field too
                setIsExpanded(false); // collapse when removing coupon
                onRemove();
              }}
              className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
              title="Remove coupon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : !isExpanded ? (
          <Button
            variant="outline"
            onClick={() => setIsExpanded(true)}
            className="w-full justify-center"
          >
            <Tag className="h-4 w-4 mr-2" />
            Apply Coupon
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  placeholder="Enter coupon code"
                  value={localCoupon}
                  onChange={(e) => setLocalCoupon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onApply(localCoupon);
                    }
                  }}
                  className="flex-1"
                  autoComplete="off"
                />
              </div>
              <Button
                onClick={() => onApply(localCoupon)}
                variant="outline"
                size="sm"
                disabled={!localCoupon.trim()}
              >
                Apply
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setLocalCoupon("");
              }}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponCodeSection;