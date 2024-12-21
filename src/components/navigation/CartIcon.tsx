import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../cart/CartProvider';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-white hover:text-accent transition-colors duration-300" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#700100] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;