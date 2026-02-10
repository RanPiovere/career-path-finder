import { motion } from "framer-motion";
import { TrendingUp, Calendar, ArrowRight } from "lucide-react";

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

const NewsSection = () => {
  return (
    <section id="news" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Новости</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Последние обновления
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {news.map((item, i) => (
            <motion.a
              key={item.title}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group flex items-start gap-4 py-5 border-b border-border last:border-0 hover:bg-muted/40 -mx-4 px-4 rounded-xl transition-colors"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-[100px] pt-0.5">
                <Calendar className="h-3.5 w-3.5" />
                {item.date}
              </span>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  {item.hot && (
                    <TrendingUp className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  )}
                  <h3 className="text-foreground font-medium group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors mt-0.5 opacity-0 group-hover:opacity-100" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
