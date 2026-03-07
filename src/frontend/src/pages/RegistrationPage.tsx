import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy } from "lucide-react";
import { motion } from "motion/react";

const GOOGLE_FORM_URL = "https://forms.gle/VixdRSqbE5HD34nw7";

export default function RegistrationPage() {
  return (
    <section id="registration" className="py-24 relative pt-28">
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Team Registration
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Register Your <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Fill in the details below. All your responses are securely saved to
            our official registration form.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="registration.open_form.button"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm hover:bg-primary/90 transition-colors glow-emerald"
          >
            Open Form in New Tab
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs text-muted-foreground text-center mt-2 leading-relaxed"
        >
          All responses are collected and saved via Google Forms.
        </motion.p>

        {/* Cash Prize Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-2 font-bold flex items-center justify-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              Exciting Cash Prizes
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-black">
              Win Big, Innovate <span className="gradient-text">Bold</span>
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Total prize pool of{" "}
              <span className="text-primary font-bold">₹6,000</span> awaits the
              best projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                rank: "1st",
                emoji: "🥇",
                label: "First Prize",
                amount: "₹3,000",
                color: "text-yellow-300",
                border: "border-yellow-400/40",
                bg: "bg-yellow-400/8",
                glow: "shadow-yellow-400/10",
              },
              {
                rank: "2nd",
                emoji: "🥈",
                label: "Second Prize",
                amount: "₹2,000",
                color: "text-slate-300",
                border: "border-slate-300/40",
                bg: "bg-slate-300/8",
                glow: "shadow-slate-300/10",
              },
              {
                rank: "3rd",
                emoji: "🥉",
                label: "Third Prize",
                amount: "₹1,000",
                color: "text-orange-300",
                border: "border-orange-400/40",
                bg: "bg-orange-400/8",
                glow: "shadow-orange-300/10",
              },
            ].map((prize) => (
              <div
                key={prize.label}
                data-ocid={`registration.prize.${prize.rank}.card`}
                className={`flex flex-col items-center gap-3 px-6 py-7 rounded-2xl border ${prize.border} ${prize.bg} backdrop-blur-sm shadow-lg ${prize.glow}`}
              >
                <span className="text-4xl">{prize.emoji}</span>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  {prize.label}
                </p>
                <p
                  className={`font-display font-black text-3xl ${prize.color}`}
                >
                  {prize.amount}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            Prizes will be awarded during the Final Round – Project
            Demonstration (Offline) in April 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
