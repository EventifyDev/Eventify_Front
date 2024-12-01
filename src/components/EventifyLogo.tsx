const EventifyLogo = () => (
    <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Gradient Background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4361EE] to-[#EF1262] group-hover:rotate-180 transition-all duration-700"></div>
        <div className="absolute inset-[2px] rounded-[10px] bg-slate-950/40 backdrop-blur-sm"></div>

        {/* Icon */}
        <svg
            className="relative w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Calendar Frame */}
            <path
                d="M7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                className="fill-white/10 stroke-white"
                strokeWidth="1.5"
            />

            {/* Top Hangers */}
            <path
                d="M8 2L8 5M16 2L16 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* "E" Letter formed by lines */}
            <path
                d="M9 9H15M9 12H14M9 15H13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Decorative Dot */}
            <circle
                cx="15"
                cy="15"
                r="1"
                className="fill-[#EF1262]"
            />
        </svg>
    </div>
);

export default EventifyLogo;