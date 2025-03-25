import { FC } from 'react';

interface IconArrowLeftProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconArrowLeft: FC<IconArrowLeftProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className={className}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
        </svg>
    );
};

export default IconArrowLeft;
