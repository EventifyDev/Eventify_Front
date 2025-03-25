import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { verifyOtp, resendOtp, selectAuth } from '../../store/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const VerifyOTP = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(60);
    const [isExpired, setIsExpired] = useState(false);
    const { loading, error } = useAppSelector(selectAuth);

    const otpRefs = Array(6)
        .fill(0)
        .map(() => useRef<HTMLInputElement>(null));

    useEffect(() => {
        startCountdown();
    }, []);

    const startCountdown = () => {
        setResendDisabled(true);
        setCountdown(60);
        setIsExpired(false);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setResendDisabled(false);
                    setIsExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const validationSchema = Yup.object({
        otpDigits: Yup.array().of(Yup.string().matches(/^\d$/, 'Must be a digit')).length(6, 'Must be 6 digits'),
    });

    const formik = useFormik({
        initialValues: { otpDigits: Array(6).fill('') },
        validationSchema,
        onSubmit: async (values) => {
            if (!email) {
                toast.error('Email is missing');
                return;
            }

            if (isExpired) {
                toast.error('Verification code has expired. Please request a new one.');
                return;
            }

            const otpCode = values.otpDigits.join('');
            const result = await dispatch(verifyOtp({ email, otpCode }));

            if (verifyOtp.fulfilled.match(result)) {
                toast.success('Email verified successfully!');
                navigate('/auth/login');
            }
        },
    });

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...formik.values.otpDigits];
        newOtp[index] = value;
        formik.setFieldValue('otpDigits', newOtp);

        if (value && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace - move to previous input when current is empty
        if (e.key === 'Backspace' && !formik.values.otpDigits[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
        
        // Handle left arrow key - move to previous input
        if (e.key === 'ArrowLeft' && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
        
        // Handle right arrow key - move to next input
        if (e.key === 'ArrowRight' && index < 5) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        
        // Filter out non-digit characters
        const digits = pastedData.replace(/\D/g, '').slice(0, 6);
        
        if (digits) {
            // Create a new array with the pasted digits and empty strings for the rest
            const newOtp = [...formik.values.otpDigits];
            digits.split('').forEach((digit, i) => {
                if (i < 6) newOtp[i] = digit;
            });
            
            formik.setFieldValue('otpDigits', newOtp);
            
            // Focus on the next empty input or the last input if all are filled
            const nextEmptyIndex = newOtp.findIndex(v => v === '');
            if (nextEmptyIndex !== -1) {
                otpRefs[nextEmptyIndex].current?.focus();
            } else {
                otpRefs[5].current?.focus();
            }
        }
    };

    const handleResendOTP = async () => {
        if (!email) {
            toast.error('Email is missing. Please try again.');
            return;
        }

        try {
            setResendDisabled(true);
            
            const result = await dispatch(resendOtp(email));

            if (resendOtp.fulfilled.match(result)) {
                toast.success('New verification code sent');
                startCountdown();
            }
        } catch (error) {
            toast.error('Failed to resend verification code');
        }
    };

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
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[38rem] py-20">
                        <div className="absolute top-6 end-6">
                            <LanguageSwitcher />
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Verify Your Email</h1>
                                <p className="mt-3 text-base font-medium leading-normal text-white-dark">
                                    We've sent a verification code to <span className="text-primary font-bold">{email || 'your email'}</span>
                                </p>
                            </div>

                            <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                                <div className="text-center">
                                    <label htmlFor="otp-input" className="mb-2 block text-base font-semibold">
                                        Enter 6-digit verification code
                                    </label>
                                    
                                    {/* Expiration Timer or Expired Message */}
                                    <div className="flex items-center justify-center mt-2 mb-3">
                                        {isExpired ? (
                                            <div className="flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Code expired</span>
                                            </div>
                                        ) : (
                                            <div className={`flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${
                                                countdown <= 10 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Code expires in {countdown} seconds</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-center gap-3 mt-3">
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index}
                                                ref={otpRefs[index]}
                                                type="text"
                                                maxLength={1}
                                                className="h-14 w-12 text-center text-xl font-bold border-0 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all 
                                                bg-white dark:bg-gray-800 dark:text-white aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger"
                                                value={formik.values.otpDigits[index]}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={index === 0 ? handlePaste : undefined}
                                                aria-invalid={formik.touched.otpDigits && formik.errors.otpDigits ? 'true' : 'false'}
                                                autoFocus={index === 0}
                                                aria-label={`Digit ${index + 1} of verification code`}
                                            />
                                        ))}
                                    </div>
                                    {formik.touched.otpDigits && formik.errors.otpDigits && (
                                        <div className="text-danger text-xs mt-2 text-center" role="alert">
                                            Please enter a valid 6-digit code
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-gradient text-white w-full border-0 uppercase py-2 rounded-lg shadow-lg shadow-primary/30 transition-all font-bold text-base relative overflow-hidden flex items-center justify-center"
                                        disabled={loading || isExpired}
                                    >
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
                                        Verify Code
                                    </button>

                                    <div className="mt-5 flex items-center justify-center space-x-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Didn't receive code?</p>
                                        {resendDisabled && !isExpired ? (
                                            <span className="text-sm font-semibold text-gray-400">
                                                Resend in {countdown}s
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="text-sm font-semibold text-primary hover:text-primary/80 focus:outline-none focus:underline transition"
                                                onClick={handleResendOTP}
                                                aria-live="polite"
                                            >
                                                Resend Code
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>

                            <div className="text-center mt-12 dark:text-white">
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

export default VerifyOTP;