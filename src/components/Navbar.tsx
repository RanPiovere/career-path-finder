import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Newspaper, FlaskConical, Users } from "lucide-react";

const navItems = [
  { label: "Тесты", href: "#tests", icon: FlaskConical },
  { label: "Блог", href: "#blog", icon: BookOpen },
  { label: "Новости", href: "#news", icon: Newspaper },
  { label: "О нас", href: "#about", icon: Users },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="font-display text-xl font-bold text-foreground">
          CP<span className="text-accent">Helper</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#tests"
          className="bg-accent text-accent-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all shadow-md"
        >
          Начать тест
          <ArrowRight className="inline ml-1.5 h-4 w-4" />
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
