'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '../ui/button';
import Link from 'next/link';

const videoClips = [
  {
    src: 'https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4',
    theme: 'Mountains / Nature Travel',
  },
  {
    src: 'https://videos.pexels.com/video-files/5495213/5495213-hd_1920_1080_24fps.mp4',
    theme: 'City / Urban Exploration',
  },
  {
    src: 'https://videos.pexels.com/video-files/853830/853830-hd_1920_1080_30fps.mp4',
    theme: 'Beach / Leisure Vacation',
  },
];

export function HeroBanner() {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <div className="relative h-[50vh] md:h-[60vh] max-h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {videoClips.map((video, index) => (
            <CarouselItem key={index} className="h-full">
              <video
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out transform scale-110"
                autoPlay
                loop
                muted
                playsInline
                src={video.src}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight drop-shadow-lg">
          Plan smarter. Travel better.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
          Your next journey starts here.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/trips/new">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
              Plan a New Trip
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/50 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
            Explore Destinations
          </Button>
        </div>
      </div>
    </div>
  );
}
