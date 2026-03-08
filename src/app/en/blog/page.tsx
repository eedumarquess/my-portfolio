import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/pages/BlogIndexPage";
import { siteCopy } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Blog — Articles and notes",
  description: siteCopy.en.blog.description,
};

export default function EnglishBlogPage() {
  return <BlogIndexPage locale="en" />;
}
