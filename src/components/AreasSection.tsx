import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const areas = ["Kempton Park", "Isando", "Jet Park", "Spartan", "Edenvale", "Bedfordview", "Benoni", "Boksburg", "Sandton", "Midrand", "Centurion", "Johannesburg", "Pomona", "Germiston", "Chloorkop", "Brentwood", "Beyers Park"];

const AreasSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary mb-4 block">SERVICE AREAS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">Proudly Serving Gauteng</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {areas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-full px-6 py-3"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-display text-sm tracking-wider text-secondary-foreground">{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
