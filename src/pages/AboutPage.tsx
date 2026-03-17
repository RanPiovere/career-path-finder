import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, FileText, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/40">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Sparkles className="h-3 w-3" />
                О платформе Career Path Finder
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Помогаем найти свой карьерный путь
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Career Path Finder — это платформа, которая помогает людям определить свои сильные стороны,
                интересы и выбрать подходящее направление в карьере.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/test")}>
                  Пройти тест
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              О проекте
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Career Path Finder создан для того, чтобы упростить процесс выбора профессии и помочь пользователям
              лучше понять себя. Мы объединяем тесты, статьи и аналитику, чтобы дать максимально полезные
              рекомендации и поддержать вас на каждом шаге карьерного пути.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Наша миссия
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Мы стремимся сделать процесс выбора карьеры простым, понятным и доступным для каждого. Наша цель —
                помочь людям принимать осознанные решения и развиваться в том, что им действительно подходит.
                Независимо от того, только вы начинаете путь или хотите сменить направление, мы хотим быть вашим
                надежным навигатором в мире профессий.
              </p>
            </div>
            <Card className="bg-card/80 border-dashed">
              <CardContent className="pt-6 space-y-3">
                <h4 className="font-display text-lg font-semibold text-foreground">
                  Почему мы это делаем
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Карьерные решения влияют на качество жизни. Мы верим, что доступ к понятным инструментам и
                  информации помогает сделать этот выбор увереннее и спокойнее.
                </p>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Что мы предлагаем
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="h-full">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Тесты
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Интерактивные тесты, которые помогают определить ваши склонности и интересы.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Блог
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Статьи о профессиях, развитии и карьерных возможностях, написанные простым языком.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Персонализация
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Рекомендации на основе ваших ответов и активности, чтобы вы могли двигаться по своему пути.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Users className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Сообщество
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Возможность делиться своими тестами и опытом, вдохновляя других на поиск своего пути.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Почему стоит использовать Career Path Finder
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="rounded-xl bg-muted/60 px-4 py-3">
                Простота использования — интуитивный интерфейс и понятные шаги.
              </li>
              <li className="rounded-xl bg-muted/60 px-4 py-3">
                Персонализированные рекомендации на основе ваших ответов.
              </li>
              <li className="rounded-xl bg-muted/60 px-4 py-3">
                Возможность создавать свой контент: тесты и статьи.
              </li>
              <li className="rounded-xl bg-muted/60 px-4 py-3">
                Доступность в любое время — все инструменты всегда под рукой.
              </li>
            </ul>
          </section>
        </section>

        <section className="border-t border-border/60 bg-muted/40 mt-12">
          <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Готовы начать свой путь?
            </h3>
            <p className="text-muted-foreground max-w-xl">
              Пройдите первый тест уже сейчас, чтобы сделать следующий шаг к осознанной и интересной карьере.
            </p>
            <Button size="lg" onClick={() => navigate("/test")}>
              Начать тест
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

