import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

const PAGE_SIZE = 10;

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  special_instructions: string;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_responded: boolean;
  created_at: string;
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusBadge(status: string) {
  const s = String(status || "").toLowerCase();
  if (s === "completed") return "bg-emerald-100 text-emerald-700";
  if (s === "approved") return "bg-accent/20 text-accent";
  if (s === "canceled") return "bg-red-100 text-red-700";
  return "bg-secondary text-muted-foreground";
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "messages">("dashboard");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [messagesPage, setMessagesPage] = useState(1);
  const [bookingData, setBookingData] = useState<PaginatedResponse<Booking>>({
    items: [], total: 0, page: 1, limit: PAGE_SIZE, total_pages: 1,
  });
  const [messageData, setMessageData] = useState<PaginatedResponse<ContactMessage>>({
    items: [], total: 0, page: 1, limit: PAGE_SIZE, total_pages: 1,
  });
  const [counts, setCounts] = useState({ bookings: 0, messages: 0 });
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: "booking" | "message" | null;
    loading: boolean;
    data: Booking | ContactMessage | null;
  }>({ open: false, type: null, loading: false, data: null });
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const token = getToken();

  const loadDashboardCounts = async () => {
    const [bookings, messages] = await Promise.all([
      api.get<PaginatedResponse<Booking>>("/bookings?page=1&limit=1"),
      api.get<PaginatedResponse<ContactMessage>>("/contact?page=1&limit=1"),
    ]);
    setCounts({ bookings: bookings.total || 0, messages: messages.total || 0 });
  };

  const loadTabData = async () => {
    setLoading(true);
    try {
      if (activeTab === "dashboard") {
        await loadDashboardCounts();
      } else if (activeTab === "bookings") {
        const data = await api.get<PaginatedResponse<Booking>>(
          `/bookings?page=${bookingsPage}&limit=${PAGE_SIZE}`,
        );
        setBookingData(data);
      } else if (activeTab === "messages") {
        const data = await api.get<PaginatedResponse<ContactMessage>>(
          `/contact?page=${messagesPage}&limit=${PAGE_SIZE}`,
        );
        setMessageData(data);
      }
    } catch {
      toast.error("Failed to load admin records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate({ to: "/admin" });
      return;
    }
    setAuthChecked(true);
  }, [navigate, token]);

  useEffect(() => {
    if (!authChecked) return;
    loadTabData();
  }, [activeTab, bookingsPage, messagesPage, authChecked]);

  const refreshCurrentTab = async () => {
    if (activeTab === "dashboard") {
      await loadDashboardCounts();
      return;
    }
    if (activeTab === "bookings") {
      const data = await api.get<PaginatedResponse<Booking>>(
        `/bookings?page=${bookingsPage}&limit=${PAGE_SIZE}`,
      );
      setBookingData(data);
      return;
    }
    if (activeTab === "messages") {
      const data = await api.get<PaginatedResponse<ContactMessage>>(
        `/contact?page=${messagesPage}&limit=${PAGE_SIZE}`,
      );
      setMessageData(data);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/status?status=${encodeURIComponent(status)}`);
      toast.success(`Booking marked as ${status}`);
      await refreshCurrentTab();
      if (modalState.open && modalState.type === "booking" && (modalState.data as Booking)?.id === bookingId) {
        setModalState((current) => ({
          ...current,
          data: { ...current.data!, status } as Booking,
        }));
      }
    } catch {
      toast.error("Failed to update booking status");
    }
  };

  const openRecord = async (type: "booking" | "message", record: Booking | ContactMessage) => {
    setModalState({ open: true, type, loading: true, data: null });
    try {
      let data = record;
      if (type === "booking") {
        data = await api.get<Booking>(`/bookings/${record.id}`);
      } else if (type === "message") {
        data = await api.get<ContactMessage>(`/contact/${record.id}`);
      }
      setModalState({ open: true, type, loading: false, data });
      if (type === "message") {
        await refreshCurrentTab();
      }
    } catch {
      toast.error("Failed to open record");
      setModalState({ open: false, type: null, loading: false, data: null });
    }
  };

  const handleLogout = () => setLogoutModalOpen(true);

  const confirmLogout = () => {
    removeToken();
    setLogoutModalOpen(false);
    navigate({ to: "/admin" });
  };

  const Pagination = ({
    page,
    totalPages,
    total,
    onPrev,
    onNext,
  }: {
    page: number;
    totalPages: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
  }) => (
    <div className="flex items-center justify-between gap-3 mt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} total records
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={page <= 1}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={page >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-secondary p-6 text-center ring-1 ring-primary/5">
        <h3 className="font-display text-lg font-semibold">Total Bookings</h3>
        <p className="mt-2 font-display text-4xl font-bold text-accent">{counts.bookings}</p>
      </div>
      <div className="rounded-3xl bg-secondary p-6 text-center ring-1 ring-primary/5">
        <h3 className="font-display text-lg font-semibold">Contact Messages</h3>
        <p className="mt-2 font-display text-4xl font-bold text-accent">{counts.messages}</p>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="rounded-3xl bg-secondary ring-1 ring-primary/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="border-b border-primary/5 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {bookingData.items.map((booking) => (
              <tr key={booking.id} className="hover:bg-background/50">
                <td className="px-4 py-4">
                  <div className="font-semibold">{booking.full_name}</div>
                  <div className="text-sm text-muted-foreground">{booking.email}</div>
                </td>
                <td className="px-4 py-4 text-sm">{booking.service_type}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {formatDate(booking.created_at)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col items-end gap-2 sm:flex-row">
                    <Button variant="outline" size="sm" onClick={() => openRecord("booking", booking)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateBookingStatus(booking.id, "approved")}>
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateBookingStatus(booking.id, "completed")}>
                      Complete
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => updateBookingStatus(booking.id, "canceled")}>
                      Cancel
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {bookingData.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-primary/5 p-4">
        <Pagination
          page={bookingData.page}
          totalPages={bookingData.total_pages}
          total={bookingData.total}
          onPrev={() => setBookingsPage((p) => Math.max(p - 1, 1))}
          onNext={() => setBookingsPage((p) => Math.min(p + 1, bookingData.total_pages))}
        />
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="rounded-3xl bg-secondary ring-1 ring-primary/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="border-b border-primary/5 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Read</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {messageData.items.map((message) => (
              <tr key={message.id} className="hover:bg-background/50">
                <td className="px-4 py-4">
                  <div className="font-semibold">{message.name}</div>
                  <div className="text-sm text-muted-foreground">{message.email}</div>
                </td>
                <td className="px-4 py-4 text-sm">{message.subject}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${message.is_responded ? "bg-emerald-100 text-emerald-700" : "bg-accent/20 text-accent"}`}>
                    {message.is_responded ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {formatDate(message.created_at)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => openRecord("message", message)}>
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {messageData.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-primary/5 p-4">
        <Pagination
          page={messageData.page}
          totalPages={messageData.total_pages}
          total={messageData.total}
          onPrev={() => setMessagesPage((p) => Math.max(p - 1, 1))}
          onNext={() => setMessagesPage((p) => Math.min(p + 1, messageData.total_pages))}
        />
      </div>
    </div>
  );

  const renderContent = useMemo(() => {
    if (activeTab === "dashboard") return renderDashboard();
    if (activeTab === "bookings") return renderBookings();
    if (activeTab === "messages") return renderMessages();
    return null;
  }, [activeTab, bookingData, messageData, counts]);

  if (!authChecked) return null;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-primary/5 bg-secondary p-6 md:static">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-primary">
              <span className="size-3 rounded-full bg-accent" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-tight">
              Crampton Admin
            </span>
          </Link>
        </div>

        <nav className="space-y-2">
          {(
            [
              ["dashboard", "Dashboard"],
              ["bookings", "Bookings"],
              ["messages", "Contact Messages"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-background"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold capitalize">
            {activeTab.replace("-", " ")}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage bookings and messages.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Loading...</div>
        ) : (
          renderContent
        )}
      </main>

      {/* Record Modal */}
      {modalState.open && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-background shadow-2xl max-h-[90vh] overflow-hidden">
            {modalState.loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      {modalState.type === "booking" && "Booking Details"}
                      {modalState.type === "message" && "Contact Message"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Detailed view for the selected record.
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setModalState({ open: false, type: null, loading: false, data: null })}>
                    ✕
                  </Button>
                </div>

                {modalState.type === "booking" && modalState.data && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Detail label="Name" value={(modalState.data as Booking).full_name} />
                      <Detail label="Email" value={(modalState.data as Booking).email} />
                      <Detail label="Phone" value={(modalState.data as Booking).phone} />
                      <Detail label="Service" value={(modalState.data as Booking).service_type} />
                      <Detail label="Preferred Date" value={(modalState.data as Booking).preferred_date} />
                      <Detail label="Preferred Time" value={(modalState.data as Booking).preferred_time} />
                    </div>
                    <Detail label="Address" value={(modalState.data as Booking).address} />
                    <Detail label="Instructions" value={(modalState.data as Booking).special_instructions || "None"} />
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button variant="outline" onClick={() => updateBookingStatus((modalState.data as Booking).id, "approved")}>
                        Approve
                      </Button>
                      <Button onClick={() => updateBookingStatus((modalState.data as Booking).id, "completed")}>
                        Complete
                      </Button>
                      <Button variant="destructive" onClick={() => updateBookingStatus((modalState.data as Booking).id, "canceled")}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {modalState.type === "message" && modalState.data && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label="Name" value={(modalState.data as ContactMessage).name} />
                      <Detail label="Email" value={(modalState.data as ContactMessage).email} />
                      <Detail label="Phone" value={(modalState.data as ContactMessage).phone || "Not provided"} />
                      <Detail label="Subject" value={(modalState.data as ContactMessage).subject} />
                    </div>
                    <Detail label="Message" value={(modalState.data as ContactMessage).message} />
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${(modalState.data as ContactMessage).is_responded ? "bg-emerald-100 text-emerald-700" : "bg-accent/20 text-accent"}`}>
                      {(modalState.data as ContactMessage).is_responded ? "Read" : "Unread"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-background shadow-2xl p-8">
            <h3 className="font-display text-2xl font-bold">Log out?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You will be signed out of the admin area and returned to the login
              screen.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => setLogoutModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-4 ring-1 ring-primary/5">
      <div className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="whitespace-pre-wrap text-sm">{value}</div>
    </div>
  );
}
