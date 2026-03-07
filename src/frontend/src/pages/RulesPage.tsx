import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle2,
  Monitor,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const GENERAL_RULES = [
  "Each team can have a maximum of 3–4 members.",
  "Participants must complete registration before the deadline through the official form.",
  "The project abstract must be submitted on or before 14 March 2026.",
  "All registered teams must participate in the three online evaluation rounds.",
];

const ONLINE_SESSION_RULES = [
  "Participants must join the online session on time using the provided meeting link.",
  "Teams must use their registered team name while joining the meeting.",
  "During the presentation, camera and microphone should be enabled if required by the organizers.",
  "Screen sharing must be used for PPT or simulation demonstration.",
  "Participants must maintain proper internet connectivity to avoid interruptions.",
  "Any form of misbehavior, background disturbance, or misconduct during the session may lead to disqualification.",
];

const FINAL_NOTES = [
  "Only shortlisted teams from the online rounds will be invited for the final project demonstration.",
  "Judges' decision will be final and binding.",
];

export default function RulesPage() {
  return (
    <section id="rules" className="py-24 relative pt-28">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          data-ocid="rules.section"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Official Guidelines
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Rules & <span className="gradient-text">Regulations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            All participants must read and follow these rules to ensure a fair
            and smooth evaluation process.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* General Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card border border-primary/30 rounded-2xl p-6 sm:p-8"
            data-ocid="rules.general.card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-black text-foreground">
                General Rules
              </h3>
            </div>
            <ul className="space-y-3" data-ocid="rules.general.list">
              {GENERAL_RULES.map((rule, i) => (
                <li
                  key={rule}
                  data-ocid={`rules.general.item.${i + 1}`}
                  className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Online Session Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card border border-accent/30 rounded-2xl p-6 sm:p-8"
            data-ocid="rules.online.card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-black text-foreground">
                Online Session Guidelines
              </h3>
            </div>
            <ul className="space-y-3" data-ocid="rules.online.list">
              {ONLINE_SESSION_RULES.map((rule, i) => (
                <li
                  key={rule}
                  data-ocid={`rules.online.item.${i + 1}`}
                  className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Final Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card border border-amber-500/30 rounded-2xl p-6 sm:p-8"
            data-ocid="rules.final.card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-display text-xl font-black text-foreground">
                Important Notes
              </h3>
            </div>
            <ul className="space-y-3" data-ocid="rules.final.list">
              {FINAL_NOTES.map((rule, i) => (
                <li
                  key={rule}
                  data-ocid={`rules.final.item.${i + 1}`}
                  className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
