export interface Participant {
    id: string;
    eventId: string;
    username: string;
    email: string;
    phoneNumber: string;
}

export interface CreateParticipantDto {
    eventId: string;
    username: string;
    email: string;
    phoneNumber: string;
}