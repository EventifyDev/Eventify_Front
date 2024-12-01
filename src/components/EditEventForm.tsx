import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { Calendar, MapPin, Users, Image as ImageIcon } from 'lucide-react';
import { editEventValidationSchema } from '../validations/editEventValidation';
import { ErrorMessage } from './forms/ErrorMessage';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { EventType } from '../types/event.type';
import { Event } from '../types/event.type';

interface EditEventFormProps {
    event: Event;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({ event, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            name: event.name,
            description: event.description,
            date: new Date(event.date).toISOString().slice(0, 16),
            capacity: event.capacity.toString(),
            location: event.location,
            eventType: event.eventType,
            image: null as File | null,
            imagePreview: event.image || null,
        },
        validationSchema: editEventValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== null && key !== 'imagePreview') {
                        formData.append(key, value);
                    }
                });
                
                await onSubmit(formData);
                toast.success('Event updated successfully!');
            } catch (error) {
                toast.error('Failed to update event');
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
                    placeholder="Enter event name"
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
                    placeholder="Update your event description"
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
                        placeholder="Update event location"
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
                        placeholder="Update attendee capacity"
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
                                <div className={`p-4 rounded-full mb-4 ${
                                    formik.touched.image && formik.errors.image 
                                        ? 'bg-rose-500/10' 
                                        : 'bg-primary/10'
                                }`}>
                                    <ImageIcon className={`w-8 h-8 ${
                                        formik.touched.image && formik.errors.image 
                                            ? 'text-rose-500' 
                                            : 'text-primary'
                                    }`} />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                                    <span className={`font-semibold ${
                                        formik.touched.image && formik.errors.image 
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
                            <span>Updating Event...</span>
                        </div>
                    ) : (
                        <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                        >
                            <span>Update Event</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                    )}
                </Button>
            </div>
        </form>
    );
};