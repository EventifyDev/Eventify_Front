import { CartItem } from '../types/cart.type';
import { store } from '../store';
import { addItem, setItems, removeItem as removeCartItem } from '../store/cartSlice';

export class CartService {
    private static instance: CartService;
    private readonly STORAGE_KEY = 'eventify_cart';

    private constructor() {
        const savedCart = this.getCart();
        store.dispatch(setItems(savedCart));
    }

    public static getInstance(): CartService {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    async addToCart(item: CartItem): Promise<void> {
        const cart = this.getCart();
        const existingItemIndex = this.findExistingItemIndex(cart, item.ticketId);
        
        if (this.isItemExisting(existingItemIndex)) {
            this.incrementExistingItemQuantity(cart, existingItemIndex, item.quantity);
        } else {
            cart.push(item);
        }
        
        this.persistCartChanges(cart, item);
    }

    getCart(): CartItem[] {
        const cartData = localStorage.getItem(this.STORAGE_KEY);
        if (!this.isValidCartData(cartData)) return [];
        
        const cart = JSON.parse(cartData);
        return Array.isArray(cart) ? cart : [];
    }

    removeFromCart(ticketId: string): void {
        const updatedCart = this.getCart().filter(item => item.ticketId !== ticketId);
        this.persistCartChanges(updatedCart);
        store.dispatch(removeCartItem(ticketId));
    }

    updateQuantity(ticketId: string, quantity: number): void {
        const cart = this.getCart();
        const updatedCart = cart.map(item => 
            item.ticketId === ticketId ? { ...item, quantity } : item
        );
        this.persistCartChanges(updatedCart);
    }

    clearCart(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        store.dispatch(setItems([]));
    }

    getCartTotal(): number {
        return this.getCart().reduce(this.calculateItemTotal, 0);
    }

    getCartItemCount(): number {
        return this.getCart().reduce((total, item) => total + item.quantity, 0);
    }

    private findExistingItemIndex(cart: CartItem[], ticketId: string): number {
        return cart.findIndex(item => item.ticketId === ticketId);
    }

    private isItemExisting(index: number): boolean {
        return index !== -1;
    }

    private incrementExistingItemQuantity(cart: CartItem[], index: number, quantity: number): void {
        cart[index].quantity += quantity;
    }

    private persistCartChanges(cart: CartItem[], newItem?: CartItem): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
            if (newItem) {
                store.dispatch(addItem(newItem));
            }
        } catch (error) {
            throw new Error('Failed to persist cart changes');
        }
    }

    private isValidCartData(data: string | null): boolean {
        return Boolean(data);
    }

    private calculateItemTotal(total: number, item: CartItem): number {
        return total + (item.price * item.quantity);
    }
} 