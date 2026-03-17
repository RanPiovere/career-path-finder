import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostFormValue = {
  title: string;
  description?: string;
  content: string;
  imageUrl?: string;
};

type PostFormProps = {
  onSubmit: (value: PostFormValue) => void;
};

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setError(null);

    if (!title.trim()) {
      setError("Введите заголовок статьи");
      return;
    }
    if (!content.trim()) {
      setError("Введите основной текст статьи");
      return;
    }

    setSubmitting(true);
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      content: content.trim(),
      imageUrl: imageUrl.trim() || undefined,
    });
    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Новая статья</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 text-destructive px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="post-title">Заголовок</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, «Как выбрать первую профессию»"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-description">Краткое описание</Label>
          <Textarea
            id="post-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Пара предложений о том, о чём статья"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-content">Текст статьи</Label>
          <Textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Основной текст статьи"
            className="min-h-[220px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post-image">Изображение (URL, опционально)</Label>
          <Input
            id="post-image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="flex gap-3">
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            Опубликовать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export type { PostFormValue };
export default PostForm;

