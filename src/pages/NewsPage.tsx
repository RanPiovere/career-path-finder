import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, TrendingUp } from "lucide-react";

const news = [
  {
    date: "8 фев 2026",
    title: "Новый тест «Карьерный компас» уже доступен на платформе",
    hot: true,
  },
  {
    date: "4 фев 2026",
    title: "Итоги опроса: какие профессии выбирают выпускники 2025",
    hot: false,
  },
  {
    date: "30 янв 2026",
    title: "Обновлённый алгоритм подбора профессий — точнее на 40%",
    hot: true,
  },
  {
    date: "25 янв 2026",
    title: "Партнёрство с ведущими вузами: новые возможности для пользователей",
    hot: false,
  },
  {
    date: "20 янв 2026",
    title: "Запуск мобильного приложения: тесты теперь в кармане",
    hot: false,
  },
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-10 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Новости</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Последние обновления CPHelper
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Следите за новыми тестами, обновлениями алгоритмов и возможностями платформы.
            </p>
          </div>

          <div className="space-y-2">
            {news.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 py-4 border-b border-border last:border-0"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-[100px] pt-0.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </span>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    {item.hot && <TrendingUp className="h-4 w-4 text-accent mt-0.5 shrink-0" />}
                    <h2 className="text-foreground font-medium">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;

