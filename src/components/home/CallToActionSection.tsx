import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const CallToActionSection: React.FC = () => {
    return (
        <section className="py-24 relative">
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-transparent" />

            <div className="max-w-6xl mx-auto px-4 relative">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-lg">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Content Side */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-8">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-primary">Start Creating Today</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
                                Ready to Host Your
                                <span className="block mt-2 bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text text-transparent">
                                    Next Event?
                                </span>
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                Join thousands of event organizers who trust us to create memorable experiences.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="group bg-gradient-to-r from-[#4361EE] to-[#EF1262] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
                                    <Calendar className="w-5 h-5" />
                                    <span>Create Event</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-gray-200 hover:bg-primary/90 font-medium transition-colors">
                                    Learn More
                                </button>
                            </div>

                            <div className="mt-12 flex items-center gap-4 justify-center lg:justify-start text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span>1000+ Events Created</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span>500+ Active Organizers</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            Event Dashboard
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400">
                                            Easy to manage
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-3 rounded-full bg-white dark:bg-slate-600 overflow-hidden"
                                        >
                                            <div
                                                className="h-full bg-primary/20 dark:bg-primary/40"
                                                style={{ width: `${90 - i * 15}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection; 