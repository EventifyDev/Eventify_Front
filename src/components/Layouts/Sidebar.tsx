import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import EventifyLogo from '../EventifyLogo';
import { selectUserRole, selectIsAuthenticated, getProfile, selectHasPermission } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const { t } = useTranslation();
    const userRole = useSelector(selectUserRole);
    const hasManageEventsPermission = useSelector(selectHasPermission('manage:events'));

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getProfile());
        }
    }, [isAuthenticated, dispatch]);

     const hasRole = (roleName: string) => {
        if (!userRole) return false;
        return userRole.name === roleName;
      };

      const canManageEvents = hasRole('Administrator') || hasRole('Super Admin') || hasRole('Organizer') || hasManageEventsPermission;
      const canManageRoles = useSelector(selectHasPermission('manage:roles')) || hasRole('Super Admin');
      const canApproveEvents = hasRole('Administrator') || hasRole('Super Admin');

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0 group">
                            <EventifyLogo />
                            <div className="ml-3 relative group-hover:scale-105 transition-transform duration-300">
                                <span className="text-2xl font-bold dark:text-white text-primary relative flex items-center">
                                    Eventify
                                </span>
                            </div>
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#4361EE]/20 rounded-full blur-xl group-hover:bg-[#EF1262]/20 transition-colors duration-300"></div>
                            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#EF1262]/20 rounded-full blur-xl group-hover:bg-[#4361EE]/20 transition-colors duration-300"></div>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M15.29 20.663h3.017a2.194 2.194 0 0 0 2.193-2.194v-6.454a3.3 3.3 0 0 0-1.13-2.48l-5.93-5.166a2.194 2.194 0 0 0-2.88 0L4.63 9.534a3.3 3.3 0 0 0-1.13 2.481v6.454c0 1.212.982 2.194 2.194 2.194h3.29m6.306 0v-6.581c0-.908-.736-1.645-1.645-1.645H10.63c-.909 0-1.645.737-1.645 1.645v6.581m6.306 0H8.984"/></svg>
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>
                                    <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('analytics')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {canManageEvents && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'events' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('events')}>
                                        <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"/><path strokeLinecap="round" d="M7 4V2.5M17 4V2.5M2.5 9h19"/></g></svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('events')}</span>
                                        </div>
                                        <div className={currentMenu === 'events' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'events' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/dashboard/events">{t('all_events')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {canApproveEvents && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'approve-events' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('approve-events')}>
                                        <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="64" strokeDashoffset="64" d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path strokeDasharray="14" strokeDashoffset="14" d="M8 12l3 3l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('approve events')}</span>
                                        </div>
                                        <div className={currentMenu === 'approve-events' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'approve-events' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/dashboard/approve-events">{t('pending events')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {canManageRoles && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'roles' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('roles')}>
                                        <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M2048 1573v475h-512v-256h-256v-256h-256v-207q-74 39-155 59t-165 20q-97 0-187-25t-168-71t-142-110t-111-143t-71-168T0 704q0-97 25-187t71-168t110-142T349 96t168-71T704 0q97 0 187 25t168 71t142 110t111 143t71 168t25 187q0 51-8 101t-23 98zm-128 54l-690-690q22-57 36-114t14-119q0-119-45-224t-124-183t-183-123t-224-46q-119 0-224 45T297 297T174 480t-46 224q0 119 45 224t124 183t183 123t224 46q97 0 190-33t169-95h89v256h256v256h256v256h256zM512 384q27 0 50 10t40 27t28 41t10 50q0 27-10 50t-27 40t-41 28t-50 10q-27 0-50-10t-40-27t-28-41t-10-50q0-27 10-50t27-40t41-28t50-10"/></svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('roles management')}</span>
                                        </div>
                                        <div className={currentMenu === 'roles' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'roles' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/dashboard/roles-management">{t('manage roles')}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
