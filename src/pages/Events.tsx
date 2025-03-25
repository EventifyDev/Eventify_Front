import React, { useState, useEffect } from 'react';
import { FeaturedEventCard } from '../components/FeaturedEventCard';
import { ArrowUpDown, ChevronDown, Check, Sparkles, Loader2 } from 'lucide-react';
import { Event, EventType } from '../types/event.type';
import { toast } from 'sonner';
import EventLoader from '../components/EventLoader';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/authSlice';
import { EventService } from '../services/event.service';
import { SearchBar } from '../components/events/SearchBar';
import { CategoryFilter } from '../components/events/CategoryFilter';
import { NoEventsFound } from '../components/events/NoEventsFound';

interface SortOption {
    value: string;
    label: string;
}

const sortOptions: SortOption[] = [
    { value: 'date-asc', label: 'Date: Nearest First' },
    { value: 'date-desc', label: 'Date: Latest First' }
];

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<EventType | 'ALL'>('ALL');
    const [sortBy, setSortBy] = useState('date-asc');
    const [page, setPage] = useState(1);
    const eventsPerPage = 9;
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const eventService = new EventService();
    const { user } = useSelector(selectAuth);

        const fetchEvents = async () => {
            if (!user?._id) {
                setLoading(false);
                return;
            }
    
            try {
                const data = await eventService.getAllEvents(1, 0);
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                throw new Error('Invalid response format');
                }
            } catch (error) {
                toast.error('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };
    
    useEffect(() => {
        fetchEvents();
    }, [user]);

    const filterEvents = () => {
        const now = new Date();
        return events.filter(event => {
            const eventDate = new Date(event.date);
            const isActive = eventDate >= now;
            const matchesSearch = !searchTerm || 
                event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = !location || 
                event.location.toLowerCase().includes(location.toLowerCase());
            const matchesCategory = selectedCategory === 'ALL' ||
                event.eventType === selectedCategory;

            return isActive && matchesSearch && matchesLocation && matchesCategory;
        }).sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            
            switch (sortBy) {
                case 'date-asc':
                    return dateA - dateB;
                case 'date-desc':
                    return dateB - dateA;
                default:
                    return dateA - dateB;
            }
        });
    };

    useEffect(() => {
        setFilteredEvents(filterEvents());
        setPage(1);
    }, [events, searchTerm, location, selectedCategory, sortBy]);

    const currentEvents = filteredEvents.slice(0, page * eventsPerPage);
    const hasMore = filteredEvents.length > currentEvents.length;

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        try {
            // Simulate loading delay for smooth transition
            await new Promise(resolve => setTimeout(resolve, 800));
            setPage(prev => prev + 1);
        } finally {
            setIsLoadingMore(false);
        }
    };

    if (loading) return <EventLoader />;

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-900">
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0">
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-70 dark:opacity-5"
                />
                
                {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_40%,rgba(67,97,238,0.05)_70%,rgba(239,18,98,0.05))]" />
                
                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Discover Amazing Events</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold">
                                <span className="bg-gradient-to-r from-[#EF1262] to-[#4361EE] bg-clip-text font-bold font-nunito text-transparent">
                                Find Your Next
                            </span>
                            <br />
                                <span className="bg-gradient-to-r from-[#EF1262] to-[#4361EE] bg-clip-text font-bold font-nunito text-transparent">
                                Unforgettable Experience
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Explore a world of exciting events, from concerts to workshops. Your next adventure awaits!
                        </p>

                            <SearchBar
                                searchTerm={searchTerm}
                                location={location}
                                onSearchChange={setSearchTerm}
                                onLocationChange={setLocation}
                                onSearch={filterEvents}
                            />
                    </div>
                </div>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 mb-12 relative z-50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <CategoryFilter
                                selectedCategory={selectedCategory}
                                onCategorySelect={setSelectedCategory}
                            />

                        <div className="relative shrink-0">
                            <Dropdown
                                btnClassName="relative bg-gradient-to-r from-[#EF1262] to-[#4361EE] rounded-xl"
                                button={
                                    <div className="flex items-center gap-4 px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <ArrowUpDown className="w-5 h-5 text-white" />
                                            <span className="text-sm font-medium text-white">Sort by</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">
                                            {sortOptions.find(option => option.value === sortBy)?.label}
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-white" />
                                    </div>
                                }
                                offset={[0, 8]}>
                                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 py-2 w-64 backdrop-blur-xl">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSortBy(option.value)}
                                            className="flex items-center justify-between w-full px-4 py-3 text-sm 
                                               hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                            <span className={`font-medium transition-colors
                                            ${sortBy === option.value
                                                    ? 'text-primary'
                                                    : 'text-slate-700 dark:text-slate-200 group-hover:text-primary'}`}>
                                                {option.label}
                                            </span>
                                            {sortBy === option.value && (
                                                <div className="p-1.5 bg-primary/10 rounded-full">
                                                    <Check className="w-4 h-4 text-primary" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                    <div className="relative z-0">
                        {currentEvents.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {currentEvents.map((event) => (
                            <FeaturedEventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>

                                {hasMore && (
                                    <div className="text-center mt-16">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={isLoadingMore}
                                            className="group relative px-10 py-4 bg-white dark:bg-slate-800 border-2 
                                                border-primary/20 rounded-xl hover:border-primary transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                                                overflow-hidden"
                                        >
                                            
                                            {/* Button Content */}
                                            <div className="relative flex items-center justify-center gap-3">
                                                {isLoadingMore ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                                        <span className="text-primary font-medium">Loading More Events...</span>
                                                    </>
                                                ) : (
                                                        <span className="text-primary font-medium">Load More Events</span>
                                                        
                                                )}
                                            </div>

                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                                transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000
                                                pointer-events-none" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <NoEventsFound
                                onViewAll={() => setSelectedCategory('ALL')}
                                onClearFilters={() => {
                                                    setSearchTerm('');
                                                    setLocation('');
                                                }}
                            />
                        )}
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default Events;