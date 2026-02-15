import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
}

export function AnimatedButton({ 
  children, 
  variant = "primary", 
  onClick,
  type = "button" 
}: AnimatedButtonProps) {
  const isPrimary = variant === "primary";
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative px-8 py-4 rounded-2xl overflow-hidden
        transition-all duration-300
        ${isPrimary 
          ? "bg-[#00FF88] text-[#0E0E0E]" 
          : "border border-[#262626] text-[#F5F5F7] hover:border-[#00FF88]"
        }
      `}
    >
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
      >
        {children}
      </motion.span>
      {!isPrimary && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88]"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
