const POSTS_KEY = "cpf_custom_posts_v1";

type CustomPost = {
  id: string;
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
  authorEmail: string;
  createdAt: string;
};

type NewPostInput = {
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
};

const loadPosts = (): CustomPost[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(POSTS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const savePosts = (posts: CustomPost[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const createPost = (input: NewPostInput, authorEmail: string): CustomPost => {
  const posts = loadPosts();
  const post: CustomPost = {
    id: generateId(),
    title: input.title,
    description: input.description,
    content: input.content,
    imageUrl: input.imageUrl,
    authorEmail,
    createdAt: new Date().toISOString(),
  };
  const next = [...posts, post];
  savePosts(next);
  return post;
};

const getPostsByAuthor = (email: string): CustomPost[] => {
  if (!email) {
    return [];
  }
  return loadPosts().filter((p) => p.authorEmail === email);
};

const getAllPosts = (): CustomPost[] => loadPosts();

const getPostById = (id: string): CustomPost | null => {
  if (!id) {
    return null;
  }
  const posts = loadPosts();
  return posts.find((p) => p.id === id) ?? null;
};

export type { CustomPost, NewPostInput };
export { createPost, getPostsByAuthor, getAllPosts, getPostById };

