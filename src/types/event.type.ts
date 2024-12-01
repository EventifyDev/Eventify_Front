export enum EventType {
    SPORT = 'SPORT',
    CULTURAL = 'CULTURAL',
    PROFESSIONAL = 'PROFESSIONAL',
    SOCIAL = 'SOCIAL',
    OTHER = 'OTHER'
  }
  
  export interface Event {
    _id: string;
    organizer: {
      _id: string;
      username: string;
      email: string;
    };
    name: string;
    description: string;
    date: Date;
    capacity: number;
    location: string;
    eventType: EventType;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface EventFormData {
    name: string;
    description: string;
    date: string;
    capacity: string;
    location: string;
    eventType: EventType;
}

export interface PaginatedEvents {
  events: Event[];
  total: number;
}