import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/;

export const participantValidationSchema = yup.object().shape({
    username: yup
        .string()
        .required('👤 Full name is required')
        .min(2, '👤 Name must be at least 2 characters')
        .max(50, '👤 Name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]*$/, '👤 Name can only contain letters and spaces'),
    
    email: yup
        .string()
        .required('📧 Email is required')
        .email('📧 Please enter a valid email address'),
    
    phoneNumber: yup
        .string()
        .required('📱 Phone number is required')
        .matches(phoneRegExp, '📱 Please enter a valid phone number'),
    
    eventId: yup
        .string()
        .required()
});