import { Button } from '../Button';
import { Event } from '../../types/event.type';

interface TicketSelectionProps {
    event: Event;
    selectedTicket: string;
    quantity: number;
    onTicketSelect: (ticketId: string) => void;
    onQuantityChange: (quantity: number) => void;
    onBookNow: () => void;
}

export const TicketSelection = ({
    event,
    selectedTicket,
    quantity,
    onTicketSelect,
    onQuantityChange,
    onBookNow
}: TicketSelectionProps) => {
    if (!event.tickets?.length) {
        return (
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p className="text-slate-600 dark:text-slate-300">
                    No tickets available at the moment
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4 mb-6">
                {event.tickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                            selectedTicket === ticket._id
                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                : 'border-slate-200 dark:border-slate-700'
                        }`}
                        onClick={() => onTicketSelect(ticket._id)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {ticket.type}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {ticket.status === 'AVAILABLE' ? 'Available' : 'Sold Out'}
                                </p>
                            </div>
                            <span className="font-bold text-primary">
                                {ticket.price} MAD
                            </span>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            {ticket.quantity - (ticket.soldQuantity || 0)} tickets available
                        </div>
                    </div>
                ))}
            </div>

            {selectedTicket && (
                <>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                            Number of Tickets
                        </label>
                        <select
                            className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            value={quantity}
                            onChange={(e) => onQuantityChange(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full btn-gradient"
                        onClick={onBookNow}
                    >
                        Book Now
                    </Button>
                </>
            )}
        </>
    );
}; 