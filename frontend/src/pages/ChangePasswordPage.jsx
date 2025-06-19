import { ChangePasswordForm } from '@/components/forms/changePasswordForm';

export default function ChangePasswordPage() {
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
}
