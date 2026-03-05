import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Shield, Wrench, DoorOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";

const areaData: Record<string, { name: string; description: string }> = {
  "kempton-park": {
    name: "Kempton Park",
    description: "As Kempton Park's trusted entrance solution specialists, we've been securing businesses and homes across the area for years. From OR Tambo industrial parks to residential estates, we deliver expert installation and reliable repairs.",
  },
  isando: {
    name: "Isando",
    description: "Isando's industrial hub demands heavy-duty security solutions. We provide custom roller shutter, garage door, and sectional door installations plus rapid-response repairs for warehouses, factories, and commercial premises.",
  },
  "jet-park": {
    name: "Jet Park",
    description: "Jet Park businesses rely on Century Doors for robust entrance security. We understand the unique needs of this industrial precinct and deliver tailored solutions with minimal disruption.",
  },
  spartan: {
    name: "Spartan",
    description: "Serving the Spartan industrial and residential community with professional roller shutter, garage door, and sectional door installations. Fast response times and quality workmanship you can count on.",
  },
  edenvale: {
    name: "Edenvale",
    description: "Century Doors brings premium entrance solutions to Edenvale's residential and commercial properties. From automated garage doors to industrial roller shutters, we've got Edenvale covered.",
  },
  bedfordview: {
    name: "Bedfordview",
    description: "Bedfordview's upmarket homes and business parks deserve top-tier entrance solutions. We deliver stylish, secure garage doors and heavy-duty roller shutters across the area.",
  },
  benoni: {
    name: "Benoni",
    description: "From the Lake District to the industrial zones, Benoni trusts Century Doors for reliable roller shutter installations, garage doors, and emergency repair services.",
  },
  boksburg: {
    name: "Boksburg",
    description: "Century Doors is proud to serve Boksburg with professional roller shutter and garage door solutions. Industrial, commercial, and residential — we do it all.",
  },
  sandton: {
    name: "Sandton",
    description: "Africa's richest square mile deserves Africa's best entrance solutions. Century Doors provides premium installations and maintenance across Sandton's commercial and residential landscape.",
  },
  midrand: {
    name: "Midrand",
    description: "Strategically positioned between Johannesburg and Pretoria, Midrand's booming business parks and estates trust Century Doors for all their entrance security needs.",
  },
  centurion: {
    name: "Centurion",
    description: "Century Doors extends its reach to Centurion with full-service roller shutter, garage door, and sectional door solutions. Quality workmanship with rapid response times.",
  },
};

const AreaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const area = slug ? areaData[slug] : undefined;
  if (!area) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-20 bg-secondary">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-display text-sm tracking-[0.3em] text-primary">SERVICE AREA</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">
              Entrance Solutions in {area.name}
            </h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl leading-relaxed">{area.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">Our Services in {area.name}</h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { href: "/services/roller-shutters", icon: Shield, title: "Roller Shutters", desc: "Custom roller shutter installations for commercial and residential properties." },
                { href: "/services/repairs", icon: Wrench, title: "Repairs & Maintenance", desc: "Emergency repairs and scheduled maintenance to keep you secure." },
                { href: "/services/garage-doors", icon: DoorOpen, title: "Garage Doors", desc: "Professional garage door installations — tip-up, roll-up, and automated." },
                { href: "/services/sectional-doors", icon: Layers, title: "Sectional Doors", desc: "Insulated sectional overhead doors for warehouses and homes." },
              ].map((svc) => (
                <Link
                  key={svc.href}
                  to={svc.href}
                  className="group flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <svc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{svc.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{svc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Button onClick={() => setQuoteOpen(true)} className="font-display tracking-wider">
              Get a Free Quote in {area.name}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default AreaPage;
