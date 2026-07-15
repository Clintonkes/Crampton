import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CalendarDays, Loader2 } from "lucide-react";

export const Route = createFileRoute("/booking")({
  component: Booking,
});

const serviceTypes = [
  "Residential Deep Clean",
  "Turnover / Airbnb",
  "Post-Construction",
  "Clinical Office",
  "Move-In / Move-Out",
  "Recurring Care",
];

const timeSlots = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 5PM)",
  "Evening (5PM - 8PM)",
];

function Booking() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service_type: "",
    preferred_date: "",
    preferred_time: "",
    address: "",
    special_instructions: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/bookings", formData);
      toast.success(
        "Booking submitted successfully! We will contact you shortly.",
      );
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        service_type: "",
        preferred_date: "",
        preferred_time: "",
        address: "",
        special_instructions: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
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
              Booking
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Request Your Cleaning Service
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl bg-secondary p-8 ring-1 ring-primary/5 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name *
                    </label>
                    <Input
                      placeholder="John Smith"
                      value={formData.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
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
                <div className="grid gap-6 md:grid-cols-2">
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
                      Service Type *
                    </label>
                    <select
                      value={formData.service_type}
                      onChange={(e) => update("service_type", e.target.value)}
                      required
                      className="w-full rounded-xl border border-primary/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-accent"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Preferred Date *
                    </label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferred_date}
                      onChange={(e) => update("preferred_date", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Preferred Time *
                    </label>
                    <select
                      value={formData.preferred_time}
                      onChange={(e) => update("preferred_time", e.target.value)}
                      required
                      className="w-full rounded-xl border border-primary/10 bg-background px-4 py-3 text-sm outline-none transition focus:border-accent"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Service Address *
                  </label>
                  <Input
                    placeholder="123 Main St, Henderson, CO 80640"
                    value={formData.address}
                    onChange={(e) => update("address", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Special Instructions
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Any specific requirements or areas to focus on..."
                    value={formData.special_instructions}
                    onChange={(e) =>
                      update("special_instructions", e.target.value)
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full py-6 text-sm font-bold"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      Submit Booking Request
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
