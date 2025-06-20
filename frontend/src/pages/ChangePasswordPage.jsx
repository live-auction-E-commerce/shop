import ChangePasswordForm from '@/components/forms/ChangePasswordForm';
import useRequireAuth from '@/hooks/auth/useRequireAuth';

const ChangePasswordPage = () => {
  const isAllowed = useRequireAuth();

  if (!isAllowed) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Change Password</h1>
          <p className="mt-2 text-sm text-gray-600">Update your account password securely</p>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
