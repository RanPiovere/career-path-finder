import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  Compass,
  FileText,
  Globe2,
  Layers,
  LineChart,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.28),transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_55%)]" />
          <div className="container mx-auto px-4 py-14 md:py-20 relative">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/30 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Платформа для осознанного карьерного выбора
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Карьерный навигатор
                <span className="block text-gradient">для тех, кто ищет своё дело</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Career Path Finder помогает увидеть карту возможностей, понять свои сильные стороны и превратить
                разрозненные идеи о карьере в понятный маршрут.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/test")} className="px-8">
                  Пройти тест
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/blog")}
                  className="px-8 border-border/70 bg-background/70 backdrop-blur"
                >
                  Читать статьи
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-20 space-y-16">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                О платформе
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Career Path Finder объединяет карьерные тесты, аналитические инструменты и образовательный контент.
                Мы помогаем пользователям разобраться в себе, понять, какие направления им ближе, и увидеть реальные
                шаги для развития.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Платформа создавалась как ответ на типичный запрос: «Я не знаю, чем хочу заниматься». Мы аккуратно
                переводим сложные карьерные решения в понятные шаги, опираясь на вопросы, результаты тестов и
                качественные материалы.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Career Path Finder находится на стыке профориентации, карьерной аналитики и образовательной
                экосистемы. Это не разовый тест, а место, куда можно возвращаться, чтобы сверяться со своим курсом и
                планировать дальнейшие шаги.
              </p>
            </div>
            <Card className="bg-gradient-to-br from-accent/10 via-card to-card/80 border border-accent/20 shadow-sm">
              <CardContent className="pt-7 pb-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Наша миссия
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Мы хотим, чтобы выбор профессии перестал быть случайным или основанным только на мнении окружающих.
                  Наша миссия — дать каждому человеку понятные инструменты для осознанного карьерного выбора и помочь
                  строить путь, в котором есть смысл, интерес и развитие.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Мы соединяем самопознание, аналитику рынка и образовательные возможности, чтобы пользователи могли
                  принимать решения не вслепую, а с опорой на данные и собственные ценности.
                </p>
              </CardContent>
            </Card>
          </section>

          <motion.section
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground">
              Наши ценности
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Осознанность",
                  text: "Мы верим в силу осознанных решений и помогаем пользователям видеть полный контекст перед тем, как выбирать направление.",
                  accent: true,
                },
                {
                  title: "Доступность",
                  text: "Платформа остаётся простой и понятной: не нужно быть экспертом в HR или аналитике, чтобы получить пользу от наших инструментов.",
                },
                {
                  title: "Развитие",
                  text: "Мы поддерживаем непрерывное обучение и стремление пробовать новое — как в карьере, так и в продукте.",
                },
                {
                  title: "Практичность",
                  text: "Каждый блок платформы приводит к понятному следующему шагу, а не оставляет пользователя с абстрактными выводами.",
                },
                {
                  title: "Персонализация",
                  text: "У каждого свой маршрут. Мы учитываем ответы, интересы и поведение, чтобы рекомендации были ближе к реальности пользователя.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="h-full"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  whileHover={{
                    y: -6,
                    scale: 1.01,
                    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
                  }}
                >
                  <Card
                    className={
                      value.accent
                        ? "border border-accent/40 bg-card/95 relative overflow-hidden"
                        : "border border-border/60 bg-card/95 relative overflow-hidden"
                    }
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_55%)]" />
                    <CardContent className="group/card relative pt-6 space-y-3">
                      <div className="h-1 w-10 rounded-full bg-accent/70" />
                      <h4 className="font-display text-base font-semibold text-foreground">
                        {value.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground">
              Что мы предлагаем
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  icon: Compass,
                  title: "Карьерные тесты",
                  text: "Тесты, которые помогают определить интересы, склонности и сильные стороны без сложной терминологии.",
                },
                {
                  icon: FileText,
                  title: "Блог и статьи",
                  text: "Подборки материалов о профессиях, индустриях, soft и hard skills, карьерных поворотах и учебе.",
                },
                {
                  icon: Target,
                  title: "Персональные рекомендации",
                  text: "Подсказки по направлениям, профессиям и шагам развития, основанные на ваших ответах и интересах.",
                },
                {
                  icon: Layers,
                  title: "Собственный контент",
                  text: "Возможность создавать свои тесты и статьи, делиться опытом и строить собственный карьерный трекер.",
                },
                {
                  icon: LineChart,
                  title: "Аналитика и развитие",
                  text: "Обзор прогресса и ключевых шагов, которые помогают двигаться к выбранным целям и корректировать маршрут.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="h-full"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.06 * index }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: "0 20px 55px rgba(15,23,42,0.22)",
                  }}
                >
                  <Card className="h-full border border-border/70 bg-card/95 relative overflow-hidden">
                    <CardContent className="pt-6 pb-6 space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transform transition-transform duration-200 group-hover/card:-translate-y-0.5">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-display text-base font-semibold text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Как работает платформа
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
              <div className="rounded-2xl bg-muted/70 px-4 py-4 shadow-sm">
                <div className="mb-1 text-xs font-semibold text-accent">Шаг 1</div>
                <p>Вы проходите один или несколько карьерных тестов и отвечаете на вопросы о себе.</p>
              </div>
              <div className="rounded-2xl bg-muted/70 px-4 py-4 shadow-sm">
                <div className="mb-1 text-xs font-semibold text-accent">Шаг 2</div>
                <p>Получаете структурированные результаты и видите, какие направления вам ближе.</p>
              </div>
              <div className="rounded-2xl bg-muted/70 px-4 py-4 shadow-sm">
                <div className="mb-1 text-xs font-semibold text-accent">Шаг 3</div>
                <p>Изучаете статьи, истории и материалы по выбранным областям.</p>
              </div>
              <div className="rounded-2xl bg-muted/70 px-4 py-4 shadow-sm">
                <div className="mb-1 text-xs font-semibold text-accent">Шаг 4</div>
                <p>Формируете для себя маршрут: что изучать, какие навыки развивать, что попробовать.</p>
              </div>
              <div className="rounded-2xl bg-muted/70 px-4 py-4 shadow-sm">
                <div className="mb-1 text-xs font-semibold text-accent">Шаг 5</div>
                <p>Возвращаетесь на платформу, чтобы дополнять результаты, обновлять план и отслеживать изменения.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Кому подходит Career Path Finder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="rounded-2xl bg-card/90 px-4 py-3 border border-border/60 shadow-sm">
                Школьникам и абитуриентам, которые выбирают первое направление обучения и хотят понять, какие сферы им
                ближе.
              </div>
              <div className="rounded-2xl bg-card/90 px-4 py-3 border border-border/60 shadow-sm">
                Студентам, которые хотят уточнить фокус, подобрать стажировки или спланировать первое место работы.
              </div>
              <div className="rounded-2xl bg-card/90 px-4 py-3 border border-border/60 shadow-sm">
                Специалистам, задумывающимся о смене сферы и ищущим безопасный способ примерить другие профессии.
              </div>
              <div className="rounded-2xl bg-card/90 px-4 py-3 border border-border/60 shadow-sm">
                Тем, кто чувствует, что «находится не на своём месте» и хочет понять, в чём их сильные стороны.
              </div>
              <div className="rounded-2xl bg-card/90 px-4 py-3 border border-border/60 shadow-sm">
                Людям, которые выбирают образовательные программы и хотят сверить их с личными целями и интересами.
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Почему пользователи выбирают нас
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">Понятный интерфейс</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Простые шаги, ясные результаты и дружелюбный язык вместо перегруженных отчётов.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Персонализированный подход
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Мы учитываем ваши ответы, а не подстраиваем вас под заранее заданные шаблоны.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Сочетание тестов и контента
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Результаты сразу подкрепляются статьями и практическими материалами, чтобы не останавливаться на
                    теории.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Возможность создавать своё
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Пользователи могут делиться тестами и опытом, расширяя картину карьерных маршрутов.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Современный карьерный подход
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Мы учитываем гибридные форматы работы, новые профессии и меняющиеся требования рынка.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Образовательная экосистема
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
              Career Path Finder не привязан к одной платформе обучения. Мы ориентируемся на совместимость с
              различными образовательными сервисами и помогаем пользователям находить ресурсы, которые поддержат их
              карьерные цели.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              {[
                "Coursera",
                "Udemy",
                "Stepik",
                "Yandex Practicum",
                "Skillbox",
                "GeekBrains",
              ].map((partner) => (
                <Card
                  key={partner}
                  className="h-full border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/70">
                      <Globe2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground text-xs md:text-sm text-center">
                      {partner}
                    </span>
                    <span className="text-[11px] text-muted-foreground text-center">
                      Курсы и материалы, которые могут дополнить выбранный путь.
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Будущее проекта
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Activity className="h-4 w-4" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Расширение тестов
                  </h4>
                  <p className="leading-relaxed">
                    Мы планируем добавлять новые форматы тестов, которые глубже раскрывают мотивацию, ценности и
                    рабочие стили пользователей.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <LineChart className="h-4 w-4" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Персональные кабинеты
                  </h4>
                  <p className="leading-relaxed">
                    Индивидуальные карьерные профили с историей решений, сохранёнными материалами и планами развития.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    Умные рекомендации
                  </h4>
                  <p className="leading-relaxed">
                    Использование алгоритмов, которые помогают находить релевантные курсы, карьерные треки и истории
                    по вашим целям и запросам.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </section>

        <section className="border-t border-border/60 bg-muted/40 mt-12">
          <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Готовы начать свой путь?
            </h3>
            <p className="text-muted-foreground max-w-xl">
              Пройдите первый тест или изучите статьи, чтобы сделать следующий шаг к осознанной и интересной карьере.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => navigate("/test")}>
                Пройти тест
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/blog")}>
                Перейти к статьям
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;


