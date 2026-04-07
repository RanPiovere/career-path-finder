import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { NotificationSettingsData } from "@/services/accountSettingsService";
import { Button } from "@/components/ui/button";

type NotificationSettingsProps = {
  value: NotificationSettingsData;
  onSave: (value: NotificationSettingsData) => Promise<void>;
};

const NotificationSettings = ({ value, onSave }: NotificationSettingsProps) => {
  const [form, setForm] = useState(value);
  const [saving, setSaving] = useState(false);

  const items: Array<{ key: keyof NotificationSettingsData; label: string; desc: string }> = [
    { key: "emailNotifications", label: "Email-уведомления", desc: "Общие уведомления на почту" },
    { key: "newTests", label: "Новые тесты", desc: "Уведомления о новых тестах в каталоге" },
    { key: "testResults", label: "Результаты тестов", desc: "Уведомления о завершенных тестах и аналитике" },
    { key: "careerNews", label: "Карьерные новости", desc: "Свежие новости рынка и профессий" },
    { key: "marketing", label: "Маркетинговые письма", desc: "Спецпредложения и анонсы" },
    { key: "weeklyDigest", label: "Еженедельная подборка", desc: "Подборка рекомендаций раз в неделю" },
    { key: "pushNotifications", label: "Push-уведомления", desc: "Уведомления в браузере и приложении" },
  ];

  const save = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-xl border border-border p-4 gap-3">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Switch
              checked={form[item.key]}
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, [item.key]: checked }))}
            />
          </div>
        ))}
      </div>
      <Button onClick={save} disabled={saving}>
        {saving ? "Сохранение..." : "Сохранить уведомления"}
      </Button>
    </div>
  );
};

export default NotificationSettings;

