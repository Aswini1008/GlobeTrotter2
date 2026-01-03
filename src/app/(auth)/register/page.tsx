import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold font-headline">Create Your Account</h1>
        <p className="text-muted-foreground">
          Join GlobeTrotter to start planning your adventures.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
