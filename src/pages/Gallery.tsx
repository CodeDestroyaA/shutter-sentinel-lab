import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", caption: "Industrial roller shutter — Kempton Park warehouse" },
  { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop", caption: "Residential garage door installation — Bedfordview" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop", caption: "Commercial sectional door — Sandton office park" },
  { src: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=600&h=400&fit=crop", caption: "Automated roller shutter — Isando industrial complex" },
  { src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop", caption: "Double garage door upgrade — Edenvale residence" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", caption: "Sectional overhead door — Midrand distribution centre" },
];

const Gallery = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-12 bg-secondary">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-display text-sm tracking-[0.3em] text-primary mb-4 block">OUR WORK</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-4">Project Gallery</h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl">
              A showcase of roller shutter, garage door, and sectional door installations across Gauteng.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-lg overflow-hidden border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[3/2]">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Caption with dark gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-12 pb-4 px-4">
                  <p className="font-body text-sm text-white text-center">{item.caption}</p>
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

export default Gallery;
