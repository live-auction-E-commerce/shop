import LoginForm from '@/components/forms/LoginForm';
import { login as loginService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ROUTES } from '@/routes/routes_consts';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { token, user } = await loginService(data);

    login({ token, user });

    toast.success('Login successful!');

    navigate(ROUTES.HOME);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
