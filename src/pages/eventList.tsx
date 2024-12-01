import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../types/event.type';
import { EventCard } from '../components/EventCard';
import { EventService } from '../services/event.service';
import { getProfile, selectAuth } from '../store/authSlice';
import { AppDispatch } from '../store/index';
import { Button } from '../components/Button';
import { Plus } from 'lucide-react';
import { Modal } from '../components/Modal';
import { CreateEventForm } from '../components/CreateEventForm';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../components/Pagination';

const EventList: React.FC = () => {
  // State Management
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  // Constants
  const eventsPerPage = 6;
  const eventService = new EventService();

  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (isAuthenticated && !user) {
        try {
          await dispatch(getProfile()).unwrap();
        } catch (error) {
          console.error('Failed to load profile:', error);
          toast.error('Failed to load user profile');
        }
      }
    };

    loadProfile();
  }, [isAuthenticated, dispatch, user]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const data = await eventService.getAllEvents(user._id);
        setEvents(data);
        setTotalEvents(data.length);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, eventService]);

  // Pagination calculations
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Event Handlers
  const handleEventDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsCreating(true);
    try {
      await eventService.createEvent(formData);
      setIsCreateModalOpen(false);
      if (user?._id) {
        const data = await eventService.getAllEvents(user._id);
        setEvents(data);
        setTotalEvents(data.length);
      }
      toast.success('Event created successfully!');
    } catch (error) {
      console.error('Failed to create event:', error);
      toast.error('Failed to create event');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Conditional Renders
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64 text-dark-DEFAULT font-semibold">
        Please login to view events
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-dark-DEFAULT">
        Loading...
      </div>
    );
  }

  // Main Render
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Toaster richColors />

      {/* Header Section */}
      <div className="relative mb-8">
        {/* Background Decoration */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>

        {/* Main Header Content */}
        <div className="relative flex justify-between items-center p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          {/* Title with Gradient */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Events
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your upcoming events
              </p>
            </div>
          </div>

          {/* Create Button with Animation */}
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="!w-auto bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl px-6 py-2.5 hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 duration-300 disabled:opacity-70 disabled:hover:shadow-none disabled:hover:scale-100"
            icon={false}
            disabled={isCreating}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-300 dark:border-slate-800">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onViewDetails={handleEventDetails}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-16 h-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 2v4M8 2v4M3 10h18"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-dark-DEFAULT dark:text-slate-200 mb-2">
              No Events Yet!
            </h3>
            <p className="text-gray-500 dark:text-slate-400 text-center max-w-md mb-6">
              Start your journey by creating your first event. It's quick and easy!
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="!w-auto bg-primary text-white hover:bg-primary/90 transition-all transform hover:scale-105"
              icon={false}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Event
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 mb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="flex justify-center"
          />
        </div>
      )}

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        title="Create New Event"
      >
        <CreateEventForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default EventList;