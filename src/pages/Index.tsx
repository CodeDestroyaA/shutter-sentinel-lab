import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AreasSection from "@/components/AreasSection";
import QuoteDialog from "@/components/QuoteDialog";
import Footer from "@/components/Footer";

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />
      <HeroSection onQuoteClick={() => setQuoteOpen(true)} />
      <ServicesSection />
      <AreasSection />
      <TestimonialsSection />
      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default Index;
