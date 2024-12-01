import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    return {
        user,
        isAuthenticated,
        logout: handleLogout
    };
};