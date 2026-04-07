export type ProfileSettingsData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  bio: string;
  avatarUrl: string;
  registeredAt: string;
  role: string;
};

export type SecuritySettingsData = {
  twoFactorEnabled: boolean;
  activeSessions: Array<{
    id: string;
    device: string;
    os: string;
    location: string;
    lastActive: string;
  }>;
};

export type NotificationSettingsData = {
  emailNotifications: boolean;
  newTests: boolean;
  testResults: boolean;
  careerNews: boolean;
  marketing: boolean;
  weeklyDigest: boolean;
  pushNotifications: boolean;
};

export type CareerPreferencesData = {
  industries: string[];
  favoriteTestCategories: string[];
  educationLevel: string;
  skills: string[];
  workFormat: string[];
  goals: string;
};

export type PrivacySettingsData = {
  profileVisibility: "public" | "private" | "friends";
  resultsVisibility: "public" | "private" | "friends";
  showEmail: boolean;
  personalizedRecommendations: boolean;
  dataProcessingConsent: boolean;
};

export type TestResultItem = {
  id: string;
  title: string;
  completedAt: string;
  result: string;
  status: "completed" | "in-progress";
};

export type PromoCodeItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  expiresAt: string;
  status: "active" | "expiring" | "used" | "expired";
  partnerName: string;
};

export type AccountSettingsBundle = {
  profile: ProfileSettingsData;
  security: SecuritySettingsData;
  notifications: NotificationSettingsData;
  career: CareerPreferencesData;
  privacy: PrivacySettingsData;
  testResults: TestResultItem[];
  promos: PromoCodeItem[];
};

const SETTINGS_KEY = "cpf_account_settings_v1";

const defaultBundleForUser = (email: string, name: string): AccountSettingsBundle => ({
  profile: {
    firstName: name.split(" ")[0] || "Пользователь",
    lastName: name.split(" ").slice(1).join(" ") || "",
    username: (name || email).toLowerCase().replace(/\s+/g, "_").slice(0, 18),
    email,
    phone: "",
    city: "",
    country: "Россия",
    bio: "Исследую карьерные направления и развиваю профессиональные навыки.",
    avatarUrl: "",
    registeredAt: "2026-01-15",
    role: "Пользователь",
  },
  security: {
    twoFactorEnabled: false,
    activeSessions: [
      {
        id: "s1",
        device: "Chrome",
        os: "Windows 11",
        location: "Москва, Россия",
        lastActive: "сегодня, 14:32",
      },
      {
        id: "s2",
        device: "Mobile Safari",
        os: "iOS 18",
        location: "Санкт-Петербург, Россия",
        lastActive: "вчера, 19:10",
      },
    ],
  },
  notifications: {
    emailNotifications: true,
    newTests: true,
    testResults: true,
    careerNews: true,
    marketing: false,
    weeklyDigest: true,
    pushNotifications: false,
  },
  career: {
    industries: ["IT", "Аналитика"],
    favoriteTestCategories: ["Личность", "Навыки"],
    educationLevel: "bachelor",
    skills: ["Коммуникация", "Аналитика"],
    workFormat: ["Гибридный"],
    goals: "Найти карьерный трек в продуктовой аналитике и развивать управленческие компетенции.",
  },
  privacy: {
    profileVisibility: "friends",
    resultsVisibility: "private",
    showEmail: false,
    personalizedRecommendations: true,
    dataProcessingConsent: true,
  },
  testResults: [
    {
      id: "r1",
      title: "Тип личности",
      completedAt: "2026-03-10",
      result: "Творец",
      status: "completed",
    },
    {
      id: "r2",
      title: "Карьерный компас",
      completedAt: "2026-03-04",
      result: "Свободный агент",
      status: "completed",
    },
  ],
  promos: [
    {
      id: "p1",
      code: "CPHELP10",
      title: "Скидка 10% на курс",
      description: "Специальное предложение на стартовый курс по карьерному развитию.",
      expiresAt: "30.04.2026",
      status: "active",
      partnerName: "Skillbox",
    },
    {
      id: "p2",
      code: "STEP-CAREER",
      title: "Бонусная подборка материалов",
      description: "Подборка практических материалов для перехода в digital-сферы.",
      expiresAt: "10.04.2026",
      status: "expiring",
      partnerName: "Stepik",
    },
  ],
});

const loadAll = (): Record<string, AccountSettingsBundle> => {
  if (typeof window === "undefined") {
    return {};
  }
  const raw = window.localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return {};
  } catch {
    return {};
  }
};

const saveAll = (data: Record<string, AccountSettingsBundle>) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
};

const getAccountSettings = (userKey: string, email: string, name: string): AccountSettingsBundle => {
  const all = loadAll();
  const existing = all[userKey];
  if (existing) {
    return existing;
  }
  const created = defaultBundleForUser(email, name);
  all[userKey] = created;
  saveAll(all);
  return created;
};

const updateAccountSection = <K extends keyof AccountSettingsBundle>(
  userKey: string,
  section: K,
  value: AccountSettingsBundle[K],
): AccountSettingsBundle => {
  const all = loadAll();
  const current = all[userKey] ?? defaultBundleForUser(userKey, userKey);
  const updated: AccountSettingsBundle = {
    ...current,
    [section]: value,
  };
  all[userKey] = updated;
  saveAll(all);
  return updated;
};

export { getAccountSettings, updateAccountSection };

