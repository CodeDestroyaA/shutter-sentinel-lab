import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Wrench, Settings, Layers } from "lucide-react";

const services = [
  {
    icon: Lock,
    title: "Roller Shutter Installations",
    description: "Custom-fit, heavy-duty security for shopfronts, warehouses, and residential properties. High-grade steel and aluminium options.",
    href: "/services/roller-shutters",
  },
  {
    icon: Wrench,
    title: "Roller Shutter Repairs",
    description: "Quick fixes for jammed, rusted, or noisy shutters. Emergency service available when security can't wait.",
    href: "/services/roller-shutter-repairs",
  },
  {
    icon: Settings,
    title: "Roller Shutter Maintenance",
    description: "Preventive maintenance programs to extend shutter lifespan, reduce breakdowns, and keep your property secure year-round.",
    href: "/services/roller-shutter-maintenance",
  },
  {
    icon: Layers,
    title: "Sectional Doors Installation",
    description: "Insulated sectional overhead doors for warehouses, showrooms, and homes. Space-saving and thermally efficient.",
    href: "/services/sectional-doors",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary mb-4 block">WHAT WE DO</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Our Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={service.href}
                className="group block bg-card rounded-lg p-8 h-full border border-border hover:border-primary/50 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <span className="inline-flex items-center gap-2 font-display text-sm tracking-wider text-primary group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
