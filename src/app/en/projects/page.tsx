import type { Metadata } from "next";
import { ProjectsIndexPage } from "@/components/pages/ProjectsIndexPage";
import { siteCopy } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects",
  description: siteCopy.en.projects.description,
};

export default function EnglishProjectsPage() {
  return <ProjectsIndexPage locale="en" />;
}
