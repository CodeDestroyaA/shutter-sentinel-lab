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
    description: "High-grade steel and aluminium roller shutter doors tailored to your exact dimensions. Custom-fit, heavy-duty security for shopfronts, warehouses, and residential properties across the East Rand and greater Gauteng.",
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
  "roller-shutter-repairs": {
    title: "Roller Shutter Repairs",
    description: "Emergency roller shutter repairs to ensure your property is never left vulnerable. Quick fixes for jammed, rusted, or noisy shutters to keep your business or home secure.",
    details: [
      "Emergency after-hours repair service",
      "Spring and motor replacements",
      "Rust treatment and panel repairs",
      "Track realignment and lubrication",
      "All roller shutter brands serviced",
    ],
    faqs: [
      { q: "Do you offer emergency after-hours repairs?", a: "Yes, we understand security can't wait. Contact us for urgent assistance any time." },
      { q: "How quickly can you respond to an emergency call?", a: "We aim to be on-site within 2-4 hours for emergency calls in the East Rand area." },
    ],
  },
  "roller-shutter-maintenance": {
    title: "Roller Shutter Maintenance",
    description: "Preventive maintenance programs designed to extend roller shutter lifespan, reduce costly breakdowns, and keep your property secure year-round across Gauteng.",
    details: [
      "Scheduled preventive maintenance plans",
      "Full mechanical and electrical inspections",
      "Lubrication and tension adjustments",
      "Safety compliance checks",
      "Detailed maintenance reports",
    ],
    faqs: [
      { q: "How often should I service my roller shutter?", a: "We recommend bi-annual maintenance for residential shutters and quarterly servicing for high-traffic commercial installations." },
      { q: "Do you offer maintenance contracts?", a: "Yes, we offer annual maintenance contracts with priority scheduling and discounted rates." },
    ],
  },
  "sectional-doors": {
    title: "Sectional Doors Installation",
    description: "Insulated sectional overhead doors ideal for warehouses, showrooms, and residential properties. Space-saving vertical operation with excellent thermal performance.",
    details: [
      "Insulated sandwich panel construction",
      "Vertical lift, standard lift, or high lift options",
      "Manual and motorised operation",
      "Weather-sealed for energy efficiency",
      "Custom sizes and colour options",
    ],
    faqs: [
      { q: "What is the advantage of a sectional door over a roller shutter?", a: "Sectional doors offer better insulation, quieter operation, and a more finished aesthetic — ideal for showrooms and temperature-sensitive environments." },
      { q: "How much headroom is required?", a: "Standard installations require about 300mm of headroom. We offer low-headroom solutions for tighter spaces." },
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
