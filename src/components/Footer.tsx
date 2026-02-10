import { BookOpen, Newspaper, FlaskConical, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4">
              CP<span className="text-accent">Helper</span>
            </h3>
            <p className="text-primary-foreground/60 max-w-sm leading-relaxed">
              Помогаем найти профессию мечты с помощью научно обоснованных тестов, 
              экспертных статей и актуальных новостей из мира карьеры.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Разделы</h4>
            <ul className="space-y-3">
              {[
                { label: "Тесты", icon: FlaskConical },
                { label: "Блог", icon: BookOpen },
                { label: "Новости", icon: Newspaper },
                { label: "О нас", icon: Users },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.label.toLowerCase()}`}
                    className="text-primary-foreground/60 hover:text-accent transition-colors flex items-center gap-2 text-sm"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li>info@cphelper.ru</li>
              <li>+7 (800) 123-45-67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
          © 2026 CPHelper. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
