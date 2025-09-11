import postsJson from "@/data/posts.json";
import type { Post } from "./types";

const posts: Post[] = postsJson as unknown as Post[];

export const getAllPosts = () => posts;

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.attributes.slug === slug);

export const getByCategory = (cat: string) =>
  posts.filter((p) => p.attributes.category?.includes(cat));

export const getTrends = () => posts.filter((p) => p.attributes.trends);
