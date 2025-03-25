import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Event Organizer',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        content: 'Eventify has transformed how I manage events. The platform is intuitive, and the support team is always there when I need them.',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Corporate Client',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        content: 'The best event management platform I\'ve used. It streamlines everything from planning to execution. Highly recommended!',
        rating: 5
    },
    {
        id: 3,
        name: 'Emma Davis',
        role: 'Wedding Planner',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        content: 'Eventify makes wedding planning a breeze. The features are comprehensive and the interface is beautiful.',
        rating: 5
    }
];

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 relative">
            
            <div className="container mx-auto px-4 relative">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[#4361EE] to-[#EF1262] bg-clip-text font-nunito font-bold text-transparent">
                            What Our Users Say
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300">
                        Don't just take our word for it - hear from some of our amazing customers
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="w-full flex-shrink-0 px-4"
                                    >
                                        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                            <div className="relative">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                                                    />
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className="text-slate-600 dark:text-slate-300">
                                                            {testimonial.role}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-5 h-5 fill-current text-yellow-400"
                                                        />
                                                    ))}
                                                </div>
                                                <blockquote className="text-lg text-slate-600 dark:text-slate-300 italic">
                                                    "{testimonial.content}"
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={prevTestimonial}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-white/90 dark:hover:bg-slate-700/90 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg flex items-center justify-center text-slate-600 dark:text-white hover:bg-white/90 dark:hover:bg-slate-700/90 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-primary dark:bg-blue-400 w-6'
                                        : 'bg-slate-300/50 dark:bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 