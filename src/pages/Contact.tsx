import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Loader2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const initialFormState: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
};

const contactInfo = [
    {
        icon: Phone,
        title: 'Call Us',
        details: ['+212 623 23 23 23', '+212 523 23 23 23'],
        color: 'bg-emerald-500'
    },
    {
        icon: Mail,
        title: 'Email Us',
        details: ['contact@eventify.ma', 'support@eventify.ma'],
        color: 'bg-blue-500'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        details: ['123 Tech Hub, Hassan', 'Rabat, Morocco'],
        color: 'bg-purple-500'
    },
    {
        icon: Clock,
        title: 'Working Hours',
        details: ['Monday - Friday: 9AM - 6PM', 'Weekend: 10AM - 4PM'],
        color: 'bg-amber-500'
    }
];

export const Contact = () => {
    const [formData, setFormData] = useState<ContactForm>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Message sent successfully!');
            setFormData(initialFormState);
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-70 dark:opacity-5"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_40%,rgba(67,97,238,0.05)_70%,rgba(239,18,98,0.05))]" />

                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>
            <div className="relative overflow-hidden">

                <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4361EE] to-[#EF1262]">
                                    Let's Talk!
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
                                Have questions about Eventify? We're here to help make your event planning journey smooth and successful.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full shadow-sm"
                                    >
                                        <info.icon className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {info.details[0]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-md">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 transform rotate-6 rounded-2xl" />
                                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                            Send us a Message
                                        </h2>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Your Name"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                                            placeholder="Subject"
                                        />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none resize-none"
                                            placeholder="Your message here..."
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex btn-gradient items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold hover:from-primary-dark hover:to-blue-700 focus:ring-2 focus:ring-primary/50 disabled:opacity-70 transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 transform -rotate-3 rounded-2xl" />
                        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                            <iframe
                                title="Eventify Office Location in Rabat"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.4314568391425!2d-6.8389!3d34.0204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c7!2sRabat!5e0!3m2!1sen!2sma!4v1635959562000!5m2!1sen!2sma"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 