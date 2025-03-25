export const GridPattern = () => (
    <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 dark:stroke-slate-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
    >
        <defs>
            <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M.5 40V.5H40"
                    fill="none"
                />
            </pattern>
        </defs>
        <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#grid-pattern)"
        />
    </svg>
); 