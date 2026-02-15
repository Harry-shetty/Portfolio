import { motion } from "motion/react";

interface SkillCategoryProps {
  category: string;
  skills: string[];
  delay?: number;
}

export function SkillCategory({ category, skills, delay = 0 }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-[#151515] border border-[#262626] rounded-2xl p-6 hover:border-[#00FF88]/20 transition-colors"
    >
      <h3 className="text-xl text-[#F5F5F7] mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + (idx * 0.05) }}
            whileHover={{ y: -3 }}
            className="
              inline-block px-3 py-1.5 text-sm font-mono
              bg-[#262626] text-[#F5F5F7]
              border border-[#262626] rounded-lg
              hover:border-[#00FF88] transition-all duration-300
              relative overflow-hidden group cursor-pointer
            "
          >
            <span className="relative z-10">{skill}</span>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88]"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
