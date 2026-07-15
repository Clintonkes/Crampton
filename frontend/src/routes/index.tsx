import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Home,
  Hammer,
  Truck,
  Leaf,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        <Hero />
        <LogosStrip />
        <Services />
        <Protocol />
        <Process />
        <Testimonials />
        <ServiceAreas />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-secondary pb-32 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="block size-1.5 rounded-full bg-accent" />
              Serving Henderson, CO & Denver Metro
            </div>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The gold standard in{" "}
              <span className="text-muted-foreground">property care.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Crampton LLC provides medical-grade cleaning protocols for
              high-end residential and commercial estates. We don't just clean;
              we restore.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#services">
                  View Service Tiers <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <a href="#contact">Get a Free Estimate</a>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -bottom-8 -left-8 rounded-2xl bg-background p-6 shadow-2xl md:p-8">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-accent/20 text-accent">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">99.8%</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sanitization Rate
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 rounded-2xl bg-primary p-5 text-primary-foreground shadow-2xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-accent" />
                <div>
                  <p className="text-xs font-semibold">Insured & Bonded</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">
                    Up to $2M coverage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const items = [
    { icon: ShieldCheck, label: "Fully Insured & Bonded" },
    { icon: Leaf, label: "Eco-Certified Solvents" },
    { icon: Award, label: "5-Star Client Rated" },
    { icon: Clock, label: "24/7 Turnover Support" },
  ];
  return (
    <section className="border-y border-primary/5 bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 md:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground"
          >
            <Icon className="size-4 text-accent" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

const services = [
  {
    icon: Home,
    title: "Residential Deep Clean",
    desc: "Meticulous top-to-bottom cleans for private homes, condos, and estates — from baseboards to backsplashes.",
  },
  {
    icon: Truck,
    title: "Turnover Elite",
    desc: "Rapid, high-precision cleaning for luxury rental units and Airbnbs with same-day support.",
  },
  {
    icon: Hammer,
    title: "Post-Construction",
    desc: "Industrial-grade dust extraction and finish detailing for newly completed developments.",
  },
  {
    icon: Building2,
    title: "Clinical Office",
    desc: "Hospital-level sanitation for high-traffic corporate workspaces and medical facilities.",
  },
  {
    icon: Sparkles,
    title: "Move-In / Move-Out",
    desc: "Handover-ready cleans that stand up to landlord walk-throughs and buyer inspections.",
  },
  {
    icon: Leaf,
    title: "Green Recurring Care",
    desc: "Weekly, biweekly, or monthly programs using non-toxic, pet- and child-safe products.",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              What we do
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Specialized Programs
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our proprietary cleaning sequences are designed for specific
              environmental needs — never one-size-fits-all.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-primary/5 bg-background p-8 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
            >
              <div className="mb-16 grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
              <div className="mt-8 h-1 w-full overflow-hidden bg-secondary">
                <div className="h-full w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Protocol() {
  const items = [
    {
      title: "HEPA Filtration Only",
      desc: "We capture 99.97% of particles down to 0.3 microns — every job, every time.",
    },
    {
      title: "Non-Toxic Bio-Solutions",
      desc: "Proprietary eco-friendly agents that outperform harsh chemicals without the residue.",
    },
    {
      title: "Double-Check Validation",
      desc: "Every job site is inspected by a lead supervisor before the keys go back.",
    },
  ];
  return (
    <section id="protocol" className="bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            The Method
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
            The Crampton Protocol
          </h2>
          <p className="mt-6 text-primary-foreground/60 max-w-xl">
            Unlike standard cleaning services, our staff undergoes 40 hours of
            rigorous procedural training before their first site visit.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-primary-foreground/60">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", title: "Book online", desc: "Share your property details and preferred window in under 60 seconds." },
    { n: "02", title: "Site walkthrough", desc: "We identify delicate surfaces, high-traffic zones, and special requests." },
    { n: "03", title: "Protocol clean", desc: "A trained team executes our multi-point sequence with HEPA equipment." },
    { n: "04", title: "Supervisor sign-off", desc: "A lead inspects every room before we hand the space back to you." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Four steps to a spotless handover.
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative border-t border-primary/10 pt-6">
              <span className="font-display text-5xl font-light text-accent">{s.n}</span>
              <h4 className="mt-4 font-display text-xl font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      quote:
        "Crampton turned a five-property portfolio around in a single afternoon. Guests noticed immediately — our review scores jumped within a month.",
      name: "Marissa Vale",
      role: "Boutique STR Operator",
    },
    {
      quote:
        "The most professional cleaning team we've ever hired. They treated our office like a surgical suite — and it shows.",
      name: "Daniel Reyes",
      role: "Practice Manager, Northline Dental",
    },
    {
      quote:
        "After a full renovation, every other crew left dust behind. Crampton was the first to actually finish the job.",
      name: "Alicia Chen",
      role: "Homeowner, Bridgewater",
    },
  ];
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Client stories
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Trusted by owners who don't compromise.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col justify-between rounded-3xl bg-background p-8 shadow-sm ring-1 ring-primary/5"
            >
              <blockquote className="font-display text-lg leading-snug">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-primary/5 pt-4">
                <p className="text-sm font-semibold">{q.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  const areas = [
    "Henderson",
    "Denver",
    "Thornton",
    "Northglenn",
    "Brighton",
    "Commerce City",
    "Arvada",
    "Westminster",
  ];
  return (
    <section id="areas" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Coverage
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Where we work.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Serving the Denver metro area with same-week availability. Outside
              our footprint? Ask — we travel for the right project.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-primary/10 sm:grid-cols-4">
            {areas.map((a) => (
              <li
                key={a}
                className="flex items-center gap-2 bg-background px-5 py-6 text-sm font-medium"
              >
                <MapPin className="size-4 text-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "Residential Deep Clean",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Quote Request — ${formData.service_type}`,
        message: formData.message,
      });
      toast.success("Thanks — we'll be in touch within 4 business hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service_type: "Residential Deep Clean",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Get a quote
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Ready for a spotless handover?
            </h2>
            <p className="mt-6 max-w-md text-primary-foreground/60">
              Send a few details about your property and we'll respond within 4
              business hours with a tailored estimate.
            </p>
            <ul className="mt-10 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-accent" />
                +1 (720) 601-8355
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-accent" />
                info@cramptonllc.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-accent" />
                Mon–Sat · 8:00am – 6:00pm
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-background p-8 text-foreground shadow-2xl"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Full name
                </label>
                <Input
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Phone
                </label>
                <Input
                  placeholder="(720) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Service type
              </label>
              <select
                value={formData.service_type}
                onChange={(e) =>
                  setFormData({ ...formData, service_type: e.target.value })
                }
                required
                className="w-full rounded-xl border border-primary/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-accent"
              >
                <option>Residential Deep Clean</option>
                <option>Turnover / Airbnb</option>
                <option>Post-Construction</option>
                <option>Commercial / Office</option>
                <option>Move-In / Move-Out</option>
                <option>Recurring Care</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Tell us about the space
              </label>
              <Textarea
                rows={4}
                placeholder="Square footage, address, timing…"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>
            <Button
              type="submit"
              className="mt-6 w-full rounded-full py-6 text-sm font-bold"
              size="lg"
              disabled={loading}
            >
              {loading ? "Sending…" : (
                <>
                  Request my estimate <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
