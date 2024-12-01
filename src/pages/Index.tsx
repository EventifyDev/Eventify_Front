import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { EventService } from '../services/event.service';
import { ParticipantService } from '../services/participant.service';
import { Event, EventType } from '../types/event.type';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    Users,
    Target,
    Award,
    Activity,
    MapPin,
    Clock,
    Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import EventLoader from '../components/EventLoader';

// Types pour les statistiques
interface EventStats {
    growth: number;
    percentage: string;
    isPositive: boolean;
}

interface QuickStat {
    label: string;
    value: string | number;
    icon: any;
    color: string;
}

const Index = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [participantCounts, setParticipantCounts] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [currentPage] = useState(1);
    const [pageSize] = useState(100);

    const eventService = new EventService();
    const participantService = new ParticipantService();

    const totalParticipants = Object.values(participantCounts).reduce((sum, count) => sum + count, 0);

    // Couleurs pour les types d'événements
    const eventTypeColors = {
        [EventType.SPORT]: '#4361EE',
        [EventType.CULTURAL]: '#EF1262',
        [EventType.PROFESSIONAL]: '#48BF84',
        [EventType.SOCIAL]: '#FF6B6B',
        [EventType.OTHER]: '#9CA3AF'
    };

    // Statistiques rapides
    const quickStats: QuickStat[] = [
        {
            label: 'Total Events',
            value: events.length,
            icon: Calendar,
            color: 'text-[#4361EE]'
        },
        {
            label: 'Total Participants',
            value: totalParticipants,
            icon: Users,
            color: 'text-[#EF1262]'
        },
        {
            label: 'Taux de remplissage',
            value: `${Math.round((totalParticipants / (events.reduce((sum, event) => sum + event.capacity, 0) || 1)) * 100)}%`,
            icon: Target,
            color: 'text-[#48BF84]'
        },
        {
            label: 'Événements à venir',
            value: events.filter(e => new Date(e.date) > new Date()).length,
            icon: Activity,
            color: 'text-[#FF6B6B]'
        }
    ];

    useEffect(() => {
        if (user?._id) {
            fetchData();
        }
    }, [user?._id]);

    const fetchData = async () => {
        if (!user?._id) return;

        setLoading(true);
        try {
            const eventsData = await eventService.getAllEvents(user._id, currentPage, pageSize);
            setEvents(eventsData);

            const participantData: { [key: string]: number } = {};
            for (const event of eventsData) {
                const count = await participantService.getParticipantCount(event._id);
                participantData[event._id] = count;
            }
            setParticipantCounts(participantData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getEventTrends = (): EventStats => {
        const today = new Date();
        const thisMonth = events.filter(e => new Date(e.date).getMonth() === today.getMonth()).length;
        const lastMonth = events.filter(e => new Date(e.date).getMonth() === today.getMonth() - 1).length;
        const growth = thisMonth - lastMonth;
        const percentage = lastMonth ? (growth / lastMonth) * 100 : 0;

        return {
            growth,
            percentage: percentage.toFixed(1),
            isPositive: percentage >= 0
        };
    };

    const trends = getEventTrends();

    // Données pour le graphique des catégories
    const categoryData = Object.values(EventType).map(type => ({
        name: type,
        value: events.filter(e => e.eventType === type).length,
        color: eventTypeColors[type]
    })).filter(category => category.value > 0);

    return (
        <div className="p-6 space-y-6">
            {loading ? (
                <EventLoader />
            ) : (
                <>
                    {/* Header Section */}
                    <HeaderSection user={user} trends={trends} />

                    {/* Quick Stats Grid */}
                    <QuickStatsGrid stats={quickStats} />

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Event Distribution Chart */}
                        <EventDistributionChart
                            data={categoryData}
                            colors={eventTypeColors}
                        />

                        {/* Timeline Section */}
                        <EventTimeline
                            events={events}
                            participantCounts={participantCounts}
                            eventTypeColors={eventTypeColors}
                        />
                    </div>

                    {/* Recent Events Table */}
                    <RecentEventsTable
                        events={events}
                        participantCounts={participantCounts}
                        eventTypeColors={eventTypeColors}
                    />
                </>
            )}
        </div>
    );
};

export default Index;

const HeaderSection = ({ user, trends }: { user: any, trends: EventStats }) => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-6">
        <div className="relative z-10">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Hello, {user?.username} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
                Here's an overview of your events
            </p>

            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                {trends.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span className={`text-sm font-medium ${trends.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {trends.percentage}% this month
                </span>
            </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
    </div>
);

const QuickStatsGrid = ({ stats }: { stats: QuickStat[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <div key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
                <div className={`${stat.color} flex items-center mb-2`}>
                    <stat.icon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                </div>
            </div>
        ))}
    </div>
);

const EventDistributionChart = ({ data, colors }: { data: any[], colors: any }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
            Event Type Distribution
        </h3>
        {data.length > 0 ? (
            <>
                <div className="flex items-center justify-center h-[300px]">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`${value} events`, '']}
                                contentStyle={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 12px'
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {data.map((category, index) => (
                        <div key={index} className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: category.color }}
                            ></div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                {category.name} ({category.value})
                            </span>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
                No events to display
            </div>
        )}
    </div>
);

const EventTimeline = ({ events, participantCounts, eventTypeColors }: {
    events: Event[],
    participantCounts: { [key: string]: number },
    eventTypeColors: { [key: string]: string }
}) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-white flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            Event Timeline
        </h3>
        <div className="space-y-6">
            {events.slice(0, 4).map((event, index) => (
                <div key={index} className="relative pl-8 pb-6">
                    {index !== events.length - 1 && (
                        <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    )}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-800 dark:text-white">{event.name}</h4>
                            <span
                                className="px-2 py-1 rounded-full text-xs"
                                style={{
                                    backgroundColor: `${eventTypeColors[event.eventType]}20`,
                                    color: eventTypeColors[event.eventType]
                                }}
                            >
                                {event.eventType}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                {participantCounts[event._id] || 0} participants
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RecentEventsTable = ({ events, participantCounts, eventTypeColors }: {
    events: Event[],
    participantCounts: { [key: string]: number },
    eventTypeColors: { [key: string]: string }
}) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
            Recent Events
        </h3>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-slate-500 dark:text-slate-400">
                        <th className="pb-4">Name</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Type</th>
                        <th className="pb-4">Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {events.slice(0, 5).map((event) => (
                        <tr key={event._id} className="border-t border-slate-100 dark:border-slate-700">
                            <td className="py-4 text-slate-800 dark:text-white">{event.name}</td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">
                                {new Date(event.date).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                                <span
                                    className="px-3 py-1 rounded-full text-xs"
                                    style={{
                                        backgroundColor: `${eventTypeColors[event.eventType]}20`,
                                        color: eventTypeColors[event.eventType]
                                    }}
                                >
                                    {event.eventType}
                                </span>
                            </td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">
                                {participantCounts[event._id] || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);