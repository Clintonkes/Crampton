import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const contacts = [
  {
    icon: Phone,
    title: "Phone",
    content: (
      <a
        href="tel:+17206018355"
        className="text-accent font-semibold hover:underline"
      >
        +1 (720) 601-8355
      </a>
    ),
  },
  {
    icon: MapPin,
    title: "Address",
    content: (
      <p className="text-muted-foreground">
        Henderson, CO 80640
      </p>
    ),
  },
  {
    icon: Clock,
    title: "Hours",
    content: (
      <p className="text-muted-foreground">
        Mon – Sat: 8:00 AM – 6:00 PM
        <br />
        Sun: By Appointment
      </p>
    ),
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    }
    setLoading(false);
  };

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pb-20 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Contact
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Have questions or ready to schedule? We are here to help.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-16 text-center">
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Send a Message
              </h2>
              <p className="mt-4 text-muted-foreground">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
            </div>
            <div className="rounded-3xl bg-secondary p-8 ring-1 ring-primary/5 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name *
                    </label>
                    <Input
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (720) 000-0000"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Subject *
                    </label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Your Message *
                  </label>
                  <Textarea
                    rows={6}
                    placeholder="Tell us about your cleaning needs..."
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-6 text-sm font-bold"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {contacts.map((c) => (
                <div
                  key={c.title}
                  className="rounded-3xl bg-secondary p-8 text-center ring-1 ring-primary/5 transition-all hover:border-accent/30"
                >
                  <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
                    <c.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {c.title}
                  </h3>
                  <div className="mt-2 text-sm">{c.content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
