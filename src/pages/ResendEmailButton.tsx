import React, { useState, useEffect } from "react";
import { resendEmailDTO } from '@/components/models/loginInterface';
import { sendRestPasswordEmail } from '@/services/appEmailService';



interface ResendEmailButtonProps {
  payload:resendEmailDTO
}

export default function ResendEmailButton({  payload }: ResendEmailButtonProps) {
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (disabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [disabled]);

  const handleResend = () => {
    console.log("dfd", payload.email);
    sendRestPasswordEmail(payload);
    //alert("Email resent!");
    setDisabled(true);
    setCountdown(30);
  };

  return (
    <button onClick={handleResend} disabled={disabled} className="w-full">
      {disabled ? `Resend in ${countdown}s` : "Resend Email"}
    </button>
  );
}