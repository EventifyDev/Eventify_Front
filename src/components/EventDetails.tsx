import React from 'react';
import { Calendar, MapPin, Users, Clock, Share2, BookmarkPlus, ArrowLeft } from 'lucide-react';
import { Event } from '../types/event.type';
import { formatDate } from '../utils/DateUtils';
import { Button } from './Button';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  return (
    <div className=" mx-auto px-4 py-8">
      {/* Back Button */}
      {/* <button
        onClick={onBack}
        className="flex items-center text-primary hover:text-primary-light mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Back to Events</span>
      </button> */}

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block px-4 py-2 bg-primary/80 text-white rounded-full text-sm font-semibold mb-4">
            {event.eventType}
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">{event.name}</h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-dark dark:text-slate-50 mb-4">About Event</h2>
            <p className="text-dark/80 dark:text-slate-500 leading-relaxed mb-6">
              {event.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <EventInfoCard
                icon={<Calendar className="w-5 h-5 text-primary" />}
                label="Date"
                value={formatDate(new Date(event.date))}
              />
              <EventInfoCard
                icon={<MapPin className="w-5 h-5 text-primary" />}
                label="Location"
                value={event.location}
              />
              <EventInfoCard
                icon={<Users className="w-5 h-5 text-primary" />}
                label="Capacity"
                value={`${event.capacity} attendees`}
              />
              <EventInfoCard
                icon={<Clock className="w-5 h-5 text-primary" />}
                label="Duration"
                value="2 hours"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-sm sticky top-4">
            <Button className="mb-4">
              Register Now
            </Button>
            <Button icon={false} className="mb-6">
              <BookmarkPlus className="w-5 h-5 mr-2" />
              Save for Later
            </Button>
            
            <div className="border-t border-gray-100 pt-6">
              <button className="w-full flex items-center justify-center text-dark hover:text-primary transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                <span className="font-medium">Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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