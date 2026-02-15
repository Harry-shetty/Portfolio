import { motion } from "motion/react";

interface TagPillProps {
  children: string;
}

export function TagPill({ children }: TagPillProps) {
  return (
    <motion.span
      whileHover={{ y: -3 }}
      className="
        inline-block px-4 py-2 text-sm font-mono
        bg-[#151515] text-[#F5F5F7]
        border border-[#262626] rounded-lg
        hover:border-[#00FF88] transition-all duration-300
        relative overflow-hidden group cursor-pointer
      "
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88]"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
}
