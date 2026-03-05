import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const info = [
    { icon: MapPin, label: "Location", value: "Serving Gauteng — East Rand & Beyond" },
    { icon: Phone, label: "Phone", value: "+27 63 184 3578", href: "tel:+27631843578" },
    { icon: Mail, label: "Email", value: "info@centurydoors.co.za", href: "mailto:info@centurydoors.co.za" },
    { icon: Clock, label: "Hours", value: "Mon–Fri 7am–5pm, Sat 8am–1pm" },
  ];

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-20 bg-secondary">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-6">Contact Us</h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl">
              Ready to secure your property? Get in touch and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-8">
            {info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-wider text-foreground mb-1">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="font-body text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default Contact;
