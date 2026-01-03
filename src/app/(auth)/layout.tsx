import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GlobeTrotterLogo } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');

  return (
    <div className="w-full min-h-screen bg-background text-foreground lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
       <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        {bgImage && (
          <div className="absolute inset-0 bg-zinc-900">
             <Image
              src={bgImage.imageUrl}
              alt={bgImage.description}
              data-ai-hint={bgImage.imageHint}
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GlobeTrotterLogo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “The world is a book and those who do not travel read only one page.”
            </p>
            <footer className="text-sm">Saint Augustine</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="mx-auto grid w-full max-w-sm gap-6">
            {children}
        </div>
      </div>
    </div>
  );
}
