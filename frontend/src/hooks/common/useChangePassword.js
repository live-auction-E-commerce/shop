import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { changePasswordSchema } from '@/lib/validations';
import { changePassword } from '@/services/authService';
import { ROUTES } from '@/routes/routes_consts';

export function useChangePasswordForm() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');

    try {
      const result = await changePassword(data);

      if (result.user) {
        setSuccess(true);
        form.reset();
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 2000);
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            form.setError(field, {
              type: 'server',
              message: messages[0],
            });
          });
        }

        if (result.message) {
          setServerError(result.message);
        }
      }
    } catch (error) {
      setServerError(`An unexpected error occurred. Please try again, ${error}`);
    }
  };

  return { form, onSubmit, success, serverError, setServerError };
}
