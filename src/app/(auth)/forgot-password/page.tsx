'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';

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
import * as React from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { formState } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically handle firebase password reset
    // For now, we'll just simulate success
    setIsSubmitted(true);
    toast({
      title: 'Password Reset Email Sent',
      description: `If an account exists for ${values.email}, you will receive an email with instructions.`,
    });
  }

  return (
    <>
      {isSubmitted ? (
        <div className="text-center">
           <h2 className="text-2xl font-semibold font-headline mb-4">Check your email</h2>
           <p className="text-muted-foreground mb-6">We've sent a password reset link to the email address you provided.</p>
           <Link href="/login">
             <Button className="w-full bg-primary hover:bg-primary/90">Return to Login</Button>
           </Link>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
             <div className="grid gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold font-headline">Forgot Password?</h1>
                <p className="text-balance text-muted-foreground">
                  No problem. Enter your email and we'll send you a reset link.
                </p>
              </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
             <div className="mt-4 text-center text-sm">
                Remember your password?{' '}
                <Link href="/login" className="underline text-primary">
                  Login
                </Link>
              </div>
          </form>
        </Form>
      )}
    </>
  );
}
