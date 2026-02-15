import { motion } from "motion/react";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
}

export function TimelineItem({ year, title, company, description }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-12 border-l border-[#262626] last:pb-0"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          absolute left-[-5px] top-0 w-2.5 h-2.5 
          bg-[#00FF88] rounded-full
          shadow-[0_0_10px_rgba(0,255,136,0.5)]
        "
      />
      <div className="font-mono text-sm text-[#00FF88] mb-2">{year}</div>
      <h3 className="text-xl text-[#F5F5F7] mb-1">{title}</h3>
      <div className="text-[#A1A1AA] text-sm mb-3">{company}</div>
      <p className="text-[#A1A1AA] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
