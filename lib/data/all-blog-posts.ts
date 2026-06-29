// All Blog Posts - Combined Export
import { BLOG_POSTS } from "./blog-posts";
import { BLOG_POSTS_PART2 } from "./blog-posts-2";
import { BLOG_POSTS_PART3 } from "./blog-posts-3";
import { BLOG_POSTS_PART4 } from "./blog-posts-4";
import { BLOG_POSTS_PART5 } from "./blog-posts-5";
import { BLOG_POSTS_PART6 } from "./blog-posts-6";
import { BLOG_POSTS_PART7 } from "./blog-posts-7";
import { BLOG_POSTS_PART8 } from "./blog-posts-8";
import { BLOG_POSTS_PART9 } from "./blog-posts-9";
import { BLOG_POSTS_PART10 } from "./blog-posts-10";
import type { BlogPostData } from "./blog-posts";

export type { BlogPostData };

export const ALL_BLOG_POSTS: BlogPostData[] = [
    ...BLOG_POSTS,
    ...BLOG_POSTS_PART2,
    ...BLOG_POSTS_PART3,
    ...BLOG_POSTS_PART4,
    ...BLOG_POSTS_PART5,
    ...BLOG_POSTS_PART6,
    ...BLOG_POSTS_PART7,
    ...BLOG_POSTS_PART8,
    ...BLOG_POSTS_PART9,
    ...BLOG_POSTS_PART10,
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
    return ALL_BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return ALL_BLOG_POSTS.map((p) => p.slug);
}
