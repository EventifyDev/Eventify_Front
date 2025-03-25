import React, { useState } from 'react';
import { Send, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 relative">
            
            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">

                        {/* Content Container */}
                        <div className="relative bg-white dark:bg-slate-800/80 rounded-2xl p-8 md:p-12">
                            <div className="absolute inset-0 rounded-2xl" />
                            
                            <div className="relative">
                                {/* Icon */}
                                <div className="flex justify-center mb-8">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 flex items-center justify-center">
                                        <Mail className="w-8 h-8 text-primary dark:text-blue-400" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                        <span className="bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text font-nunito font-bold text-transparent">
                                            Stay Updated
                                        </span>
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                                        Subscribe to our newsletter and never miss out on exciting events and special offers
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                    <div className="flex gap-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="flex-1 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 transition-all duration-300"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4361EE] to-[#EF1262] text-white font-semibold hover:opacity-90 focus:ring-2 focus:ring-primary/50 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-primary/25"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span>Subscribe</span>
                                                    <Send className="w-4 h-4" />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Additional Text */}
                                <p className="text-center mt-4 text-sm text-slate-500 dark:text-slate-400">
                                    Join 50,000+ subscribers. No spam, unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection; 