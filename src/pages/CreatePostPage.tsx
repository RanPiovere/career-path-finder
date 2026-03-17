import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostForm, { PostFormValue } from "@/components/PostForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createPost } from "@/services/postService";
import { useToast } from "@/hooks/use-toast";

const CreatePostPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/blog/create" } });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSubmit = (value: PostFormValue) => {
    createPost(
      {
        title: value.title,
        description: value.description,
        content: value.content,
        imageUrl: value.imageUrl,
      },
      user.email,
    );
    toast({
      title: "Статья опубликована",
      description: "Новая статья появилась в списке блога.",
    });
    navigate("/blog");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Написать статью
            </h1>
            <p className="text-muted-foreground">
              Поделитесь опытом, идеями или полезными материалами. В дальнейшем это можно будет связать с бэкендом и модерацией.
            </p>
          </div>
          <PostForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePostPage;

