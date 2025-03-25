import React from 'react';
import { Music2, Users2, Briefcase, GraduationCap, Heart, Ticket } from 'lucide-react';

const categories = [
    {
        name: 'Concerts',
        icon: Music2,
        color: 'from-purple-500/90 to-indigo-500/90',
        description: 'Live music events and performances'
    },
    {
        name: 'Social',
        icon: Users2,
        color: 'from-blue-500/90 to-cyan-500/90',
        description: 'Meetups and social gatherings'
    },
    {
        name: 'Business',
        icon: Briefcase,
        color: 'from-amber-500/90 to-orange-500/90',
        description: 'Conferences and networking events'
    },
    {
        name: 'Education',
        icon: GraduationCap,
        color: 'from-emerald-500/90 to-teal-500/90',
        description: 'Workshops and seminars'
    },
    {
        name: 'Charity',
        icon: Heart,
        color: 'from-pink-500/90 to-rose-500/90',
        description: 'Fundraisers and charity events'
    },
    {
        name: 'Entertainment',
        icon: Ticket,
        color: 'from-violet-500/90 to-purple-500/90',
        description: 'Shows and performances'
    }
];

const FeaturedCategoriesSection: React.FC = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text font-nunito text-transparent">
                            Explore Categories
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Discover events that match your interests. From concerts to workshops, find the perfect event for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="group relative p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 dark:border-white/10 hover:border-primary/30 transition-all duration-300 text-left w-full"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                            
                            <div className="relative flex flex-col items-center text-center space-y-4">
                                <div 
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-3.5 text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                                >
                                    <category.icon className="w-full h-full" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategoriesSection; 