import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconGoogle from '../../components/Icon/IconGoogle';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';
import { Input } from '../../components/forms/Input';
import { useFormik } from 'formik';
import { loginSchema } from '../../validations/loginValidationSchema';
import { toast } from 'sonner';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(login(values)).unwrap();
                if ('requiresDeviceVerification' in result) {
                    navigate(`/auth/verify-device?email=${encodeURIComponent(values.email)}`);
                    toast.info('Device verification code sent to your email');
                } else {
                    navigate('/');
                }
            } catch (error) {
                toast.error('Invalid credentials');
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
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6">
                            <LanguageSwitcher />
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
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

                                <Input
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter Password"
                                    icon={<IconLockDots fill={true} />}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password ? formik.errors.password : undefined}
                                    touched={formik.touched.password}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <input type="checkbox" id="remember-me" className="form-checkbox" />
                                        <label htmlFor="remember-me" className="text-sm mb-0">Remember me</label>
                                    </div>
                                    <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <button type="submit" className="btn btn-gradient text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white rounded-full px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Add your Google authentication logic here
                                        console.log('Google authentication triggered');
                                    }}
                                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-black/30 dark:border-gray-700 dark:text-white-dark dark:hover:bg-black/40"
                                >
                                    <IconGoogle className="h-6 w-6" />
                                    <span>Sign in with Google</span>
                                </button>
                            </div>
                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
