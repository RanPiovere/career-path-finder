const TESTS_KEY = "cpf_custom_tests_v1";

type TestOption = {
  id: string;
  text: string;
};

type TestQuestion = {
  id: string;
  text: string;
  options: TestOption[];
  correctOptionId?: string | null;
};

type CustomTest = {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
  authorEmail: string;
  createdAt: string;
};

type NewTestInput = {
  title: string;
  description: string;
  questions: {
    text: string;
    options: { text: string }[];
    correctOptionIndex?: number | null;
  }[];
};

const loadTests = (): CustomTest[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(TESTS_KEY);
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

const saveTests = (tests: CustomTest[]) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(TESTS_KEY, JSON.stringify(tests));
};

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const createTest = (input: NewTestInput, authorEmail: string): CustomTest => {
  const baseId = generateId();
  const questions: TestQuestion[] = input.questions.map((q, qIndex) => {
    const questionId = `${baseId}-q${qIndex}`;
    const options: TestOption[] = q.options.map((o, oIndex) => ({
      id: `${questionId}-o${oIndex}`,
      text: o.text,
    }));
    let correctOptionId: string | null = null;
    if (typeof q.correctOptionIndex === "number" && q.correctOptionIndex >= 0 && q.correctOptionIndex < options.length) {
      correctOptionId = options[q.correctOptionIndex].id;
    }
    return {
      id: questionId,
      text: q.text,
      options,
      correctOptionId,
    };
  });

  const tests = loadTests();
  const test: CustomTest = {
    id: baseId,
    title: input.title,
    description: input.description,
    questions,
    authorEmail,
    createdAt: new Date().toISOString(),
  };
  const next = [...tests, test];
  saveTests(next);
  return test;
};

const getTestsByAuthor = (email: string): CustomTest[] => {
  if (!email) {
    return [];
  }
  return loadTests().filter((t) => t.authorEmail === email);
};

const getTestById = (id: string): CustomTest | null => {
  if (!id) {
    return null;
  }
  const tests = loadTests();
  return tests.find((t) => t.id === id) ?? null;
};

export type { CustomTest, TestQuestion, TestOption, NewTestInput };
export { createTest, getTestsByAuthor, getTestById };

