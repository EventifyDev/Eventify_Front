import { api } from '../config/axios';
import { Event} from '../types/event.type';

export class EventService {
    async getAllEvents(user_id: string, page: number = 1, limit: number = 9): Promise<Event[]> {
        const response = await api.get(`/events/user/${user_id}?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getEventById(event_id: string): Promise<Event> {
        const response = await api.get(`/events/${event_id}`);
        return response.data;
    }

    async createEvent(formData: FormData): Promise<Event> {
        const response = await api.post('/events', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async updateEvent(id: string, formData: FormData): Promise<Event> {
        const response = await api.put(`/events/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async deleteEvent(event_id: string): Promise<void> {
        const response = await api.delete(`/events/${event_id}`);
        return response.data;
    }

    async searchEvents(query: string): Promise<Event[]> {
        const response = await api.get(`/events/search?query=${query}`);
        return response.data;
    }
}


