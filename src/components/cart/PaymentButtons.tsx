import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PaymentButtonsProps {
  enabled: boolean;
  cartItems: any[];
  userDetails: any;
  total: number;
  shipping: number;
  finalTotal: number;
}

const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  total, 
  shipping, 
  finalTotal 
}: PaymentButtonsProps) => {
  const navigate = useNavigate();

  const handlePayment = (method: 'konnekt' | 'cash') => {
    navigate('/order-preview', {
      state: {
        orderDetails: {
          items: cartItems,
          userDetails,
          total,
          shipping,
          finalTotal,
          paymentMethod: method
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
        onClick={() => enabled && handlePayment('konnekt')}
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
        onClick={() => enabled && handlePayment('cash')}
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