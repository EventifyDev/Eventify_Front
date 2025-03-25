import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event } from '../types/event.type';
import { EventService } from '../services/event.service';
import { CartService } from '../services/cart.service';
import { toast } from 'sonner';
import { FeaturedEventCard } from '../components/FeaturedEventCard';
import { EventHero } from '../components/events/EventHero';
import { TicketSelection } from '../components/booking/TicketSelection';
import { BookingModal } from '../components/booking/BookingModal';
import Loader from '../components/ui/Loader';

export const EventDetails: React.FC = () => {
    const navigate = useNavigate();
    const { event_id } = useParams<{ event_id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [otherEvents, setOtherEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);
    const eventService = new EventService();
    const cartService = CartService.getInstance();

    useEffect(() => {
        const fetchEventData = async () => {
            if (!event_id) return;

            try {
                const [eventData, eventsData] = await Promise.all([
                    eventService.getEventById(event_id),
                    eventService.getAllEvents(1, 6)
                ]);
                
                setEvent(eventData);
                setOtherEvents(eventsData.filter(e => e._id !== event_id));
            } catch (error) {
                toast.error('Failed to load event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [event_id]);

    const handleAddToCart = async () => {
        if (!event || !selectedTicket || !selectedTicketDetails) {
            toast.error('Please select a ticket first');
            return;
        }

        try {
            const cartItem = {
                event: {
                    _id: event._id,
                    name: event.name,
                    image: event.image,
                    date: event.date,
                    location: event.location,
                    eventType: event.eventType,
                },
                ticketId: selectedTicket,
                quantity: quantity,
                price: selectedTicketDetails.price
            };

            await cartService.addToCart(cartItem);
            toast.success('Added to cart successfully!');
            setShowModal(false);
        } catch (error) {
            toast.error('Failed to add to cart. Please try again.');
        }
    };

    const handleCheckout = async () => {
        if (!event || !selectedTicket) return;

        try {
            await eventService.bookTicket(event._id, selectedTicket, quantity);
            navigate('/cart');
        } catch (error) {
            toast.error('Failed to process booking');
        }
    };

    const selectedTicketDetails = event?.tickets?.find(ticket => ticket._id === selectedTicket);
    const totalPrice = selectedTicketDetails ? selectedTicketDetails.price * quantity : 0;
    const isEventPassed = event ? new Date(event.date) < new Date() : false;

    if (loading || !event) {
       return <Loader />
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Background Patterns */}
            <div className="fixed inset-0 z-010">
                {/* Grid Pattern */}
                <div
                    className="absolu inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-70 dark:opacity-5"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_40%,rgba(67,97,238,0.05)_70%,rgba(239,18,98,0.05))]" />

                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>
            <EventHero event={event} onBack={() => navigate(-1)} />

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 b">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                About the Event
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Other Events You Might Like
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                {otherEvents.slice(0, 4).map((otherEvent) => (
                                    <FeaturedEventCard key={otherEvent._id} event={otherEvent} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg sticky top-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                Book Tickets
                            </h2>
                            {isEventPassed ? (
                                <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        This event has already passed
                                    </p>
                                </div>
                            ) : (
                                <TicketSelection
                                    event={event}
                                    selectedTicket={selectedTicket}
                                    quantity={quantity}
                                    onTicketSelect={setSelectedTicket}
                                    onQuantityChange={setQuantity}
                                    onBookNow={() => setShowModal(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && selectedTicketDetails && (
                <BookingModal
                    event={event}
                    selectedTicket={selectedTicketDetails}
                    quantity={quantity}
                    totalPrice={totalPrice}
                    onClose={() => setShowModal(false)}
                    onAddToCart={handleAddToCart}
                    onCheckout={handleCheckout}
                />
            )}
        </div>
    );
};

export default EventDetails; 