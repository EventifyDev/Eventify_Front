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
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }