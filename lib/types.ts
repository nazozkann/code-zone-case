export type PostSEO = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalURL?: string;
};

export type PostAttributes = {
  trends: boolean;
  category: string[];
  tags: string[];
  authors: string[];
  title?: string;
  slug: string;
  content: string;
  seo?: PostSEO;
  desc?: string;
  img: string;
};

export type Post = {
  _id: string;
  user_id: string;
  type: "posts";
  attributes: PostAttributes;
  lang: "tr";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
