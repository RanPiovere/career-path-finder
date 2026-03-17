const USERS_KEY = "cpf_users";
const CURRENT_USER_KEY = "cpf_current_user_email";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(USERS_KEY);
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

const getCurrentUserEmail = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(CURRENT_USER_KEY);
};

const getCurrentUser = (): StoredUser | null => {
  const email = getCurrentUserEmail();
  if (!email) {
    return null;
  }
  const users = getStoredUsers();
  return users.find((u) => u.email === email) ?? null;
};

export type { StoredUser };
export { getCurrentUserEmail, getCurrentUser };

