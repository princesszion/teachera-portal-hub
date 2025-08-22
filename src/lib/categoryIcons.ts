// src/lib/categoryIcons.ts
import {
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Award,
  BookOpen,
  Globe,
  LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  jobs: Briefcase,
  fellowships: GraduationCap,
  volunteer: HeartHandshake,
  awards: Award,
  training: BookOpen,
  scholarships: Globe,
};
