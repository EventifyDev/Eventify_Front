import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Dropdown from '../Dropdown';

interface DropdownRef {
  close: () => void;
}

export const CartButton = () => {
  const { items } = useSelector(selectCart);
  const itemCount = items.length;
  const dropdownRef = useRef<DropdownRef>(null);
  const navigate = useNavigate();

  const goToCart = () => {
    dropdownRef.current?.close();
    navigate('/cart');
  };

  const cartButton = (
    <div className="relative">
      <ShoppingCart size={20} className="dark:text-white" />
      
      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-4 -right-4
          min-w-[20px] h-5 px-1.5
          flex items-center justify-center
          text-xs font-semibold text-white
          rounded-full
          bg-gradient-to-r from-[#4361EE] to-[#EF1262]"
        >
          {itemCount}
        </span>
      )}
    </div>
  );

  return (
    <Dropdown
      ref={dropdownRef}
      placement="bottom-end"
      offset={[0, 10]}
      button={cartButton}
      btnClassName="relative p-2 bg-primary/5 dark:bg-dark/40 rounded-full
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200"
    >
      <div className="w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Your Cart ({itemCount})</h3>
          <button onClick={goToCart} className="text-xs text-primary hover:underline">View All</button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.ticketId} className="p-3 border-b border-slate-200 dark:border-slate-700 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.event.image} 
                    alt={item.event.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.event.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {new Date(item.event.date).toLocaleDateString()} • {item.quantity} {item.quantity > 1 ? 'tickets' : 'ticket'}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-semibold text-primary">{item.price * item.quantity} MAD</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
              Your cart is empty
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-3 bg-slate-50 dark:bg-slate-700/30">
            <button 
              onClick={goToCart}
              className="w-full py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-lg text-sm font-medium transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </Dropdown>
  );
};