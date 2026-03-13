import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import serviceRollerShutters from "@/assets/service-roller-shutters.jpg";
import serviceRepairs from "@/assets/service-roller-shutter-repairs.jpg";
import serviceMaintenance from "@/assets/service-roller-shutter-maintenance.jpg";
import serviceSectional from "@/assets/service-sectional-doors.jpg";

const serviceImages: Record<string, { src: string; alt: (area: string) => string }> = {
  "roller-shutters": { src: serviceRollerShutters, alt: (a) => `Roller shutter installation in ${a}, Gauteng` },
  "roller-shutter-repairs": { src: serviceRepairs, alt: (a) => `Roller shutter repair service in ${a}` },
  "roller-shutter-maintenance": { src: serviceMaintenance, alt: (a) => `Roller shutter maintenance in ${a}` },
  "sectional-doors": { src: serviceSectional, alt: (a) => `Sectional door installation in ${a}` },
};

const serviceData: Record<string, { title: string; shortTitle: string; description: (area: string) => string; details: string[]; faqs: { q: string; a: string }[] }> = {
  "roller-shutters": {
    title: "Roller Shutter Installation",
    shortTitle: "Roller Shutters",
    description: (a) => `Professional roller shutter installation in ${a}. Custom-measured steel and aluminium roller shutters for commercial and residential properties. Century Doors delivers expert fitting with full warranty across ${a} and surrounds.`,
    details: ["Custom measurements and fabrication", "Steel and aluminium options", "Manual and motorised operation", "Commercial and residential applications", "Full warranty on all installations"],
    faqs: [
      { q: "How long does installation take?", a: "Most installations are completed within a single day. Larger projects may require 2-3 days." },
      { q: "Do you offer motorised roller shutters?", a: "Yes, we install both manual and motorised systems with remote control and smartphone integration." },
    ],
  },
  "roller-shutter-repairs": {
    title: "Roller Shutter Repairs",
    shortTitle: "Repairs",
    description: (a) => `Fast roller shutter repairs in ${a}. Emergency and scheduled repair services for jammed, rusted, or broken roller shutters. Century Doors provides rapid-response repairs across ${a}.`,
    details: ["Emergency after-hours service", "Spring and motor replacements", "Rust treatment and panel repairs", "Track realignment and lubrication", "All brands serviced"],
    faqs: [
      { q: "Do you offer emergency repairs?", a: "Yes, contact us for urgent assistance any time." },
      { q: "How quickly can you respond?", a: "We aim to be on-site within 2-4 hours for emergency calls." },
    ],
  },
  "roller-shutter-maintenance": {
    title: "Roller Shutter Maintenance",
    shortTitle: "Maintenance",
    description: (a) => `Preventive roller shutter maintenance in ${a}. Scheduled maintenance programs to extend lifespan, reduce breakdowns, and keep your property secure year-round.`,
    details: ["Scheduled preventive maintenance", "Full mechanical and electrical inspections", "Lubrication and tension adjustments", "Safety compliance checks", "Detailed maintenance reports"],
    faqs: [
      { q: "How often should I service my roller shutter?", a: "Bi-annual for residential, quarterly for high-traffic commercial." },
      { q: "Do you offer maintenance contracts?", a: "Yes, annual contracts with priority scheduling and discounted rates." },
    ],
  },
  "sectional-doors": {
    title: "Sectional Doors Installation",
    shortTitle: "Sectional Doors",
    description: (a) => `Sectional overhead door installation in ${a}. Insulated sectional doors ideal for warehouses, showrooms, and homes. Space-saving vertical operation with excellent thermal performance.`,
    details: ["Insulated sandwich panel construction", "Vertical, standard, or high lift options", "Manual and motorised operation", "Weather-sealed for energy efficiency", "Custom sizes and colours"],
    faqs: [
      { q: "What's the advantage over roller shutters?", a: "Better insulation, quieter operation, and a more finished aesthetic." },
      { q: "How much headroom is needed?", a: "About 300mm standard. We offer low-headroom solutions too." },
    ],
  },
};

const areaNames: Record<string, string> = {
  "kempton-park": "Kempton Park", isando: "Isando", "jet-park": "Jet Park", spartan: "Spartan",
  chloorkop: "Chloorkop", edenvale: "Edenvale", bedfordview: "Bedfordview", benoni: "Benoni",
  boksburg: "Boksburg", brentwood: "Brentwood", "beyers-park": "Beyers Park",
  sandton: "Sandton", midrand: "Midrand", centurion: "Centurion", johannesburg: "Johannesburg",
  pomona: "Pomona", germiston: "Germiston",
};

const AreaServicePage = () => {
  const { areaSlug, serviceSlug } = useParams<{ areaSlug: string; serviceSlug: string }>();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const areaName = areaSlug ? areaNames[areaSlug] : undefined;
  const service = serviceSlug ? serviceData[serviceSlug] : undefined;
  const image = serviceSlug ? serviceImages[serviceSlug] : undefined;

  if (!areaName || !service) return <Navigate to="/" replace />;

  const pageTitle = `${service.title} in ${areaName}`;

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-20 bg-secondary">
        <div className="container">
          <Link to={`/areas/${areaSlug}`} className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" /> Back to {areaName}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-display text-sm tracking-[0.3em] text-primary">{areaName.toUpperCase()}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">{pageTitle}</h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl leading-relaxed">{service.description(areaName)}</p>
          </motion.div>
        </div>
      </section>

      {image && (
        <section className="bg-background">
          <div className="container max-w-4xl py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border border-border">
                <img src={image.src} alt={image.alt(areaName)} className="w-full h-full object-cover" loading="lazy" width={1280} height={720} />
              </AspectRatio>
            </motion.div>
          </div>
        </section>
      )}

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
                Get a Quote in {areaName}
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

export default AreaServicePage;
