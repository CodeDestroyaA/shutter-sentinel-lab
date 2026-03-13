import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onQuoteClick: () => void;
}

const serviceItems = [
  { label: "Roller Shutter Installation", slug: "roller-shutters", href: "/services/roller-shutters" },
  { label: "Roller Shutter Repairs", slug: "roller-shutter-repairs", href: "/services/roller-shutter-repairs" },
  { label: "Roller Shutter Maintenance", slug: "roller-shutter-maintenance", href: "/services/roller-shutter-maintenance" },
  { label: "Sectional Doors Installation", slug: "sectional-doors", href: "/services/sectional-doors" },
];

const areaGroups = [
  {
    heading: "Local Hubs",
    items: [
      { label: "Kempton Park", slug: "kempton-park" },
      { label: "Isando", slug: "isando" },
      { label: "Jet Park", slug: "jet-park" },
      { label: "Spartan", slug: "spartan" },
      { label: "Chloorkop", slug: "chloorkop" },
    ],
  },
  {
    heading: "Expansion Areas",
    items: [
      { label: "Edenvale", slug: "edenvale" },
      { label: "Bedfordview", slug: "bedfordview" },
      { label: "Benoni", slug: "benoni" },
      { label: "Boksburg", slug: "boksburg" },
      { label: "Brentwood", slug: "brentwood" },
      { label: "Beyers Park", slug: "beyers-park" },
    ],
  },
  {
    heading: "Gauteng Powerhouses",
    items: [
      { label: "Sandton", slug: "sandton" },
      { label: "Midrand", slug: "midrand" },
      { label: "Centurion", slug: "centurion" },
      { label: "Johannesburg", slug: "johannesburg" },
      { label: "Pomona", slug: "pomona" },
      { label: "Germiston", slug: "germiston" },
    ],
  },
];

const Header = ({ onQuoteClick }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreaExpanded, setMobileAreaExpanded] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground tracking-wider">
            CENTURY <span className="text-primary">ROLLER SHUTTER DOORS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors">Home</Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
              Services <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-secondary border border-secondary-foreground/10 rounded-lg p-2 min-w-[220px] shadow-lg">
                {serviceItems.map((item) => (
                  <Link key={item.href} to={item.href} className="block px-4 py-2.5 rounded-md font-body text-sm text-secondary-foreground/70 hover:text-primary hover:bg-secondary-foreground/5 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Areas Mega Dropdown with service sub-links */}
          <div className="relative group">
            <button className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
              Areas <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-secondary border border-secondary-foreground/10 rounded-lg p-4 min-w-[560px] shadow-lg grid grid-cols-3 gap-4">
                {areaGroups.map((group) => (
                  <div key={group.heading}>
                    <span className="font-display text-xs tracking-[0.2em] text-primary mb-2 block">{group.heading}</span>
                    {group.items.map((item) => (
                      <div key={item.slug} className="relative group/area">
                        <Link
                          to={`/areas/${item.slug}`}
                          className="block px-2 py-1.5 rounded-md font-body text-sm text-secondary-foreground/70 hover:text-primary hover:bg-secondary-foreground/5 transition-colors flex items-center justify-between"
                        >
                          {item.label}
                          <ChevronDown className="w-3 h-3 -rotate-90" />
                        </Link>
                        {/* Service sub-dropdown */}
                        <div className="absolute left-full top-0 ml-1 opacity-0 invisible group-hover/area:opacity-100 group-hover/area:visible transition-all duration-200 z-10">
                          <div className="bg-secondary border border-secondary-foreground/10 rounded-lg p-2 min-w-[220px] shadow-lg">
                            {serviceItems.map((svc) => (
                              <Link
                                key={svc.slug}
                                to={`/areas/${item.slug}/${svc.slug}`}
                                className="block px-4 py-2 rounded-md font-body text-xs text-secondary-foreground/60 hover:text-primary hover:bg-secondary-foreground/5 transition-colors"
                              >
                                {svc.label} in {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link to="/gallery" className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors">Gallery</Link>
          <Link to="/blog" className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors">Blog</Link>
          <Link to="/contact" className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+27631843578" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span className="font-body text-sm font-semibold">Call Us</span>
          </a>
          <Button onClick={onQuoteClick} className="font-display tracking-wider">Free Quote</Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-secondary-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary pb-6 max-h-[80vh] overflow-y-auto">
          <nav className="container flex flex-col gap-1 pt-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2">Home</Link>

            {/* Mobile Services */}
            <button onClick={() => setServicesOpen(!servicesOpen)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between">
              Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 flex flex-col gap-1">
                {serviceItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="font-body text-sm text-secondary-foreground/60 hover:text-primary transition-colors py-1.5">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Areas with service sub-links */}
            <button onClick={() => setAreasOpen(!areasOpen)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between">
              Areas <ChevronDown className={`w-4 h-4 transition-transform ${areasOpen ? "rotate-180" : ""}`} />
            </button>
            {areasOpen && (
              <div className="pl-4 flex flex-col gap-1">
                {areaGroups.map((group) => (
                  <div key={group.heading}>
                    <span className="font-display text-xs tracking-[0.15em] text-primary mt-2 mb-1 block">{group.heading}</span>
                    {group.items.map((item) => (
                      <div key={item.slug}>
                        <button
                          onClick={() => setMobileAreaExpanded(mobileAreaExpanded === item.slug ? null : item.slug)}
                          className="font-body text-sm text-secondary-foreground/60 hover:text-primary transition-colors py-1.5 w-full flex items-center justify-between"
                        >
                          {item.label}
                          <ChevronDown className={`w-3 h-3 transition-transform ${mobileAreaExpanded === item.slug ? "rotate-180" : ""}`} />
                        </button>
                        {mobileAreaExpanded === item.slug && (
                          <div className="pl-4 flex flex-col gap-0.5">
                            <Link to={`/areas/${item.slug}`} onClick={() => setMobileOpen(false)} className="font-body text-xs text-secondary-foreground/50 hover:text-primary py-1">
                              All services in {item.label}
                            </Link>
                            {serviceItems.map((svc) => (
                              <Link key={svc.slug} to={`/areas/${item.slug}/${svc.slug}`} onClick={() => setMobileOpen(false)} className="font-body text-xs text-secondary-foreground/50 hover:text-primary py-1">
                                {svc.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <Link to="/gallery" onClick={() => setMobileOpen(false)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2">Gallery</Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2">Blog</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors py-2">Contact</Link>

            <Button onClick={() => { onQuoteClick(); setMobileOpen(false); }} className="font-display tracking-wider mt-3">Free Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
