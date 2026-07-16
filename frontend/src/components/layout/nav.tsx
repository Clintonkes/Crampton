import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary">
            <span className="size-3 rounded-full bg-accent" />
          </span>
          <span className="truncate font-display text-lg font-bold uppercase tracking-tight">
            Crampton Rentals LLC
          </span>
        </Link>

        <div className="hidden space-x-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/booking"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:bg-primary/90 md:block md:px-6"
        >
          Book a Clean
        </Link>

        <button
          className="ml-auto text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary/5 bg-background px-6 py-4 lg:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/booking"
              className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              Book a Clean
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
