import { api } from '../config/axios';
import { Event, Ticket } from '../types/event.type';

export class EventService {
    async getAllEvents(page: number = 1, limit: number = 10): Promise<Event[]> {
        try {
            const response = await api.get(`/events?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getPendingEvents(): Promise<Event[]> {
        try {
            const response = await api.get('/events/admin/pending');
            return response.data;
        } catch (error) {
            console.error('Error fetching pending events:', error);
            throw error;
        }
    }

    async approveEvent(eventId: string): Promise<Event> {
        try {
            const response = await api.put(`/events/${eventId}/approve`);
            return response.data;
        } catch (error) {
            console.error('Error approving event:', error);
            throw error;
        }
    }

    async rejectEvent(eventId: string, reason: string): Promise<Event> {
        try {
            const response = await api.put(`/events/${eventId}/reject`, { reason });
            return response.data;
        } catch (error) {
            console.error('Error rejecting event:', error);
            throw error;
        }
    }

    async getOrganizerEvents(organizerId: string): Promise<Event[]> {
        try {
            const response = await api.get(`/events/organizer/${organizerId}`);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async getUserEvents(
        userId: string,
        page: number = 1,
        limit: number = 6
    ): Promise<{
        events: Event[];
        total: number;
        currentPage: number;
        totalPages: number;
    }> {
        const response = await api.get(`/events/user/${userId}?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getEventById(id: string): Promise<Event> {
        try {
            const response = await api.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createEvent(formData: FormData): Promise<Event> {
        try {
            const response = await api.post('/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async updateEvent(id: string, formData: FormData): Promise<Event> {
        try {
            const response = await api.put(`/events/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    async deleteEvent(event_id: string): Promise<void> {
        try {
            await api.delete(`/events/${event_id}`);
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }

    async searchEvents(query: string): Promise<Event[]> {
        try {
            const response = await api.get(`/events/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching events:', error);
            throw error;
        }
    }

    async getEventTickets(eventId: string): Promise<Ticket[]> {
        try {
            const response = await api.get(`/events/${eventId}/tickets`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async bookTicket(eventId: string, ticketId: string, quantity: number): Promise<void> {
        try {
            await api.post(`/events/${eventId}/tickets/${ticketId}/book`, { quantity });
        } catch (error) {
            throw error;
        }
    }
}
