import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, UserCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEventInfo } from "../hooks/useQueries";

const STAFF_COORDINATORS = [
  {
    name: "Dr. M. Malathi",
    role: "Convenor",
    designation: "Professor & Head, Department of ECE",
    email: "",
    phoneNumber: "",
  },
  {
    name: "Mrs. P. Janani Durga",
    role: "Faculty Coordinator",
    designation: "Assistant Professor, ECE",
    email: "",
    phoneNumber: "",
  },
  {
    name: "Mrs. Lakshmiprabha",
    role: "Faculty Coordinator",
    designation: "Assistant Professor, ECE",
    email: "",
    phoneNumber: "",
  },
];

const STUDENT_COORDINATORS = [
  {
    name: "A. Akash",
    role: "Embex Club President",
    designation: "Student Coordinator",
    email: "athiakash1977@gmail.com",
    phoneNumber: "8667099605",
  },
  {
    name: "R. Keerthivasan",
    role: "Secretary – Embex Club",
    designation: "Student Coordinator",
    email: "skeerthivasan410@gmail.com",
    phoneNumber: "9597245927",
  },
  {
    name: "P. Akash",
    role: "Technical Event Head – Embex Club",
    designation: "Student Coordinator",
    email: "akashpece@gmail.com",
    phoneNumber: "7094362060",
  },
];

interface Coordinator {
  name: string;
  role: string;
  designation: string;
  email: string;
  phoneNumber: string;
}

function CoordinatorCard({
  contact,
  index,
  ocidPrefix,
  badgeClass,
}: {
  contact: Coordinator;
  index: number;
  ocidPrefix: string;
  badgeClass: string;
}) {
  return (
    <motion.div
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
          <span className="font-display font-black text-primary text-lg">
            {contact.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-display font-black text-foreground text-base leading-tight">
            {contact.name}
          </h3>
          <Badge className={`text-xs mt-0.5 font-bold ${badgeClass}`}>
            {contact.role}
          </Badge>
        </div>
      </div>
      {contact.designation && (
        <p className="text-xs text-muted-foreground mb-3 pl-0.5">
          {contact.designation}
        </p>
      )}
      <div className="space-y-2.5">
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
            <span className="truncate">{contact.email}</span>
          </a>
        )}
        {contact.phoneNumber && (
          <a
            href={`tel:${contact.phoneNumber}`}
            className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <Phone className="w-4 h-4 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
            {contact.phoneNumber}
          </a>
        )}
        {!contact.email && !contact.phoneNumber && (
          <p className="text-xs text-muted-foreground italic">
            Contact via Student Coordinators
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const { data: eventInfo } = useEventInfo();

  return (
    <section id="contact" className="py-24 relative pt-28">
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Page Header */}
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

        {/* ── Staff Coordinators ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
          data-ocid="contact.staff.section"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-black text-foreground text-lg leading-none">
                Staff Coordinators
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Faculty members overseeing the event
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STAFF_COORDINATORS.map((contact, i) => (
              <CoordinatorCard
                key={contact.name}
                contact={contact}
                index={i}
                ocidPrefix="contact.staff"
                badgeClass="bg-primary/15 text-primary border-primary/40"
              />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* ── Student Coordinators ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
          data-ocid="contact.student.section"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-black text-foreground text-lg leading-none">
                Student Coordinators
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Embex Club members managing registrations and queries
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDENT_COORDINATORS.map((contact, i) => (
              <CoordinatorCard
                key={contact.name}
                contact={contact}
                index={i}
                ocidPrefix="contact.student"
                badgeClass="bg-accent/15 text-accent border-accent/40"
              />
            ))}
          </div>
        </motion.div>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
          data-ocid="contact.venue.card"
        >
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-black text-foreground text-base mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Venue Address
            </h3>
            <address className="not-italic space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <p className="text-foreground font-bold">
                E.G.S.Pillay Engineering College
              </p>
              <p>Department of ECE</p>
              <p>Nagapattinam, Tamil Nadu</p>
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
                    {eventInfo?.eventDate || "April 2026"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mode</span>
                  <span className="text-foreground font-bold">
                    Online + Offline
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Fee</span>
                  <span className="text-primary font-bold">₹100 per head</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
