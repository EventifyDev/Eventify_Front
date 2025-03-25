import { EventType } from './event.type';

export interface CartEventInfo {
    _id: string;
    title: string;
    imageUrl: string;
    date: string;
    location: string;
}

export interface CartItem {
    id: string;
    event: CartEventInfo;
    ticketId: string;
    ticketType: string;
    quantity: number;
    price: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
} 