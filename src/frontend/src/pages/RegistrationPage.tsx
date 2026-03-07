import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
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
      </div>
    </section>
  );
}
