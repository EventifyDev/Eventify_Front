export const useFormStyles = () => {
    const getInputClassName = (touched: boolean | undefined, error: string | undefined) => `
        w-full px-4 py-3 rounded-xl border-2 
        ${touched && error
            ? 'border-red-300 dark:border-red-500 focus:border-red-500'
            : 'border-gray-200 dark:border-slate-700 focus:border-primary dark:focus:border-primary'
        }
        bg-transparent outline-none transition-all duration-200 
        hover:border-gray-300 dark:hover:border-slate-600
        ${touched && !error && 'border-green-500'}
    `;

    return { getInputClassName };
};