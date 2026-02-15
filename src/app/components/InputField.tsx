import { motion } from "motion/react";
import { useState } from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputField({ 
  label, 
  type = "text", 
  placeholder, 
  name,
  value,
  onChange 
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const Component = type === "textarea" ? "textarea" : "input";
  
  return (
    <div className="mb-6">
      <label className="block text-[#F5F5F7] text-sm mb-2">{label}</label>
      <div className="relative">
        <Component
          type={type !== "textarea" ? type : undefined}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 bg-[#151515] text-[#F5F5F7]
            border border-[#262626] rounded-xl
            focus:outline-none focus:border-[#00FF88]
            transition-colors duration-300
            placeholder:text-[#A1A1AA]
            ${type === "textarea" ? "resize-none h-32" : ""}
          `}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-0.5 bg-[#00FF88]"
          initial={{ width: "0%", x: "-50%" }}
          animate={{ 
            width: isFocused ? "100%" : "0%",
            x: "-50%"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
