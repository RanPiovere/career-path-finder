import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTestById } from "@/services/testService";

const CustomTestPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id || "";
  const test = getTestById(id);

  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!test) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Тест не найден</h1>
          <Button onClick={() => navigate("/test")}>К списку тестов</Button>
        </div>
      </div>
    );
  }

  const handleAnswer = () => {
    if (currentQ + 1 < test.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <button
            onClick={() => navigate("/test")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к тестам
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {test.title}
            </h1>
            {test.description && <p className="text-muted-foreground">{test.description}</p>}
          </motion.div>

          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-8">
                {test.questions.map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {i < currentQ ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : i === currentQ ? (
                      <div className="h-5 w-5 rounded-full border-2 border-accent bg-accent/20" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                ))}
                <span className="ml-auto text-sm text-muted-foreground">
                  {currentQ + 1} из {test.questions.length}
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {test.questions[currentQ].text}
              </h2>

              <div className="space-y-3">
                {test.questions[currentQ].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={handleAnswer}
                    className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-accent hover:bg-accent/5 transition-all duration-200 text-foreground font-medium"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Тест завершён
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                В этой версии результаты не сохраняются. Позже здесь можно будет добавить аналитику и рекомендации.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" size="lg" onClick={() => navigate("/test")}>
                  Другие тесты
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomTestPage;

