import { EventType } from '../../types/event.type';
import { Calendar, Music, Theater, GraduationCap, Users, Trophy, Clapperboard, Plane, Disc, Baby, ShoppingBag } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Category {
    id: EventType | 'ALL';
    label: string;
    icon: LucideIcon;
    color: string;
}

interface CategoryFilterProps {
    selectedCategory: EventType | 'ALL';
    onCategorySelect: (category: EventType | 'ALL') => void;
}

const categories: Category[] = [
    { id: 'ALL', label: 'All Events', icon: Calendar, color: '#4361ee' },
    { id: EventType.MUSIC, label: 'Concerts & Festivals', icon: Music, color: '#9B51E0' },
    { id: EventType.CULTURAL, label: 'Theater & Comedy', icon: Theater, color: '#EF1262' },
    { id: EventType.EDUCATION, label: 'Training & Workshops', icon: GraduationCap, color: '#10B981' },
    { id: EventType.SOCIAL, label: 'Family & Entertainment', icon: Users, color: '#FF6B6B' },
    { id: EventType.SPORT, label: 'Sports', icon: Trophy, color: '#4361EE' },
    { id: EventType.CINEMA, label: 'Cinema', icon: Clapperboard, color: '#EC4899' },
    { id: EventType.TRAVEL, label: 'Travel', icon: Plane, color: '#3B82F6' },
    { id: EventType.RETRO, label: 'Nostalgia', icon: Disc, color: '#8B5CF6' },
    { id: EventType.KIDS, label: 'Kids Events', icon: Baby, color: '#F59E0B' },
    { id: EventType.SHOPPING, label: 'Black Friday', icon: ShoppingBag, color: '#6366F1' },
];

export const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => (
    <div className="w-full relative overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-3 min-w-max">
            {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                const CategoryIcon = category.icon;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.id)}
                        className={`
                            flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300
                            ${isSelected
                                ? 'text-white shadow-lg shadow-primary/20'
                                : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                            }
                        `}
                        style={{
                            backgroundColor: isSelected ? category.color : 'transparent',
                            border: `1px solid ${category.color}60`,
                        }}>
                        <CategoryIcon
                            className="w-5 h-5"
                            style={{
                                color: isSelected ? 'white' : category.color
                            }}
                        />
                        <span className="text-sm font-medium">{category.label}</span>
                    </button>
                );
            })}
        </div>
    </div>
); 