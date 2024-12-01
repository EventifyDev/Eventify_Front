import { motion, AnimatePresence } from 'framer-motion';

interface ErrorMessageProps {
    message?: string | undefined;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <AnimatePresence>
        {message && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-rose-500 dark:text-rose-400 text-sm mt-1 ml-1"
            >
                {message}
            </motion.div>
        )}
    </AnimatePresence>
);