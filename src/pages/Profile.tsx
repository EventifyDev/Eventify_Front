import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/authSlice';
import { AuthService, User, UpdateProfileDto } from '../services/auth.service';
import { Shield, Calendar, CheckCircle2, XCircle, Clock, Edit2, Award, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Loader from '../components/ui/Loader';
const ProfileCard = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: React.ElementType }) => (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 group">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4361EE] to-[#EF1262] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 " />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        </div>
        {children}
    </div>
);

const ProfilePage: React.FC = () => {
    const { user } = useSelector(selectAuth);
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<UpdateProfileDto>({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await AuthService.getProfile();
            setProfile(data);
        } catch (error) {
            toast.error('Failed to load profile data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setEditData({
            username: profile?.username
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await AuthService.updateProfile(editData);
            setProfile(prev => prev ? { ...prev, username: editData.username || prev.username } : null);
            setIsEditing(false);
            toast.success('Username updated successfully');
        } catch (error) {
            toast.error('Failed to update username');
        }
    };

    if (isLoading) {
        return <Loader />
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                <div className="text-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Profile Not Found</h2>
                    <p className="text-slate-600 dark:text-slate-400">Unable to load your profile information.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 py-16">
            {/* Background Patterns */}
            <div className="fixed inset-0 z-0">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-70 dark:opacity-5"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_40%,rgba(67,97,238,0.05)_70%,rgba(239,18,98,0.05))]" />

                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
            </div>

            <div className="container relative z-10 px-4 mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="relative mb-12">
                    <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-white dark:border-slate-700 shadow-md">
                                {profile.username.charAt(0).toUpperCase()}
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={editData.username || ''}
                                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg outline-none bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                            placeholder="Username"
                                        />
                                        <div className="flex gap-2 justify-center md:justify-start">
                                            <button
                                                onClick={handleSave}
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-1">
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                            {profile.username}
                                        </h1>
                                        <p className="text-slate-500 dark:text-slate-400">
                                            {profile.email}
                                        </p>
                                        <div className="mt-3">
                                            <button
                                                onClick={handleEdit}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                                Edit Username
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="hidden md:flex flex-col items-end space-y-2">
                                
                                <div className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                    profile.isEmailVerified 
                                        ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                                        : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                }`}>
                                    {profile.isEmailVerified 
                                        ? <><CheckCircle2 className="w-3 h-3" /> <span>Verified</span></>
                                        : <><Clock className="w-3 h-3" /> <span>Pending verification</span></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileCard title="Account Details" icon={Shield}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-primary" />
                                    Account Status
                                </span>
                                {profile.isEmailVerified ? (
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 py-1 px-3 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Verified</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 py-1 px-3 rounded-lg">
                                        <Clock className="w-4 h-4" />
                                        <span>Pending</span>
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary" />
                                    Role
                                </span>
                                <span className="text-slate-900 dark:text-white font-medium bg-primary/10 dark:bg-primary/20 py-1 px-3 rounded-lg">
                                    {profile.role?.name || 'User'}
                                </span>
                            </div>
                        </div>
                    </ProfileCard>

                    <ProfileCard title="Account Activity" icon={CalendarIcon}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    Member Since
                                </span>
                                <span className="text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 py-1 px-3 rounded-lg">
                                    {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Last Updated
                                </span>
                                <span className="text-slate-900 dark:text-white bg-purple-50 dark:bg-purple-900/20 py-1 px-3 rounded-lg">
                                    {new Date(profile.updatedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Verified Devices
                                </span>
                                <span className="text-slate-900 dark:text-white bg-green-50 dark:bg-green-900/20 py-1 px-3 rounded-lg">
                                    {profile.verifiedDevices?.length || 0}
                                </span>
                            </div>
                        </div>
                    </ProfileCard>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage; 