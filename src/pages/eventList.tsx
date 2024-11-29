import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../types/event.type';
import { EventCard } from '../components/EventCard';
import { EventService } from '../services/event.service';
import { getProfile, selectAuth } from '../store/authSlice';
import { AppDispatch } from '../store/index';
import { EventDetails } from '../components/EventDetails';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const eventService = new EventService();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(selectAuth);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (isAuthenticated && !user) {
        try {
          await dispatch(getProfile()).unwrap();
        } catch (error) {
          console.error('Failed to load profile:', error);
        }
      }
    };

    loadProfile();
  }, [isAuthenticated, dispatch, user]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const data = await eventService.getAllEvents(user._id);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, eventService]);

  const handelEventDetails = (eventId: string) => {
    const eventDetails = events.find((e) => e._id === eventId);
    if (eventDetails) {
      setSelectedEvent(eventDetails);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

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

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onViewDetails={handelEventDetails}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-dark-DEFAULT">
            No events found
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;