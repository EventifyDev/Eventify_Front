import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../../store/authSlice';
import Dropdown from '../Dropdown';

const UserAvatar = ({ username }: { username: string }) => {
  const initial = username.charAt(0).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold">
      {initial}
    </div>
  );
};

export const AuthButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/auth/login"
          className="group relative px-5 py-2.5 text-gray-700 hover:text-primary transition-all duration-300 overflow-hidden"
        >
          <span className="flex items-center gap-2 relative z-10">
            <LogIn className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary font-nunito tracking-wide">Login</span>
          </span>
        </Link>

        <Link
          to="/auth/register"
          className="relative group px-5 py-2 rounded-lg overflow-hidden outline-none btn-gradient"
        >
          <span className="relative flex items-center gap-2.5 font-semibold">
            <UserPlus className="w-4 h-4 text-white transition-all duration-300" />
            <span className="text-white font-nunito transition-all duration-300">
              Register
            </span>
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center">
      <Dropdown
        offset={[0, 8]}
        placement="bottom-end"
        btnClassName="relative group block"
        button={<UserAvatar username={user?.username || 'U'} />}
      >
        <div className="w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <UserAvatar username={user?.username || 'U'} />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user?.username}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <svg className="ltr:mr-2 rtl:ml-2 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path
                  opacity="0.5"
                  d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <svg className="ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.5"
                  d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};