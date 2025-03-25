import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Image as ImageIcon, Ticket, Plus, X, Tag, DollarSign } from 'lucide-react';
import * as Yup from 'yup';
import { EventType } from '../types/event.type';
import { Button } from './Button';
import { eventValidationSchema } from '../validations/eventSchema';
import { ErrorMessage } from './forms/ErrorMessage';

// Add TicketType enum
export enum TicketType {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
  VVIP = 'VVIP',
}

interface Ticket {
  type: TicketType;
  price: number;
  quantity: number;
  description?: string;
}

interface CreateEventFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

const ticketValidationSchema = Yup.object({
    type: Yup.string()
        .oneOf(Object.values(TicketType), 'Please select a valid ticket type')
        .required('Ticket type is required'),
    price: Yup.number()
        .required('Price is required')
        .min(0, 'Price must be greater than or equal to 0'),
    quantity: Yup.number()
        .required('Quantity is required')
        .min(1, 'Quantity must be at least 1'),
    description: Yup.string()
});

// Ticket Type Icons
const ticketTypeIcons = {
    [TicketType.STANDARD]: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9V7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7V9C20.8954 9 20 9.89543 20 11C20 12.1046 20.8954 13 22 13V15C22 15.5523 21.5523 16 21 16H3C2.44772 16 2 15.5523 2 15V13C3.10457 13 4 12.1046 4 11C4 9.89543 3.10457 9 2 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    [TicketType.VIP]: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15L8.5 12L12 9M15.5 12L12 15M12 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    [TicketType.VVIP]: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
};

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit, onCancel }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [showTicketForm, setShowTicketForm] = useState(false);

    const ticketFormik = useFormik({
        initialValues: {
            type: TicketType.STANDARD,
            price: '',
            quantity: '',
            description: '',
        },
        validationSchema: ticketValidationSchema,
        onSubmit: (values, { resetForm }) => {
            setTickets([...tickets, {
                type: values.type,
                price: Number(values.price),
                quantity: Number(values.quantity),
                description: values.description,
            }]);
            setShowTicketForm(false);
            resetForm();
        },
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            date: '',
            capacity: '',
            location: '',
            eventType: EventType.OTHER,
            image: null as File | null,
            imagePreview: null as string | null,
        },
        validationSchema: eventValidationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== null && key !== 'imagePreview') {
                        formData.append(key, value);
                    }
                });

                tickets.forEach((ticket, index) => {
                    formData.append(`tickets[${index}][type]`, ticket.type);
                    formData.append(`tickets[${index}][price]`, ticket.price.toString());
                    formData.append(`tickets[${index}][quantity]`, ticket.quantity.toString());
                });

                await onSubmit(formData);
                window.dispatchEvent(new CustomEvent('EVENT_UPDATED'));
                toast.success('Event created successfully!');
                resetForm();
                setTickets([]);
            } catch (error) {
                toast.error('Failed to create event');
                console.error('Error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            formik.setFieldValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('imagePreview', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Helper pour les classes des inputs
    const getInputClassName = (fieldName: keyof typeof formik.values) => `
        w-full px-4 py-3 rounded-xl border-2 
        ${formik.touched[fieldName] && formik.errors[fieldName]
            ? 'border-rose-300 dark:border-rose-500 focus:border-rose-500'
            : 'border-gray-200 dark:border-slate-700 focus:border-primary'
        }
        ${formik.touched[fieldName] && !formik.errors[fieldName] && 'border-green-500'}
        bg-transparent outline-none transition-all duration-200 
        hover:border-gray-300 dark:hover:border-slate-600
    `;

    const removeTicket = (index: number) => {
        setTickets(tickets.filter((_, i) => i !== index));
    };

    const getTicketTypeDetails = (type: TicketType) => {
        switch (type) {
            case TicketType.STANDARD:
                return {
                    color: 'from-blue-500 to-blue-600',
                    lightColor: 'bg-blue-500/10',
                    textColor: 'text-blue-500',
                    borderColor: 'border-blue-500',
                    icon: ticketTypeIcons[TicketType.STANDARD],
                    description: 'Basic access to the event'
                };
            case TicketType.VIP:
                return {
                    color: 'from-purple-500 to-purple-600',
                    lightColor: 'bg-purple-500/10',
                    textColor: 'text-purple-500',
                    borderColor: 'border-purple-500',
                    icon: ticketTypeIcons[TicketType.VIP],
                    description: 'Premium access with additional benefits'
                };
            case TicketType.VVIP:
                return {
                    color: 'from-amber-500 to-amber-600',
                    lightColor: 'bg-amber-500/10',
                    textColor: 'text-amber-500',
                    borderColor: 'border-amber-500',
                    icon: ticketTypeIcons[TicketType.VVIP],
                    description: 'Exclusive access with VIP treatment'
                };
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div className="relative group">
                <label htmlFor="name" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    Event Name
                </label>
                <input
                    type="text"
                    id="name"
                    {...formik.getFieldProps('name')}
                    className={getInputClassName('name')}
                    placeholder="Enter a catchy name for your event"
                />
                <ErrorMessage message={formik.touched.name && formik.errors.name ? formik.errors.name : undefined} />
            </div>

            {/* Description */}
            <div className="relative group">
                <label htmlFor="description" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    Description
                </label>
                <textarea
                    id="description"
                    {...formik.getFieldProps('description')}
                    rows={4}
                    className={getInputClassName('description')}
                    placeholder="Tell people what your event is about..."
                />
                <ErrorMessage message={formik.touched.description && formik.errors.description ? formik.errors.description : undefined} />
            </div>

            {/* Date and Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date and Time */}
                <div className="relative group">
                    <label htmlFor="date" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date & Time
                        </div>
                    </label>
                    <input
                        type="datetime-local"
                        id="date"
                        {...formik.getFieldProps('date')}
                        className={getInputClassName('date')}
                    />
                    <ErrorMessage message={formik.touched.date && formik.errors.date ? formik.errors.date : undefined} />
                </div>

                {/* Location */}
                <div className="relative group">
                    <label htmlFor="location" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location
                        </div>
                    </label>
                    <input
                        type="text"
                        id="location"
                        {...formik.getFieldProps('location')}
                        className={getInputClassName('location')}
                        placeholder="Where is your event happening?"
                    />
                    <ErrorMessage message={formik.touched.location && formik.errors.location ? formik.errors.location : undefined} />
                </div>
            </div>

            {/* Capacity and Event Type Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Capacity */}
                <div className="relative group">
                    <label htmlFor="capacity" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Capacity
                        </div>
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        {...formik.getFieldProps('capacity')}
                        className={getInputClassName('capacity')}
                        placeholder="How many people can attend?"
                        min="1"
                    />
                    <ErrorMessage message={formik.touched.capacity && formik.errors.capacity ? formik.errors.capacity : undefined} />
                </div>

                {/* Event Type */}
                <div className="relative group">
                    <label htmlFor="eventType" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                        Event Type
                    </label>
                    <select
                        id="eventType"
                        {...formik.getFieldProps('eventType')}
                        className={getInputClassName('eventType')}
                    >
                        {Object.values(EventType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <ErrorMessage message={formik.touched.eventType && formik.errors.eventType ? formik.errors.eventType : undefined} />
                </div>
            </div>

            {/* Image Upload */}
            <div className="relative group">
                <label htmlFor="image" className="absolute left-3 -top-2.5 z-10 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Event Image
                    </div>
                </label>
                <div className="mt-2">
                    <label
                        htmlFor="image"
                        className={`
                            relative flex flex-col items-center justify-center w-full h-64 rounded-xl cursor-pointer 
                            border-2 border-dashed transition-all duration-200
                            ${formik.touched.image && formik.errors.image
                                ? 'border-rose-300 dark:border-rose-500'
                                : formik.touched.image && !formik.errors.image
                                    ? 'border-green-500'
                                    : 'border-gray-300 dark:border-slate-700'
                            }
                            ${!formik.values.image && 'hover:border-gray-400 dark:hover:border-slate-600'}
                        `}
                    >
                        {formik.values.imagePreview ? (
                            <div className="relative w-full h-full group">
                                <img
                                    src={formik.values.imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-xl">
                                    <div className="text-white text-center">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                                        <p className="text-sm">Click to change image</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 px-4">
                                <div className={`p-4 rounded-full mb-4 ${formik.touched.image && formik.errors.image
                                        ? 'bg-rose-500/10'
                                        : 'bg-primary/10'
                                    }`}>
                                    <ImageIcon className={`w-8 h-8 ${formik.touched.image && formik.errors.image
                                            ? 'text-rose-500'
                                            : 'text-primary'
                                        }`} />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                                    <span className={`font-semibold ${formik.touched.image && formik.errors.image
                                            ? 'text-rose-500'
                                            : 'text-primary'
                                        }`}>
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    PNG, JPG or GIF (MAX. 5MB)
                                </p>
                            </div>
                        )}
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            className="hidden"
                        />
                    </label>
                    <ErrorMessage message={formik.touched.image && formik.errors.image ? formik.errors.image : undefined} />
                </div>
            </div>

            {/* Tickets Section */}
            <div className="relative group">
                <label className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4" />
                        Event Tickets
                    </div>
                </label>
                <div className="border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                    {/* Ticket Type Selection */}
                    {!showTicketForm && tickets.length === 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {Object.values(TicketType).map((type) => {
                                const details = getTicketTypeDetails(type);
                                return (
                                    <motion.button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            ticketFormik.setFieldValue('type', type);
                                            setShowTicketForm(true);
                                        }}
                                        className={`
                                            relative group overflow-hidden rounded-xl p-6
                                            border-2 border-transparent hover:border-primary
                                            bg-white dark:bg-slate-800 hover:shadow-xl
                                            transition-all duration-300
                                        `}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${details.color}`} />
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 rounded-full ${details.lightColor} p-3 mb-4`}>
                                                {details.icon(`${details.textColor} w-full h-full`)}
                                            </div>
                                            <h3 className={`text-lg font-semibold mb-2 ${details.textColor}`}>
                                                {type}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {details.description}
                                            </p>
                                        </div>
                                        <div className={`
                                            absolute inset-0 border-2 border-dashed rounded-xl
                                            opacity-0 group-hover:opacity-100
                                            ${details.borderColor} transition-opacity duration-300
                                        `} />
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}

                    {/* Existing Tickets Display */}
                    {tickets.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {tickets.map((ticket, index) => {
                                const details = getTicketTypeDetails(ticket.type);
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`
                                            relative group rounded-xl p-4 
                                            bg-gradient-to-br ${details.color}
                                            shadow-lg hover:shadow-xl transition-all duration-300
                                        `}
                                    >
                                        <div className="absolute inset-0 bg-white dark:bg-slate-800 opacity-95 rounded-xl" />
                                        <div className="relative z-10">
                                            <button
                                                type="button"
                                                onClick={() => removeTicket(index)}
                                                className="absolute -top-2 -right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-rose-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`w-8 h-8 rounded-full ${details.lightColor} p-2`}>
                                                    {details.icon(`${details.textColor} w-full h-full`)}
                                                </div>
                                                <span className={`font-semibold ${details.textColor}`}>
                                                    {ticket.type}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                        <DollarSign className="w-4 h-4" />
                                                        <span className="text-xs font-medium">{ticket.price} MAD</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                        <Tag className="w-4 h-4" />
                                                        <span className="text-xs">{ticket.quantity} tickets</span>
                                                    </div>
                                                </div>
                                                {ticket.description && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                        {ticket.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    {/* Add Ticket Button or Form */}
                    {!showTicketForm && tickets.length > 0 && (
                        <Button
                            type="button"
                            onClick={() => setShowTicketForm(true)}
                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary transition-all duration-200"
                            icon={false}
                        >
                            <Plus className="w-5 h-5" />
                            Add Another Ticket Type
                        </Button>
                    )}

                    {/* Ticket Form */}
                    {showTicketForm && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
                            >
                                <form onSubmit={ticketFormik.handleSubmit} className="space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add New Ticket</h3>
                                        <button
                                            type="button"
                                            onClick={() => setShowTicketForm(false)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        </button>
                                    </div>

                                    {/* Ticket Type Selection */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Select Ticket Type
                                        </label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {Object.values(TicketType).map((type) => {
                                                const details = getTicketTypeDetails(type);
                                                const isSelected = ticketFormik.values.type === type;
                                                return (
                                                    <motion.button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => ticketFormik.setFieldValue('type', type)}
                                                        className={`
                                                            relative p-4 rounded-2xl border-2
                                                            ${isSelected 
                                                                ? `border-primary bg-primary/5 dark:bg-primary/10` 
                                                                : 'border-gray-200 dark:border-slate-700 hover:border-primary/50'
                                                            }
                                                            transition-all duration-200
                                                        `}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="flex flex-col items-center">
                                                            <div className={`
                                                                w-8 h-8 mb-2
                                                                ${isSelected ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}
                                                            `}>
                                                                {details.icon("w-full h-full")}
                                                            </div>
                                                            <span className={`
                                                                text-sm font-medium
                                                                ${isSelected 
                                                                    ? 'text-primary'
                                                                    : 'text-gray-600 dark:text-gray-400'
                                                                }
                                                            `}>
                                                                {type}
                                                            </span>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Price (MAD)
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                                                    <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input
                                                    type="number"
                                                    {...ticketFormik.getFieldProps('price')}
                                                    className={`
                                                        w-full pl-10 pr-4 py-3 rounded-xl border-2
                                                        ${ticketFormik.touched.price && ticketFormik.errors.price
                                                            ? 'border-rose-300 dark:border-rose-500 focus:border-rose-500'
                                                            : 'border-gray-200 dark:border-slate-700 focus:border-primary'
                                                        }
                                                        bg-white dark:bg-slate-800 
                                                        transition-all duration-200 outline-none
                                                    `}
                                                    min="0"
                                                    placeholder="Enter ticket price"
                                                />
                                                {ticketFormik.touched.price && ticketFormik.errors.price && (
                                                    <div className="mt-1 text-xs text-rose-500">
                                                        {ticketFormik.errors.price}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Quantity Available
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                                                    <Tag className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input
                                                    type="number"
                                                    {...ticketFormik.getFieldProps('quantity')}
                                                    className={`
                                                        w-full pl-10 pr-4 py-3 rounded-xl border-2
                                                        ${ticketFormik.touched.quantity && ticketFormik.errors.quantity
                                                            ? 'border-rose-300 dark:border-rose-500 focus:border-rose-500'
                                                            : 'border-gray-200 dark:border-slate-700 focus:border-primary'
                                                        }
                                                        bg-white dark:bg-slate-800 
                                                        transition-all duration-200 outline-none
                                                    `}
                                                    min="1"
                                                    placeholder="Number of tickets"
                                                />
                                                {ticketFormik.touched.quantity && ticketFormik.errors.quantity && (
                                                    <div className="mt-1 text-xs text-rose-500">
                                                        {ticketFormik.errors.quantity}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            onClick={() => setShowTicketForm(false)}
                                            className="px-6 py-2.5 text-sm rounded-xl border-2 border-gray-200 dark:border-slate-700 
                                                     text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700
                                                     transition-all duration-200"
                                            icon={false}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                ticketFormik.handleSubmit();
                                            }}
                                            className={`
                                                px-6 py-2.5 text-sm rounded-xl
                                                ${!ticketFormik.isValid || !ticketFormik.dirty
                                                    ? 'bg-gray-300 dark:bg-slate-700 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
                                                }
                                                text-white transition-all duration-200
                                                transform hover:scale-105 hover:shadow-lg
                                            `}
                                            icon={false}
                                            disabled={!ticketFormik.isValid || !ticketFormik.dirty}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Ticket className="w-4 h-4" />
                                                Add Ticket
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200 transform hover:scale-105"
                    icon={false}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    icon={false}
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {formik.isSubmitting ? (
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </motion.div>
                            <span>Creating Event...</span>
                        </div>
                    ) : (
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                        >
                            <span>Create Event</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.div>
                    )}
                </Button>
            </div>
        </form>
    );
};