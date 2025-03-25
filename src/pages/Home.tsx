import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import RecentEventsSlider from '../components/home/RecentEventsSlider';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import FeaturedCategoriesSection from '../components/home/FeaturedCategoriesSection';
import CallToActionSection from '../components/home/CallToActionSection';

// Star Component
const Star = ({ size = 'small', color = '#4361EE', style = {} }) => {
    const sizeClasses = {
        tiny: 'w-1 h-1',
        small: 'w-2 h-2',
        medium: 'w-3 h-3'
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill={color}
            className={`${sizeClasses[size as keyof typeof sizeClasses]} opacity-40`}
            style={style}
        >
            <path d="M12 1l2.39 7.35h7.71l-6.24 4.53 2.38 7.34L12 16.69l-6.24 4.53 2.38-7.34-6.24-4.53h7.71z" />
        </svg>
    );
};

// Floating Stars Component
const FloatingStars = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-100">
            {[...Array(40)].map((_, i) => {
                const randomSize = ['tiny', 'small', 'medium'][Math.floor(Math.random() * 3)];
                const color = i % 2 === 0 ? '#4361EE' : '#EF1262';

                return (
                    <Star
                        key={i}
                        size={randomSize}
                        color={color}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                );
            })}
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <main className="relative overflow-hidden min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Background Gradients */}
            <div className="fixed inset-0 w-full h-full">
                {/* Primary Gradient Blob */}
                <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-primary/10 dark:bg-primary/30 rounded-full filter blur-[80px] animate-blob" />
                
                {/* Secondary Gradient Blob */}
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[500px] bg-blue-500/10 dark:bg-blue-500/30 rounded-full filter blur-[80px] animate-blob animation-delay-2000" />
                
                {/* Accent Gradient Blob */}
                <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[500px] bg-purple-500/10 dark:bg-purple-500/30 rounded-full filter blur-[80px] animate-blob animation-delay-4000" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/60 backdrop-blur-[1px]" />
            </div>

            <FloatingStars />

            {/* Noise Texture */}
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

            {/* Content Container */}
            <div className="container relative z-10 px-10 mx-auto py-20 max-w-[90rem]">
                <HeroSection />
                <FeaturedCategoriesSection />
                <ServicesSection />
                <RecentEventsSlider />
                <WhyChooseUs />
                <TestimonialsSection />
                <CallToActionSection />
                <NewsletterSection />
            </div>
        </main>
    );
};

export default HomePage;