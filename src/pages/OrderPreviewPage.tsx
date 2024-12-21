import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Truck, Tag, ArrowLeft, CreditCard } from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const OrderPreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  const handleConfirmOrder = () => {
    toast({
      title: "Commande confirmée",
      description: "Votre commande a été confirmée avec succès",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
    navigate('/');
  };

  if (!state?.orderDetails) {
    navigate('/cart');
    return null;
  }

  const { items, userDetails, total, shipping, finalTotal, paymentMethod } = state.orderDetails;

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-[#700100] hover:text-[#591C1C] mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour au panier
          </button>

          <h1 className="text-3xl font-serif text-[#1A1F2C] mb-8">Aperçu de votre commande</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Détails de livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Adresse de livraison</h3>
                <p className="text-gray-600">
                  {userDetails.firstName} {userDetails.lastName}<br />
                  {userDetails.address}<br />
                  {userDetails.zipCode} {userDetails.country}<br />
                  {userDetails.phone}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Date de livraison estimée</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} />
                  <span>{estimatedDelivery.toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <Truck size={20} />
                  <span>Livraison standard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Articles commandés</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{item.price.toFixed(2)} TND</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Code promo</h2>
            <div className="flex gap-2">
              <Input 
                placeholder="Entrez votre code promo"
                className="flex-1"
              />
              <Button 
                variant="outline"
                className="border-[#700100] text-[#700100] hover:bg-[#700100] hover:text-white"
              >
                <Tag className="mr-2" size={20} />
                Appliquer
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Résumé</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} TND</span>
              </div>
              <p className="text-sm text-gray-500">TVA incluse</p>
            </div>
          </div>

          <Button
            onClick={handleConfirmOrder}
            className="w-full bg-[#700100] text-white hover:bg-[#591C1C] py-6 text-lg"
          >
            <CreditCard className="mr-2" size={20} />
            {paymentMethod === 'konnekt' ? 'Payer avec Konnekt' : 'Payer en espèces'}
          </Button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPreviewPage;