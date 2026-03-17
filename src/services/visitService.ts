const VISITOR_KEY = "cpf_visitor_id_v1";

const getOrCreateVisitorId = (): string => {
  if (typeof window === "undefined") {
    return "server";
  }
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) {
    return existing;
  }
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
};

export { getOrCreateVisitorId };

