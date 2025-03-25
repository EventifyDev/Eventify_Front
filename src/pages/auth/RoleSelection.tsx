import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useAppDispatch } from '../../store/hooks';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import IconUser from '../../components/Icon/IconUser';
import IconUsers from '../../components/Icon/IconUsers';
import IconArrowRight from '../../components/Icon/IconArrowRight';

const RoleSelection = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Select Role'));
    }, [dispatch]);

    const handleContinue = () => {
        if (!selectedRole) {
          toast.error('Please select a role to continue');
          return;
        }
        navigate(`/auth/register?role=${selectedRole}`);
      };

      const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>, role: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedRole(role);
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="Background gradient" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* Decorative elements */}
                <img src="/assets/images/auth/coming-soon-object1.png" alt="Decorative left side element" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="Decorative top element" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="Decorative right top element" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="Decorative polygon" className="absolute bottom-0 end-[28%]" />
                
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[42rem] py-20">
                        <div className="absolute top-6 end-6">
                            <LanguageSwitcher />
                        </div>
                        <div className="mx-auto w-full max-w-[600px]">
                            <div className="mb-6 text-center">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Select Your Role</h1>
                                <p className="text-xs font-bold leading-normal text-white-dark">Choose how you want to participate in our events</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8 pt-2">
                                {/* Participant Card */}
                                <button 
                                    type="button"
                                    className={`group relative cursor-pointer rounded-xl border-2 transition-all duration-300 hover:shadow-lg h-full flex flex-col text-left ${selectedRole === 'Participant' ? 'border-primary bg-primary/5 scale-105 z-10' : 'border-gray-200 dark:border-gray-700'}`}
                                    onClick={() => setSelectedRole('Participant')}
                                    onKeyDown={(e) => handleKeyPress(e, 'Participant')}
                                    aria-pressed={selectedRole === 'Participant'}
                                    aria-label="Select Participant role"
                                >
                                    <div className="p-4 flex flex-col items-center text-center h-full">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full mb-3 bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 ${selectedRole === 'Participant' ? 'bg-primary/20' : ''}`}>
                                            <IconUser className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-black dark:text-white">Participant</h3>
                                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex-grow">Join events, register for activities, and connect with other attendees. Perfect for those who want to experience all the excitement.</p>
                                        <div className={`mt-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${selectedRole === 'Participant' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-700'}`}>
                                            <IconArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                    {selectedRole === 'Participant' && (
                                        <div className="absolute top-2 right-2">
                                            <span className="inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-white">Selected</span>
                                        </div>
                                    )}
                                </button>
                                
                                {/* Organizer Card */}
                                <button 
                                    type="button"
                                    className={`group relative cursor-pointer rounded-xl border-2 transition-all duration-300 hover:shadow-lg h-full flex flex-col text-left ${selectedRole === 'Organizer' ? 'border-primary bg-primary/5 scale-105 z-10' : 'border-gray-200 dark:border-gray-700'}`}
                                    onClick={() => setSelectedRole('Organizer')}
                                    onKeyDown={(e) => handleKeyPress(e, 'Organizer')}
                                    aria-pressed={selectedRole === 'Organizer'}
                                    aria-label="Select Organizer role"
                                >
                                    <div className="p-4 flex flex-col items-center text-center h-full">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full mb-3 bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 ${selectedRole === 'Organizer' ? 'bg-primary/20' : ''}`}>
                                            <IconUsers className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-bold text-black dark:text-white">Organizer</h3>
                                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex-grow">Create and manage events, track registrations, and communicate with participants. Ideal for those who want to host their own events.</p>
                                        <div className={`mt-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${selectedRole === 'Organizer' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-700'}`}>
                                            <IconArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                    {selectedRole === 'Organizer' && (
                                        <div className="absolute top-2 right-2">
                                            <span className="inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-white">Selected</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                            
                            <button 
                                onClick={handleContinue}
                                className="btn text-slate-50 btn-gradient md:w-2/3 mx-auto !mt-5 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                            >
                                Continue with {selectedRole || 'Selected Role'}
                            </button>
                            
                            <div className="mt-6 text-center dark:text-white text-sm">
                                Already have an account?&nbsp;
                                <Link to="/auth/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;