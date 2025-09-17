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
  type: "posts";
  attributes: {
    trends: boolean;
    category: string[];
    tags: string[];
    authors: string[];
    title: string;
    slug: string;
    content: string;
    desc: string;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      canonicalURL?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
};
