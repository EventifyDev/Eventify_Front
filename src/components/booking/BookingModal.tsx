import { X, Users } from 'lucide-react';
import { Button } from '../Button';
import { Event, Ticket } from '../../types/event.type';

interface BookingModalProps {
    event: Event;
    selectedTicket: Ticket;
    quantity: number;
    totalPrice: number;
    onClose: () => void;
    onAddToCart: () => void;
    onCheckout: () => void;
}

export const BookingModal = ({
    event,
    selectedTicket,
    quantity,
    totalPrice,
    onClose,
    onAddToCart,
    onCheckout
}: BookingModalProps) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg relative overflow-hidden transform transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="relative h-48">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full p-2 transition-all duration-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{event.name}</h3>
                </div>
            </div>

            <div className="p-6">
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-2xl p-4 mb-6">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                        Booking Summary
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary text-sm">₿</span>
                                </div>
                                <span className="text-slate-600 dark:text-slate-300">Price per ticket</span>
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {selectedTicket.price} MAD
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-slate-600 dark:text-slate-300">Quantity</span>
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {quantity} tickets
                            </span>
                        </div>
                        <div className="border-t border-dashed border-slate-200 dark:border-slate-600 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <span className="text-green-500 font-bold">Σ</span>
                                    </div>
                                    <span className="text-slate-900 dark:text-white font-medium">Total Amount</span>
                                </div>
                                <span className="text-lg font-bold text-primary">
                                    {totalPrice} MAD
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onAddToCart}
                        className="group relative overflow-hidden rounded-xl"
                    >
                        <span className="relative z-10 text-sm font-bold">Continue Shopping</span>
                        <div className="absolute inset-0 bg-white hover:text-primary" />
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={onCheckout}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:text-white hover:from-primary/90 hover:to-primary transition-all duration-300"
                    >
                        <span className="relative z-10 text-sm font-bold">Checkout</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
); 