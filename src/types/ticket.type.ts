export enum TicketType {
    STANDARD = 'STANDARD',
    VVIP = 'VVIP',
    VIP = 'VIP',
}

export interface Ticket {
    _id: string;
    type: TicketType;
    price: number;
    quantity: number;
    description: string;
    event: string;
    status: string;
}

// This is the type used in the EventDetails component
export type EventTicket = {
    _id: string;
    type: string;
    price: number;
    quantity: number;
    description: string;
} 