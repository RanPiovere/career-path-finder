import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-gradient)", opacity: 0.92 }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Найди свою профессию</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Узнай, какая профессия{" "}
            <span className="text-gradient">подходит именно тебе</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl leading-relaxed"
          >
            Пройди профориентационные тесты, читай полезные статьи и находи вдохновение
            для своей будущей карьеры.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl">
              Пройти тест
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl">
              Узнать больше
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
