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
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
         <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          {bgImage && (
            <div className="absolute inset-0 bg-zinc-900">
               <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                data-ai-hint={bgImage.imageHint}
                fill
                className="object-cover opacity-20"
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
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
