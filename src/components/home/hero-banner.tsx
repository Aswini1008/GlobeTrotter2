'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const videoClips = {
  mountain: {
    src: 'https://videos.pexels.com/video-files/4782135/4782135-hd_1920_1080_25fps.mp4',
    text: 'Breathe in the mountains.',
  },
  beach: {
    src: 'https://videos.pexels.com/video-files/853830/853830-hd_1920_1080_30fps.mp4',
    text: 'Feel the rhythm of the ocean.',
  },
};

const VideoPanel = ({
  src,
  text,
  className,
}: {
  src: string;
  text: string;
  className?: string;
}) => (
  <div className={cn('relative w-full h-full', className)}>
    <video
      className="w-full h-full object-cover transition-transform duration-1000 ease-in-out transform scale-110"
      autoPlay
      loop
      muted
      playsInline
      src={src}
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
        <VideoPanel
          src={videoClips.mountain.src}
          text={videoClips.mountain.text}
          className="lg:w-1/2"
        />
        <VideoPanel
          src={videoClips.beach.src}
          text={videoClips.beach.text}
          className="lg:w-1/2"
        />
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
