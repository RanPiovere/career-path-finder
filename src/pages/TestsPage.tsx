import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TestsSection from "@/components/TestsSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CustomTest, getTestsByAuthor, sortTestsByPopularity } from "@/services/testService";
import CreationInfoModal from "@/components/CreationInfoModal";

const TestsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [customTests, setCustomTests] = useState<CustomTest[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (user) {
      setCustomTests(sortTestsByPopularity(getTestsByAuthor(user.email)));
    } else {
      setCustomTests([]);
    }
  }, [user]);

  const handleCreateClick = () => {
    if (!user) {
      setShowInfo(true);
      return;
    }
    navigate("/test/create");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Тесты
              </h1>
              <p className="text-muted-foreground">
                Пройдите готовые тесты или создайте свои собственные.
              </p>
            </div>
            <Button onClick={handleCreateClick}>
              Создать тест
            </Button>
          </div>
          <TestsSection />

          {user && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Мои тесты
                </h2>
              </div>
              {customTests.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  У вас пока нет собственных тестов. Нажмите «Создать тест», чтобы добавить первый.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customTests.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => navigate(`/test/custom/${test.id}`)}
                      className="text-left bg-card border border-border rounded-xl p-4 hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">
                        {test.title}
                      </h3>
                      {test.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {test.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Вопросов: {test.questions.length}</span>
                        <span>Посещений: {test.visitCount}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <CreationInfoModal
        open={showInfo}
        type="test"
        onClose={() => setShowInfo(false)}
        onLogin={() => {
          setShowInfo(false);
          navigate("/login", { state: { from: "/test/create" } });
        }}
        onRegister={() => {
          setShowInfo(false);
          navigate("/register", { state: { from: "/test/create" } });
        }}
      />
      <Footer />
    </div>
  );
};

export default TestsPage;

