import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid size-7 place-items-center rounded-full bg-primary">
                <span className="size-2.5 rounded-full bg-accent" />
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-tight">
                Crampton LLC
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Medical-grade cleaning protocols for high-end residences, rentals,
              and commercial spaces in Henderson, CO.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
              Contact
            </h4>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="size-4" />
              <a href="tel:+17206018355" className="hover:text-accent transition-colors">
                +1 (720) 601-8355
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" />
              <span>Henderson, CO 80640</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-accent">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2">
              <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors">
                Services
              </Link>
              <Link to="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                Book a Clean
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/5 pt-8 md:flex-row">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Crampton LLC · All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent text-muted-foreground">
              Instagram
            </a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent text-muted-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
