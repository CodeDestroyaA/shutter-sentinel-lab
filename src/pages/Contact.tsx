import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("");
  const { toast } = useToast();

  const info = [
    { icon: MapPin, label: "Location", value: "Serving Gauteng — East Rand & Beyond" },
    { icon: Phone, label: "Phone", value: "+27 63 184 3578", href: "tel:+27631843578" },
    { icon: Mail, label: "Email", value: "info@centurydoors.co.za", href: "mailto:info@centurydoors.co.za" },
    { icon: Clock, label: "Hours", value: "Mon–Fri 7am–5pm, Sat 8am–1pm" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      propertyType,
      service: formData.get("service") as string,
      area: formData.get("area") as string,
      message: formData.get("message") as string,
      formType: "contact",
    };

    try {
      await supabase.functions.invoke("send-form-email", { body: payload });
    } catch (err) {
      console.error("Email send error:", err);
    }

    setLoading(false);
    setSubmitted(true);
    setPropertyType("");
    toast({
      title: "Message Sent! ✅",
      description: "Thank you for reaching out. We'll respond within 24 hours.",
    });
  };

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
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground tracking-wider">Get In Touch</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {info.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-lg border border-border p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground tracking-wider">Message Sent!</h3>
                  <p className="font-body text-muted-foreground max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="font-display tracking-wider mt-4">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-foreground tracking-wider mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder="Your Name" required maxLength={100} className="font-body" />
                    <Input name="phone" type="tel" placeholder="Phone Number" required className="font-body" />
                    <Input name="email" type="email" placeholder="Email Address" className="font-body" />

                    <div className="space-y-2">
                      <Label className="font-display text-sm tracking-wider">Property Type</Label>
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="contact-residential"
                            checked={propertyType === "residential"}
                            onCheckedChange={() => setPropertyType(propertyType === "residential" ? "" : "residential")}
                          />
                          <Label htmlFor="contact-residential" className="font-body text-sm cursor-pointer">Residential</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="contact-commercial"
                            checked={propertyType === "commercial"}
                            onCheckedChange={() => setPropertyType(propertyType === "commercial" ? "" : "commercial")}
                          />
                          <Label htmlFor="contact-commercial" className="font-body text-sm cursor-pointer">Commercial</Label>
                        </div>
                      </div>
                    </div>

                    <Select name="service">
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Service Required" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shutter-install">Roller Shutter Install</SelectItem>
                        <SelectItem value="shutter-repair">Roller Shutter Repair</SelectItem>
                        <SelectItem value="shutter-maintenance">Roller Shutter Maintenance</SelectItem>
                        <SelectItem value="sectional-door">Sectional Door Install</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select name="area">
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Your Area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kempton-park">Kempton Park</SelectItem>
                        <SelectItem value="isando">Isando</SelectItem>
                        <SelectItem value="jet-park">Jet Park</SelectItem>
                        <SelectItem value="spartan">Spartan</SelectItem>
                        <SelectItem value="edenvale">Edenvale</SelectItem>
                        <SelectItem value="bedfordview">Bedfordview</SelectItem>
                        <SelectItem value="benoni">Benoni</SelectItem>
                        <SelectItem value="boksburg">Boksburg</SelectItem>
                        <SelectItem value="sandton">Sandton</SelectItem>
                        <SelectItem value="midrand">Midrand</SelectItem>
                        <SelectItem value="centurion">Centurion</SelectItem>
                        <SelectItem value="johannesburg">Johannesburg</SelectItem>
                        <SelectItem value="pomona">Pomona</SelectItem>
                        <SelectItem value="germiston">Germiston</SelectItem>
                        <SelectItem value="chloorkop">Chloorkop</SelectItem>
                        <SelectItem value="brentwood">Brentwood</SelectItem>
                        <SelectItem value="beyers-park">Beyers Park</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea name="message" placeholder="Briefly describe your needs..." maxLength={1000} rows={4} className="font-body" />

                    <Button type="submit" className="w-full font-display tracking-wider" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default Contact;
