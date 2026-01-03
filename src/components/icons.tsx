import type { SVGProps } from 'react';
import Image from 'next/image';

export function GlobeTrotterLogo(props: { className?: string }) {
  return (
    <div className="flex items-center gap-2 font-semibold">
        <Image 
            src="https://storage.googleapis.com/aai-web-samples/logo-globetrotter.png"
            alt="GlobeTrotter Logo"
            width={32}
            height={32}
            className="h-8 w-8"
        />
        <span className="font-headline text-xl">GlobeTrotter</span>
    </div>
  );
}
