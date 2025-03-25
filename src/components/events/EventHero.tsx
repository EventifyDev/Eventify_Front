import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { Event } from '../../types/event.type';
import { formatDate } from '../../utils/DateUtils';

interface EventHeroProps {
    event: Event;
    onBack: () => void;
}

export const EventHero = ({ event, onBack }: EventHeroProps) => (
    <div className="relative h-[70vh] w-full">
        <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />
        
        <button 
            onClick={onBack}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className='text-white'>Back</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-white backdrop-blur-sm">
                        {event.eventType}
                    </span>
                </div>
                <h1 className="text-5xl font-bold mb-4">
                    {event.name}
                </h1>
                <div className="flex flex-wrap gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(new Date(event.date))}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{event.capacity} attendees</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
); 