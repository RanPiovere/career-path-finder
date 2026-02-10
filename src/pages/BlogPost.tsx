import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articlesData: Record<string, {
  tag: string;
  title: string;
  date: string;
  image: string;
  content: string[];
}> = {
  "professii-budushchego": {
    tag: "Карьера",
    title: "10 профессий будущего, которые стоит рассмотреть уже сейчас",
    date: "5 фев 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    content: [
      "Рынок труда стремительно меняется под влиянием технологий, глобализации и новых вызовов. Профессии, которые казались фантастикой ещё десять лет назад, сегодня становятся реальностью.",
      "1. Специалист по искусственному интеллекту — разработка и обучение AI-систем остаётся одной из самых перспективных областей. Спрос на таких специалистов растёт на 30% ежегодно.",
      "2. Инженер по кибербезопасности — с ростом цифровизации компании всё больше нуждаются в защите данных и систем.",
      "3. UX-исследователь — понимание потребностей пользователей становится ключевым конкурентным преимуществом.",
      "4. Специалист по устойчивому развитию — компании всё больше инвестируют в ESG и зелёные технологии.",
      "5. Дата-инженер — управление потоками данных и построение инфраструктуры для аналитики.",
      "Эти и другие профессии объединяет одно — они требуют постоянного обучения и адаптации. Начните изучать тренды уже сегодня, чтобы быть готовыми к завтрашнему дню.",
    ],
  },
  "kak-vybrat-vuz": {
    tag: "Образование",
    title: "Как выбрать вуз: пошаговое руководство для абитуриентов",
    date: "1 фев 2026",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
    content: [
      "Выбор университета — одно из самых важных решений в жизни. От него зависят не только знания, но и круг общения, карьерные возможности и личностный рост.",
      "Шаг 1: Определите свои интересы. Пройдите профориентационный тест, чтобы понять, какие направления вам ближе.",
      "Шаг 2: Изучите рейтинги и отзывы. Обратите внимание не только на общий рейтинг, но и на конкретные факультеты.",
      "Шаг 3: Посетите дни открытых дверей. Личное впечатление часто важнее цифр.",
      "Шаг 4: Оцените перспективы трудоустройства. Узнайте, какой процент выпускников работает по специальности.",
      "Помните: идеального вуза не существует. Важнее всего — ваша мотивация и готовность учиться.",
    ],
  },
  "soft-skills": {
    tag: "Саморазвитие",
    title: "Soft skills, которые нужны в любой профессии",
    date: "28 янв 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: [
      "Технические навыки помогают получить работу, но именно soft skills определяют, насколько успешной будет ваша карьера.",
      "Коммуникация — умение ясно выражать мысли, слушать и убеждать. Этот навык важен в любой сфере — от IT до медицины.",
      "Критическое мышление — способность анализировать информацию, выявлять логические ошибки и принимать взвешенные решения.",
      "Эмоциональный интеллект — понимание своих и чужих эмоций. Лидеры с высоким EQ создают более продуктивные команды.",
      "Адаптивность — готовность к изменениям и способность быстро осваивать новое. В мире, где технологии меняются каждый год, это must-have.",
      "Начните развивать эти навыки уже сегодня: читайте, участвуйте в проектах, выступайте публично. Каждый маленький шаг приближает вас к большому результату.",
    ],
  },
};

const slugMap: Record<string, string> = {
  "10 профессий будущего, которые стоит рассмотреть уже сейчас": "professii-budushchego",
  "Как выбрать вуз: пошаговое руководство для абитуриентов": "kak-vybrat-vuz",
  "Soft skills, которые нужны в любой профессии": "soft-skills",
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = slug ? articlesData[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Статья не найдена</h1>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
      </div>
    );
  }

  const otherArticles = Object.entries(articlesData).filter(([s]) => s !== slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {article.tag}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>

            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-10">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5">
              {article.content.map((paragraph, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          {otherArticles.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">Читайте также</h3>
              <div className="space-y-4">
                {otherArticles.map(([s, a]) => (
                  <button
                    key={s}
                    onClick={() => navigate(`/blog/${s}`)}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all group"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-accent font-semibold">{a.tag}</span>
                      <h4 className="font-display font-bold text-foreground group-hover:text-accent transition-colors">
                        {a.title}
                      </h4>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { slugMap as blogSlugMap };
export default BlogPost;
