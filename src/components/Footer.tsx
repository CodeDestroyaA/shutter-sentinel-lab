import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-secondary pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl font-bold text-secondary-foreground tracking-wider">
              CENTURY <span className="text-primary">ROLLER SHUTTER DOORS</span>
            </span>
            <p className="font-body text-secondary-foreground/60 mt-4 leading-relaxed">
              Century Roller Shutter Doors: South Africa's premier choice for industrial and residential entrance solutions. Serving the East Rand and greater Gauteng with 24/7 reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-secondary-foreground mb-4">QUICK LINKS</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Roller Shutter Installation", href: "/services/roller-shutters" },
                { label: "Roller Shutter Repairs", href: "/services/roller-shutter-repairs" },
                { label: "Roller Shutter Maintenance", href: "/services/roller-shutter-maintenance" },
                { label: "Sectional Doors", href: "/services/sectional-doors" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="font-body text-secondary-foreground/60 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-secondary-foreground mb-4">CONTACT</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-secondary-foreground/60">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="font-body">Serving Gauteng — East Rand &amp; Beyond</span>
              </div>
              <a href="tel:+27631843578" className="flex items-center gap-3 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="font-body">+27 63 184 3578</span>
              </a>
              <a href="mailto:info@centurydoors.co.za" className="flex items-center gap-3 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="font-body">info@centurydoors.co.za</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="font-body text-sm text-secondary-foreground/40">
            © 2026 Century Roller Shutter Doors. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
