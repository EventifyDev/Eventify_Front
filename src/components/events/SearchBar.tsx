import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    location: string;
    onSearchChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onSearch: () => void;
}

export const SearchBar = ({
    searchTerm,
    location,
    onSearchChange,
    onLocationChange,
    onSearch
}: SearchBarProps) => (
    <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-transparent backdrop-blur-xl rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl">
                    <Search className="w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search for events..."
                        className="w-full bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    />
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-slate-200/50 dark:bg-slate-800 rounded-xl">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="Location"
                        className="w-40 bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    />
                </div>
            </div>
        </div>
    </div>
); 