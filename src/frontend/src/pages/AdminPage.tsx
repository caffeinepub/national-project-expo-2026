import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  ClipboardList,
  Edit2,
  Globe,
  Info,
  Layers,
  Loader2,
  LogIn,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  ContactInfo,
  Domain,
  EventInfo,
  TimelineStage,
} from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddContactInfo,
  useAddDomain,
  useAddTimelineStage,
  useAllContacts,
  useAllDomains,
  useAllRegistrations,
  useAllTimelineStages,
  useDeleteContactInfo,
  useDeleteDomain,
  useDeleteTimelineStage,
  useEventInfo,
  useIsCallerAdmin,
  useRegistrationCount,
  useUpdateContactInfo,
  useUpdateDomain,
  useUpdateEventInfo,
  useUpdateTimelineStage,
} from "../hooks/useQueries";

// ─── Login Screen ─────────────────────────────────────────────────────────────

function AdminLoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="glass-card border-primary/25">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl font-black text-foreground">
              Admin Access
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Log in with Internet Identity to manage event content, domains,
              timeline, and contacts.
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-display font-bold text-base py-3 gap-2"
              onClick={() => login()}
              disabled={isLoggingIn}
              data-ocid="admin.login.button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login with Internet Identity
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Only the designated admin account can access this panel.
            </p>
            <div className="mt-3 rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed">
                <span className="font-semibold text-primary">
                  Designated admin:
                </span>{" "}
                athiakash1977@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Admin Setup Screen (auto-claim) ─────────────────────────────────────────

