import { api } from '../config/axios';
import { Participant, CreateParticipantDto   } from '../types/participant.type';

export class ParticipantService {
    async register(participantData: CreateParticipantDto): Promise<Participant> {
        const response = await api.post('/participants/register', participantData);
        return response.data;
    }

    async update(id: string, participantData: CreateParticipantDto): Promise<Participant> {
        const response = await api.put(`/participants/${id}`, participantData);
        return response.data;
    }

    async getEventParticipants(eventId: string): Promise<Participant[]> {
        const response = await api.get(`/participants/event/${eventId}`);
        return response.data;
    }

    async cancelParticipation(id: string): Promise<boolean> {
        const response = await api.delete(`/participants/${id}`);
        return response.data;
    }

    async getParticipantCount(eventId: string): Promise<number> {
        const response = await api.get(`/participants/count?eventId=${eventId}`);
        return response.data;
    }
}