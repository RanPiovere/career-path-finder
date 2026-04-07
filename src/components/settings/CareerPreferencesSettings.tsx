import { useState } from "react";
import { CareerPreferencesData } from "@/services/accountSettingsService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CareerPreferencesSettingsProps = {
  value: CareerPreferencesData;
  onSave: (value: CareerPreferencesData) => Promise<void>;
};

const industries = ["IT", "Маркетинг", "Финансы", "Дизайн", "Продажи", "HR", "Аналитика", "Образование"];
const categories = ["Личность", "Навыки", "Профориентация", "Лидерство", "Soft Skills"];
const workFormats = ["Удалённый", "Гибридный", "Офис", "Проектный"];

const toggleFromArray = (source: string[], value: string) =>
  source.includes(value) ? source.filter((item) => item !== value) : [...source, value];

const CareerPreferencesSettings = ({ value, onSave }: CareerPreferencesSettingsProps) => {
  const [form, setForm] = useState(value);
  const [skillDraft, setSkillDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (form.industries.length === 0) {
      setError("Выберите минимум одну интересующую сферу");
      return;
    }
    setError("");
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Интересующие сферы</Label>
        <div className="flex flex-wrap gap-2">
          {industries.map((item) => (
            <button
              key={item}
              onClick={() => setForm((prev) => ({ ...prev, industries: toggleFromArray(prev.industries, item) }))}
              className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                form.industries.includes(item)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Любимые категории тестов</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() =>
                setForm((prev) => ({ ...prev, favoriteTestCategories: toggleFromArray(prev.favoriteTestCategories, item) }))
              }
              className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                form.favoriteTestCategories.includes(item)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Уровень образования</Label>
          <Select
            value={form.educationLevel}
            onValueChange={(educationLevel) => setForm((prev) => ({ ...prev, educationLevel }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите уровень" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">Среднее</SelectItem>
              <SelectItem value="college">Колледж</SelectItem>
              <SelectItem value="bachelor">Бакалавриат</SelectItem>
              <SelectItem value="master">Магистратура</SelectItem>
              <SelectItem value="phd">Аспирантура</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Желаемый формат работы</Label>
          <div className="flex flex-wrap gap-2">
            {workFormats.map((item) => (
              <button
                key={item}
                onClick={() => setForm((prev) => ({ ...prev, workFormat: toggleFromArray(prev.workFormat, item) }))}
                className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                  form.workFormat.includes(item)
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-background hover:bg-muted border-border"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Навыки</Label>
        <div className="flex gap-2">
          <Input value={skillDraft} placeholder="Добавьте навык" onChange={(e) => setSkillDraft(e.target.value)} />
          <Button
            variant="outline"
            onClick={() => {
              const trimmed = skillDraft.trim();
              if (!trimmed) return;
              if (form.skills.includes(trimmed)) return;
              setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
              setSkillDraft("");
            }}
          >
            Добавить
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.skills.map((skill) => (
            <Badge key={skill} className="bg-accent/10 text-accent hover:bg-accent/20">
              <span className="mr-2">{skill}</span>
              <button
                onClick={() => setForm((prev) => ({ ...prev, skills: prev.skills.filter((item) => item !== skill) }))}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Карьерные цели</Label>
        <Textarea
          placeholder="Опишите, каких результатов хотите достичь в ближайший год"
          value={form.goals}
          onChange={(e) => setForm((prev) => ({ ...prev, goals: e.target.value }))}
        />
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}

      <Button onClick={save} disabled={saving}>
        {saving ? "Сохранение..." : "Сохранить карьерные предпочтения"}
      </Button>
    </div>
  );
};

export default CareerPreferencesSettings;

