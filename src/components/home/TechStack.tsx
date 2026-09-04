"use client";

import { motion } from "framer-motion";
import {
  IoLogoReact,
  IoLogoNodejs,
  IoLogoGithub,
  IoLogoVercel,
  IoSparklesOutline,
  IoBarChartOutline,
} from "react-icons/io5";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiFramer,
} from "react-icons/si";

const categories = [
  {
    label: "Frontend",
    techs: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: IoLogoReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Recharts", icon: IoBarChartOutline },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "Express", icon: SiExpress },
      { name: "Node.js", icon: IoLogoNodejs },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    label: "AI & Auth",
    techs: [
      { name: "OpenAI / Gemini", icon: IoSparklesOutline },
      { name: "Better Auth", icon: IoLogoGithub },
    ],
  },
  {
    label: "DevOps",
    techs: [
      { name: "Vercel", icon: IoLogoVercel },
      { name: "GitHub", icon: IoLogoGithub },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function TechStack() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--cp-teal)" }}
          >
            Built with
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            A modern stack, chosen with intent.
          </h2>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.label}>
              <p
                className="font-mono-label text-xs uppercase mb-4"
                style={{ color: "var(--cp-text-faint)" }}
              >
                {cat.label}
              </p>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {cat.techs.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default transition-shadow duration-200"
                      style={{
                        background: "var(--cp-surface)",
                        border: "1px solid var(--cp-border)",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--cp-accent)" }} />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
