import { GlobeTrotterLogo } from '@/components/icons';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
            <div className='inline-block'>
                 <GlobeTrotterLogo />
            </div>
            <h1 className="text-2xl font-bold font-headline mt-4">Admin Access</h1>
            <p className="text-gray-400">Authorized personnel only.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
