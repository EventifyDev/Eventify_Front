import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types/event.type';
import { formatDate } from '../utils/DateUtils';
import { Button } from '../components/Button';

interface EventCardProps {
  event: Event;
  onViewDetails?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      <div className="relative h-48 group">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 text-xs font-semibold bg-primary/80 text-white rounded-full shadow-sm">
            {event.eventType}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-poppins text-primary font-semibold text-xl mb-4 line-clamp-2">
          {event.name}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-dark dark:text-slate-500">
            <Calendar className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">{formatDate(new Date(event.date))}</span>
          </div>
          
          <div className="flex items-center text-dark dark:text-slate-500">
            <MapPin className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">{event.location}</span>
          </div>
          
          <div className="flex items-center text-dark dark:text-slate-500">
            <Users className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">{event.capacity} attendees max</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
          <Button
            onClick={() => onViewDetails?.(event._id)}
            aria-label={`View details for ${event.name}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};