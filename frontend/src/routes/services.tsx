import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Scissors,
  Sprout,
  Droplets,
  TreePine,
  Wind,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const services = [
  {
    icon: Scissors,
    title: "Lawn Mowing & Maintenance",
    desc: "Precision mowing, edging, and trimming on a weekly or biweekly schedule for a consistently sharp lawn.",
  },
  {
    icon: Sprout,
    title: "Landscape Design & Installation",
    desc: "Custom planting beds, sod installation, and hardscaping designed to transform your property.",
  },
  {
    icon: Leaf,
    title: "Fertilization & Weed Control",
    desc: "Season-long treatment programs using eco-friendly products that keep turf thick and weed-free.",
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    desc: "Installation, tune-ups, and repair for sprinkler systems that keep every zone evenly watered.",
  },
  {
    icon: TreePine,
    title: "Tree & Shrub Care",
    desc: "Pruning, shaping, and health treatments to keep trees and shrubs strong through every season.",
  },
  {
    icon: Wind,
    title: "Seasonal Cleanup",
    desc: "Spring and fall cleanups — leaf removal, bed edging, and mulching to reset your property.",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pb-20 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Services
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Professional Lawn Care Solutions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Comprehensive lawn and landscape solutions tailored to your
              property's specific needs.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-3xl border border-primary/5 bg-background p-8 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
                >
                  <div className="mb-16 grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                  <Link
                    to="/booking"
                    className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:underline"
                  >
                    Book This Service
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              Not Sure Which Service You Need?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-primary-foreground/60">
              Contact us and we will help you find the perfect lawn care solution.
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-8 rounded-full px-10"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
