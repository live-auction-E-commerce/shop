import ChangePasswordForm from '@/components/forms/ChangePasswordForm';
import useRequireAuth from '@/hooks/auth/useRequireAuth';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ChangePasswordPage = () => {
  const isAllowed = useRequireAuth();

  if (!isAllowed) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Change Password</h1>
          <p className="mt-2 text-sm text-gray-600">Update your account password securely</p>
        </div>
        <ChangePasswordForm />
      </div>
    </motion.div>
  );
};

export default ChangePasswordPage;
