import { User } from './user.type';

export enum EventType {
  MUSIC = 'MUSIC',
  CULTURAL = 'CULTURAL',
  EDUCATION = 'EDUCATION',
  SOCIAL = 'SOCIAL',
  SPORT = 'SPORT',
  CINEMA = 'CINEMA',
  TRAVEL = 'TRAVEL',
  RETRO = 'RETRO',
  KIDS = 'KIDS',
  SHOPPING = 'SHOPPING',
  OTHER = 'OTHER',
  PROFESSIONAL = 'PROFESSIONAL'
}

export interface Ticket {
  _id: string;
  type: string;
  price: number;
  quantity: number;
  soldQuantity?: number;
  status: 'AVAILABLE' | 'SOLD_OUT' | 'UNAVAILABLE';
  event: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}
  
export interface Event {
  _id: string;
  organizer: User | null;
  name: string;
  description: string;
  date: string;
  capacity: number;
  location: string;
  eventType: EventType;
  price?: number;
  image: string;
  isApproved: boolean;
  isRejected?: boolean;
  rejectionReason?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
  tickets?: Ticket[];

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