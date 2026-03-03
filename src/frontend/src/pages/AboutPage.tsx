import { Badge } from "@/components/ui/badge";
import { Globe, Layers, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { SDG_GOALS } from "../data/staticData";
import { useEventInfo } from "../hooks/useQueries";

const STATIC_ABOUT_CARDS = [
  {
    icon: Layers,
    title: "Why 3-Level Online Screening?",
    text: "Ensures fair, transparent evaluation. Only the best projects advance through Abstract → PPT → Prototype stages. Each round adds depth and filters genuinely impactful innovations.",
  },
  {
    icon: Users,
    title: "Who Can Participate?",
    text: "Open to UG, PG, and Diploma students from any college across India. Team size: 2–4 members. All branches of Engineering and Technology are eligible.",
  },
  {
    icon: Globe,
    title: "SDG Alignment",
    text: "All projects must align with one or more of the 17 UN Sustainable Development Goals, ensuring real-world impact and addressing global challenges from clean energy to healthcare.",
  },
];

const DEFAULT_PURPOSE_TEXT =
  "The National Level Project Expo 2026 aims to bring innovative student minds together to showcase technical excellence in AI, IoT, Embedded Systems, Analytics and Sustainable Technologies aligned with UN SDGs.";

export default function AboutPage() {
  const { data: eventInfo } = useEventInfo();

  const purposeText = eventInfo?.description || DEFAULT_PURPOSE_TEXT;

  return (
    <section id="about" className="py-24 relative pt-28">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            About the Event
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Why <span className="gradient-text">Project Expo 2026</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A premier national platform for engineering students to innovate,
            collaborate, and showcase technological solutions aligned with
            global sustainability goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Purpose card — driven by backend event description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/35 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-black text-foreground mb-2">
                  Purpose of the Expo
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {purposeText}
                </p>
              </div>
            </div>
          </motion.div>

          {STATIC_ABOUT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/35 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SDG Goals grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 glass-card rounded-2xl p-6 sm:p-8"
        >
          <h3 className="font-display text-base font-black text-primary mb-4 uppercase tracking-wide">
            🌍 UN Sustainable Development Goals — All 17 Goals in Scope
          </h3>
          <div className="flex flex-wrap gap-2">
            {SDG_GOALS.map((goal) => (
              <Badge
                key={goal}
                variant="outline"
                className="border-primary/25 text-muted-foreground hover:border-primary/60 hover:text-primary text-xs transition-all cursor-default"
              >
                {goal}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
