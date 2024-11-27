import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { IRootState, AppDispatch } from './index';

// Hook pour dispatch avec les types
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook pour selector avec les types
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;