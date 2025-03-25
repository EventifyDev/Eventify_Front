import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconGoogle from '../../components/Icon/IconGoogle';
import { selectAuth, register, clearRegistrationSuccess } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Loader from '../../components/ui/Loader';
import { registerValidationSchema } from '../../validations/registerValidation';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useFormik } from 'formik';
import { Input } from '../../components/forms/Input';

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { registrationSuccess } = useAppSelector(selectAuth);
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'Participant';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Register'));
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            role: role,
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await dispatch(register(values)).unwrap();
            } catch (error: any) {
                if (error.message.includes('Email already exists')) {
                    toast.error('Email is already registered!');
                } else {
                    toast.error('Registration failed!');
                }
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        if (registrationSuccess) {
            setIsLoading(false);
            dispatch(clearRegistrationSuccess());
            toast.success('Registration successful!', {
                description: 'email verification link has been sent to your email address',
              });
            navigate(`/auth/verify-otp?email=${encodeURIComponent(formik.values.email)}`);
        }
    }, [registrationSuccess, navigate, dispatch]);

    const handleGoogleAuth = () => {
        window.location.href = `http://localhost:3000/api/v1/auth/google?role=${role}`;
    };

    return (
        <div>
            {isLoading && <Loader />}
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                <Input
                                    id="username"
                                    label="Username"
                                    type="text"
                                    placeholder="Enter Username"
                                    icon={<IconUser fill={true} />}
                                    error={formik.errors.username}
                                    touched={formik.touched.username}
                                    {...formik.getFieldProps('username')}
                                />

                                <Input
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Enter Email"
                                    icon={<IconMail fill={true} />}
                                    error={formik.errors.email}
                                    touched={formik.touched.email}
                                    {...formik.getFieldProps('email')}
                                />

                                <Input
                                    id="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter Password"
                                    icon={<IconLockDots fill={true} />}
                                    error={formik.errors.password}
                                    touched={formik.touched.password}
                                    {...formik.getFieldProps('password')}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !formik.isValid}
                                    className="btn text-slate-50 btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                >
                                    {isLoading && <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>}
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white rounded-full px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <button
                                    type="button"
                                    onClick={handleGoogleAuth}
                                    className="flex w-full items-center justify-center gap-3 rounded-lg outline-none border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-black/30 dark:text-white-dark dark:hover:bg-black/40"
                                    aria-label="Sign up with Google">
                                    <IconGoogle className="h-6 w-6" />
                                    <span>Continue with Google</span>
                                </button>
                            </div>
                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
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

export default Register;
