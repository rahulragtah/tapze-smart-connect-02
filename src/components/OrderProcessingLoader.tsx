import React from 'react';
import { CheckCircle, CreditCard, Package, Truck } from 'lucide-react';

interface OrderProcessingLoaderProps {
  stage: 'creating' | 'payment' | 'confirming' | 'complete';
}

const OrderProcessingLoader: React.FC<OrderProcessingLoaderProps> = ({ stage }) => {
  const stages = [
    { id: 'creating', label: 'Creating Order', icon: Package },
    { id: 'payment', label: 'Processing Payment', icon: CreditCard },
    { id: 'confirming', label: 'Confirming Order', icon: CheckCircle },
    { id: 'complete', label: 'Order Complete', icon: Truck }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Processing Your Order</h2>
          <p className="text-muted-foreground text-sm">
            Please don't close this window while we process your order
          </p>
        </div>

        <div className="space-y-4">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isPending = index > currentStageIndex;

            return (
              <div
                key={stageItem.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-50 border border-green-200' 
                    : isCurrent 
                    ? 'bg-primary/5 border border-primary/20' 
                    : 'bg-muted/30'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium transition-all duration-300 ${
                      isCompleted
                        ? 'text-green-700'
                        : isCurrent
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stageItem.label}
                  </p>
                  {isCurrent && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </div>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This may take a few moments...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingLoader;