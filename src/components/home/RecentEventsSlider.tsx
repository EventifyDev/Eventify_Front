import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Event } from '../../types/event.type';
import { EventService } from '../../services/event.service';

const RecentEventsSlider: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const CARDS_PER_PAGE = 4;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventService = new EventService();
                const response = await eventService.getAllEvents(1, 12);
                setEvents(response);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const totalPages = Math.ceil(events.length / CARDS_PER_PAGE);

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="py-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />
            
            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text font-nunito font-bold text-transparent">
                            Featured Events
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                        Discover and book tickets for the most exciting upcoming events in your area
                    </p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentPage * 100}%)` }}
                        >
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {events
                                        .slice(pageIndex * CARDS_PER_PAGE, (pageIndex + 1) * CARDS_PER_PAGE)
                                        .map((event) => (
                                            <div
                                                key={event._id}
                                                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 h-[420px] flex flex-col"
                                            >
                                                <div className="relative h-48 flex-shrink-0 overflow-hidden">
                                                    <img
                                                        src={event.image}
                                                        alt={event.name}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-full">
                                                        <div className="flex items-center gap-1 text-sm font-medium text-primary dark:text-blue-400">
                                                            <Clock className="w-4 h-4" />
                                                            {formatTime(event.date)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col flex-grow p-5">
                                                    <div className="flex items-start flex-col gap-2 mb-3 text-sm text-slate-600 dark:text-slate-300">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4 flex-shrink-0 text-primary dark:text-blue-400" />
                                                            {formatDate(event.date)}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 flex-shrink-0 text-primary dark:text-blue-400" />
                                                            <span className="truncate">{event.location}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                                                        {event.name}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
                                                        {event.description}
                                                    </p>
                                                    <Link
                                                        to={`/event-details/${event._id}`}
                                                        className="inline-flex items-center gap-2 text-primary dark:text-blue-400 font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                                                    >
                                                        View Details
                                                        <svg
                                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-white/90 dark:hover:bg-slate-700/90 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-white/90 dark:hover:bg-slate-700/90 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentPage
                                        ? 'bg-primary dark:bg-blue-400 w-6'
                                        : 'bg-slate-300/50 dark:bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentEventsSlider; 