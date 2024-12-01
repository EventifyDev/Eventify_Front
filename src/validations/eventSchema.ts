import * as yup from 'yup';
import { EventType } from '../types/event.type';

// Validation messages personnalisés
const messages = {
    required: '✨ This field is required',
    name: {
        min: '📝 Name must be at least 3 characters',
        max: '📝 Name must be less than 100 characters'
    },
    description: {
        min: '📖 Description must be at least 20 characters',
        max: '📖 Description too long (max 1000 characters)'
    },
    date: {
        future: '🗓️ Event must be in the future'
    },
    capacity: {
        min: '👥 Minimum capacity is 1',
        max: '👥 Maximum capacity is 100,000'
    },
    image: {
        size: '🖼️ Image must be less than 5MB',
        type: '🖼️ Only JPG, PNG and GIF are allowed'
    }
};

// Schéma de validation
export const eventValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required(messages.required)
        .min(3, messages.name.min)
        .max(100, messages.name.max),

    description: yup
        .string()
        .required(messages.required)
        .min(20, messages.description.min)
        .max(1000, messages.description.max),

    date: yup
        .date()
        .required(messages.required)
        .min(new Date(), messages.date.future),

    capacity: yup
        .number()
        .required(messages.required)
        .min(1, messages.capacity.min)
        .max(100000, messages.capacity.max),

    location: yup
        .string()
        .required(messages.required),

    eventType: yup
        .string()
        .oneOf(Object.values(EventType))
        .required(messages.required),

    image: yup
        .mixed()
        .required('🖼️ Event image is required')
        .test('fileSize', '🖼️ Image must be less than 5MB', (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', '🖼️ Only JPG, PNG and GIF are allowed', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
});