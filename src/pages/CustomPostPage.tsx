import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPostById, registerPostVisit } from "@/services/postService";
import { getOrCreateVisitorId } from "@/services/visitService";

const CustomPostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id || "";
  const post = getPostById(id);

  useEffect(() => {
    if (id) {
      const visitorId = getOrCreateVisitorId();
      registerPostVisit(id, visitorId);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Статья не найдена</h1>
          <Button onClick={() => navigate("/blog")}>К списку статей</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const paragraphs = post.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к статьям
          </button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>

            {post.imageUrl && (
              <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPostPage;

