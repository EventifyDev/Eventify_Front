import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconLockDots from '../../components/Icon/IconLockDots';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Input } from '../../components/forms/Input';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { selectAuth } from '../../store/authSlice';
import { ResetPasswordValidation } from '../../validations/ResetPasswordValidation'

const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { loading } = useAppSelector(selectAuth);

    useEffect(() => {
        dispatch(setPageTitle('Reset Password'));
    }, [dispatch]);


    // Initialize formik
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: ResetPasswordValidation,
        onSubmit: async () => {
            if (!token) {
                toast.error('Reset token is missing!');
                return;
            }
            try {
                toast.success('Password reset successfully!');
                navigate('/auth/login');
            } catch (error) {
                toast.error('Failed to reset password. Token may be invalid or expired.');
            }
        },
    });

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="Background gradient" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="Decorative left side element" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="Decorative top element" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="Decorative right top element" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="Decorative polygon" className="absolute bottom-0 end-[28%]" />

                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[600px] py-20">
                        <div className="absolute top-6 end-6">
                            <LanguageSwitcher />
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Reset Password</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your new password below</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter New Password"
                                    icon={<IconLockDots fill={true} />}
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
                                    touched={formik.touched.newPassword}
                                />

                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    icon={<IconLockDots fill={true} />}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
                                    touched={formik.touched.confirmPassword}
                                />

                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] flex items-center justify-center" disabled={loading}>
                                    {loading && (
                                        <span className="animate-spin mr-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeLinecap="round" className="opacity-25" />
                                                <path
                                                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    className="opacity-75"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                    Reset Password
                                </button>
                            </form>

                            <div className="mt-6 text-center dark:text-white">
                                Remember your password?&nbsp;
                                <Link to="/auth/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;