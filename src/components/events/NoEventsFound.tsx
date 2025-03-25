import { FolderSearch } from 'lucide-react';
import { EventType } from '../../types/event.type';

interface NoEventsFoundProps {
    onViewAll: () => void;
    onClearFilters: () => void;
}

export const NoEventsFound = ({ onViewAll, onClearFilters }: NoEventsFoundProps) => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="relative w-full max-w-lg">
            <div className="relative">
                <div className="flex justify-center mb-8">
                    <div className="p-6 bg-primary/10 dark:bg-primary/20 rounded-2xl animate-bounce hover:scale-110 transition-transform duration-300">
                        <FolderSearch className="w-16 h-16 text-primary" />
                    </div>
                </div>

                <div className="text-center space-y-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#EF1262] to-[#4361EE] bg-clip-text text-transparent">
                        No Events Found
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        We couldn't find any events matching your criteria
                    </p>

                    <div className="pt-8">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Try adjusting your search:
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={onViewAll}
                                className="px-6 py-3 bg-gradient-to-r from-[#EF1262] to-[#4361EE] 
                                    text-white rounded-xl text-sm font-medium hover:shadow-lg 
                                    hover:shadow-primary/20 transition-all duration-300">
                                View All Events
                            </button>
                            <button
                                onClick={onClearFilters}
                                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl 
                                    text-slate-600 dark:text-slate-300 text-sm font-medium 
                                    hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>
        </div>
    </div>
); 