import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, TrashIcon, PencilIcon, UsersIcon, AlertCircle, ChevronRightIcon } from 'lucide-react';
import { Event } from '../types/event.type';
import { formatDate } from '../utils/DateUtils';
import { Button } from '../components/Button';
import { EventService } from '../services/event.service';
import { Toaster, toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { EditEventForm } from '../components/EditEventForm';
import { Modal } from '../components/Modal';
import { CreateParticipantDto } from '../types/participant.type';
import { ParticipantService } from '../services/participant.service';
import { RegisterEventForm } from '../components/RegisterEventForm';
import { ConfirmationModal } from '../components/ConfirmationModal';

const EventDetails: React.FC = () => {
  const eventService = new EventService();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const { event_id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const participantService = new ParticipantService();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!event_id) {
        navigate('/events');
        return;
      }

      try {
        const eventData = await eventService.getEventById(event_id);
        console.log("Event Data Received:", eventData);
        if (eventData) {
          setEvent(eventData);
        } else {
          toast.error('Event not found');
          navigate('/events');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Failed to load event');
        navigate('/events');
      }
    };

    fetchEvent();
  }, [event_id, navigate]);

  const fetchParticipantCount = async () => {
    if (!event?._id) return;
    try {
      const count = await participantService.getParticipantCount(event._id);
      setParticipantCount(count);
    } catch (error) {
      console.error('Error fetching participant count:', error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (event?._id) {
      fetchParticipantCount();
    }
  }, [event?._id]);

  const handleConfirmDelete = async () => {
    if (!event) return;

    setIsDeleting(true);
    try {
      await eventService.deleteEvent(event._id);
      toast.success('Event deleted successfully!');
      setIsDeleted(true);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      navigate('/events');
    }
  }, [isDeleted, navigate]);

  const handleEdit = async (formData: FormData) => {
    if (!event?._id) return;

    try {
      await eventService.updateEvent(event._id, formData);
      toast.success('Event updated successfully!');
      setIsEditModalOpen(false);
      const updatedEvent = await eventService.getEventById(event._id);
      setEvent(updatedEvent);

    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  const handleRegister = async (formData: CreateParticipantDto) => {
    try {
      if (!event || participantCount >= event.capacity) {
        toast.error('Sorry, this event is full');
        return;
      }

      await participantService.register(formData);
      toast.success('Registration successful!');
      setIsRegisterModalOpen(false);

      await fetchParticipantCount();
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register for event');
    }
  };

  if (!event) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <Toaster richColors />

      {/* Hero Section */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6 group">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70  to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent " />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 py-4">
          {/* Event Type Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 bg-primary text-white rounded-full text-sm font-semibold shadow-lg transform transition-transform hover:scale-105">
              <svg className="w-3 h-3 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
              </svg>
              {event.eventType}
            </span>
          </div>

          {/* Event Title */}
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {event.name}
            </h1>
          </div>
        </div>

        {/* Optional: Decorative Corner Accents */}
        <div className="absolute top-8 left-8">
          <div className="w-20 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-20 bg-white/30 rounded-full mt-[-1px] ml-[-1px]"></div>
        </div>
        <div className="absolute bottom-8 right-8">
          <div className="w-20 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-20 bg-white/30 rounded-full mt-[-1px] ml-[19px]"></div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
            {/* Section Header */}
            <div className="flex items-center mb-6">
              <div className="mr-4 p-3 bg-primary/10 rounded-xl">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  About Event
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  All the essential details about this event
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4">
                    <Calendar className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                    Date
                  </p>
                  <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                    {event.date ? formatDate(event.date) : 'Date non disponible'}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl mb-4">
                    <MapPin className="w-6 h-6 text-green-500 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                    Location
                  </p>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-4">
                    <Users className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                    Capacity
                  </p>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    {event.capacity} attendees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-slate-100/50 dark:border-slate-700/50 sticky top-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
            {/* Event Status Badge */}
            <div className="flex justify-between items-center mb-6">
              {participantCount >= event.capacity ? (
                <span className="px-4 py-2 bg-red-100/80 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-full animate-pulse">
                  Event Full
                </span>
              ) : (
                <span className="px-4 py-2 bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full">
                  Active Event
                </span>
              )}
            </div>

            {/* Registration Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Registration Progress
                </span>
                <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {participantCount}/{event.capacity}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full btn-gradient rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min((participantCount / event.capacity) * 100, 100)}%`
                  }}
                />
              </div>
              {participantCount >= event.capacity && (
                <p className="text-xs text-red-500 mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  No spots remaining
                </p>
              )}
            </div>

            {/* Main Action Button */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              disabled={participantCount >= event.capacity}
              className="w-full mb-8 px-6 py-3 btn-gradient text-white rounded-xl font-medium 
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center gap-2 group"
            >
              <UsersIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {participantCount >= event.capacity ? 'Event Full' : 'Add Participant'}
            </button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="group flex flex-col items-center p-4 bg-slate-50/50 dark:bg-slate-800/30 
                rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300
                border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="p-3 bg-blue-100/80 dark:bg-blue-900/50 rounded-xl mb-2 
                group-hover:bg-blue-200 dark:group-hover:bg-blue-900/70 transition-colors duration-300">
                  <PencilIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Edit Event</span>
              </button>

              <button
                onClick={handleDeleteClick}
                className="group flex flex-col items-center p-4 bg-slate-50/50 dark:bg-slate-800/30 
                 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300
                 border border-slate-100 dark:border-slate-700/50 hover:border-red-200 dark:hover:border-red-800"
              >
                <div className="p-3 bg-red-100/80 dark:bg-red-900/50 rounded-xl mb-2 
                  group-hover:bg-red-200 dark:group-hover:bg-red-900/70 transition-colors duration-300">
                  <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Delete Event</span>
              </button>
            </div>

            {/* View Participants Button */}
            <button
              onClick={() => navigate(`/events/${event._id}/participants`)}
              className="w-full group hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-2xl p-4 transition-all duration-300
              border border-slate-100 dark:border-slate-700/50 hover:border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <UsersIcon className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      View Participants
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {participantCount} people attending
                    </span>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Event Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Event"
      >
        {event && (
          <EditEventForm
            event={event}
            onSubmit={handleEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Ajouter le Modal d'inscription */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Register for Event"
      >
        <RegisterEventForm
          eventId={event._id}
          onSubmit={handleRegister}
          onCancel={() => setIsRegisterModalOpen(false)}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

interface EventInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const EventInfoCard: React.FC<EventInfoCardProps> = ({ icon, label, value }) => (
  <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
    <div className="flex items-center mb-2">
      {icon}
      <span className="text-sm font-medium text-dark/60 dark:text-slate-500 ml-2">{label}</span>
    </div>
    <p className="text-dark dark:text-slate-500 font-semibold">{value}</p>
  </div>
);

export default EventDetails;