import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetailPage } from "@/components/pages/PostDetailPage";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { siteCopy } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "pt");

  if (!post) {
    return { title: siteCopy.pt.blogPost.notFoundTitle };
  }

  return {
    title: `${post.title} — Blog`,
    description: post.summary || undefined,
  };
}

export function generateStaticParams() {
  return getPostSlugs("pt").map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "pt");

  if (!post) {
    notFound();
  }

  return <PostDetailPage locale="pt" post={post} />;
}
