import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, Percent, TestTube, User2 } from "lucide-react";

const mockTestHistory = [
  {
    id: "1",
    title: "Тип личности",
    completedAt: "2026-02-10",
    resultSummary: "Творец",
  },
  {
    id: "2",
    title: "Карьерный компас",
    completedAt: "2026-02-05",
    resultSummary: "Свободный агент",
  },
];

const mockBookmarks = {
  tests: [
    { id: "t1", title: "Профессиональные интересы" },
    { id: "t2", title: "Навыки и таланты" },
  ],
  posts: [
    { id: "p1", title: "10 профессий будущего, которые стоит рассмотреть уже сейчас" },
    { id: "p2", title: "Soft skills, которые нужны в любой профессии" },
  ],
};

const mockPromoCodes = [
  {
    id: "pr1",
    code: "START10",
    title: "Скидка 10% на карьерный курс",
    description: "Скидка на первый рекомендованный курс от партнёров платформы.",
    expiresAt: "31.03.2026",
    status: "активен",
    partnerName: "Yandex Practicum",
  },
  {
    id: "pr2",
    code: "CPHELPER-STEP",
    title: "Доступ к подборке курсов по аналитике",
    description: "Подборка вводных курсов по аналитике данных на Stepik.",
    expiresAt: "15.04.2026",
    status: "скоро истекает",
    partnerName: "Stepik",
  },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/profile" } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-accent/20 text-accent text-xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {user.name || "Ваш профиль"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user.email} · Пользователь Career Path Finder
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Управляйте тестами, закладками и персональными материалами в одном месте.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
                Настройки
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/test")}
                className="flex items-center gap-1.5"
              >
                <TestTube className="h-4 w-4" />
                Пройти тест
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 space-y-1">
                <div className="text-xs text-muted-foreground">Пройдено тестов</div>
                <div className="text-2xl font-semibold">{mockTestHistory.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 space-y-1">
                <div className="text-xs text-muted-foreground">Закладки</div>
                <div className="text-2xl font-semibold">
                  {mockBookmarks.tests.length + mockBookmarks.posts.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 space-y-1">
                <div className="text-xs text-muted-foreground">Мои тесты</div>
                <div className="text-2xl font-semibold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 space-y-1">
                <div className="text-xs text-muted-foreground">Активные промокоды</div>
                <div className="text-2xl font-semibold">{mockPromoCodes.length}</div>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Личная информация</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Имя</div>
                  <div className="font-medium">{user.name || "Не указано"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium break-all">{user.email}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Роль</div>
                  <div className="font-medium">Пользователь</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Дата регистрации</div>
                  <div className="font-medium">—</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/test")}
                >
                  <TestTube className="h-4 w-4" />
                  Начать новый тест
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/blog")}
                >
                  <BookOpen className="h-4 w-4" />
                  Читать статьи
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/test/create")}
                >
                  <TestTube className="h-4 w-4" />
                  Создать тест
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-accent" />
                  История тестов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {mockTestHistory.length === 0 ? (
                  <div className="flex flex-col items-start gap-2 text-muted-foreground">
                    <span>Вы ещё не проходили тесты.</span>
                    <Button variant="outline" size="sm" onClick={() => navigate("/test")}>
                      Перейти к тестам
                    </Button>
                  </div>
                ) : (
                  mockTestHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                    >
                      <div>
                        <div className="font-medium text-foreground">{entry.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.completedAt} · Результат: {entry.resultSummary}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => navigate("/test")}
                      >
                        Пройти снова
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-accent" />
                  Закладки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {mockBookmarks.tests.length + mockBookmarks.posts.length === 0 ? (
                  <div className="flex flex-col items-start gap-2 text-muted-foreground">
                    <span>У вас пока нет закладок.</span>
                    <Button variant="outline" size="sm" onClick={() => navigate("/blog")}>
                      Смотреть статьи
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      Сохранённые тесты
                    </div>
                    {mockBookmarks.tests.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                      >
                        <span className="text-sm text-foreground">{item.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate("/test")}
                        >
                          Перейти
                        </Button>
                      </div>
                    ))}
                    <div className="mt-2 text-xs text-muted-foreground uppercase tracking-wide">
                      Сохранённые статьи
                    </div>
                    {mockBookmarks.posts.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                      >
                        <span className="text-sm text-foreground line-clamp-1">{item.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => navigate("/blog")}
                        >
                          Открыть
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <User2 className="h-4 w-4 text-accent" />
                  Мои тесты и статьи
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Скоро здесь появится список ваших тестов и статей с возможностью их редактировать.</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate("/test/create")}>
                    Создать тест
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate("/blog/create")}>
                    Написать статью
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Percent className="h-4 w-4 text-accent" />
                  Акции и промокоды
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {mockPromoCodes.map((promo) => (
                  <div
                    key={promo.id}
                    className="rounded-xl border border-border px-3 py-3 space-y-1 bg-card/80"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-foreground">{promo.title}</div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                        {promo.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Партнёр: {promo.partnerName} · Действует до {promo.expiresAt}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-muted border border-border">
                        {promo.code}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;

