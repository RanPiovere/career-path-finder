import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { blogSlugMap } from "./BlogPost";
import { useAuth } from "@/context/AuthContext";
import { CustomPost, getAllPosts, sortPostsByPopularity } from "@/services/postService";
import { Button } from "@/components/ui/button";
import CreationInfoModal from "@/components/CreationInfoModal";

type StaticArticle = {
  title: string;
  slug: string;
};

const staticArticles: StaticArticle[] = Object.entries(blogSlugMap).map(([title, slug]) => ({
  title,
  slug,
}));

const BlogPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [customPosts, setCustomPosts] = useState<CustomPost[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCustomPosts(sortPostsByPopularity(getAllPosts()));
  }, []);

  const handleCreateClick = () => {
    if (!user) {
      setShowInfo(true);
      return;
    }
    navigate("/blog/create");
  };

  const allItems = useMemo(
    () => ({
      static: staticArticles,
      custom: customPosts,
    }),
    [customPosts],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="text-center md:text-left">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Блог</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
                Полезные материалы о карьере и образовании
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Читайте готовые статьи и добавляйте собственные заметки и истории.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button onClick={handleCreateClick}>
                Написать статью
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {allItems.static.map((article, index) => (
                <motion.button
                  key={article.slug}
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Подборка от CPHelper</span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.button>
              ))}
            </div>

            {allItems.custom.length > 0 && (
              <section className="pt-4 border-t border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Статьи сообщества
                </h2>
                <div className="space-y-3">
                  {allItems.custom.map((post, index) => {
                    const date = new Date(post.createdAt);
                    const formatted = date.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    return (
                      <motion.button
                        key={post.id}
                        onClick={() => navigate(`/blog/custom/${post.id}`)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatted}</span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {post.description}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            Посещений: {post.visitCount}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <CreationInfoModal
        open={showInfo}
        type="blog"
        onClose={() => setShowInfo(false)}
        onLogin={() => {
          setShowInfo(false);
          navigate("/login", { state: { from: "/blog/create" } });
        }}
        onRegister={() => {
          setShowInfo(false);
          navigate("/register", { state: { from: "/blog/create" } });
        }}
      />
      <Footer />
    </div>
  );
};

export default BlogPage;

