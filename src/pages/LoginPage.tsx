import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type LocationState = {
  from?: string;
  message?: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(state.message ?? null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Введите корректный email");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    setSubmitting(true);
    const result = login(email.trim(), password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Не удалось войти");
      return;
    }

    setSuccess("Вы успешно вошли в аккаунт");
    const redirectTo = state.from || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-display text-center">Вход в аккаунт</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 rounded-md bg-destructive/10 text-destructive px-3 py-2 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 rounded-md bg-emerald-500/10 text-emerald-500 px-3 py-2 text-sm">
                  {success}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full mt-2" disabled={submitting}>
                  Войти
                </Button>
              </form>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Нет аккаунта?{" "}
                <button
                  className="text-accent hover:underline"
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  Зарегистрироваться
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

