import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { useAppDispatch } from '../store/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface VerificationProps {
  type: 'email' | 'device';
  title: string;
  subtitle?: string;
  onVerify: (code: string, identifier: string) => Promise<void>;
  onResend: (identifier: string) => Promise<void>;
  redirectPath: string;
  identifier?: string;
  identifierLabel?: string;
}

const VerificationComponent = ({
  type,
  title,
  subtitle,
  onVerify,
  onResend,
  redirectPath,
  identifier,
  identifierLabel = 'email',
}: VerificationProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const identifierFromUrl = searchParams.get(identifierLabel) || identifier;
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // References for OTP input elements
  const otpRefs = Array(6)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    dispatch(setPageTitle(`Verify ${type === 'email' ? 'Email' : 'Device'}`));
  }, [dispatch, type]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const validationSchema = Yup.object({
    otpDigits: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'))
      .length(6, 'Must be 6 digits')
      .required('Verification code is required'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      otpDigits: ['', '', '', '', '', ''],
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!identifierFromUrl) {
        toast.error(`${identifierLabel} is missing. Please try again.`);
        return;
      }

      try {
        setIsLoading(true);
        const otpCode = values.otpDigits.join('');
        await onVerify(otpCode, identifierFromUrl);
        
        toast.success(`${type === 'email' ? 'Email' : 'Device'} verified successfully!`);
        setTimeout(() => {
          navigate(redirectPath);
        }, 2000);
      } catch (error) {
        toast.error('Invalid verification code.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    // Allow only digits
    if (value && !/^\d$/.test(value)) return;

    const newOtpDigits = [...formik.values.otpDigits];
    newOtpDigits[index] = value;
    formik.setFieldValue('otpDigits', newOtpDigits);

    // Move to next input if value is entered
    if (value && index < 5 && otpRefs[index + 1]?.current) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !formik.values.otpDigits[index] && index > 0 && otpRefs[index - 1]?.current) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!pastedData.match(/^\d{6}$/)) return; 

    const digits = pastedData.split('');
    formik.setFieldValue('otpDigits', digits);
    
    // Focus on the last input
    if (otpRefs[5]?.current) {
      otpRefs[5].current?.focus();
    }
  };

  const handleResend = async () => {
    if (!identifierFromUrl) {
      toast.error(`${identifierLabel} is missing. Please try again.`);
      return;
    }

    try {
      setResendDisabled(true);
      setCountdown(60);
      
      await onResend(identifierFromUrl);
      
      toast.success('Verification code sent successfully. Please check your email.');
    } catch (error) {
      toast.error('Failed to resend verification code. Please try again later.');
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  return (
    <div>
      <Toaster richColors />
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
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{title}</h1>
                <p className="mt-3 text-base font-medium leading-normal text-white-dark">
                  {subtitle || `We've sent a verification code to `}
                  {identifierFromUrl && (
                    <span className="text-primary font-bold">{identifierFromUrl}</span>
                  )}
                </p>
              </div>
              
              <form className="space-y-5 dark:text-white" onSubmit={formik.handleSubmit}>
                <div className="text-center">
                  <label htmlFor="otp-input" className="mb-2 block text-base font-semibold">
                    Enter 6-digit verification code
                  </label>
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
                    className="btn btn-gradient text-white w-full border-0 uppercase py-3 rounded-lg shadow-lg shadow-primary/30 transition-all font-bold text-base relative overflow-hidden flex items-center justify-center"
                    disabled={isLoading || resendDisabled}
                  >
                    {isLoading && (
                      <span className="animate-spin mr-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeLinecap="round" className="opacity-25" />
                          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                        </svg>
                      </span>
                    )}
                    Verify Code
                  </button>
                  
                  <div className="mt-5 flex items-center justify-center space-x-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Didn't receive code?</p>
                    <button 
                      type="button" 
                      className={`text-sm font-semibold text-primary hover:text-primary/80 focus:outline-none focus:underline transition ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleResend}
                      disabled={resendDisabled}
                      aria-live="polite"
                    >
                      {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
                    </button>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 text-center dark:text-white">
                <Link to="/auth/login" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition">
                  <svg className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationComponent;