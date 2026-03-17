const BOOKMARKS_KEY = "cpf_bookmarks_v1";

type BookmarkItemType = "test" | "post";

type Bookmark = {
  userKey: string;
  itemId: string;
  itemType: BookmarkItemType;
  title: string;
  savedAt: string;
};

const loadBookmarks = (): Bookmark[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(BOOKMARKS_KEY);
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

const saveBookmarks = (items: Bookmark[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(items));
};

const getUserBookmarks = (userKey: string) => {
  if (!userKey) {
    return [];
  }
  return loadBookmarks().filter((b) => b.userKey === userKey);
};

const isBookmarked = (userKey: string, itemId: string, itemType: BookmarkItemType) => {
  if (!userKey || !itemId) {
    return false;
  }
  return (
    loadBookmarks().find((b) => b.userKey === userKey && b.itemId === itemId && b.itemType === itemType) !==
    undefined
  );
};

const toggleBookmark = (
  userKey: string,
  itemId: string,
  itemType: BookmarkItemType,
  title: string,
): Bookmark[] => {
  if (!userKey || !itemId) {
    return loadBookmarks();
  }
  const all = loadBookmarks();
  const index = all.findIndex((b) => b.userKey === userKey && b.itemId === itemId && b.itemType === itemType);
  if (index !== -1) {
    const next = [...all];
    next.splice(index, 1);
    saveBookmarks(next);
    return next;
  }
  const next: Bookmark[] = [
    ...all,
    {
      userKey,
      itemId,
      itemType,
      title,
      savedAt: new Date().toISOString(),
    },
  ];
  saveBookmarks(next);
  return next;
};

export type { Bookmark, BookmarkItemType };
export { loadBookmarks, getUserBookmarks, isBookmarked, toggleBookmark };

