import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const GOOGLE_FORM_URL = "https://forms.gle/VixdRSqbE5HD34nw7";
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfzrLcpOijqMD2Y5bfYyMPSmCwFlP6DFZNxDdMDJ8dL5XTGKQ/viewform?embedded=true";

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

        {/* Embedded Google Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden"
          data-ocid="registration.form.panel"
        >
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            title="Innovativelink-Expo 2K26 Registration Form"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full"
            style={{ minHeight: 900 }}
          >
            Loading form...
          </iframe>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
          All responses are collected and saved via Google Forms. If the form
          does not load,{" "}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            click here to open it directly
          </a>
          .
        </p>
      </div>
    </section>
  );
}