function AdminSetupScreen({ onSuccess }: { onSuccess?: () => void }) {
  const { actor, isFetching } = useActor();
  const [status, setStatus] = useState<"claiming" | "denied" | "done">(
    "claiming",
  );

  useEffect(() => {
    if (isFetching || !actor || status !== "claiming") return;

    async function autoClaim() {
      if (!actor) return;
      try {
        // Register the caller — if they're the first user and the backend token
        // is empty, they get #admin; otherwise they get #user.
        await (
          actor as unknown as {
            _initializeAccessControlWithSecret(secret: string): Promise<void>;
          }
        )._initializeAccessControlWithSecret("");

        // Now re-check whether we actually got admin
        let gotAdmin = false;
        try {
          gotAdmin = await actor.isCallerAdmin();
        } catch {
          gotAdmin = false;
        }

        if (gotAdmin) {
          setStatus("done");
          toast.success("Admin access granted! Loading dashboard…");
          setTimeout(() => onSuccess?.(), 600);
        } else {
          setStatus("denied");
        }
      } catch {
        // _initializeAccessControlWithSecret threw — admin already claimed by
        // someone else, or the secret doesn't match.
        setStatus("denied");
      }
    }

    autoClaim();
  }, [actor, isFetching, status, onSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-16">
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="glass-card border-primary/25">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              {status === "denied" ? (
                <ShieldCheck className="w-7 h-7 text-destructive" />
              ) : status === "done" ? (
                <ShieldCheck className="w-7 h-7 text-primary" />
              ) : (
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
              )}
            </div>
            <CardTitle className="font-display text-2xl font-black text-foreground">
              {status === "denied"
                ? "Access Denied"
                : status === "done"
                  ? "Access Granted!"
                  : "Activating Admin Access…"}
            </CardTitle>
            {status === "claiming" && (
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Please wait while we configure your admin account.
              </p>
            )}
            {status === "done" && (
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Loading your dashboard…
              </p>
            )}
          </CardHeader>

          {status === "denied" && (
            <CardContent className="pt-0 space-y-4">
              <div
                className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3"
                data-ocid="admin.setup.error_state"
              >
                <p className="text-sm text-destructive leading-relaxed text-center">
                  Admin access has already been claimed by another account. Only
                  the designated admin can manage this site.
                </p>
              </div>
              <div className="rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <p className="text-xs text-primary/80 leading-relaxed">
                  <span className="font-semibold text-primary">
                    Designated admin:
                  </span>{" "}
                  athiakash1977@gmail.com
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab() {
  const { data: regCount } = useRegistrationCount();
  const { data: domains } = useAllDomains();
  const { data: timeline } = useAllTimelineStages();
  const { data: contacts } = useAllContacts();
  const { data: registrations } = useAllRegistrations();

  const stats = [
    {
      label: "Total Registrations",
      value: regCount !== undefined ? regCount.toString() : "—",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Domains",
      value: domains?.length ?? "—",
      icon: Layers,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Timeline Stages",
      value: timeline?.length ?? "—",
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Contacts",
      value: contacts?.length ?? "—",
      icon: Mail,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Quick snapshot of your event data.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-card border-border/60">
            <CardContent className="p-4">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="font-display text-2xl font-black text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent registrations preview */}
      {registrations && registrations.length > 0 && (
        <Card className="glass-card border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary" />
              Recent Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {registrations.slice(0, 5).map((reg) => (
                <div
                  key={reg.email}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {reg.teamLeaderName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {reg.collegeName} · {reg.domain}
                    </p>
                  </div>
                  <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                    SDG {reg.sdgGoalNumber}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Event Info Tab ───────────────────────────────────────────────────────────

function EventInfoTab() {
  const { data: eventInfo, isLoading } = useEventInfo();
  const updateMutation = useUpdateEventInfo();

  const [form, setForm] = useState<EventInfo>({
    name: "",
    organizer: "",
    college: "",
    eventDate: "",
    description: "",
  });
  const [initialized, setInitialized] = useState(false);

  if (eventInfo && !initialized) {
    setForm({ ...eventInfo });
    setInitialized(true);
  }

  function handleChange(field: keyof EventInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    try {
      await updateMutation.mutateAsync(form);
      toast.success("Event info updated successfully!");
    } catch {
      toast.error("Failed to update event info.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-8">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading event info…
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Event Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Edit the core event details shown across the website.
        </p>
      </div>
      <Card className="glass-card border-border/60">
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                Event Name
              </Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="National Level Project Expo 2026"
                className="bg-muted/30 border-border/60 focus:border-primary/50"
                data-ocid="admin.event_info.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                Organizer
              </Label>
              <Input
                value={form.organizer}
                onChange={(e) => handleChange("organizer", e.target.value)}
                placeholder="Department of ECE"
                className="bg-muted/30 border-border/60 focus:border-primary/50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                College Name
              </Label>
              <Input
                value={form.college}
                onChange={(e) => handleChange("college", e.target.value)}
                placeholder="Your College Name"
                className="bg-muted/30 border-border/60 focus:border-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground/80">
                Event Date
              </Label>
              <Input
                value={form.eventDate}
                onChange={(e) => handleChange("eventDate", e.target.value)}
                placeholder="April 15, 2026"
                className="bg-muted/30 border-border/60 focus:border-primary/50"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground/80">
              Description
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description of the event…"
              rows={4}
              className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none"
            />
          </div>
          <div className="pt-1">
            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold gap-2"
              data-ocid="admin.event_info.save_button"
            >
              {updateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {updateMutation.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Timeline Tab ─────────────────────────────────────────────────────────────

function TimelineTab() {
  const { data: stages = [], isLoading } = useAllTimelineStages();
  const addMutation = useAddTimelineStage();
  const updateMutation = useUpdateTimelineStage();
  const deleteMutation = useDeleteTimelineStage();

  const [newStage, setNewStage] = useState({ stageName: "", date: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TimelineStage>({
    stageName: "",
    date: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function handleAdd() {
    if (!newStage.stageName.trim() || !newStage.date.trim()) {
      toast.error("Please fill in both stage name and date.");
      return;
    }
    try {
      await addMutation.mutateAsync(newStage);
      toast.success("Timeline stage added!");
      setNewStage({ stageName: "", date: "" });
    } catch {
      toast.error("Failed to add timeline stage.");
    }
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditForm({ ...stages[index] });
  }

  async function handleUpdate() {
    if (editingIndex === null) return;
    const oldName = stages[editingIndex].stageName;
    try {
      await updateMutation.mutateAsync({ oldName, stage: editForm });
      toast.success("Timeline stage updated!");
      setEditingIndex(null);
    } catch {
      toast.error("Failed to update stage.");
    }
  }

  async function handleDelete(stageName: string) {
    try {
      await deleteMutation.mutateAsync(stageName);
      toast.success("Stage deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete stage.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Event Timeline
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage all timeline stages and dates.
        </p>
      </div>

      {/* Add new stage */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm font-bold text-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Stage
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={newStage.stageName}
              onChange={(e) =>
                setNewStage((p) => ({ ...p, stageName: e.target.value }))
              }
              placeholder="Stage name (e.g. Registration Opens)"
              className="bg-muted/30 border-border/60 focus:border-primary/50 flex-1"
            />
            <Input
              value={newStage.date}
              onChange={(e) =>
                setNewStage((p) => ({ ...p, date: e.target.value }))
              }
              placeholder="Date (e.g. January 10, 2026)"
              className="bg-muted/30 border-border/60 focus:border-primary/50 flex-1"
            />
            <Button
              onClick={handleAdd}
              disabled={addMutation.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold shrink-0 gap-1.5"
              data-ocid="admin.timeline.add_button"
            >
              {addMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stage list */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading…
        </div>
      ) : stages.length === 0 ? (
        <div
          className="text-center py-10 text-muted-foreground text-sm"
          data-ocid="admin.timeline.empty_state"
        >
          No timeline stages yet. Add one above.
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.timeline.list">
          {stages.map((stage, i) => (
            <Card
              key={stage.stageName}
              className="glass-card border-border/50"
              data-ocid={`admin.timeline.item.${i + 1}`}
            >
              <CardContent className="p-4">
                {editingIndex === i ? (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        value={editForm.stageName}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            stageName: e.target.value,
                          }))
                        }
                        placeholder="Stage name"
                        className="bg-muted/30 border-border/60 focus:border-primary/50 flex-1"
                      />
                      <Input
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, date: e.target.value }))
                        }
                        placeholder="Date"
                        className="bg-muted/30 border-border/60 focus:border-primary/50 flex-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={updateMutation.isPending}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-1"
                        data-ocid={`admin.timeline.save_button.${i + 1}`}
                      >
                        {updateMutation.isPending && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingIndex(null)}
                        className="text-muted-foreground hover:text-foreground"
                        data-ocid={`admin.timeline.cancel_button.${i + 1}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {stage.stageName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {stage.date}
                      </p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(i)}
                        className="text-primary hover:bg-primary/10 h-8 w-8 p-0"
                        data-ocid={`admin.timeline.edit_button.${i + 1}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteTarget(stage.stageName)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        data-ocid={`admin.timeline.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent
          className="bg-card border-border/60"
          data-ocid="admin.timeline.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-foreground">
              Delete Stage
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteTarget}"? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              data-ocid="admin.timeline.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              disabled={deleteMutation.isPending}
              data-ocid="admin.timeline.confirm_button"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Domains Tab ──────────────────────────────────────────────────────────────

function DomainsTab() {
  const { data: domains = [], isLoading } = useAllDomains();
  const addMutation = useAddDomain();
  const updateMutation = useUpdateDomain();
  const deleteMutation = useDeleteDomain();

  const [newDomain, setNewDomain] = useState({ name: "", description: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Domain>({
    name: "",
    description: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function handleAdd() {
    if (!newDomain.name.trim() || !newDomain.description.trim()) {
      toast.error("Please fill in both name and description.");
      return;
    }
    try {
      await addMutation.mutateAsync(newDomain);
      toast.success("Domain added!");
      setNewDomain({ name: "", description: "" });
    } catch {
      toast.error("Failed to add domain.");
    }
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditForm({ ...domains[index] });
  }

  async function handleUpdate() {
    if (editingIndex === null) return;
    const oldName = domains[editingIndex].name;
    try {
      await updateMutation.mutateAsync({ oldName, domain: editForm });
      toast.success("Domain updated!");
      setEditingIndex(null);
    } catch {
      toast.error("Failed to update domain.");
    }
  }

  async function handleDelete(name: string) {
    try {
      await deleteMutation.mutateAsync(name);
      toast.success("Domain deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete domain.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Project Domains
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage the technical domains participants can choose from.
        </p>
      </div>

      {/* Add new domain */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm font-bold text-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Domain
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <Input
            value={newDomain.name}
            onChange={(e) =>
              setNewDomain((p) => ({ ...p, name: e.target.value }))
            }
            placeholder="Domain name (e.g. AI & Machine Learning)"
            className="bg-muted/30 border-border/60 focus:border-primary/50"
          />
          <div className="flex gap-3">
            <Input
              value={newDomain.description}
              onChange={(e) =>
                setNewDomain((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Short description"
              className="bg-muted/30 border-border/60 focus:border-primary/50 flex-1"
            />
            <Button
              onClick={handleAdd}
              disabled={addMutation.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold shrink-0 gap-1.5"
              data-ocid="admin.domains.add_button"
            >
              {addMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domain list */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading…
        </div>
      ) : domains.length === 0 ? (
        <div
          className="text-center py-10 text-muted-foreground text-sm"
          data-ocid="admin.domains.empty_state"
        >
          No domains yet. Add one above.
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.domains.list">
          {domains.map((domain, i) => (
            <Card
              key={domain.name}
              className="glass-card border-border/50"
              data-ocid={`admin.domains.item.${i + 1}`}
            >
              <CardContent className="p-4">
                {editingIndex === i ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Domain name"
                      className="bg-muted/30 border-border/60 focus:border-primary/50"
                    />
                    <Input
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Description"
                      className="bg-muted/30 border-border/60 focus:border-primary/50"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={updateMutation.isPending}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-1"
                        data-ocid={`admin.domains.save_button.${i + 1}`}
                      >
                        {updateMutation.isPending && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingIndex(null)}
                        className="text-muted-foreground hover:text-foreground"
                        data-ocid={`admin.domains.cancel_button.${i + 1}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {domain.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {domain.description}
                      </p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(i)}
                        className="text-primary hover:bg-primary/10 h-8 w-8 p-0"
                        data-ocid={`admin.domains.edit_button.${i + 1}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteTarget(domain.name)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        data-ocid={`admin.domains.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent
          className="bg-card border-border/60"
          data-ocid="admin.domains.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-foreground">
              Delete Domain
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteTarget}"? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              data-ocid="admin.domains.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              disabled={deleteMutation.isPending}
              data-ocid="admin.domains.confirm_button"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Contacts Tab ─────────────────────────────────────────────────────────────

const emptyContact: ContactInfo = {
  name: "",
  role: "",
  email: "",
  phoneNumber: "",
};

function ContactsTab() {
  const { data: contacts = [], isLoading } = useAllContacts();
  const addMutation = useAddContactInfo();
  const updateMutation = useUpdateContactInfo();
  const deleteMutation = useDeleteContactInfo();

  const [newContact, setNewContact] = useState<ContactInfo>({
    ...emptyContact,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ContactInfo>({ ...emptyContact });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function handleAdd() {
    if (!newContact.name.trim() || !newContact.role.trim()) {
      toast.error("Name and role are required.");
      return;
    }
    try {
      await addMutation.mutateAsync(newContact);
      toast.success("Contact added!");
      setNewContact({ ...emptyContact });
    } catch {
      toast.error("Failed to add contact.");
    }
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditForm({ ...contacts[index] });
  }

  async function handleUpdate() {
    if (editingIndex === null) return;
    const oldName = contacts[editingIndex].name;
    try {
      await updateMutation.mutateAsync({ oldName, contact: editForm });
      toast.success("Contact updated!");
      setEditingIndex(null);
    } catch {
      toast.error("Failed to update contact.");
    }
  }

  async function handleDelete(name: string) {
    try {
      await deleteMutation.mutateAsync(name);
      toast.success("Contact deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete contact.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Contacts
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage student and faculty coordinators.
        </p>
      </div>

      {/* Add new contact */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-sm font-bold text-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              value={newContact.name}
              onChange={(e) =>
                setNewContact((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Full name"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
            <Input
              value={newContact.role}
              onChange={(e) =>
                setNewContact((p) => ({ ...p, role: e.target.value }))
              }
              placeholder="Role (e.g. Student Coordinator)"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
            <Input
              value={newContact.email}
              onChange={(e) =>
                setNewContact((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="Email address"
              type="email"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
            <Input
              value={newContact.phoneNumber}
              onChange={(e) =>
                setNewContact((p) => ({ ...p, phoneNumber: e.target.value }))
              }
              placeholder="Phone number"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
          </div>
          <Button
            onClick={handleAdd}
            disabled={addMutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold gap-1.5"
            data-ocid="admin.contacts.add_button"
          >
            {addMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add Contact
          </Button>
        </CardContent>
      </Card>

      {/* Contact list */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading…
        </div>
      ) : contacts.length === 0 ? (
        <div
          className="text-center py-10 text-muted-foreground text-sm"
          data-ocid="admin.contacts.empty_state"
        >
          No contacts yet. Add one above.
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.contacts.list">
          {contacts.map((contact, i) => (
            <Card
              key={contact.name}
              className="glass-card border-border/50"
              data-ocid={`admin.contacts.item.${i + 1}`}
            >
              <CardContent className="p-4">
                {editingIndex === i ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Full name"
                        className="bg-muted/30 border-border/60 focus:border-primary/50"
                      />
                      <Input
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, role: e.target.value }))
                        }
                        placeholder="Role"
                        className="bg-muted/30 border-border/60 focus:border-primary/50"
                      />
                      <Input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="Email"
                        className="bg-muted/30 border-border/60 focus:border-primary/50"
                      />
                      <Input
                        value={editForm.phoneNumber}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            phoneNumber: e.target.value,
                          }))
                        }
                        placeholder="Phone"
                        className="bg-muted/30 border-border/60 focus:border-primary/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={updateMutation.isPending}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-1"
                        data-ocid={`admin.contacts.save_button.${i + 1}`}
                      >
                        {updateMutation.isPending && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingIndex(null)}
                        className="text-muted-foreground hover:text-foreground"
                        data-ocid={`admin.contacts.cancel_button.${i + 1}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground text-sm">
                          {contact.name}
                        </p>
                        <Badge className="bg-primary/15 text-primary border-primary/30 text-xs px-2 py-0">
                          {contact.role}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                        {contact.email && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {contact.email}
                          </p>
                        )}
                        {contact.phoneNumber && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(i)}
                        className="text-primary hover:bg-primary/10 h-8 w-8 p-0"
                        data-ocid={`admin.contacts.edit_button.${i + 1}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteTarget(contact.name)}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        data-ocid={`admin.contacts.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent
          className="bg-card border-border/60"
          data-ocid="admin.contacts.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-foreground">
              Delete Contact
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteTarget}"? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              data-ocid="admin.contacts.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              disabled={deleteMutation.isPending}
              data-ocid="admin.contacts.confirm_button"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Registrations Tab ────────────────────────────────────────────────────────

function RegistrationsTab() {
  const { data: registrations = [], isLoading } = useAllRegistrations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            Registrations
          </h3>
          <p className="text-sm text-muted-foreground">
            All registered teams — read only.
          </p>
        </div>
        <Badge className="bg-primary/15 text-primary border-primary/30 text-sm px-3 py-1">
          {registrations.length} total
        </Badge>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading registrations…
        </div>
      ) : registrations.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground text-sm border border-border/40 rounded-xl"
          data-ocid="admin.registrations.empty_state"
        >
          No registrations yet.
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    #
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Team Leader
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    College
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Dept
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Year
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Email
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Phone
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    Domain
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">
                    SDG
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg, i) => (
                  <TableRow
                    key={reg.email}
                    className="border-border/30 hover:bg-primary/5 transition-colors"
                    data-ocid={`admin.registrations.row.${i + 1}`}
                  >
                    <TableCell className="text-muted-foreground text-xs font-mono">
                      {i + 1}
                    </TableCell>
                    <TableCell className="font-medium text-foreground text-sm">
                      {reg.teamLeaderName}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[150px] truncate">
                      {reg.collegeName}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {reg.department}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {reg.yearOfStudy}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[160px] truncate">
                      {reg.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {reg.phoneNumber}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary/12 text-primary border-primary/25 text-xs whitespace-nowrap">
                        {reg.domain}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {reg.sdgGoalNumber}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

// ─── Admin Panel (main) ───────────────────────────────────────────────────────

function AdminPanel() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="absolute inset-0 tech-grid-bg opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Managed by athiakash1977@gmail.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard">
          <TabsList className="bg-muted/30 border border-border/40 p-1 h-auto flex-wrap gap-1 mb-6">
            <TabsTrigger
              value="dashboard"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.dashboard.tab"
            >
              <Users className="w-3.5 h-3.5" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="event_info"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.event_info.tab"
            >
              <Info className="w-3.5 h-3.5" />
              Event Info
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.timeline.tab"
            >
              <Calendar className="w-3.5 h-3.5" />
              Timeline
            </TabsTrigger>
            <TabsTrigger
              value="domains"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.domains.tab"
            >
              <Layers className="w-3.5 h-3.5" />
              Domains
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.contacts.tab"
            >
              <Globe className="w-3.5 h-3.5" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="registrations"
              className="font-display font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5"
              data-ocid="admin.registrations.tab"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>
          <TabsContent value="event_info">
            <EventInfoTab />
          </TabsContent>
          <TabsContent value="timeline">
            <TimelineTab />
          </TabsContent>
          <TabsContent value="domains">
            <DomainsTab />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
          <TabsContent value="registrations">
            <RegistrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const {
    data: isAdmin,
    isLoading: checkingAdmin,
    refetch: refetchAdmin,
  } = useIsCallerAdmin();

  // Not logged in
  if (!isLoggedIn) {
    return <AdminLoginScreen />;
  }

  // Checking admin status
  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="font-medium">Verifying admin access…</span>
        </div>
      </div>
    );
  }

  // Not admin — show setup screen to auto-claim, or access-denied fallback
  if (!isAdmin) {
    return (
      <AdminSetupScreen
        onSuccess={() => {
          refetchAdmin();
        }}
      />
    );
  }

  // Admin — show full panel
  return <AdminPanel />;
}
