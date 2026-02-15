import { motion } from "motion/react";

interface ProgressBarProps {
  skill: string;
  percentage: number;
}

export function ProgressBar({ skill, percentage }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-[#F5F5F7] text-sm">{skill}</span>
        <span className="text-[#A1A1AA] text-sm font-mono">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-[#151515] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00FF88] to-[#00FF88]/70 rounded-full
                     shadow-[0_0_20px_rgba(0,255,136,0.3)]"
        />
      </div>
    </div>
  );
}
