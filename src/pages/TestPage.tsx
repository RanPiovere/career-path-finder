import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testsData: Record<string, {
  title: string;
  description: string;
  questions: { question: string; options: string[] }[];
  results: { min: number; max: number; title: string; description: string }[];
}> = {
  "tip-lichnosti": {
    title: "Тип личности",
    description: "Определи свой тип личности и узнай, какие профессии тебе подходят.",
    questions: [
      { question: "Как ты предпочитаешь проводить свободное время?", options: ["В компании друзей", "Наедине с книгой или хобби", "Занимаясь спортом", "Изучая что-то новое"] },
      { question: "Какой вид работы тебя привлекает больше?", options: ["Работа с людьми", "Аналитическая работа", "Творческая работа", "Техническая работа"] },
      { question: "Как ты принимаешь решения?", options: ["Опираюсь на чувства", "Анализирую факты", "Советуюсь с другими", "Доверяю интуиции"] },
      { question: "Что для тебя важнее в работе?", options: ["Общение с коллегами", "Независимость", "Признание", "Стабильность"] },
      { question: "Как ты реагируешь на стресс?", options: ["Ищу поддержку у друзей", "Ухожу в себя", "Действую активно", "Планирую решение"] },
    ],
    results: [
      { min: 0, max: 1, title: "Аналитик", description: "Тебе подходят профессии, связанные с анализом данных, исследованиями и стратегическим планированием. Рассмотри: аналитик данных, учёный, финансист." },
      { min: 2, max: 3, title: "Коммуникатор", description: "Твоя сильная сторона — общение. Тебе подойдут: менеджер проектов, HR-специалист, маркетолог, преподаватель." },
      { min: 4, max: 5, title: "Творец", description: "Ты — креативная личность. Рассмотри: дизайнер, писатель, архитектор, UX-исследователь." },
    ],
  },
  "professionalnye-interesy": {
    title: "Профессиональные интересы",
    description: "Выяви свои главные профессиональные интересы и склонности.",
    questions: [
      { question: "Какие предметы в школе тебе нравились больше?", options: ["Математика и физика", "Литература и история", "Биология и химия", "Информатика и технологии"] },
      { question: "Какой тип задач тебе интереснее?", options: ["Решать логические задачи", "Придумывать идеи", "Помогать людям", "Работать с техникой"] },
      { question: "Какую книгу ты бы выбрал?", options: ["Научно-популярную", "Художественную", "По саморазвитию", "Техническую документацию"] },
      { question: "Чем бы ты занялся на хакатоне?", options: ["Программированием", "Дизайном", "Презентацией", "Управлением команды"] },
    ],
    results: [
      { min: 0, max: 1, title: "Технарь", description: "Тебя привлекают технические и точные науки. Рассмотри: программист, инженер, data scientist." },
      { min: 2, max: 3, title: "Гуманитарий", description: "Твои интересы лежат в области гуманитарных наук. Рассмотри: журналист, психолог, юрист." },
      { min: 4, max: 4, title: "Универсал", description: "У тебя широкий спектр интересов. Рассмотри: продакт-менеджер, предприниматель, консультант." },
    ],
  },
  "kariernyj-kompas": {
    title: "Карьерный компас",
    description: "Узнай, в каком направлении двигаться для успешной карьеры.",
    questions: [
      { question: "Что для тебя важнее всего в карьере?", options: ["Высокий доход", "Интересные задачи", "Баланс работа/жизнь", "Влияние на мир"] },
      { question: "Где бы ты хотел работать?", options: ["В крупной корпорации", "В стартапе", "Удалённо/фриланс", "В госсекторе"] },
      { question: "Как быстро ты хочешь расти?", options: ["Максимально быстро", "Стабильно и уверенно", "Не спешу, главное — качество", "Хочу создать своё дело"] },
      { question: "Готов ли ты к переездам?", options: ["Да, даже за границу", "Только в пределах страны", "Нет, хочу остаться в своём городе", "Готов работать удалённо откуда угодно"] },
      { question: "Какой формат обучения тебе ближе?", options: ["Университет", "Онлайн-курсы", "Самообучение", "Менторство"] },
    ],
    results: [
      { min: 0, max: 1, title: "Карьерист", description: "Ты нацелен на быстрый рост. Рассмотри: консалтинг, инвестиционный банкинг, IT-менеджмент." },
      { min: 2, max: 3, title: "Исследователь", description: "Тебе важен смысл работы. Рассмотри: наука, R&D, социальное предпринимательство." },
      { min: 4, max: 5, title: "Свободный агент", description: "Ты ценишь свободу. Рассмотри: фриланс, стартапы, креативные индустрии." },
    ],
  },
  "navyki-i-talanty": {
    title: "Навыки и таланты",
    description: "Оцени свои сильные стороны и узнай, где они востребованы.",
    questions: [
      { question: "Что тебе даётся легче всего?", options: ["Числа и расчёты", "Слова и тексты", "Рисование и визуал", "Организация и планирование"] },
      { question: "Как ты решаешь конфликты?", options: ["Логически", "Эмоционально", "Ищу компромисс", "Избегаю"] },
      { question: "Какой навык ты бы хотел развить?", options: ["Программирование", "Публичные выступления", "Управление командой", "Креативное мышление"] },
      { question: "Что говорят о тебе друзья?", options: ["Умный", "Надёжный", "Креативный", "Лидер"] },
    ],
    results: [
      { min: 0, max: 1, title: "Логик", description: "Твои сильные стороны — аналитика и логика. Подходящие роли: аналитик, разработчик, учёный." },
      { min: 2, max: 3, title: "Эмпат", description: "Твой талант — понимание людей. Подходящие роли: психолог, HR, коуч, медиатор." },
      { min: 4, max: 4, title: "Визионер", description: "Ты мыслишь масштабно. Подходящие роли: стратег, предприниматель, креативный директор." },
    ],
  },
};

const slugMap: Record<string, string> = {
  "Тип личности": "tip-lichnosti",
  "Профессиональные интересы": "professionalnye-interesy",
  "Карьерный компас": "kariernyj-kompas",
  "Навыки и таланты": "navyki-i-talanty",
};

const TestPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const test = slug ? testsData[slug] : null;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  if (!test) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Тест не найден</h1>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
      </div>
    );
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQ + 1 < test.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    const score = answers.reduce((a, b) => a + b, 0);
    const normalized = Math.floor((score / (answers.length * 3)) * test.results.length);
    const idx = Math.min(normalized, test.results.length - 1);
    return test.results[idx];
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {test.title}
            </h1>
            <p className="text-muted-foreground">{test.description}</p>
          </motion.div>

          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {test.questions.map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {i < currentQ ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : i === currentQ ? (
                      <div className="h-5 w-5 rounded-full border-2 border-accent bg-accent/20" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                ))}
                <span className="ml-auto text-sm text-muted-foreground">
                  {currentQ + 1} из {test.questions.length}
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {test.questions[currentQ].question}
              </h2>

              <div className="space-y-3">
                {test.questions[currentQ].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-accent hover:bg-accent/5 transition-all duration-200 text-foreground font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Твой результат: {getResult().title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                {getResult().description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={restart}>
                  Пройти заново
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                  Другие тесты
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { slugMap };
export default TestPage;
