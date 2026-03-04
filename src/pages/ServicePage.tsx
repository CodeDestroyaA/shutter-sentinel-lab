import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const serviceData: Record<string, { title: string; description: string; details: string[]; faqs: { q: string; a: string }[] }> = {
  "roller-shutters": {
    title: "Roller Shutter Installations",
    description: "High-grade steel and aluminium options tailored to your exact dimensions. Custom-fit, heavy-duty security for shopfronts, warehouses, and industrial premises across the East Rand.",
    details: [
      "Custom measurements and fabrication",
      "Steel and aluminium options available",
      "Manual and motorised operation",
      "Commercial and residential applications",
      "Full warranty on all installations",
    ],
    faqs: [
      { q: "How long does a standard installation take?", a: "Most commercial installations are completed within a single day. Larger or custom projects may require 2-3 days." },
      { q: "Do you offer motorised roller shutters?", a: "Yes, we install both manual and motorised systems. Motorised options include remote control and smartphone integration." },
    ],
  },
  repairs: {
    title: "Shutter Repairs & Maintenance",
    description: "Emergency repairs to ensure your business is never left vulnerable. Quick fixes for jammed, rusted, or noisy shutters to keep your day moving smoothly.",
    details: [
      "Emergency after-hours service",
      "Spring and motor replacements",
      "Rust treatment and panel repairs",
      "Preventive maintenance programs",
      "All brands serviced",
    ],
    faqs: [
      { q: "Do you offer emergency after-hours repairs?", a: "Yes, we understand security can't wait. Contact us for urgent assistance any time." },
      { q: "How often should I service my roller shutter?", a: "We recommend annual maintenance to prevent costly breakdowns and extend the lifespan of your shutter." },
    ],
  },
  "gate-motors": {
    title: "Gate Motor Solutions",
    description: "We specialise in leading brands like Centurion to ensure your driveway is both secure and convenient. New installs, motor health checks, and reliable automation for sliding and swing gates.",
    details: [
      "Centurion and other top brands",
      "Sliding and swing gate motors",
      "Battery backup systems",
      "Intercom and access control integration",
      "Diagnostics and motor replacements",
    ],
    faqs: [
      { q: "My gate is moving slowly; do I need a new motor?", a: "Not necessarily! It could be a battery issue or track obstruction. We'll diagnose it first to save you costs." },
      { q: "Can you integrate my gate motor with an intercom?", a: "Absolutely. We offer full intercom and access control integration with most gate motor systems." },
    ],
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const service = slug ? serviceData[slug] : undefined;
  if (!service) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-20 bg-secondary">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">{service.title}</h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl leading-relaxed">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
              <ul className="space-y-3">
                {service.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 font-body text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <Button onClick={() => setQuoteOpen(true)} className="font-display tracking-wider mt-8">
                Request a Quote
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">FAQ</h2>
              <Accordion type="single" collapsible>
                {service.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="font-body text-left text-foreground">{faq.q}</AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default ServicePage;
