import React, { useEffect, useState, useCallback } from 'react';
import { Event } from '../../types/event.type';
import { EventService } from '../../services/event.service';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Calendar, Users, MapPin, Clock, Tag, AlertCircle, CheckCheck } from 'lucide-react';
import EventLoader from '../../components/EventLoader';
import { Modal } from '../../components/Modal';
import { format } from 'date-fns';

// Définir le type d'événement custom
declare global {
    interface WindowEventMap {
        'EVENT_UPDATED': CustomEvent;
    }
}

const ApproveEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const eventService = new EventService();

    const fetchPendingEvents = useCallback(async () => {
        try {
            const pendingEvents = await eventService.getPendingEvents();
            setEvents(pendingEvents);
        } catch (error: any) {
            if (error.response?.status === 404) {
                toast.info('No pending events available at the moment', {
                    duration: 3000,
                    className: "bg-slate-800 dark:bg-slate-900 text-white",
                    icon: <Calendar className="w-5 h-5 text-blue-500" />,
                    description: "Check back later for new event submissions"
                });
            } else {
                toast.error('Error loading pending events', {
                    duration: 3000,
                    className: "bg-slate-800 dark:bg-slate-900 text-white",
                    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
                    description: "Please try again later"
                });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPendingEvents();

        const interval = setInterval(() => {
            fetchPendingEvents();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchPendingEvents]);

    useEffect(() => {
        const handleEventUpdate = () => {
            fetchPendingEvents();
        };

        window.addEventListener('EVENT_UPDATED', handleEventUpdate);

        return () => {
            window.removeEventListener('EVENT_UPDATED', handleEventUpdate);
        };
    }, [fetchPendingEvents]);

    const handleApprove = async (event: Event) => {
        try {
            await eventService.approveEvent(event._id);
            toast.success('Event approved successfully');
            window.dispatchEvent(new CustomEvent('EVENT_UPDATED'));
        } catch (error) {
            toast.error('Failed to approve event');
        }
    };

    const handleReject = async () => {
        if (!selectedEvent || !rejectReason) return;

        try {
            await eventService.rejectEvent(selectedEvent._id, rejectReason);
            toast.success('Event rejected');
            setRejectModalOpen(false);
            setRejectReason('');
            setSelectedEvent(null);
            window.dispatchEvent(new CustomEvent('EVENT_UPDATED'));
        } catch (error) {
            toast.error('Failed to reject event');
        }
    };

    if (loading) return <EventLoader />;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="relative max-w-7xl mx-auto mb-12">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

                <div className="relative">
                    {/* Main Header Content */}
                    <div className="flex flex-col bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 flex-wrap md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                        <div className="flex-1">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <CheckCheck className="w-4 h-4 mr-2" />
                                Event Management
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                Event Approval{' '}
                                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    Dashboard
                                </span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
                                Review and manage pending event submissions. Ensure each event meets our community guidelines.
                            </p>
                        </div>

                        {/* Quick Stats Cards */}
                        <div className="flex gap-4 flex-wrap md:flex-nowrap">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 min-w-[160px]">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <AlertCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                            {events.length}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {events.length === 0 ? (
                        <div className="col-span-full">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center">
                                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-6">
                                    <Calendar className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    No Pending Events
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                    All events have been reviewed. Check back later for new submissions.
                                </p>
                            </div>
                        </div>
                    ) : (
                        events.map((event) => (
                            <div key={event._id}
                                className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700/50">
                                {/* Card Header - Image & Status */}
                                <div className="relative h-[180px] w-full overflow-hidden">
                                    <img
                                        src={event.image || 'default-event-image.jpg'}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Event Type Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-800/90 text-primary backdrop-blur-sm">
                                            <Tag className="w-3 h-3 inline-block mr-1" />
                                            {event.eventType}
                                        </span>
                                    </div>

                                    {/* Date Badge */}
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium">
                                            <Clock className="w-3 h-3 inline-block mr-1" />
                                            {format(new Date(event.date), 'MMM dd, yyyy')}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    {/* Title & Description */}
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
                                        {event.name}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-3">
                                        {event.description}
                                    </p>

                                    {/* Event Details */}
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                            <Users className="w-4 h-4 text-primary" />
                                            <span className="text-xs">{event.capacity} attendees</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span className="text-xs line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(event)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors duration-200"
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedEvent(event);
                                                setRejectModalOpen(true);
                                            }}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors duration-200"
                                        >
                                            <XCircle className="w-4 h-4 mr-1.5" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Reject Modal */}
            <Modal
                isOpen={rejectModalOpen}
                onClose={() => {
                    setRejectModalOpen(false);
                    setRejectReason('');
                    setSelectedEvent(null);
                }}
                title="Reject Event"
            >
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Are you sure you want to reject this event?
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Please provide a reason for rejection. This will be sent to the event organizer.
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Reason for rejection
                        </label>
                        <textarea
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800/50 resize-none"
                            rows={4}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Please provide a detailed reason for rejecting this event..."
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => {
                                setRejectModalOpen(false);
                                setRejectReason('');
                                setSelectedEvent(null);
                            }}
                            className="px-4 py-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReject}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                            disabled={!rejectReason.trim()}
                        >
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ApproveEvents;