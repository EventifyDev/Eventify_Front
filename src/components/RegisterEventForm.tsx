import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { participantValidationSchema } from '../validations/participantValidation';
import { Button } from './Button';
import { ErrorMessage } from './forms/ErrorMessage';
import { CreateParticipantDto } from '../types/participant.type';

interface RegisterEventFormProps {
    eventId: string;
    onSubmit: (formData: CreateParticipantDto) => Promise<void>;
    onCancel: () => void;
}

export const RegisterEventForm: React.FC<RegisterEventFormProps> = ({ 
    eventId, 
    onSubmit, 
    onCancel 
}) => {
    const formik = useFormik({
        initialValues: {
            eventId: eventId,
            username: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema: participantValidationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await onSubmit(values);
                toast.success('🎉 Registration successful!');
                resetForm();
            } catch (error) {
                toast.error('😔 Registration failed');
                console.error('Error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getInputClassName = (fieldName: keyof typeof formik.values) => `
        w-full px-4 py-3 rounded-xl border-2 
        ${formik.touched[fieldName] && formik.errors[fieldName]
            ? 'border-rose-300 dark:border-rose-500 focus:border-rose-500'
            : 'border-gray-200 dark:border-slate-700 focus:border-primary'
        }
        ${formik.touched[fieldName] && !formik.errors[fieldName] && 'border-green-500'}
        bg-transparent outline-none transition-all duration-200 
        hover:border-gray-300 dark:hover:border-slate-600
        pr-12
    `;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative group">
                <label htmlFor="username" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    Full Name
                </label>
                <input
                    type="text"
                    id="username"
                    {...formik.getFieldProps('username')}
                    className={getInputClassName('username')}
                    placeholder="John Doe"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <ErrorMessage message={formik.touched.username && formik.errors.username ? formik.errors.username : undefined} />
            </div>

            {/* Email Field */}
            <div className="relative group">
                <label htmlFor="email" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    className={getInputClassName('email')}
                    placeholder="john@example.com"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <ErrorMessage message={formik.touched.email && formik.errors.email ? formik.errors.email : undefined} />
            </div>

            {/* Phone Field */}
            <div className="relative group">
                <label htmlFor="phoneNumber" className="absolute left-3 -top-2.5 bg-white dark:bg-slate-900 px-2 text-xs font-medium text-primary transition-all duration-200">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    {...formik.getFieldProps('phoneNumber')}
                    className={getInputClassName('phoneNumber')}
                    placeholder="+1 (234) 567-8900"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <ErrorMessage message={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : undefined} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200 transform hover:scale-105"
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
                            <span>Registering...</span>
                        </div>
                    ) : (
                        <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                        >
                            <span>Register Now</span>
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