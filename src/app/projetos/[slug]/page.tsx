import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { siteCopy } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "pt");

  if (!project) {
    return { title: siteCopy.pt.projectDetail.notFoundTitle };
  }

  return {
    title: `${project.title} — Projetos`,
    description: project.summary || undefined,
  };
}

export function generateStaticParams() {
  return getProjectSlugs("pt").map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "pt");

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage locale="pt" project={project} />;
}
