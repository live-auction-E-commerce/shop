import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useChangePassword } from '@/hooks/common/useChangePassword';

const ChangePasswordForm = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
    serverError,
    success,
  } = useChangePassword(() => {
    setTimeout(() => navigate(ROUTES.HOME), 2000);
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="text-lg font-medium text-green-900">Password Changed Successfully!</h3>
            <p className="text-sm text-green-700">
              Your password has been updated. Redirecting to Home...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription>
          Enter your current password and choose a new secure password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {[
            {
              id: 'currentPassword',
              label: 'Current Password',
              field: 'current',
              error: errors.currentPassword,
              message: errors?.currentPassword?.message,
            },
            {
              id: 'newPassword',
              label: 'New Password',
              field: 'new',
              error: errors.newPassword,
              message: errors?.newPassword?.message,
            },
            {
              id: 'confirmNewPassword',
              label: 'Confirm New Password',
              field: 'confirm',
              error: errors.confirmNewPassword,
              message: errors?.confirmNewPassword?.message,
            },
          ].map(({ id, label, field, error, message }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>
                {label} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id={id}
                  type={showPasswords[field] ? 'text' : 'password'}
                  placeholder={label}
                  {...register(id)}
                  className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility(field)}
                  aria-label={showPasswords[field] ? 'Hide' : 'Show'}
                >
                  {showPasswords[field] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {error && (
                <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
                  {message}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Password...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.HOME)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
