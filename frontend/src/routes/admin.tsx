import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post<{ access_token: string }>(
        "/auth/login",
        { email, password },
      );
      setToken(response.access_token);
      toast.success("Login successful!");
      navigate({ to: "/admin/dashboard" });
    } catch {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl bg-secondary p-10 shadow-2xl ring-1 ring-primary/5">
        <div className="mb-8 text-center">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin Login
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="grid size-10 place-items-center rounded-full bg-primary">
              <span className="size-3 rounded-full bg-accent" />
            </span>
            <div className="text-left">
              <span className="block font-display text-xl font-bold leading-tight">
                Crampton Admin
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="admin@cramptonllc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full py-6"
            size="lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
