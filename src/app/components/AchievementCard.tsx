import { motion } from "motion/react";

interface AchievementCardProps {
  number: string;
  label: string;
  delay?: number;
}

export function AchievementCard({ number, label, delay = 0 }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="
        bg-[#151515] border border-[#262626] rounded-2xl p-8
        hover:border-[#00FF88]/30 transition-all duration-300
        relative overflow-hidden group
      "
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          className="text-5xl mb-3 bg-gradient-to-r from-[#00FF88] to-[#00FF88]/70 bg-clip-text text-transparent"
        >
          {number}
        </motion.div>
        
        <div className="text-[#F5F5F7] text-base mb-2">{label}</div>
        
        <motion.div
          className="h-0.5 bg-[#00FF88]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
        />
      </div>
    </motion.div>
  );
}
