const EventLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900/50">
            <div className="relative flex flex-col items-center">
                {/* Animated background blur effects */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-300"></div>

                {/* Main loader container */}
                <div className="relative z-10 bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/20 dark:border-slate-700/30">
                    {/* Calendar icon animation */}
                    <div className="relative w-16 h-16 mb-4 mx-auto">
                        {/* Animated rings */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary animate-spin-slow"></div>
                        <div className="absolute inset-[3px] rounded-xl bg-white dark:bg-slate-800"></div>

                        {/* Calendar icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-primary"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Loading text */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                            Loading...
                        </h3>

                        {/* Animated dots */}
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 w-48">
                        <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-progress"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventLoader;