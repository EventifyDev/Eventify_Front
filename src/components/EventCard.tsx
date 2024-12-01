import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types/event.type';
import { formatDate } from '../utils/DateUtils';
import { Button } from '../components/Button';

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      <div className="relative h-48 group">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -right-12 top-6 rotate-45">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white py-1 px-20 text-center shadow-lg">
            <span className="text-sm font-semibold tracking-wider">
              {event.eventType}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-poppins text-primary font-semibold text-xl mb-4 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-3 mb-6">
            <div className="flex items-center text-dark dark:text-slate-500 group/item hover:text-primary transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/5 group-hover/item:bg-primary/10 flex items-center justify-center mr-3 transition-colors duration-300">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{formatDate(new Date(event.date))}</span>
            </div>

            <div className="flex items-center text-dark dark:text-slate-500 group/item hover:text-primary transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/5 group-hover/item:bg-primary/10 flex items-center justify-center mr-3 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{event.location}</span>
            </div>

            <div className="flex items-center text-dark dark:text-slate-500 group/item hover:text-primary transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/5 group-hover/item:bg-primary/10 flex items-center justify-center mr-3 transition-colors duration-300">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{event.capacity} attendees max</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
            <Button className='btn-gradient w-full text-white'
              onClick={() => onViewDetails(event._id)}
              aria-label={`View details for ${event.name}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      );
};