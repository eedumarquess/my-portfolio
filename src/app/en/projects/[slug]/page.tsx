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
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: siteCopy.en.projectDetail.notFoundTitle };
  }

  return {
    title: `${project.title} — Projects`,
    description: project.summary || undefined,
  };
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function EnglishProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage locale="en" project={project} />;
}
