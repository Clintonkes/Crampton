import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Leaf, Clock, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const reasons = [
    {
      title: "Trained Professionals",
      desc: "Our staff is thoroughly trained and background-checked for your security.",
    },
    {
      title: "Eco-Friendly Products",
      desc: "We use safe, effective cleaning products that are gentle on your family and the environment.",
    },
    {
      title: "Local & Reliable",
      desc: "Proudly serving the Henderson community with dependable, on-time service.",
    },
  ];

  const stats = [
    { value: "100%", label: "Satisfaction" },
    { value: "24/7", label: "Availability" },
    { value: "Fast", label: "Response" },
    { value: "Local", label: "Henderson, CO" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pb-20 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              About Us
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              About Crampton LLC
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Learn about our story, values, and commitment to excellence in
              cleaning.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  More Than a Decade of Excellence
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Founded with a commitment to excellence, Crampton LLC has built
                  a reputation as one of the leading providers of residential and
                  commercial cleaning solutions in Henderson, Colorado, and
                  surrounding areas.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Our focus is to listen to our clients, understand their needs,
                  and provide the exceptional level of service they deserve. Our
                  professional team uses eco-friendly products and advanced
                  techniques to ensure your space is not just clean, but truly
                  spotless.
                </p>
                <Button asChild className="mt-8 rounded-full" size="lg">
                  <Link to="/booking">Request a Free Estimate</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-accent/10 rotate-3" />
                <div className="relative rounded-3xl bg-background p-8 shadow-xl ring-1 ring-primary/5">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-secondary p-6 text-center"
                      >
                        <p className="font-display text-4xl font-bold text-accent">
                          {s.value}
                        </p>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Why Choose Crampton LLC?
              </h2>
              <p className="mt-4 text-muted-foreground">
                We are dedicated to delivering exceptional results with every
                visit.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6">
              {reasons.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-3xl bg-background p-6 ring-1 ring-primary/5"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold">
                      {r.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              Get a Free Estimate
            </h2>
            <p className="mx-auto mt-6 max-w-md text-primary-foreground/60">
              Contact us today and we will provide a free, no-obligation quote
              for your cleaning needs.
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-8 rounded-full px-10"
            >
              <Link to="/booking">Send a Request</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
