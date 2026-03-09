import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Mokoena",
    location: "Kempton Park",
    text: "Century Doors installed a roller shutter at my warehouse in under a day. Professional team, fair price, and the shutter runs like a dream. Highly recommend.",
    rating: 5,
  },
  {
    name: "Priya Naidoo",
    location: "Sandton",
    text: "We needed sectional doors for our office park parking. The team was punctual, clean, and the finish is outstanding. Already referred them to two neighbours.",
    rating: 5,
  },
  {
    name: "Willem du Plessis",
    location: "Centurion",
    text: "Had an old roller shutter that kept jamming. Century Roller Shutter Doors replaced it with a modern motorised unit — the difference is night and day. Great after-sales support too.",
    rating: 5,
  },
  {
    name: "Thandi Sithole",
    location: "Midrand",
    text: "From quote to installation it took less than a week. The aluminium roller shutter looks fantastic and the motor is whisper-quiet. Five stars all round.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-display text-sm tracking-[0.3em] text-primary mb-4 block">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 border border-border relative"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-foreground/80 text-sm leading-relaxed mb-4">
                "{t.text}"
              </p>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
