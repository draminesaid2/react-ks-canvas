import React from 'react';
import { motion } from 'framer-motion';
import { UserDetails } from '@/utils/userDetailsStorage';
import PaymentButtons from './PaymentButtons';
import { Pencil, Trash2 } from 'lucide-react';

interface OrderSummaryProps {
  total: number;
  shipping: number;
  finalTotal: number;
  userDetails: UserDetails | null;
  cartItems: any[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
}

const OrderSummary = ({ 
  total, 
  shipping, 
  finalTotal, 
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails
}: OrderSummaryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32 border border-gray-100">
        <h2 className="text-xl font-serif text-[#1A1F2C] mb-6">Résumé de la commande</h2>
        
        {userDetails && (
          <div className="mb-6 p-4 bg-[#F1F0FB] rounded-md relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEditDetails && (
                <button
                  onClick={onEditDetails}
                  className="p-1 hover:bg-white rounded-full mr-1 transition-colors"
                  title="Modifier"
                >
                  <Pencil size={16} className="text-[#700100]" />
                </button>
              )}
              {onDeleteDetails && (
                <button
                  onClick={onDeleteDetails}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} className="text-[#700100]" />
                </button>
              )}
            </div>
            <h3 className="font-medium text-[#1A1F2C] mb-2">Informations de livraison</h3>
            <p className="text-sm text-[#8E9196]">
              {userDetails.firstName} {userDetails.lastName}<br />
              {userDetails.address}<br />
              {userDetails.zipCode} {userDetails.country}<br />
              {userDetails.phone}<br />
              {userDetails.email}
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-[#8E9196]">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} TND</span>
          </div>
          <div className="flex justify-between text-[#8E9196]">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between text-lg font-medium text-[#1A1F2C]">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)} TND</span>
            </div>
            <p className="text-xs text-[#8E9196] mt-1">TVA incluse</p>
          </div>
        </div>
        
        <PaymentButtons 
          enabled={!!userDetails}
          cartItems={cartItems}
          userDetails={userDetails}
          total={total}
          shipping={shipping}
          finalTotal={finalTotal}
        />

        <div className="mt-6 space-y-2 text-sm text-[#8E9196]">
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Livraison gratuite à partir de 500 TND
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Retours gratuits sous 14 jours
          </p>
          <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
            • Service client disponible 24/7
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;