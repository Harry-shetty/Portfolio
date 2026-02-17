import { useState, useEffect } from "react";
// removed XLSX export per request; backend will handle storage
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight, Terminal, Award, GraduationCap, FileText } from "lucide-react";
import { AnimatedButton } from "./components/AnimatedButton";
import { ProjectCard } from "./components/ProjectCard";
import { TagPill } from "./components/TagPill";
import { InputField } from "./components/InputField";
import { CustomCursor } from "./components/CustomCursor";
import { AchievementCard } from "./components/AchievementCard";
import { EducationItem } from "./components/EducationItem";
import { CertificateItem } from "./components/CertificateItem";
import { SkillCategory } from "./components/SkillCategory";

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const taglines = [
    "Full Stack Developer",
    "AI-Powered Web Builder",
    "React & Node.js Engineer",
    "Hackathon Finalist",
    "Problem Solver"
  ];
  
  // Rotating tagline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in name, email and message before sending.");
      return;
    }

    try {
  const apiUrl = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000/api/messages";
  const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Server error", err);
        alert("Failed to send message. Try again later.");
        return;
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Network error. Could not send message.");
    }
  };
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F7] cursor-none">
      <CustomCursor isHovering={isHovering} />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0E0E0E]/80 border-b border-[#262626]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6 flex justify-between items-center">
          <motion.div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.02 }}
            className="text-xl md:text-2xl tracking-wide cursor-pointer relative group"
          >
            𝐇𝐚𝐫𝐬𝐡𝐚
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88]"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {[
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Skills", id: "skills" },
              { label: "Education", id: "education" },
              { label: "Contact", id: "contact" }
            ].map(({ label, id }) => (
              <motion.a
                key={id}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05, color: "#00FF88" }}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                className="text-sm hover:text-[#00FF88] transition-colors cursor-pointer"
              >
                {label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-[#F5F5F7]"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-0.5 bg-[#F5F5F7] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#F5F5F7] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#F5F5F7]" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced with Rotating Tagline */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-20 relative overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 md:mb-12 bg-[#151515] border border-[#262626] rounded-full"
          >
            <Terminal className="w-4 h-4 text-[#00FF88]" />
            <span className="text-xs md:text-sm font-mono text-[#A1A1AA]">Computer Science Engineering Student</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-8xl mb-6 md:mb-8 tracking-tight leading-none"
          >
            Harsha B K
          </motion.h1>
          
          {/* Rotating Tagline */}
          <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden mb-8 md:mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTaglineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-xl md:text-2xl text-[#A1A1AA] flex items-center gap-2 px-4"
              >
                <span className="text-[#00FF88]">×</span>
                {taglines[currentTaglineIndex]}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-0.5 h-5 md:h-6 bg-[#00FF88] inline-block ml-1"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#A1A1AA] font-mono text-xs md:text-sm mb-12 md:mb-16 max-w-2xl mx-auto px-4"
          >
            Building intelligent civic and scalable digital systems
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex gap-4 md:gap-6 justify-center flex-wrap px-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AnimatedButton variant="primary" onClick={() => scrollToSection("projects")}>
              View Projects
            </AnimatedButton>
            <AnimatedButton variant="secondary" onClick={() => scrollToSection("contact")}>
              Contact Me
            </AnimatedButton>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex gap-6 md:gap-8 justify-center mt-12 md:mt-16"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {[
              { Icon: Github, href: "https://github.com/Harry-shetty" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/harshabk03/" },
              { Icon: Mail, href: "#contact" },
            ].map(({ Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target={href && href.startsWith("http") ? "_blank" : undefined}
                rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, color: "#00FF88" }}
                className="text-[#A1A1AA] hover:text-[#00FF88] transition-colors"
              >
                <Icon className="w-5 md:w-6 h-5 md:h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Updated with Real Content */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl mb-4 md:mb-6 leading-tight">About Me</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed mb-6">
                Computer Science Engineering student at <span className="text-[#00FF88]">Lovely Professional University</span> with hands-on experience building AI-powered civic web systems and full stack applications.
              </p>
              <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
                Specializing in <span className="text-[#F5F5F7]">React, Node.js, and Google Gemini AI</span> to create intelligent systems that solve real-world problems. Recent work includes government-level civic platforms and AI-driven automation solutions.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {["React.js", "Node.js", "Express.js", "Google Gemini AI", "Python", "C++", "JavaScript", "MySQL"].map((tech) => (
              <TagPill key={tech}>{tech}</TagPill>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Real Projects with Parivartan Featured */}
      <section id="projects" className="py-24 md:py-40 px-6 md:px-8 bg-[#151515]/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl mb-4 md:mb-6">Featured Projects</h2>
            <p className="text-[#A1A1AA] text-base md:text-lg">Building solutions that matter.</p>
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Featured Project - Parivartan */}
            <ProjectCard
              title="Parivartan"
              description="Government civic issue reporting web application built for the Government of Punjab. An AI-powered platform that revolutionizes how citizens report and track civic issues."
              stack={["React.js", "Node.js", "Express.js", "Gemini AI 2.5", "JavaScript", "CSS"]}
              status="DEPLOYED"
              featured={true}
                href="https://github.com/Harry-shetty/Portfolio.git"
              highlights={[
                "AI-powered image recognition using Google Gemini 2.5 Flash",
                "Automated verification workflows",
                "Reduced manual processing time by 80%"
              ]}
            />
            
            {/* Other Projects */}
            <ProjectCard
              title="Dice Simulator Application"
              description="Python desktop GUI application with fair randomization logic, multiple dice roll support, and comprehensive score tracking system."
              stack={["Python", "Tkinter", "Random Module"]}
              status="COMPLETE"
              href="https://github.com/Harry-shetty/Dice-Simulator.git"
            />
            
            <ProjectCard
              title="Portfolio Website"
              description="Fully responsive personal portfolio website with mobile-first design approach, showcasing projects and technical skills."
              stack={["HTML5", "CSS3", "JavaScript", "Responsive Design"]}
              status="LIVE"
            />
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Organized by Category */}
      <section id="skills" className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl mb-4 md:mb-6">Technical Skills</h2>
            <p className="text-[#A1A1AA] text-base md:text-lg">Full stack development with modern technologies.</p>
          </motion.div>
          
          <div 
            className="grid md:grid-cols-2 gap-6 md:gap-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <SkillCategory
              category="Languages"
              skills={["C++", "C", "Python", "JavaScript", "PHP"]}
              delay={0}
            />
            <SkillCategory
              category="Frameworks & Libraries"
              skills={["React.js", "Node.js", "Express.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"]}
              delay={0.1}
            />
            <SkillCategory
              category="Tools & Technologies"
              skills={["MySQL", "MongoDB", "Google Gemini AI", "Git", "REST APIs"]}
              delay={0.2}
            />
            <SkillCategory
              category="Soft Skills"
              skills={["Problem Solving", "Project Management", "Adaptability"]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 md:py-40 px-6 md:px-8 bg-[#151515]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-[#00FF88]" />
              <h2 className="text-4xl md:text-6xl">Achievements</h2>
            </div>
            <p className="text-[#A1A1AA] text-base md:text-lg text-center md:text-left">Competition highlights and recognitions</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151515] border border-[#00FF88]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-[#00FF88]/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-3 px-5 py-2 bg-[#00FF88]/10 border border-[#00FF88] rounded-full mb-6"
              >
                <Award className="w-5 h-5 text-[#00FF88]" />
                <span className="text-[#00FF88] font-mono text-sm">FINALIST</span>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl text-[#F5F5F7] mb-4">
                CipherThon 2.0 (2024)
              </h3>
              
              <p className="text-[#A1A1AA] text-base md:text-lg mb-6">
                Competed against <span className="text-[#00FF88]">5000+ participants</span> and secured a spot in the finals, demonstrating strong problem-solving abilities and technical excellence.
              </p>
              
              <motion.div
                className="h-0.5 bg-gradient-to-r from-[#00FF88] to-transparent"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-[#00FF88]" />
              <h2 className="text-4xl md:text-6xl">Education</h2>
            </div>
            <p className="text-[#A1A1AA] text-base md:text-lg">Academic background and qualifications</p>
          </motion.div>
          
          <div className="relative">
            <EducationItem
              period="Aug 2023 - Present"
              degree="B.Tech in Computer Science Engineering"
              institution="Lovely Professional University"
              details="CGPA: 6.5 | Focus on Full Stack Development, AI Integration, and Software Engineering"
            />
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-24 md:py-40 px-6 md:px-8 bg-[#151515]/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-[#00FF88]" />
              <h2 className="text-4xl md:text-6xl">Certifications</h2>
            </div>
            <p className="text-[#A1A1AA] text-base md:text-lg">Professional learning and development</p>
          </motion.div>
          
          <div 
            className="mt-6 md:mt-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="mb-8 md:mb-10">
              <CertificateItem
                title="Data Structures & Algorithms"
                issuer="CipherSchools"
                delay={0}
                href={"https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/6825f22984e1c7517d4a3adb_67e3fb0045b2b98d0db4e726"}
              />
            </div>

            <div className="mb-8 md:mb-10">
              <CertificateItem
                title="Project Management Job Simulation"
                issuer="Professional Development Program"
                delay={0.1}
                href={"https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/tHFz7Bfjmh35DXQv6_Accenture%20North%20America_fQQnsBGn2HNpYsrz3_1721134080529_completion_certificate.pdf"}
              />
            </div>

            <div>
              <CertificateItem
                title="Career Advice Soft Skills"
                issuer="Professional Development Program"
                delay={0.2}
                href={"https://www.mindluster.com/student/certificate/12617476768#google_vignette"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20 text-center"
          >
            <h2 className="text-4xl md:text-6xl mb-4 md:mb-6">Get In Touch</h2>
            <p className="text-[#A1A1AA] text-base md:text-lg">
              Let's build something amazing together. Drop me a message.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#151515] border border-[#262626] rounded-3xl p-6 md:p-10"
          >
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
              />
              <InputField
                label="Message"
                type="textarea"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(value) => setFormData({ ...formData, message: value })}
              />
              
              <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <AnimatedButton type="submit" variant="primary">
                  Send Message
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </AnimatedButton>
              </div>
            </form>
            
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-5 bg-[#00FF88]/10 border border-[#00FF88] rounded-2xl text-center"
              >
                <p className="text-[#00FF88] text-base md:text-lg">✓ Message sent successfully!</p>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-16 text-center"
          >
            <p className="text-[#A1A1AA] text-sm mb-4">Or reach me directly at:</p>
            <a
              href="mailto:harshabk328@gmail.com"
              className="text-[#00FF88] hover:underline text-base md:text-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              harshabk328@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-12 md:py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div>
            <p className="text-[#A1A1AA] text-xs md:text-sm font-mono text-center md:text-left">
              © 2026 Harsha B K. Engineered with precision.
            </p>
          </div>
          
          <div 
            className="flex gap-6 md:gap-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {[
              { Icon: Github, href: "https://github.com/Harry-shetty" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/harshabk03/" },
              { Icon: Mail, href: "#contact" },
            ].map(({ Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target={href && href.startsWith("http") ? "_blank" : undefined}
                rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, color: "#00FF88" }}
                className="text-[#A1A1AA] hover:text-[#00FF88] transition-colors"
              >
                <Icon className="w-5 md:w-6 h-5 md:h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
