import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { initKonnectPayment } from '@/services/konnectApi';

interface PaymentButtonsProps {
  enabled: boolean;           // Whether payment buttons should be enabled
  cartItems: any[];          // Items in the cart
  userDetails: any;          // User's delivery and contact information
  total: number;             // Subtotal before shipping
  shipping: number;          // Shipping cost
  finalTotal: number;        // Final total including shipping
}

/**
 * PaymentButtons Component
 * 
 * Renders payment method buttons for Konnect and cash payments.
 * Handles payment initialization with the Konnect API.
 */
const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  total, 
  shipping, 
  finalTotal 
}: PaymentButtonsProps) => {
  const navigate = useNavigate();

  /**
   * Handles Konnect payment initialization
   * 
   * 1. Validates user details
   * 2. Initializes payment with Konnect API
   * 3. Redirects to Konnect payment page
   * 
   * On success: User is redirected to Konnect payment gateway
   * On failure: Error toast is shown
   */
  const handleKonnectPayment = async () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Error",
        description: "Please fill in your details first",
        variant: "destructive",
      });
      return;
    }

    try {
      const orderId = `ORDER-${Date.now()}`;
      const response = await initKonnectPayment({
        amount: finalTotal,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        orderId,
      });

      // Redirect to Konnect payment page
      window.location.href = response.payUrl;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Handles cash payment option
   * 
   * Navigates to order preview page with payment method set to 'cash'
   */
  const handleCashPayment = () => {
    navigate('/order-preview', {
      state: {
        orderDetails: {
          items: cartItems,
          userDetails,
          total,
          shipping,
          finalTotal,
          paymentMethod: 'cash'
        }
      }
    });
  };

  return (
    <div className="space-y-3">
      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled ? 1 : 0.5 }}
        whileHover={enabled ? { scale: 1.02 } : {}}
        onClick={handleKonnectPayment}
        disabled={!enabled}
        className="w-full bg-[#700100] text-white px-4 py-3 rounded-md hover:bg-[#591C1C] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <CreditCard size={20} />
        Payer avec Konnekt
      </motion.button>
      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled ? 1 : 0.5 }}
        whileHover={enabled ? { scale: 1.02 } : {}}
        onClick={handleCashPayment}
        disabled={!enabled}
        className="w-full border border-[#700100] text-[#700100] px-4 py-3 rounded-md hover:bg-[#F1F0FB] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <Wallet size={20} />
        Payer en espèces
      </motion.button>
    </div>
  );
};

export default PaymentButtons;