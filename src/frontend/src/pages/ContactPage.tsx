import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { STATIC_CONTACTS } from "../data/staticData";
import { useAllContacts, useEventInfo } from "../hooks/useQueries";

export default function ContactPage() {
  const { data: backendContacts } = useAllContacts();
  const { data: eventInfo } = useEventInfo();
  const contacts =
    backendContacts && backendContacts.length > 0
      ? backendContacts
      : STATIC_CONTACTS;

  return (
    <section id="contact" className="py-24 relative pt-28">
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Get in Touch
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Have questions about the expo or registration? Reach out to our
            coordinators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coordinator cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {contacts.map((contact, i) => (
              <motion.div
                key={`${contact.name}-${i}`}
                data-ocid={`contact.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-primary text-lg">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-foreground text-base">
                      {contact.name}
                    </h3>
                    <Badge className="text-xs bg-primary/15 text-primary border-primary/40 mt-0.5 font-bold">
                      {contact.role}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                  <a
                    href={`tel:${contact.phoneNumber}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
                    {contact.phoneNumber}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Address + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-black text-foreground text-base mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Venue Address
              </h3>
              <address className="not-italic space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground font-bold">
                  {eventInfo?.college || "[Your College Name]"}
                </p>
                <p>Department of ECE</p>
                <p>[City], [State] — [PIN Code]</p>
                <p>India</p>
              </address>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">
                  Event Details
                </p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Event Date</span>
                    <span className="text-foreground font-bold">
                      {eventInfo?.eventDate || "April 15, 2026"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode</span>
                    <span className="text-foreground font-bold">
                      Online + Offline
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration</span>
                    <span className="text-primary font-bold">Free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="h-32 flex items-center justify-center bg-primary/5 border-b border-border">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-display font-bold text-foreground">
                    View on Map
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Google Maps Location
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
