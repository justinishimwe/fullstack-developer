import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { InsertMessage, Project, Skill, Experience } from "@/schema";

// Mock data for frontend-only portfolio
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    demoUrl: "https://example.com/demo1",
    repoUrl: "https://github.com/justin/ecommerce",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team assignments, and progress tracking.",
    techStack: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://example.com/demo2",
    repoUrl: "https://github.com/justin/task-manager",
    imageUrl: "https://images.unsplash.com/photo-1611269154308-35fc08141456?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "SaaS Analytics Platform",
    description: "A powerful analytics platform for tracking user behavior, engagement metrics, and conversion funnels.",
    techStack: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL"],
    demoUrl: "https://example.com/demo3",
    repoUrl: "https://github.com/justin/analytics",
    imageUrl: "https://images.unsplash.com/photo-1551434494-19fef8b9e38e?auto=format&fit=crop&q=80&w=1000"
  }
];

const mockSkills: Skill[] = [
  // Frontend
  { id: 1, name: "React", category: "frontend" },
  { id: 2, name: "TypeScript", category: "frontend" },
  { id: 3, name: "Tailwind CSS", category: "frontend" },
  { id: 4, name: "Next.js", category: "frontend" },
  { id: 5, name: "Vue.js", category: "frontend" },
  // Backend
  { id: 6, name: "Node.js", category: "backend" },
  { id: 7, name: "Express.js", category: "backend" },
  { id: 8, name: "PostgreSQL", category: "backend" },
  { id: 9, name: "MongoDB", category: "backend" },
  { id: 10, name: "GraphQL", category: "backend" },
  // Tools
  { id: 11, name: "Git", category: "tools" },
  { id: 12, name: "Docker", category: "tools" },
  { id: 13, name: "AWS", category: "tools" },
  { id: 14, name: "Firebase", category: "tools" },
  { id: 15, name: "Figma", category: "tools" }
];

const mockExperiences: Experience[] = [
  {
    id: 1,
    role: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc",
    duration: "2021 - Present",
    description: "Leading development of scalable web applications using React and Node.js. Mentored 3 junior developers and improved application performance by 40%."
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Digital Solutions Ltd",
    duration: "2019 - 2021",
    description: "Built and maintained multiple client projects using MERN stack. Implemented CI/CD pipelines and reduced deployment time by 60%."
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "StartUp Hub",
    duration: "2018 - 2019",
    description: "Started my career building responsive web interfaces with React. Learned best practices in code organization and team collaboration."
  }
];

// Projects Hook
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => mockProjects,
    staleTime: Infinity,
  });
}

// Skills Hook
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => mockSkills,
    staleTime: Infinity,
  });
}

// Experiences Hook
export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => mockExperiences,
    staleTime: Infinity,
  });
}

// Contact Message Mutation
export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Send via Formspree as JSON
      const response = await fetch(
        "https://formspree.io/f/xqedqyze",
        {
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      return {
        id: Math.random(),
        ...data,
        createdAt: new Date(),
      };
    },
  });
}
