import React from 'react';
import { Calendar, Users, MapPin, Music, Camera, Coffee } from 'lucide-react';

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    darkColor: string;
}

const services: Service[] = [
    {
        icon: Calendar,
        title: 'Event Planning',
        description: 'Professional event planning and coordination services',
        color: 'from-blue-500/90 to-blue-600/90',
        darkColor: 'from-blue-400/90 to-blue-500/90'
    },
    {
        icon: Users,
        title: 'Venue Management',
        description: 'Find and book the perfect venue for your event',
        color: 'from-purple-500/90 to-purple-600/90',
        darkColor: 'from-purple-400/90 to-purple-500/90'
    },
    {
        icon: Music,
        title: 'Entertainment',
        description: 'Book top artists and entertainment services',
        color: 'from-pink-500/90 to-pink-600/90',
        darkColor: 'from-pink-400/90 to-pink-500/90'
    },
    {
        icon: Camera,
        title: 'Photography',
        description: 'Professional photography and videography services',
        color: 'from-emerald-500/90 to-emerald-600/90',
        darkColor: 'from-emerald-400/90 to-emerald-500/90'
    },
    {
        icon: Coffee,
        title: 'Catering',
        description: 'Delicious food and beverage catering services',
        color: 'from-amber-500/90 to-amber-600/90',
        darkColor: 'from-amber-400/90 to-amber-500/90'
    },
    {
        icon: MapPin,
        title: 'Location Services',
        description: 'Find the best locations for your events',
        color: 'from-red-500/90 to-red-600/90',
        darkColor: 'from-red-400/90 to-red-500/90'
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />
            
            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#4361EE] fo to-[#EF1262] bg-clip-text font-nunito text-transparent">
                            Our Services
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Discover our comprehensive range of event services designed to make your event extraordinary
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-6 bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-slate-200/50 dark:border-white/10 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative flex flex-col items-center text-center space-y-4">
                                <div 
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} dark:bg-gradient-to-r dark:${service.darkColor} p-3.5 text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                                >
                                    <service.icon className="w-full h-full" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection; 