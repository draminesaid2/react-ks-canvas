import React, { useState } from 'react';
import { useCart } from '../components/cart/CartProvider';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import BrandNavbarSection from "@/components/productsPages/BrandNavbarSection";
import { motion } from "framer-motion";
import UserDetailsForm from '@/components/cart/UserDetailsForm';
import OrderSummary from '@/components/cart/OrderSummary';
import { UserDetails, getUserDetails } from '@/utils/userDetailsStorage';
import CartItemCard from '@/components/cart/CartItemCard';
import BackButton from '@/components/cart/BackButton';
import EmptyCartMessage from '@/components/cart/EmptyCartMessage';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(getUserDetails());
  const [isEditing, setIsEditing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
      toast({
        title: "Panier mis à jour",
        description: "La quantité a été mise à jour avec succès",
        className: "bg-red-50 border-red-200",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du panier",
      variant: "destructive",
      className: "bg-red-50 border-red-200",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleKonnektPayment = () => {
    console.log('Processing Konnekt payment');
  };

  const handleCashPayment = () => {
    console.log('Processing cash payment');
  };

  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleDeleteDetails = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
    toast({
      title: "Informations supprimées",
      description: "Vos informations ont été supprimées avec succès",
      className: "bg-red-50 border-red-200",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleFormComplete = (details: UserDetails) => {
    setUserDetails(details);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <TopNavbar />
      <div className="flex-grow">
        <BrandNavbarSection />
        <div className="container mx-auto px-4 py-4 space-y-4 mt-24">
          <BackButton onClick={() => navigate('/')} />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif text-[#1A1F2C]"
          >
            Mon Panier ({cartItems.length} articles)
          </motion.h1>
          
          {cartItems.length === 0 ? (
            <EmptyCartMessage onNavigate={() => navigate('/')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4 bg-white/50 p-6 rounded-xl backdrop-blur-sm shadow-sm">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={{...item, price: item.price}}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
                
                {(!userDetails || isEditing) && (
                  <div className="bg-white/50 p-6 rounded-xl backdrop-blur-sm shadow-sm">
                    <UserDetailsForm 
                      onComplete={(details) => {
                        setUserDetails(details);
                        setIsEditing(false);
                      }}
                      initialData={userDetails}
                    />
                  </div>
                )}
              </div>
              
              <div className="lg:sticky lg:top-8">
                <OrderSummary
                  total={total}
                  shipping={shipping}
                  finalTotal={finalTotal}
                  userDetails={userDetails}
                  cartItems={cartItems}
                  onEditDetails={!isEditing ? () => setIsEditing(true) : undefined}
                  onDeleteDetails={!isEditing ? () => {
                    localStorage.removeItem('userDetails');
                    setUserDetails(null);
                    toast({
                      title: "Informations supprimées",
                      description: "Vos informations ont été supprimées avec succès",
                      style: {
                        backgroundColor: '#700100',
                        color: 'white',
                        border: '1px solid #590000',
                      },
                    });
                  } : undefined}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;