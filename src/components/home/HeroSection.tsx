import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="group relative p-6 bg-white/80 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-slate-200/50 dark:border-white/10 hover:border-primary/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        <div className="relative flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary to-blue-600 p-3 text-white">
                <Icon className="w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
        </div>
    </div>
);

const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={heroRef}
            className="overflow-hidden pb-20 bg-transparent"
        >
            {/* Content */}
            <div className="relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-4">
                    {/* Top Content */}
                    <div className="space-y-8 mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-slate-200/50 dark:border-white/10">
                            <Sparkles className="w-4 h-4 text-primary dark:text-blue-400 mr-2" />
                            <span className="text-slate-800 dark:text-white/90 text-sm font-medium">
                                Discover Amazing Events
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl">
                            <span className="text-slate-900 dark:text-white font-nunito">Create</span>
                            <span className="bg-clip-text bg-gradient-to-r from-[#4361EE] to-[#EF1262] font-nunito text-transparent"> Unforgettable</span>
                            <span className="text-slate-900 dark:text-white block font-nunito mt-2">Moments Together</span>
                        </h1>

                        <p className="text-lg font-nunito text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                            Transform your events into extraordinary experiences with our modern event management platform
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/auth/register"
                                className="group relative px-8 py-3 bg-gradient-to-r from-[#4361EE] to-[#EF1262] rounded-xl text-white font-semibold overflow-hidden hover:shadow-lg hover:shadow-primary/25 transition-shadow"
                            >
                                <span className="relative z-10 flex items-center">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#4361EE] to-[#EF1262] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>

                            <Link
                                to="/events"
                                className="px-8 py-3 border-2 border-slate-300 dark:border-white/20 hover:border-primary dark:hover:border-primary rounded-xl text-slate-900 dark:text-white font-semibold transition-colors duration-300"
                            >
                                Explore Events
                            </Link>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                        <FeatureCard
                            icon={Calendar}
                            title="Event Planning"
                            description="Streamlined planning tools for seamless event organization"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Community"
                            description="Connect with like-minded people and grow your network"
                        />
                        <div className="hidden lg:block">
                            <FeatureCard
                                icon={Sparkles}
                                title="Amazing Experiences"
                                description="Create unforgettable moments with powerful features"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;