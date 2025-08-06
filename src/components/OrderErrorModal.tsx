import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  errorMessage?: string;
}

const OrderErrorModal: React.FC<OrderErrorModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  errorMessage = "Something went wrong while processing your order. Please try again."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-xl text-destructive">Order Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {errorMessage}
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={onRetry}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">
            If the problem persists, please contact our support team.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderErrorModal;