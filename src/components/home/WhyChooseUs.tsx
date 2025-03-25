import React from 'react';
import { Shield, Clock, Users, Star } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Secure Platform',
        description: 'Your data and transactions are protected with the highest level of security',
        stat: '100%',
        statColor: 'text-purple-500',
        label: 'Secure',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Clock,
        title: 'Quick Booking',
        description: 'Book your tickets in seconds with our streamlined process',
        stat: '< 2min',
        statColor: 'text-green-500',
        label: 'Booking Time',
        color: 'from-green-500 to-lime-500'
    },
    {
        icon: Users,
        title: 'Large Community',
        description: 'Join thousands of event organizers and attendees',
        stat: '50K+',
        statColor: 'text-blue-500',
        label: 'Active Users',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Star,
        title: 'Top Rated',
        description: 'Consistently rated 5 stars by our users',
        stat: '4.9',
        statColor: 'text-amber-500',
        label: 'Average Rating',
        color: 'from-amber-500 to-orange-500'
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />
            
            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text font-nunito font-bold text-transparent">
                            Why Choose Eventify?
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        We provide the best platform for event management with features that make your experience seamless
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="mb-4">
                                    <div className={`text-3xl font-bold ${feature.statColor} mb-1`}>
                                        {feature.stat}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-300">
                                        {feature.label}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs; 