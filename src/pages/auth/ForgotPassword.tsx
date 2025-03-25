import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Input } from '../../components/forms/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { forgotPassword, selectAuth } from '../../store/authSlice';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector(selectAuth);

    useEffect(() => {
        dispatch(setPageTitle('Forgot Password'));
    }, [dispatch]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(forgotPassword(values.email)).unwrap();
                toast.success('Password reset instructions have been sent to your email');
                navigate('/auth/login');
            } catch (error) {
                toast.success('If an account exists with this email, password reset instructions have been sent');
                navigate('/auth/login');
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Forgot Password</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email to receive password reset instructions</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                <Input
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter Email"
                                    icon={<IconMail fill={true} />}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email ? formik.errors.email : undefined}
                                    touched={formik.touched.email}
                                />
                                <button type="submit" className="btn btn-gradient text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] flex items-center justify-center" disabled={loading}>
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
                                    Send Reset Link
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

export default ForgotPassword;