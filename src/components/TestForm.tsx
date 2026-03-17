import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuestionInput = {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId?: string | null;
};

type TestFormValue = {
  title: string;
  description: string;
  questions: QuestionInput[];
};

type TestFormProps = {
  onSubmit: (value: TestFormValue) => void;
};

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const createEmptyQuestion = (): QuestionInput => {
  const qId = generateId();
  return {
    id: qId,
    text: "",
    options: [
      { id: `${qId}-o1`, text: "" },
      { id: `${qId}-o2`, text: "" },
    ],
    correctOptionId: null,
  };
};

const TestForm = ({ onSubmit }: TestFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([createEmptyQuestion()]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const updateQuestion = (id: string, patch: Partial<QuestionInput>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => (prev.length <= 1 ? prev : prev.filter((q) => q.id !== id)));
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: `${questionId}-o${q.options.length + 1}`, text: "" }],
            }
          : q,
      ),
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) {
          return q;
        }
        if (q.options.length <= 2) {
          return q;
        }
        const nextOptions = q.options.filter((o) => o.id !== optionId);
        const nextCorrect = q.correctOptionId === optionId ? null : q.correctOptionId;
        return { ...q, options: nextOptions, correctOptionId: nextCorrect };
      }),
    );
  };

  const handleSubmit = () => {
    setError(null);

    if (!title.trim()) {
      setError("Введите название теста");
      return;
    }

    if (questions.length === 0) {
      setError("Добавьте хотя бы один вопрос");
      return;
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        setError("У каждого вопроса должен быть текст");
        return;
      }
      const filledOptions = q.options.filter((o) => o.text.trim().length > 0);
      if (filledOptions.length < 2) {
        setError("У каждого вопроса должно быть минимум два варианта ответа");
        return;
      }
    }

    setSubmitting(true);
    const value: TestFormValue = {
      title: title.trim(),
      description: description.trim(),
      questions,
    };
    onSubmit(value);
    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Создание теста</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 text-destructive px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="test-title">Название</Label>
          <Input
            id="test-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, «Тест по цифровой грамотности»"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="test-description">Описание</Label>
          <Textarea
            id="test-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Кратко опишите цель теста"
          />
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label className="text-sm font-semibold">
                  Вопрос {index + 1}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(q.id)}
                  disabled={questions.length <= 1}
                >
                  Удалить вопрос
                </Button>
              </div>
              <Input
                value={q.text}
                onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                placeholder="Текст вопроса"
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Варианты ответов (отметьте правильный при необходимости)
                  </span>
                  <Button variant="outline" size="sm" onClick={() => addOption(q.id)}>
                    Добавить вариант
                  </Button>
                </div>
                <div className="space-y-2">
                  {q.options.map((o) => (
                    <div key={o.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        className="h-4 w-4"
                        checked={q.correctOptionId === o.id}
                        onChange={() => updateQuestion(q.id, { correctOptionId: o.id })}
                      />
                      <Input
                        value={o.text}
                        onChange={(e) =>
                          setQuestions((prev) =>
                            prev.map((question) =>
                              question.id === q.id
                                ? {
                                    ...question,
                                    options: question.options.map((opt) =>
                                      opt.id === o.id ? { ...opt, text: e.target.value } : opt,
                                    ),
                                  }
                                : question,
                            ),
                          )
                        }
                        placeholder="Вариант ответа"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(q.id, o.id)}
                        disabled={q.options.length <= 2}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={addQuestion}>
            Добавить вопрос
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            Сохранить тест
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export type { TestFormValue, QuestionInput };
export default TestForm;

