'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const heroSections = [
    {
      id: 'mountains',
      src: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1920',
      alt: 'Majestic mountain range at sunrise',
      hint: 'mountain sunrise',
      text: 'Breathe in the mountains.',
    },
    {
      id: 'beaches',
      src: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=1920',
      alt: 'Pristine beach with turquoise water',
      hint: 'beach turquoise water',
      text: 'Feel the rhythm of the ocean.',
    },
]

const ImagePanel = ({
  src,
  alt,
  hint,
  text,
  className,
}: {
  src: string;
  alt: string;
  hint: string;
  text: string;
  className?: string;
}) => (
  <div className={cn('relative w-full h-full', className)}>
    <Image
      src={src}
      alt={alt}
      data-ai-hint={hint}
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/30" />
    <div className="absolute bottom-6 left-6 text-white text-lg font-light drop-shadow-md">
      {text}
    </div>
  </div>
);

export function HeroBanner() {
  return (
    <div className="relative h-[80vh] md:h-[90vh] max-h-[800px] w-full overflow-hidden rounded-2xl shadow-2xl">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="h-1/2 w-full lg:h-full lg:w-1/2">
            <ImagePanel
              src={heroSections[0].src}
              alt={heroSections[0].alt}
              hint={heroSections[0].hint}
              text={heroSections[0].text}
            />
        </div>
        <div className="h-1/2 w-full lg:h-full lg:w-1/2">
            <ImagePanel
              src={heroSections[1].src}
              alt={heroSections[1].alt}
              hint={heroSections[1].hint}
              text={heroSections[1].text}
            />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight drop-shadow-lg">
          Plan journeys worth remembering.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
          Mountains or beaches — your story starts here.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/explore">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Explore Destinations
            </Button>
          </Link>
          <Link href="/trips/new">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/50 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Build Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
