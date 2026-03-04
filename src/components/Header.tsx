import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onQuoteClick: () => void;
}

const Header = ({ onQuoteClick }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Roller Shutters", href: "/services/roller-shutters" },
    { label: "Repairs", href: "/services/repairs" },
    { label: "Gate Motors", href: "/services/gate-motors" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground tracking-wider">
            CENTURY <span className="text-primary">DOORS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+27000000000" className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span className="font-body text-sm font-semibold">Call Us</span>
          </a>
          <Button onClick={onQuoteClick} className="font-display tracking-wider">
            Free Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-secondary-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-secondary pb-6">
          <nav className="container flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-sm tracking-widest text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={() => { onQuoteClick(); setMobileOpen(false); }} className="font-display tracking-wider mt-2">
              Free Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
