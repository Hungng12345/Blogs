import type { PostDetail, PostMeta } from "./types";

type Cache = {
  all?: PostMeta[];
  detail: Map<string, PostDetail | null>;
};

export const postsCache: Cache = {
  all: undefined,
  detail: new Map(),
};
