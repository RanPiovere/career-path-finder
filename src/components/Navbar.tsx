import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Newspaper, FlaskConical, Users, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Тесты", to: "/test", icon: FlaskConical },
  { label: "Блог", to: "/blog", icon: BookOpen },
  { label: "Новости", to: "/news", icon: Newspaper },
  { label: "О нас", to: "/", icon: Users },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handlePrimaryNav = (to: string) => {
    setMobileOpen(false);
    if (location.pathname !== to) {
      navigate(to);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={() => navigate("/")} className="font-display text-xl font-bold text-foreground">
          CP<span className="text-accent">Helper</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handlePrimaryNav(item.to)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePrimaryNav("/test")}
            className="bg-accent text-accent-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all shadow-md flex items-center gap-1.5"
          >
            Начать тест
            <ArrowRight className="h-4 w-4" />
          </button>
          {!user && (
            <>
              <button
                onClick={() => handlePrimaryNav("/login")}
                className="hidden md:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Вход
              </button>
              <button
                onClick={() => handlePrimaryNav("/register")}
                className="hidden md:inline-flex text-sm font-semibold text-accent hover:text-accent/90 transition-colors"
              >
                Регистрация
              </button>
            </>
          )}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handlePrimaryNav("/profile")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {user.name || user.email}
              </button>
              <button
                onClick={() => {
                  logout();
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Выйти
              </button>
            </div>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b border-border px-4 py-4 space-y-2"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handlePrimaryNav(item.to)}
              className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
          {!user && (
            <>
              <button
                onClick={() => handlePrimaryNav("/login")}
                className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
              >
                Вход
              </button>
              <button
                onClick={() => handlePrimaryNav("/register")}
                className="w-full text-left text-sm font-semibold text-accent hover:text-accent/90 transition-colors flex items-center gap-2 py-2"
              >
                Регистрация
              </button>
            </>
          )}
          {user && (
            <>
              <button
                onClick={() => handlePrimaryNav("/profile")}
                className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
              >
                Профиль
              </button>
              <button
                onClick={() => {
                  logout();
                  handlePrimaryNav("/");
                }}
                className="w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
              >
                Выйти
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
