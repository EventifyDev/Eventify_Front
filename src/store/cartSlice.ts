import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types/cart.type';

// Calculate total price of cart items
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Load cart items from localStorage on initial load
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('eventify_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

// Save cart items to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem('eventify_cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  total: calculateTotal(loadCartFromStorage()),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.total = calculateTotal(action.payload);
      saveCartToStorage(action.payload);
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.ticketId === action.payload.ticketId);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.total = calculateTotal(state.items);
      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.ticketId !== action.payload);
      state.total = calculateTotal(state.items);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ ticketId: string; quantity: number }>) => {
      const targetItem = state.items.find(item => item.ticketId === action.payload.ticketId);
      if (targetItem) {
        targetItem.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage([]);
    },
  },
});

export const { setItems, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: { cart: CartState }) => state.cart;

export default cartSlice.reducer; 