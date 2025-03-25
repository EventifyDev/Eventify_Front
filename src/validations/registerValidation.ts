import * as yup from 'yup';

const messages = {
    username: {
        required: 'Username is required',
        min: 'Username must be at least 3 characters',
        max: 'Username must not exceed 20 characters',
        matches: 'Username can only contain letters, numbers and underscores'
    },
    email: {
        required: 'Email is required',
        invalid: 'Please enter a valid email address'
    },
    password: {
        required: 'Password is required',
        min: 'Password must be at least 8 characters',
        max: 'Password must not exceed 20 characters',
        matches: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }
};

export const registerValidationSchema = yup.object().shape({
    username: yup
        .string()
        .required(messages.username.required)
        .min(3, messages.username.min)
        .max(20, messages.username.max)
        .matches(/^[a-zA-Z0-9_]*$/, messages.username.matches),
    
    email: yup
        .string()
        .required(messages.email.required)
        .email(messages.email.invalid),
    
    password: yup
        .string()
        .required(messages.password.required)
        .min(8, messages.password.min)
        .max(20, messages.password.max)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            messages.password.matches
        )
});