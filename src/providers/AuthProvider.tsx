import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth, getProfile, logout } from '../store/authSlice';
import { AppDispatch } from '../store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(selectAuth);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(getProfile())
                .unwrap()
                .catch(() => {
                    dispatch(logout());
                    navigate('/auth/login');
                });
        }
    }, [isAuthenticated, dispatch]);

    return <>{children}</>;
};