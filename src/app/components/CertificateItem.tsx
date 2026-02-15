import { motion } from "motion/react";
import { Award } from "lucide-react";

interface CertificateItemProps {
  title: string;
  issuer: string;
  delay?: number;
  href?: string;
}

export function CertificateItem({ title, issuer, delay = 0, href }: CertificateItemProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 4 }}
      className="
        flex items-start gap-4 p-4 bg-[#151515] border border-[#262626] 
        rounded-xl hover:border-[#00FF88]/30 transition-all duration-300
        group cursor-pointer
      "
    >
      <motion.div
        whileHover={{ rotate: 15 }}
        className="mt-1"
      >
        <Award className="w-5 h-5 text-[#00FF88] group-hover:text-[#00FF88] transition-colors" />
      </motion.div>
      <div>
        <h4 className="text-[#F5F5F7] mb-2 group-hover:text-[#00FF88] transition-colors">
          {title}
        </h4>
        <p className="text-[#A1A1AA] text-sm">{issuer}</p>
      </div>
      <motion.div
        className="ml-auto h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
