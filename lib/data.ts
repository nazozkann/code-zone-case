import postsJson from "@/data/posts.json";
import type { Post } from "./types";

const posts: Post[] = postsJson as unknown as Post[];

export function getAllPosts() {
  return [...posts].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export function getTrendPosts(limit = 6) {
  const trends = getAllPosts().filter((p) => p.attributes.trends);
  const filled =
    trends.length >= limit
      ? trends.slice(0, limit)
      : [...trends, ...getAllPosts().filter((p) => !p.attributes.trends)].slice(
          0,
          limit
        );
  return filled;
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((p) => p.attributes.slug === slug) || null;
}

export function getAllSlugs() {
  return getAllPosts().map((p) => p.attributes.slug);
}
