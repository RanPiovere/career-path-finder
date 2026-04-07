import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSettingsData } from "@/services/accountSettingsService";

type ProfileSettingsFormProps = {
  value: ProfileSettingsData;
  onSave: (value: ProfileSettingsData) => Promise<void>;
};

const ProfileSettingsForm = ({ value, onSave }: ProfileSettingsFormProps) => {
  const [form, setForm] = useState<ProfileSettingsData>(value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const initials = useMemo(
    () =>
      `${form.firstName || ""} ${form.lastName || ""}`
        .trim()
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U",
    [form.firstName, form.lastName],
  );

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Введите имя";
    if (!form.email.trim()) nextErrors.email = "Введите email";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Некорректный email";
    if (form.phone && !/^[0-9+\-\s()]{7,20}$/.test(form.phone)) nextErrors.phone = "Некорректный телефон";
    if (form.username && form.username.length < 3) nextErrors.username = "Минимум 3 символа";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <Avatar className="h-20 w-20">
          {form.avatarUrl ? <AvatarImage src={form.avatarUrl} alt={form.firstName} /> : null}
          <AvatarFallback className="bg-accent/20 text-accent text-xl font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-2 w-full">
          <Label htmlFor="avatar">Аватар (URL)</Label>
          <Input
            id="avatar"
            placeholder="https://..."
            value={form.avatarUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, avatarUrl: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setForm((prev) => ({ ...prev, avatarUrl: "" }))}
              disabled={!form.avatarUrl}
            >
              Удалить фото
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            value={form.firstName}
            placeholder="Иван"
            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
          />
          {errors.firstName ? <p className="text-xs text-destructive">{errors.firstName}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            value={form.lastName}
            placeholder="Иванов"
            onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={form.username}
            placeholder="ivan_ivanov"
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          />
          {errors.username ? <p className="text-xs text-destructive">{errors.username}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            value={form.phone}
            placeholder="+7 (999) 123-45-67"
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
          {errors.phone ? <p className="text-xs text-destructive">{errors.phone}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Город / страна</Label>
          <Input
            id="city"
            value={`${form.city}${form.city && form.country ? ", " : ""}${form.country}`.trim()}
            placeholder="Москва, Россия"
            onChange={(e) => {
              const valueText = e.target.value;
              const [city, country] = valueText.split(",").map((part) => part.trim());
              setForm((prev) => ({ ...prev, city: city || "", country: country || "" }));
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">О себе</Label>
        <Textarea
          id="bio"
          value={form.bio}
          placeholder="Расскажите кратко о профессиональных интересах"
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
        />
        <p className="text-xs text-muted-foreground">Эта информация отображается в вашем профиле.</p>
      </div>

      <Button onClick={handleSubmit} disabled={saving}>
        {saving ? "Сохранение..." : "Сохранить изменения"}
      </Button>
    </div>
  );
};

export default ProfileSettingsForm;

