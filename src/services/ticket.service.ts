import { api } from '../config/axios';
import { AxiosResponse } from 'axios';

export interface Ticket {
  _id: string;
  eventId: string;
  type: string;
  price: number;
  quantity: number;
  soldQuantity: number;
  status: 'AVAILABLE' | 'SOLD' | 'CANCELLED';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicketDto {
  eventId: string;
  type: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface UpdateTicketDto {
  type?: string;
  price?: number;
  quantity?: number;
  description?: string;
}

export interface PurchaseTicketDto {
  ticketId: string;
  quantity?: number;
}

export class TicketService {
  private static instance: TicketService;
  private readonly baseUrl: string = '/tickets';

  private constructor() {}

  public static getInstance(): TicketService {
    if (!TicketService.instance) {
      TicketService.instance = new TicketService();
    }
    return TicketService.instance;
  }

  /**
   * Create a new ticket
   */
  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      const response: AxiosResponse<Ticket> = await api.post(
        this.baseUrl,
        createTicketDto
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all tickets for an event
   */
  async getTicketsByEventId(eventId: string): Promise<Ticket[]> {
    try {
      const response: AxiosResponse<Ticket[]> = await api.get(
        `${this.baseUrl}/event/${eventId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get available tickets for an event
   */
  async getAvailableTicketsForEvent(eventId: string): Promise<Ticket[]> {
    try {
      const response: AxiosResponse<Ticket[]> = await api.get(
        `${this.baseUrl}/event/${eventId}/available`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update a ticket
   */
  async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    try {
      const response: AxiosResponse<Ticket> = await api.put(
        `${this.baseUrl}/${id}`,
        updateTicketDto
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a ticket
   */
  async deleteTicket(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Purchase a ticket
   */
  async purchaseTicket(purchaseTicketDto: PurchaseTicketDto): Promise<Ticket> {
    try {
      const response: AxiosResponse<Ticket> = await api.post(
        `${this.baseUrl}/purchase`,
        purchaseTicketDto
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Error {
    if (error.response) {

      const message = error.response.data.message || 'An error occurred';
      const status = error.response.status;

      switch (status) {
        case 400:
          return new Error(`Bad Request: ${message}`);
        case 401:
          return new Error('Unauthorized: Please login to continue');
        case 403:
          return new Error('Forbidden: You do not have permission to perform this action');
        case 404:
          return new Error(`Not Found: ${message}`);
        default:
          return new Error(`Server Error: ${message}`);
      }
    } else if (error.request) {
      return new Error('Network Error: Unable to connect to the server');
    } else {
      return new Error('Error: ' + error.message);
    }
  }
} 