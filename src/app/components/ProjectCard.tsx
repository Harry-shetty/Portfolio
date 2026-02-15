import { motion } from "motion/react";
import { ExternalLink, Award } from "lucide-react";
// video for Dice Simulator project
import demoMov from "./images/DED5124C-8230-4F58-98BA-19C944EC81D2.mov";
// portfolio image (added from attachments)
// portfolio image is now served from public/assets/images/portfolio.jpg

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  status?: string;
  featured?: boolean;
  highlights?: string[];
}

export function ProjectCard({ title, description, stack, status, featured = false, highlights }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -6,
        boxShadow: featured 
          ? "0 30px 60px rgba(0, 255, 136, 0.15)" 
          : "0 20px 40px rgba(0, 255, 136, 0.1)",
        borderColor: "#00FF88"
      }}
      className={`
        bg-[#151515] border border-[#262626] rounded-2xl p-6
        transition-all duration-300 cursor-pointer group
        ${featured ? "md:col-span-2 lg:col-span-3 border-[#00FF88]/20" : ""}
      `}
    >
      {featured && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <Award className="w-5 h-5 text-[#00FF88]" />
          <span className="text-sm text-[#00FF88] font-mono">FEATURED PROJECT</span>
        </motion.div>
      )}
      
      <div className={`${featured ? "grid md:grid-cols-2 gap-8" : ""}`}>
        {featured ? (
          <>
            {/* Left column: media only for featured */}
            <div className={`aspect-video bg-[#0E0E0E] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden ${featured ? "mb-6 md:mb-0" : ""}`}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {title === "Dice Simulator Application" ? (
                <video autoPlay muted loop playsInline className="project-video w-full h-full object-cover">
                  <source src={demoMov} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              ) : title === "Portfolio Website" ? (
                // Use static public asset for the portfolio screenshot
                <img src="/assets/images/portfolio.jpg" alt="Portfolio demo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <ExternalLink className="w-8 h-8 text-[#A1A1AA] group-hover:text-[#00FF88] transition-colors" />
              )}
            </div>

            {/* Right column: vertically center text and stacks */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3 className="text-2xl text-[#F5F5F7]">{title}</h3>
                {status && (
                  <span className="text-xs text-[#00FF88] font-mono px-2 py-1 bg-[#00FF88]/10 rounded">
                    {status}
                  </span>
                )}
              </div>

              <p className="text-[#A1A1AA] mb-4 text-base leading-relaxed">{description}</p>

              {highlights && highlights.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                      <span className="text-[#00FF88] mt-0.5">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -3 }}
                    className="text-xs font-mono text-[#F5F5F7] px-3 py-1.5 bg-[#262626] rounded-lg
                               border border-[#262626] hover:border-[#00FF88]/30 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className={`aspect-video bg-[#0E0E0E] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden ${featured ? "mb-6" : ""}`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {title === "Dice Simulator Application" ? (
                  <video autoPlay muted loop playsInline className="project-video w-full h-full object-cover">
                    <source src={demoMov} type="video/quicktime" />
                    Your browser does not support the video tag.
                  </video>
                ) : title === "Portfolio Website" ? (
                  <img src="/assets/images/portfolio.jpg" alt="Portfolio demo" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <ExternalLink className="w-8 h-8 text-[#A1A1AA] group-hover:text-[#00FF88] transition-colors" />
                )}
              </div>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3 className={`${featured ? "text-2xl" : "text-xl"} text-[#F5F5F7]`}>{title}</h3>
                {status && (
                  <span className="text-xs text-[#00FF88] font-mono px-2 py-1 bg-[#00FF88]/10 rounded">
                    {status}
                  </span>
                )}
              </div>

              <p className={`text-[#A1A1AA] mb-4 ${featured ? "text-base" : "text-sm"} leading-relaxed`}>
                {description}
              </p>

              {highlights && highlights.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                      <span className="text-[#00FF88] mt-0.5">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={featured ? "flex flex-col justify-between" : ""}>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -3 }}
                    className="text-xs font-mono text-[#F5F5F7] px-3 py-1.5 bg-[#262626] rounded-lg
                               border border-[#262626] hover:border-[#00FF88]/30 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
