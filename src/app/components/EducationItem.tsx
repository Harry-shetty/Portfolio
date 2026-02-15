import { motion } from "motion/react";

interface EducationItemProps {
  period: string;
  degree: string;
  institution: string;
  details?: string;
}

export function EducationItem({ period, degree, institution, details }: EducationItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-10 border-l border-[#262626] last:pb-0"
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
      <div className="font-mono text-sm text-[#00FF88] mb-2">{period}</div>
      <h3 className="text-xl text-[#F5F5F7] mb-1">{degree}</h3>
      <div className="text-[#A1A1AA] text-sm mb-2">{institution}</div>
      {details && <p className="text-[#A1A1AA] text-sm">{details}</p>}
    </motion.div>
  );
}
