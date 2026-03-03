import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SDG_GOALS, STATIC_DOMAINS } from "../data/staticData";
import { useAllDomains, useRegisterTeam } from "../hooks/useQueries";

interface FormData {
  teamLeaderName: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  email: string;
  phoneNumber: string;
  projectTitle: string;
  domain: string;
  sdgGoalNumber: string;
  abstract: string;
  teamMembers: string[];
}

const INITIAL_FORM: FormData = {
  teamLeaderName: "",
  collegeName: "",
  department: "",
  yearOfStudy: "",
  email: "",
  phoneNumber: "",
  projectTitle: "",
  domain: "",
  sdgGoalNumber: "",
  abstract: "",
  teamMembers: [""],
};

export default function RegistrationPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [teamId, setTeamId] = useState<string>("");
  const { mutate: register, isPending, isError, error } = useRegisterTeam();
  const { data: backendDomains } = useAllDomains();

  const domainOptions =
    backendDomains && backendDomains.length > 0
      ? backendDomains.map((d) => d.name)
      : STATIC_DOMAINS.map((d) => d.name);

  function validate() {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.teamLeaderName.trim())
      errs.teamLeaderName = "Team leader name is required";
    if (!form.collegeName.trim()) errs.collegeName = "College name is required";
    if (!form.department.trim()) errs.department = "Department is required";
    if (!form.yearOfStudy) errs.yearOfStudy = "Year of study is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email address is required";
    if (
      !form.phoneNumber.trim() ||
      form.phoneNumber.replace(/\D/g, "").length < 10
    )
      errs.phoneNumber = "Valid 10-digit phone number is required";
    if (!form.projectTitle.trim())
      errs.projectTitle = "Project title is required";
    if (!form.domain) errs.domain = "Domain selection is required";
    if (!form.sdgGoalNumber) errs.sdgGoalNumber = "SDG goal is required";
    if (!form.abstract.trim() || form.abstract.trim().length < 100)
      errs.abstract = "Abstract must be at least 100 characters";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fix the errors before submitting");
      return;
    }
    setErrors({});
    const filteredMembers = form.teamMembers.filter((m) => m.trim() !== "");
    register(
      {
        teamLeaderName: form.teamLeaderName.trim(),
        collegeName: form.collegeName.trim(),
        department: form.department.trim(),
        yearOfStudy: form.yearOfStudy,
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        projectTitle: form.projectTitle.trim(),
        domain: form.domain,
        sdgGoalNumber: form.sdgGoalNumber,
        abstract: form.abstract.trim(),
        teamMembers: filteredMembers,
      },
      {
        onSuccess: (id) => {
          setTeamId(typeof id === "string" ? id : "");
          setSubmitted(true);
          toast.success("Registration successful!");
        },
        onError: () => {
          toast.error("Registration failed. Please try again.");
        },
      },
    );
  }

  function addMember() {
    if (form.teamMembers.length < 4) {
      setForm((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, ""] }));
    }
  }

  function removeMember(idx: number) {
    setForm((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== idx),
    }));
  }

  function updateMember(idx: number, value: string) {
    setForm((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m, i) => (i === idx ? value : m)),
    }));
  }

  if (submitted) {
    return (
      <section id="registration" className="py-24 relative pt-28">
        <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            data-ocid="registration.success_state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-10 sm:p-14"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mx-auto mb-6 glow-emerald animate-pulse-emerald">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-foreground mb-3">
              Registration Successful! 🎉
            </h2>
            {teamId && (
              <p className="text-sm text-muted-foreground mb-2">
                Your Team ID:{" "}
                <span className="font-display font-bold text-primary">
                  {teamId}
                </span>
              </p>
            )}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Your team has been registered for National Level Project Expo
              2026. Please check your email for confirmation. Round 1 results
              will be announced by{" "}
              <strong className="text-foreground">February 15, 2026</strong>.
            </p>
            <Button
              data-ocid="registration.register_another.button"
              onClick={() => {
                setSubmitted(false);
                setForm(INITIAL_FORM);
                setTeamId("");
              }}
              variant="outline"
              className="border-primary/40 hover:bg-primary/10 hover:border-primary font-display font-bold"
            >
              Register Another Team
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  const fieldClasses =
    "bg-background/60 border-border focus:border-primary focus-visible:ring-primary/30 transition-colors";

  return (
    <section id="registration" className="py-24 relative pt-28">
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Team Registration
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Register Your <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Fill in the details below to register your team. Ensure all
            information is accurate before submitting.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6 sm:p-8 space-y-8"
        >
          {/* Team Leader */}
          <div>
            <h3 className="font-display text-xs font-black text-primary uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b border-border">
              <Users className="w-4 h-4" />
              Team Leader Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="teamLeaderName"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Team Leader Name *
                </Label>
                <Input
                  id="teamLeaderName"
                  data-ocid="registration.team_leader_name.input"
                  value={form.teamLeaderName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, teamLeaderName: e.target.value }))
                  }
                  placeholder="Enter full name"
                  className={fieldClasses}
                />
                {errors.teamLeaderName && (
                  <p className="text-destructive text-xs">
                    {errors.teamLeaderName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email ID *
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="registration.email.input"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="leader@college.edu"
                  className={fieldClasses}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  data-ocid="registration.phone.input"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phoneNumber: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className={fieldClasses}
                />
                {errors.phoneNumber && (
                  <p className="text-destructive text-xs">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="year"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Year of Study *
                </Label>
                <Select
                  value={form.yearOfStudy}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, yearOfStudy: v }))
                  }
                >
                  <SelectTrigger
                    id="year"
                    data-ocid="registration.year_of_study.select"
                    className={fieldClasses}
                  >
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="PG">PG (Post Graduate)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.yearOfStudy && (
                  <p className="text-destructive text-xs">
                    {errors.yearOfStudy}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* College Details */}
          <div>
            <h3 className="font-display text-xs font-black text-primary uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b border-border">
              <FileText className="w-4 h-4" />
              College Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="college"
                  className="text-sm font-medium text-muted-foreground"
                >
                  College Name *
                </Label>
                <Input
                  id="college"
                  data-ocid="registration.college_name.input"
                  value={form.collegeName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, collegeName: e.target.value }))
                  }
                  placeholder="Enter college name"
                  className={fieldClasses}
                />
                {errors.collegeName && (
                  <p className="text-destructive text-xs">
                    {errors.collegeName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="dept"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Department *
                </Label>
                <Input
                  id="dept"
                  data-ocid="registration.department.input"
                  value={form.department}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, department: e.target.value }))
                  }
                  placeholder="e.g. ECE, CSE, EEE"
                  className={fieldClasses}
                />
                {errors.department && (
                  <p className="text-destructive text-xs">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-5">
              <h3 className="font-display text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Members (up to 4, excluding leader)
              </h3>
              {form.teamMembers.length < 4 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  data-ocid="registration.add_member.button"
                  onClick={addMember}
                  className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary text-xs h-7 font-bold"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Member
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {form.teamMembers.map((member, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered list
                <div key={idx} className="flex gap-2">
                  <Input
                    value={member}
                    onChange={(e) => updateMember(idx, e.target.value)}
                    placeholder={`Member ${idx + 1} full name`}
                    className={`${fieldClasses} flex-1`}
                  />
                  {form.teamMembers.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      data-ocid={`registration.delete_button.${idx + 1}`}
                      onClick={() => removeMember(idx)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 h-9 w-9 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="font-display text-xs font-black text-primary uppercase tracking-widest mb-5 flex items-center gap-2 pb-3 border-b border-border">
              <Brain className="w-4 h-4" />
              Project Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="projectTitle"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Project Title *
                </Label>
                <Input
                  id="projectTitle"
                  data-ocid="registration.project_title.input"
                  value={form.projectTitle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, projectTitle: e.target.value }))
                  }
                  placeholder="Enter your project title"
                  className={fieldClasses}
                />
                {errors.projectTitle && (
                  <p className="text-destructive text-xs">
                    {errors.projectTitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="domain"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Domain *
                  </Label>
                  <Select
                    value={form.domain}
                    onValueChange={(v) => setForm((p) => ({ ...p, domain: v }))}
                  >
                    <SelectTrigger
                      id="domain"
                      data-ocid="registration.domain.select"
                      className={fieldClasses}
                    >
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domainOptions.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.domain && (
                    <p className="text-destructive text-xs">{errors.domain}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="sdg"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    SDG Goal Number *
                  </Label>
                  <Select
                    value={form.sdgGoalNumber}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, sdgGoalNumber: v }))
                    }
                  >
                    <SelectTrigger
                      id="sdg"
                      data-ocid="registration.sdg_goal.select"
                      className={fieldClasses}
                    >
                      <SelectValue placeholder="Select SDG goal" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {SDG_GOALS.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sdgGoalNumber && (
                    <p className="text-destructive text-xs">
                      {errors.sdgGoalNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="abstract"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Project Abstract * (min 100 characters)
                </Label>
                <Textarea
                  id="abstract"
                  data-ocid="registration.abstract.textarea"
                  value={form.abstract}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, abstract: e.target.value }))
                  }
                  placeholder="Describe your project — its objective, methodology, expected outcomes, and how it aligns with the chosen SDG goal..."
                  rows={5}
                  className={`${fieldClasses} resize-none`}
                />
                <div className="flex justify-between items-center">
                  {errors.abstract ? (
                    <p className="text-destructive text-xs">
                      {errors.abstract}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {form.abstract.length} / 100+ chars
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error state */}
          {isError && (
            <div
              data-ocid="registration.error_state"
              className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
            >
              {(error as Error)?.message ||
                "Registration failed. Please try again."}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            data-ocid="registration.submit_button"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-display font-black text-base py-3 rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Submitting Registration...
              </>
            ) : (
              <>
                Submit Registration
                <ChevronRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By submitting, you agree to participate in all 3 rounds of screening
            and provide accurate project information.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
