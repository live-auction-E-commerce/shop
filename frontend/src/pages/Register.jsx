import { RegisterForm } from '@/components/forms/RegisterForm';
const Register = () => {
  const handleRegister = async (data) => {
    // TODO: Implement your registration logic here
    // Example: call your API endpoint
    console.log('Register data:', data);
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
