import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Event } from '../types/event.type';
import { Button } from '../components/Button';
import { formatDate } from '../utils/DateUtils';
import { useNavigate } from 'react-router-dom';
import { EventTimer } from './events/EventTimer';

interface FeaturedEventCardProps {
    event: Event;
}

export const FeaturedEventCard = ({ event }: FeaturedEventCardProps) => {
    const navigate = useNavigate();
    const isUpcoming = new Date(event.date) > new Date();
    const navigateToDetails = () => navigate(`/event-details/${event._id}`);

    return (
        <div className="group h-[420px] flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
            <div className="h-36 flex-shrink-0 overflow-hidden">
                <img
                    src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
                    alt={event.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-2">
                            {event.name}
                        </h3>
                        {event.price && (
                            <span className="flex-shrink-0 px-2 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-lg">
                                ${event.price}
                            </span>
                        )}
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="truncate">{formatDate(new Date(event.date))}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </span>
                    </div>

                </div>

                {isUpcoming && <EventTimer eventDate={event.date} />}

                <Button
                    onClick={navigateToDetails}
                    variant="primary"
                    size="sm"
                    endIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full btn-gradient mt-4 py-3"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default FeaturedEventCard;