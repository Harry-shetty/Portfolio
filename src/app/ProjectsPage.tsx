import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { ProjectCard } from "./components/ProjectCard";
import { CustomCursor } from "./components/CustomCursor";

export function ProjectsPage() {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F7] font-sans overflow-x-hidden selection:bg-[#00FF88]/30 selection:text-white">
      <CustomCursor isHovering={isHovering} />
      
      <nav className="fixed w-full z-50 px-6 py-4 md:py-6 md:px-8 border-b border-[#262626] bg-[#0E0E0E]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#00FF88] transition-colors cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </div>
      </nav>

      <section className="py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <h1 className="text-4xl md:text-6xl mb-4 md:mb-6">All Projects</h1>
            <p className="text-[#A1A1AA] text-base md:text-lg">A comprehensive list of my work and explorations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 md:gap-12"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ProjectCard
              title="WeatherGPT"
              description="AI-Powered Weather Assistant. A conversational AI specialized in meteorology, climate patterns, and weather alerts for concise insights."
              stack={["React 19", "Vite", "Tailwind CSS", "Google Gemini API", "React Leaflet", "Three.js"]}
              status="LIVE"
              featured={true}
              href="https://weather-gpt-weld.vercel.app"
              highlights={[
                "Integrated Gemini 3.6 Flash for chat",
                "Interactive global weather map and 3D particle landing page",
                "Real-time weather chat and live public alerts"
              ]}
            />
            
            <ProjectCard
              title="FashionCycle"
              description="AI-powered circular fashion platform that recommends the most sustainable next step for unwanted clothing."
              stack={["React.js", "Node.js", "MongoDB", "Google Gemini API", "JWT"]}
              status="COMPLETE"
              featured={true}
              highlights={[
                "Natural-language recommendations via Gemini API",
                "Integrated marketplace and EcoPoints sustainability dashboard"
              ]}
            />
            
            <ProjectCard
              title="Parivartan"
              description="Full-stack civic issue reporting platform for the Government of Punjab covering 18+ departments."
              stack={["React.js", "Node.js", "Express.js", "Google Gemini AI", "JavaScript", "CSS"]}
              status="COMPLETE"
              featured={true}
              href="https://github.com/Harry-shetty/Parivartan"
              highlights={[
                "AI-powered image analysis and automated complaint classification",
                "Reduced manual complaint processing time by 80%"
              ]}
            />

            <ProjectCard
              title="Dice Simulator Application"
              description="Python desktop GUI application with fair randomization logic, multiple dice roll support, and comprehensive score tracking system."
              stack={["Python", "Tkinter", "Random Module"]}
              status="COMPLETE"
              featured={true}
              href="https://github.com/Harry-shetty/Dice-Simulator.git"
            />
            
            <ProjectCard
              title="Portfolio Website"
              description="Fully responsive personal portfolio website with mobile-first design approach, showcasing projects and technical skills."
              stack={["HTML5", "CSS3", "JavaScript", "Responsive Design"]}
              status="LIVE"
              featured={true}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

