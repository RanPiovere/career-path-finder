import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import SettingsSidebar, { SettingsTab } from "@/components/settings/SettingsSidebar";
import ProfileSettingsForm from "@/components/settings/ProfileSettingsForm";
import SecuritySettings from "@/components/settings/SecuritySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import CareerPreferencesSettings from "@/components/settings/CareerPreferencesSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import TestResultsSettings from "@/components/settings/TestResultsSettings";
import { getUserBookmarks } from "@/services/bookmarkService";
import { getPostsByAuthor } from "@/services/postService";
import { getTestsByAuthor } from "@/services/testService";
import {
  AccountSettingsBundle,
  getAccountSettings,
  updateAccountSection,
} from "@/services/accountSettingsService";

const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<AccountSettingsBundle | null>(null);

  const userKey = user?.email ?? "";

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/settings" } });
      return;
    }
    try {
      const data = getAccountSettings(user.email, user.email, user.name);
      setSettings(data);
      setLoading(false);
    } catch {
      setError("Не удалось загрузить настройки. Попробуйте обновить страницу.");
      setLoading(false);
    }
  }, [navigate, user]);

  const initials = useMemo(
    () =>
      user?.name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U",
    [user?.name],
  );

  const myTests = useMemo(() => (user?.email ? getTestsByAuthor(user.email) : []), [user?.email]);
  const myPosts = useMemo(() => (user?.email ? getPostsByAuthor(user.email) : []), [user?.email]);
  const myBookmarks = useMemo(() => (userKey ? getUserBookmarks(userKey) : []), [userKey, settings]);

  if (!user) {
    return null;
  }

  const saveSection = async <K extends keyof AccountSettingsBundle>(section: K, value: AccountSettingsBundle[K]) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const updated = updateAccountSection(userKey, section, value);
    setSettings(updated);
    toast({
      title: "Сохранено",
      description: "Настройки успешно обновлены.",
    });
  };

  const exportData = async () => {
    if (!settings) return;
    const payload = JSON.stringify(settings, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cphelper-settings-${userKey}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Экспорт готов",
      description: "Файл с данными скачан на устройство.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-6">
          <Card className="border-border/70">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-display">Настройки аккаунта</CardTitle>
                <CardDescription className="mt-1">
                  Управляйте профилем, безопасностью, уведомлениями и персональными карьерными предпочтениями.
                </CardDescription>
              </div>
              <div className="rounded-xl border border-border p-3 flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  {settings?.profile.avatarUrl ? <AvatarImage src={settings.profile.avatarUrl} alt={user.name} /> : null}
                  <AvatarFallback className="bg-accent/20 text-accent font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {loading ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">Загрузка настроек...</CardContent>
            </Card>
          ) : null}

          {error ? (
            <Card className="border-destructive/40">
              <CardContent className="py-10 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          ) : null}

          {!loading && !error && settings ? (
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <SettingsSidebar value={activeTab} onChange={setActiveTab} />
              <section className="flex-1 w-full">
                <Card className="border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {activeTab === "overview" && "Обзор аккаунта"}
                      {activeTab === "profile" && "Профиль"}
                      {activeTab === "security" && "Безопасность"}
                      {activeTab === "notifications" && "Уведомления"}
                      {activeTab === "career" && "Карьерные предпочтения"}
                      {activeTab === "privacy" && "Приватность"}
                      {activeTab === "results" && "Мои результаты"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeTab === "overview" ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Card>
                            <CardContent className="p-4">
                              <p className="text-xs text-muted-foreground">Создано тестов</p>
                              <p className="text-xl font-semibold">{myTests.length}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <p className="text-xs text-muted-foreground">Создано статей</p>
                              <p className="text-xl font-semibold">{myPosts.length}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <p className="text-xs text-muted-foreground">Закладки</p>
                              <p className="text-xl font-semibold">{myBookmarks.length}</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <p className="text-xs text-muted-foreground">Активные сессии</p>
                              <p className="text-xl font-semibold">{settings.security.activeSessions.length}</p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Мои тесты и статьи</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              {myTests.slice(0, 3).map((test) => (
                                <div key={test.id} className="rounded-lg bg-muted/50 p-2">
                                  Тест: {test.title}
                                </div>
                              ))}
                              {myPosts.slice(0, 3).map((post) => (
                                <div key={post.id} className="rounded-lg bg-muted/50 p-2">
                                  Статья: {post.title}
                                </div>
                              ))}
                              {myTests.length === 0 && myPosts.length === 0 ? (
                                <p className="text-muted-foreground">Пока нет созданного контента.</p>
                              ) : null}
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Закладки</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              {myBookmarks.slice(0, 4).map((item) => (
                                <div key={`${item.itemType}-${item.itemId}`} className="rounded-lg bg-muted/50 p-2 flex justify-between">
                                  <span>{item.title}</span>
                                  <Badge variant="secondary">{item.itemType === "test" ? "Тест" : "Статья"}</Badge>
                                </div>
                              ))}
                              {myBookmarks.length === 0 ? <p className="text-muted-foreground">Закладок пока нет.</p> : null}
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Акции и промокоды</CardTitle>
                          </CardHeader>
                          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {settings.promos.map((promo) => (
                              <div key={promo.id} className="rounded-xl border border-border p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-sm">{promo.title}</p>
                                  <Badge variant={promo.status === "active" ? "default" : "secondary"}>
                                    {promo.status === "active" ? "Активен" : "Скоро истекает"}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{promo.description}</p>
                                <div className="flex items-center justify-between">
                                  <code className="rounded bg-muted px-2 py-1 text-xs">{promo.code}</code>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => {
                                      await navigator.clipboard.writeText(promo.code);
                                      toast({ title: "Скопировано", description: `Промокод ${promo.code} скопирован.` });
                                    }}
                                  >
                                    Копировать
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    ) : null}

                    {activeTab === "profile" ? (
                      <ProfileSettingsForm value={settings.profile} onSave={(value) => saveSection("profile", value)} />
                    ) : null}
                    {activeTab === "security" ? (
                      <SecuritySettings value={settings.security} onSave={(value) => saveSection("security", value)} />
                    ) : null}
                    {activeTab === "notifications" ? (
                      <NotificationSettings
                        value={settings.notifications}
                        onSave={(value) => saveSection("notifications", value)}
                      />
                    ) : null}
                    {activeTab === "career" ? (
                      <CareerPreferencesSettings value={settings.career} onSave={(value) => saveSection("career", value)} />
                    ) : null}
                    {activeTab === "privacy" ? (
                      <PrivacySettings
                        value={settings.privacy}
                        onSave={(value) => saveSection("privacy", value)}
                        onExport={exportData}
                      />
                    ) : null}
                    {activeTab === "results" ? <TestResultsSettings items={settings.testResults} /> : null}
                  </CardContent>
                </Card>
              </section>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;

