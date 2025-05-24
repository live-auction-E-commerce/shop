import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { registerSchema } from '@/lib/validations';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import PasswordField from '@/components/ui/PasswordField';

export function RegisterForm({ onSubmit, isLoading = false }) {
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      role: 'User',
      password: '',
      confirmPassword: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const loading = isLoading || isSubmitting;

  const handleFormSubmit = async (data) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      disabled={loading}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      id="password"
                      placeholder="Enter your password"
                      error={fieldState.error?.message}
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordField
                      {...field}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      error={fieldState.error?.message}
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
