import { useProjects, useSkills, useExperiences } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/schema";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown, Code, Server, Database, Globe, Briefcase, Calendar, Download, Github, Mail, ExternalLink, ArrowRight } from "lucide-react";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experiences, isLoading: experiencesLoading } = useExperiences();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Categorize skills
  const frontendSkills = skills?.filter(s => s.category === 'frontend') || [];
  const backendSkills = skills?.filter(s => s.category === 'backend') || [];
  const toolSkills = skills?.filter(s => s.category === 'tools') || [];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navigation />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 z-0" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-accent/5 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 z-0" />

        <div className="container-padding relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-display">
              Hi, I'm Justin.<br />
              <span className="text-gradient">Full-Stack Developer</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              I build scalable, responsive, and user-centric web applications that solve real-world problems. Let's turn your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollLink to="projects" smooth={true} offset={-100} duration={500}>
                <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  View My Work
                </button>
              </ScrollLink>
              
              <ScrollLink to="contact" smooth={true} offset={-100} duration={500}>
                <button className="px-8 py-4 rounded-xl bg-card border border-border text-foreground font-semibold hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto">
                  Contact Me
                </button>
              </ScrollLink>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
               {/* Hero Image - Coding setup or Abstract Tech */}
               {/* Unsplash: modern developer workspace dark creative */}
               <img 
                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072" 
                 alt="Coding Workspace" 
                 className="w-full h-auto object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-full">
                   <div className="flex justify-between items-center text-white/90 font-mono text-sm">
                     <span>&lt;Coder /&gt;</span>
                     <span>100% Passion</span>
                   </div>
                 </div>
               </div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-card p-4 rounded-2xl shadow-xl border border-border z-20"
            >
              <Code className="text-primary w-8 h-8" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-5 -left-5 bg-card p-4 rounded-2xl shadow-xl border border-border z-20"
            >
              <Database className="text-accent w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground/50">
          <ArrowDown size={32} />
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* FEATURED PROJECTS - PREMIUM SHOWCASE */}
      <section className="relative py-40 bg-background overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-accent/8 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        </div>

        <div className="container-padding relative z-10">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-28 max-w-3xl mx-auto"
          >
            {/* Animated Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary/5 text-primary font-semibold text-sm mb-8 border border-primary/20 backdrop-blur-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.span 
                className="relative flex h-2.5 w-2.5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </motion.span>
              ✨ Standout Projects
            </motion.div>
            
            {/* Main Heading */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 font-display leading-tight">
              Featured <br className="hidden md:block" />
              <span className="text-gradient inline-block animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                Work
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Showcasing premium full-stack projects that demonstrate technical excellence, creative design, and real-world impact
            </p>
          </motion.div>

          {/* Projects Grid - Premium Layout */}
          {projectsLoading ? (
            <div className="flex justify-center py-40">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary shadow-lg"
              ></motion.div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {projects?.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.25, ease: "easeOut" }}
                  className="group relative h-auto md:h-[520px] rounded-3xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Card Container with Premium Effects */}
                  <div className="relative w-full h-full">
                    {/* Background Image - Premium Quality */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                      />
                    </div>

                    {/* Advanced Overlay System */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/95 group-hover:via-black/40 transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-700"></div>

                    {/* Animated Shine Effect */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                      initial={{ backgroundPosition: "200% 200%" }}
                      animate={{ backgroundPosition: "-200% -200%" }}
                      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        backgroundSize: '200% 200%'
                      }}
                    ></motion.div>

                    {/* Premium Border Glow */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ boxShadow: ["0 0 0 0 rgba(var(--color-primary), 0.3)", "0 0 20px 10px rgba(var(--color-primary), 0.1)"] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                  </div>

                  {/* Premium Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 backdrop-blur-0 group-hover:backdrop-blur-xs transition-all duration-500">
                    {/* Header with Badge and Icon */}
                    <motion.div 
                      className="flex justify-between items-start"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Project Number Badge - Premium */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative group/badge"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover/badge:opacity-100 blur transition-opacity duration-300"></div>
                        <div className="relative px-5 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white font-mono font-bold text-sm md:text-base">
                          PROJECT {String(index + 1).padStart(2, '0')}
                        </div>
                      </motion.div>
                      
                      {/* Floating Action Icon */}
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0 }}
                        animate={{ scale: [1, 1.15, 1] }}
                      >
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <ArrowRight size={28} className="text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Main Content - Premium Typography */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {/* Title with Premium Styling */}
                      <div className="space-y-3">
                        <h3 className="text-4xl md:text-5xl font-bold text-white font-display leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary group-hover:bg-clip-text transition-all duration-500">
                          {project.title}
                        </h3>
                        
                        {/* Divider */}
                        <motion.div 
                          className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "60px" }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        ></motion.div>
                        
                        {/* Description - Enhanced */}
                        <p className="text-white/80 text-base md:text-lg leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack - Premium Tags */}
                      <motion.div 
                        className="flex flex-wrap gap-3 pt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        {project.techStack.map((tech, idx) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.08 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="relative group/tech"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-lg opacity-0 group-hover/tech:opacity-100 blur-sm transition-opacity duration-300"></div>
                            <span className="relative px-4 py-2 text-xs md:text-sm font-bold rounded-lg bg-white/15 text-white/95 backdrop-blur-md border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-lg inline-block">
                              {tech}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Premium Action Buttons */}
                      <motion.div 
                        className="flex gap-4 pt-6 flex-wrap"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {project.demoUrl && (
                          <motion.a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -3 }}
                            whileTap={{ scale: 0.92 }}
                            className="relative group/btn overflow-hidden"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl opacity-75 group-hover/btn:opacity-100 blur transition-opacity duration-300"></div>
                            <div className="relative px-7 py-3 bg-black rounded-xl border border-white/10">
                              <span className="flex items-center gap-2 text-white font-bold">
                                <ExternalLink size={18} />
                                Live Demo
                              </span>
                            </div>
                          </motion.a>
                        )}
                        {project.repoUrl && (
                          <motion.a 
                            href={project.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.08, y: -3 }}
                            whileTap={{ scale: 0.92 }}
                            className="relative group/btn"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-xl opacity-0 group-hover/btn:opacity-100 blur transition-opacity duration-300"></div>
                            <div className="relative px-7 py-3 bg-white/10 rounded-xl border border-white/40 hover:border-white/60 backdrop-blur-md transition-all duration-300">
                              <span className="flex items-center gap-2 text-white font-bold">
                                <Github size={18} />
                                View Code
                              </span>
                            </div>
                          </motion.a>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24 text-center"
          >
            <ScrollLink to="projects" smooth={true} offset={-100} duration={500} className="cursor-pointer inline-block">
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="relative group overflow-hidden"
              >
                {/* Button Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-50 group-hover:opacity-100 blur-lg transition-all duration-500 animate-pulse"></div>
                
                {/* Button Content */}
                <div className="relative px-12 py-5 bg-gradient-to-r from-black to-black/80 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-300">
                  <span className="flex items-center gap-3 text-white font-bold text-lg">
                    Explore All Projects
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <ArrowRight size={24} />
                    </motion.span>
                  </span>
                </div>
              </motion.button>
            </ScrollLink>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-secondary/30 relative">
        <div className="container-padding">
          <SectionHeading title="About Me" subtitle="Who I Am" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-[500px] shadow-xl"
            >
              {/* Unsplash: professional portrait casual tech */}
              <img 
                src="https://images.unsplash.com/photo-1507238691126-52f72db80503?auto=format&fit=crop&q=80&w=1000" 
                alt="Justin Portrait" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-foreground">
                Passionate about creating <span className="text-primary">seamless digital experiences</span>.
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                I am a Full-Stack Developer with a deep passion for building software that is both beautiful and functional. My journey in tech started with curiosity about how things work on the web, which quickly evolved into a career building complex applications.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I specialize in the MERN stack and modern frontend frameworks, but I'm always exploring new technologies. Whether it's crafting pixel-perfect UIs or optimizing backend performance, I approach every project with attention to detail and a user-first mindset.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Globe size={20} />
                  </div>
                  <span className="font-medium">Web Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Server size={20} />
                  </div>
                  <span className="font-medium">Backend Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                    <Code size={20} />
                  </div>
                  <span className="font-medium">Clean Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                    <Database size={20} />
                  </div>
                  <span className="font-medium">Database Design</span>
                </div>
              </div>
              
              <div className="pt-6">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                  <Download size={20} />
                  Download Resume
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-background">
        <div className="container-padding">
          <SectionHeading title="Technical Expertise" subtitle="My Toolkit" />
          
          {skillsLoading ? (
             <div className="flex justify-center py-12">
               <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
             </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Frontend Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Code size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 font-display">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Backend Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                  <Server size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 font-display">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              {/* Tools Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 font-display">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {toolSkills.map(skill => (
                    <span key={skill.id} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-secondary/30">
        <div className="container-padding">
          <SectionHeading title="Featured Projects" subtitle="My Portfolio" />
          
          {projectsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Github size={20} />
              View more on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 bg-background">
        <div className="container-padding">
          <SectionHeading title="Work Experience" subtitle="My Journey" />
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {experiencesLoading ? (
                <div className="flex justify-center py-12">
                   <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                experiences?.map((exp, index) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 mt-1.5 z-10 hidden md:block" />
                    
                    <div className="md:w-1/2" />
                    
                    <div className="md:w-1/2">
                      <div className={`bg-card p-6 rounded-2xl border border-border/50 shadow-md hover:shadow-lg transition-all ${
                        index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}>
                        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
                          <Calendar size={16} />
                          {exp.duration}
                        </div>
                        <h3 className="text-xl font-bold font-display">{exp.role}</h3>
                        <div className="text-muted-foreground font-medium mb-4">{exp.company}</div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-primary/5 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container-padding relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Contact Me" />
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold font-display mb-4">Let's work together!</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I'm currently available for freelance projects and open to full-time opportunities. If you have a project that needs some creative touch, I'd love to hear about it.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-white dark:bg-white/10 rounded-full shadow-sm text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <a href="mailto:hello@justin.dev" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@justin.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-white dark:bg-white/10 rounded-full shadow-sm text-primary">
                    <Github size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Socials</h4>
                    <div className="flex gap-4 mt-1">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
