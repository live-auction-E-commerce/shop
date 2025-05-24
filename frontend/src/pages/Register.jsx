import { RegisterForm } from '@/components/forms/RegisterForm';
import { register } from '@/services/authService';
import { toast } from 'sonner';

const Register = () => {
  const handleRegister = async (data) => {
    console.log('Register data:', data);
    const { token, _user } = await register(data); // TODO : Set the user with useContext!

    localStorage.setItem('token', token);
    toast.success('Registration successful!');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegisterForm onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
