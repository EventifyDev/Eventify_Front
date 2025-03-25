import { ChevronDown, Users, Calendar, MapPin, Shield, Star, Trophy, Heart, Globe } from 'lucide-react';
import { useState } from 'react';
import { GridPattern } from '../components/ui/GridPattern';

interface FaqItem {
    question: string;
    answer: string;
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface Statistic {
    value: string;
    label: string;
    icon: typeof Users;
    color: string;
}

const statistics: Statistic[] = [
    {
        value: '50K+',
        label: 'Active Users',
        icon: Users,
        color: 'from-purple-500 to-pink-500'
    },
    {
        value: '1000+',
        label: 'Events Hosted',
        icon: Calendar,
        color: 'from-blue-500 to-indigo-500'
    },
    {
        value: '95%',
        label: 'Satisfaction Rate',
        icon: Star,
        color: 'from-green-500 to-lime-500'
    },
    {
        value: '24/7',
        label: 'Support Available',
        icon: Heart,
        color: 'from-red-500 to-orange-500'
    }
];

const teamMembers: TeamMember[] = [
    {
        name: 'Sarah Johnson',
        role: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
        name: 'Michael Chen',
        role: 'Technical Lead',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
    },
    {
        name: 'Emma Davis',
        role: 'Design Director',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    },
    {
        name: 'David Wilson',
        role: 'Operations Manager',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
];

const faqItems: FaqItem[] = [
    {
        question: 'How do I create an event?',
        answer: 'Sign in as an organizer, click on "Create Event" button, fill in the event details including date, location, and ticket types. Your event will be live after review.'
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept payments via CMI (local cards) and PayPal for international transactions, ensuring secure and convenient payment processing.'
    },
    {
        question: 'Can I modify my ticket after purchase?',
        answer: 'Contact the event organizer directly for any ticket modifications. Changes are subject to the event\'s policy and availability.'
    },
    {
        question: 'How do refunds work?',
        answer: 'Refund policies vary by event. Check the specific event\'s refund policy during purchase. Generally, refunds are processed within 5-7 business days.'
    }
];

const features = [
    {
        icon: Users,
        title: 'User-Friendly Platform',
        description: 'Intuitive interface for seamless event management and ticket purchasing',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Calendar,
        title: 'Real-Time Updates',
        description: 'Instant notifications and live tracking of event statistics',
        color: 'from-blue-500 to-indigo-500'
    },
    {
        icon: MapPin,
        title: 'Location Services',
        description: 'Interactive maps and venue information for better event planning',
        color: 'from-green-500 to-lime-500'
    },
    {
        icon: Shield,
        title: 'Secure Payments',
        description: 'Protected transactions with multiple payment options',
        color: 'from-red-500 to-orange-500'
    }
];

export const About = () => {
    const [expandedIndex, setExpandedIndex] = useState<number>(-1);

    const toggleFaq = (index: number) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
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
                <GridPattern />
                
                <div className="relative max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold font-nunito bg-clip-text text-transparent bg-gradient-to-r from-[#4361EE] to-[#EF1262] mb-6">
                            Welcome to Eventify
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Your premier platform for seamless event management in Morocco. 
                            Create, manage, and attend events with ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                        {statistics.map((stat, index) => (
                            <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Our Mission
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Revolutionizing event management in Morocco by providing a comprehensive platform 
                                that connects organizers with attendees, making event creation and participation 
                                seamless and enjoyable.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`mb-4 p-3 rounded-lg bg-gradient-to-br ${feature.color} w-fit group-hover:bg-primary/20 transition-colors`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
                            Meet Our Team
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="group relative">
                                    <div className="aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((item, index) => (
                                <div 
                                    key={index}
                                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {item.question}
                                        </span>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-primary transition-transform duration-200 ${
                                                expandedIndex === index ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <div 
                                        className={`px-6 transition-all duration-200 ease-in-out ${
                                            expandedIndex === index ? 'pb-6 max-h-40' : 'max-h-0 overflow-hidden'
                                        }`}
                                    >
                                        <p className="text-slate-600 dark:text-slate-300">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 