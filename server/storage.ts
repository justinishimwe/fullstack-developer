import { db } from "./db";
import {
  projects,
  skills,
  experiences,
  messages,
  type Project,
  type Skill,
  type Experience,
  type Message,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async seedData(): Promise<void> {
    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          title: "E-Commerce Dashboard",
          description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
          techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
          demoUrl: "https://example.com/demo1",
          repoUrl: "https://github.com/justin/ecommerce",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
        },
        {
          title: "Task Collaboration Platform",
          description: "Real-time task management tool allowing teams to collaborate seamlessly with kanban boards and chat integration.",
          techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
          demoUrl: "https://example.com/demo2",
          repoUrl: "https://github.com/justin/tasks",
          imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
        },
        {
          title: "AI Content Generator",
          description: "SaaS application that uses OpenAI's API to generate blog posts and social media content for marketers.",
          techStack: ["Next.js", "OpenAI API", "Stripe"],
          demoUrl: "https://example.com/demo3",
          repoUrl: "https://github.com/justin/ai-gen",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        },
      ]);
    }

    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "React", category: "frontend" },
        { name: "TypeScript", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "Next.js", category: "frontend" },
        { name: "Node.js", category: "backend" },
        { name: "Express", category: "backend" },
        { name: "PostgreSQL", category: "backend" },
        { name: "Python", category: "backend" },
        { name: "Git", category: "tools" },
        { name: "Docker", category: "tools" },
        { name: "AWS", category: "tools" },
        { name: "Figma", category: "tools" },
      ]);
    }

    const existingExperiences = await this.getExperiences();
    if (existingExperiences.length === 0) {
      await db.insert(experiences).values([
        {
          role: "Senior Full Stack Developer",
          company: "TechFlow Systems",
          duration: "2023 - Present",
          description: "Leading a team of 5 developers building cloud-native applications. Architected the migration from monolith to microservices.",
        },
        {
          role: "Frontend Developer",
          company: "Creative Digital Agency",
          duration: "2021 - 2023",
          description: "Developed responsive websites and web applications for high-profile clients. Improved site performance by 40%.",
        },
        {
          role: "Junior Developer",
          company: "StartUp Inc",
          duration: "2020 - 2021",
          description: "Collaborated on the development of the MVP. Implemented key features using React and Node.js.",
        },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
