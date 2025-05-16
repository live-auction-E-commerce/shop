import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Fashion background image with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/70 to-teal-500/70 z-0" />
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
          alt="Fashion background"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
      </div>

      <div className="container relative z-10 py-28 md:py-40 lg:py-52 flex flex-col min-h-[70vh] justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white">
            <span className="bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
              Live Fashion Auctions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl">
            Bid on exclusive designer clothing and accessories in real-time. New items added daily.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 rounded-full text-lg">
              Explore Live Auctions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-white/20 px-8 py-6 rounded-full text-lg"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
