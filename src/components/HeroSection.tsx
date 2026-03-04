import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onQuoteClick: () => void;
}

const HeroSection = ({ onQuoteClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Industrial roller shutter door" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="container relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary">KEMPTON PARK'S ROLLER SHUTTER SPECIALISTS</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
            <span className="text-secondary-foreground">YOUR KEY TO</span>
            <br />
            <span className="text-gradient-amber">SECURITY</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-secondary-foreground/70 max-w-xl mb-10 leading-relaxed">
            Industrial and residential roller shutter specialists — delivering peace of mind with precision engineering and a neighbourly touch across the East Rand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onQuoteClick} className="font-display text-base tracking-wider px-8 py-6">
              Get a Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="font-display text-base tracking-wider px-8 py-6 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
            >
              <a href="tel:+27000000000">Call Now</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
