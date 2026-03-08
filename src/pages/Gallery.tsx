import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
}

// Fallback images when DB is empty
const fallbackItems = [
  { id: "f1", title: "Industrial roller shutter — Kempton Park warehouse", description: null, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
  { id: "f2", title: "Residential garage door installation — Bedfordview", description: null, image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop" },
  { id: "f3", title: "Commercial sectional door — Sandton office park", description: null, image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" },
  { id: "f4", title: "Automated roller shutter — Isando industrial complex", description: null, image_url: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=600&h=400&fit=crop" },
  { id: "f5", title: "Double garage door upgrade — Edenvale residence", description: null, image_url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop" },
  { id: "f6", title: "Sectional overhead door — Midrand distribution centre", description: null, image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
];

const Gallery = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>(fallbackItems);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("id, title, description, image_url")
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) setImages(data);
    };
    load();
  }, []);

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
            {images.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-lg overflow-hidden border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[3/2]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-12 pb-4 px-4">
                  <p className="font-body text-sm text-white text-center">{item.title}</p>
                  {item.description && (
                    <p className="font-body text-xs text-white/70 text-center mt-1">{item.description}</p>
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

export default Gallery;
