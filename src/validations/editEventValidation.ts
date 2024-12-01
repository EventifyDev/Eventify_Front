import * as yup from 'yup';
import { EventType } from '../types/event.type';

export const editEventValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Event name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must not exceed 100 characters'),
    
    description: yup
        .string()
        .required('Description is required')
        .min(20, 'Description must be at least 20 characters')
        .max(1000, 'Description must not exceed 1000 characters'),
    
    date: yup
        .date()
        .required('Date is required')
        .min(new Date(), 'Date must be in the future'),
    
    capacity: yup
        .number()
        .required('Capacity is required')
        .min(1, 'Minimum capacity is 1')
        .max(100000, 'Maximum capacity is 100,000'),
    
    location: yup
        .string()
        .required('Location is required'),
    
    eventType: yup
        .string()
        .oneOf(Object.values(EventType), 'Invalid event type')
        .required('Event type is required'),
    
    image: yup
        .mixed()
        .test('fileSize', 'File is too large', (value) => {
            if (!value) return true;
            return value.size <= 5000000; // 5MB
        })
        .test('fileType', 'Unsupported file type', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
});