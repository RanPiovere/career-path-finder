import { motion } from "framer-motion";
import { Clock, ArrowRight, Brain, Target, Compass, Lightbulb } from "lucide-react";

const tests = [
  {
    icon: Brain,
    title: "Тип личности",
    description: "Определи свой тип личности и узнай, какие профессии тебе подходят.",
    duration: "15 мин",
    color: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-200",
  },
  {
    icon: Target,
    title: "Профессиональные интересы",
    description: "Выяви свои главные профессиональные интересы и склонности.",
    duration: "10 мин",
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-200",
  },
  {
    icon: Compass,
    title: "Карьерный компас",
    description: "Узнай, в каком направлении двигаться для успешной карьеры.",
    duration: "20 мин",
    color: "from-orange-500/10 to-amber-500/10",
    borderColor: "border-orange-200",
  },
  {
    icon: Lightbulb,
    title: "Навыки и таланты",
    description: "Оцени свои сильные стороны и узнай, где они востребованы.",
    duration: "12 мин",
    color: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TestsSection = () => {
  return (
    <section id="tests" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Тесты</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Пройди тесты и узнай себя
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Научно обоснованные тесты помогут определить твои сильные стороны и подходящие профессии.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tests.map((test) => (
            <motion.div
              key={test.title}
              variants={item}
              className={`group relative bg-card rounded-2xl border ${test.borderColor} p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center mb-5`}>
                <test.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{test.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{test.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {test.duration}
                </span>
                <span className="text-accent font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Начать <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestsSection;
