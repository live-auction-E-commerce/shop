import { ArrowRight, Gavel, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-0" />

      {/* Background image with better overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
          alt="Fashion background"
          className="w-full h-full object-cover object-center opacity-30"
        />
      </div>

      {/* Floating auction cards */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Card 1 */}
        <div className="absolute top-20 right-10 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg animate-float-slow hidden lg:block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Gavel className="w-4 h-4" />
            Live Auction
          </div>
          <div className="font-semibold text-foreground">Designer Handbag</div>
          <div className="text-primary font-bold">$1,250</div>
        </div>

        {/* Card 2 */}
        <div className="absolute top-40 left-10 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg animate-float-delayed hidden lg:block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <TrendingUp className="w-4 h-4" />
            Hot Bid
          </div>
          <div className="font-semibold text-foreground">Vintage Watch</div>
          <div className="text-accent font-bold">$3,890</div>
        </div>

        {/* Card 3 */}
        <div className="absolute bottom-32 right-20 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg animate-float-slow hidden lg:block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            Ending Soon
          </div>
          <div className="font-semibold text-foreground">Art Piece</div>
          <div className="text-destructive font-bold">2h 15m</div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32 lg:py-40 flex flex-col min-h-screen justify-center">
        <div className="max-w-4xl">
          {/* Main heading */}
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Bid, Win,
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Own Luxury
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            Discover exclusive designer pieces, vintage treasures, and unique collectibles.
            <span className="text-foreground font-semibold"> Join thousands of bidders</span> in the
            most exciting online auction experience.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Bidders</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Gavel className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">Items Sold</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">$50M+</div>
                <div className="text-sm text-muted-foreground">Total Sales</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r cursor-pointer from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to={ROUTES.LIVE}>Browse Auctions </Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Verified Sellers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </div>
  );
};

export default HeroSection;
