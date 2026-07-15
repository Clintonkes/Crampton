import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
});

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "Crampton cleaned my home today — they did a terrific job. They even moved the furniture to be sure the floors were cleaned — they really paid attention to detail.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content:
      "We would like to thank Crampton for an outstanding effort on this recently completed project. The work was completed on time and exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Property Manager",
    content:
      "After our construction project, Crampton cleaned it all up perfectly. They got rid of all the dust and debris. Saved us so much time and stress!",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Office Manager",
    content:
      "Reliable, trustworthy, and excellent quality. We've been using them for monthly maintenance and couldn't be happier with the consistent results.",
    rating: 5,
  },
  {
    name: "Lisa Williams",
    role: "Homeowner",
    content:
      "The move-out cleaning they provided was incredible. Our landlord was impressed, and we got our full deposit back! Highly recommend their services.",
    rating: 5,
  },
  {
    name: "Robert Kim",
    role: "Restaurant Owner",
    content:
      "Professional team, great communication, and fantastic results. They showed up on time and left our space spotless. Five stars all around!",
    rating: 5,
  },
];

function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pb-20 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Testimonials
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              What Our Clients Say
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Don't just take our word for it — hear from our satisfied
              customers.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col justify-between rounded-3xl bg-secondary p-8 ring-1 ring-primary/5"
                >
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="size-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <blockquote className="font-display text-lg leading-snug">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 border-t border-primary/5 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-accent/10 text-accent">
                        <span className="text-sm font-bold">{t.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/booking">Join Our Happy Customers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
