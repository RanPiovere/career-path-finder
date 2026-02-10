import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    tag: "Карьера",
    title: "10 профессий будущего, которые стоит рассмотреть уже сейчас",
    excerpt: "Рынок труда стремительно меняется. Узнай, какие специальности будут востребованы через 5-10 лет.",
    date: "5 фев 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  },
  {
    tag: "Образование",
    title: "Как выбрать вуз: пошаговое руководство для абитуриентов",
    excerpt: "Практические советы по выбору университета, которые помогут принять правильное решение.",
    date: "1 фев 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  },
  {
    tag: "Саморазвитие",
    title: "Soft skills, которые нужны в любой профессии",
    excerpt: "Какие навыки ценят работодатели больше всего и как их развить ещё во время учёбы.",
    date: "28 янв 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Блог</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
              Полезные статьи
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            Все статьи <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.article
              key={article.title}
              variants={item}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {article.tag}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
