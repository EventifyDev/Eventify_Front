import { useEffect, useState } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface EventTimerProps {
    eventDate: string;
}

export const EventTimer = ({ eventDate }: EventTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const distance = new Date(eventDate).getTime() - new Date().getTime();

            if (distance < 0) return;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [eventDate]);

    const timeUnits = [
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' }
    ];

    return (
        <div className="mb-4">
            <div className="grid grid-cols-4 gap-2">
                {timeUnits.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center">
                        <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 py-2">
                            <div className={`text-lg font-bold text-primary text-center ${label === 'Secs' ? 'animate-pulse' : ''}`}>
                                {String(value).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 text-center mt-0.5">
                                {label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{
                        width: `${((timeLeft.seconds) / 60) * 100}%`
                    }}
                />
            </div>
        </div>
    );
}; 