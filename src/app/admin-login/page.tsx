'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/user-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import * as React from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, login } = useUser();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    // In a real app, you'd call a Firebase auth function here.
    // We'll simulate it by checking against our mock admin user.
    if (values.email === 'aswini.sm@example.com' && values.password === 'adminpass') {
      login({
          id: 'user-1',
          fullName: 'Aswini S M',
          email: 'aswini.sm@example.com',
          photoURL: '/avatars/aswini.png',
          role: 'admin',
      });
      toast({
        title: 'Admin Login Successful',
        description: 'Redirecting to the dashboard...',
      });
      router.push('/admin');
    } else {
      setError('Unauthorized access. Please check your credentials.');
      form.reset();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="admin@example.com" 
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Verifying...' : 'Login to Admin Panel'}
          </Button>
        </form>
      </Form>
       <div className="mt-6 text-center text-sm">
        <Link href="/home" className="text-gray-400 hover:text-primary transition-colors">
          Back to User App
        </Link>
      </div>
    </>
  );
}
