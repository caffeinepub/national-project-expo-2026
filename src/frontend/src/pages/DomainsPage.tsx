import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Brain,
  Car,
  Cpu,
  HeartPulse,
  Loader2,
  Sprout,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { STATIC_DOMAINS } from "../data/staticData";
import { useAllDomains } from "../hooks/useQueries";

const domainIconMap = [Brain, Cpu, BarChart3, Sprout, HeartPulse, Zap, Car];

export default function DomainsPage() {
  const { data: backendDomains, isLoading } = useAllDomains();

  const domains =
    backendDomains && backendDomains.length > 0
      ? backendDomains.map((d, i) => ({
          name: d.name,
          description: d.description,
          icon: domainIconMap[i % domainIconMap.length],
          glowColor: STATIC_DOMAINS[i % STATIC_DOMAINS.length].glowColor,
          iconBg: STATIC_DOMAINS[i % STATIC_DOMAINS.length].iconBg,
          iconColor: STATIC_DOMAINS[i % STATIC_DOMAINS.length].iconColor,
        }))
      : STATIC_DOMAINS;

  return (
    <section id="domains" className="py-24 relative pt-28">
      <div className="absolute inset-0 bg-secondary/25 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Technical Domains
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Explore <span className="gradient-text">Innovation Tracks</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Submit your project under one of seven cutting-edge technology
            domains. Each domain maps to real-world challenges and UN SDGs.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="domains.loading_state"
            className="flex items-center justify-center py-20"
          >
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading domains...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {domains.map((domain, i) => (
              <motion.div
                key={domain.name}
                data-ocid={`domains.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="domain-card-glow group relative glass-card rounded-2xl p-6 cursor-default overflow-hidden"
              >
                {/* Hover bg gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${domain.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <domain.icon className={`w-6 h-6 ${domain.iconColor}`} />
                  </div>
                  <h3 className="font-display text-base font-black text-foreground mb-2 leading-snug">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
