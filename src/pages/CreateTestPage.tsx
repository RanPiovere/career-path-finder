import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestForm, { TestFormValue } from "@/components/TestForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createTest } from "@/services/testService";
import { useToast } from "@/hooks/use-toast";

const CreateTestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/test/create" } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSubmit = (value: TestFormValue) => {
    const questions = value.questions.map((q) => {
      const filledOptions = q.options.filter((o) => o.text.trim().length > 0);
      const correctIndex =
        q.correctOptionId && filledOptions.length > 0
          ? filledOptions.findIndex((o) => o.id === q.correctOptionId)
          : null;
      return {
        text: q.text,
        options: filledOptions.map((o) => ({ text: o.text })),
        correctOptionIndex: typeof correctIndex === "number" && correctIndex >= 0 ? correctIndex : null,
      };
    });

    createTest(
      {
        title: value.title,
        description: value.description,
        questions,
      },
      user.email,
    );

    toast({
      title: "Тест сохранён",
      description: "Новый тест появился в разделе «Мои тесты».",
    });
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Создать тест
            </h1>
            <p className="text-muted-foreground">
              Настройте вопросы и варианты ответов. В дальнейшем этот функционал можно будет связать с сохранением результатов.
            </p>
          </div>
          <TestForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateTestPage;

