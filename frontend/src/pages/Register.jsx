import RegisterForm from '@/components/forms/RegisterForm';
import { register } from '@/services/authService';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const { token, user } = await register(data);

    login({ token, user });

    if (user.role === 'Seller') {
      toast.success('Registration successful!, Please check your email for verification link!');
    } else if (toast.success('Registration successful!'));

    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 1000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegisterForm onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
