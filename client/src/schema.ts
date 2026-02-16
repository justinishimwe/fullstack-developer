import { z } from "zod";

// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl: string;
}

// Skill type
export interface Skill {
  id: number;
  name: string;
  category: string;
}

// Experience type
export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

// Message type
export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Zod schemas for validation
export const insertMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
