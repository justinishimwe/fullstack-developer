import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/schema";

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-5xl w-full mx-4 md:mx-0 bg-card rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full h-64 md:h-auto relative">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 w-full p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{project.description}</p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-accent font-semibold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-md bg-white/10 text-sm text-white/90">{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-6">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">Live Demo</a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold">View Code</a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
