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
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <GlobeTrotterLogo className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-headline">GlobeTrotter</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Your next adventure starts here.
            </p>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
