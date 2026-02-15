import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  isHovering: boolean;
}

export function CustomCursor({ isHovering }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 16 : 4),
          y: mousePosition.y - (isHovering ? 16 : 4),
          scale: isHovering ? 1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 32 : 8,
            height: isHovering ? 32 : 8,
          }}
          transition={{ duration: 0.2 }}
          className={`
            rounded-full
            ${isHovering 
              ? "bg-transparent border-2 border-[#00FF88]" 
              : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            }
          `}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-[#00FF88] opacity-50" />
      </motion.div>
    </>
  );
}
