import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  const handleLogin = async (data) => {
    // TODO: Implement your login logic here
    // Example: call your API endpoint
    console.log('Login data:', data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <a href="/register" className="font-medium text-primary hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
