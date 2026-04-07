import { useState } from "react";
import { PrivacySettingsData } from "@/services/accountSettingsService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PrivacySettingsProps = {
  value: PrivacySettingsData;
  onSave: (value: PrivacySettingsData) => Promise<void>;
  onExport: () => Promise<void>;
};

const PrivacySettings = ({ value, onSave, onExport }: PrivacySettingsProps) => {
  const [form, setForm] = useState(value);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const save = async () => {
    if (!form.dataProcessingConsent) {
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Кто может видеть профиль</Label>
          <Select
            value={form.profileVisibility}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, profileVisibility: value as PrivacySettingsData["profileVisibility"] }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Все</SelectItem>
              <SelectItem value="friends">Только подписчики</SelectItem>
              <SelectItem value="private">Только я</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Кто может видеть результаты тестов</Label>
          <Select
            value={form.resultsVisibility}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, resultsVisibility: value as PrivacySettingsData["resultsVisibility"] }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Все</SelectItem>
              <SelectItem value="friends">Только подписчики</SelectItem>
              <SelectItem value="private">Только я</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="font-medium text-sm">Показывать email</p>
            <p className="text-xs text-muted-foreground">Email будет виден в вашем публичном профиле</p>
          </div>
          <Switch checked={form.showEmail} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, showEmail: checked }))} />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="font-medium text-sm">Персонализированные рекомендации</p>
            <p className="text-xs text-muted-foreground">Разрешить подбор тестов и материалов по интересам</p>
          </div>
          <Switch
            checked={form.personalizedRecommendations}
            onCheckedChange={(checked) => setForm((prev) => ({ ...prev, personalizedRecommendations: checked }))}
          />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="font-medium text-sm">Согласие на обработку персональных данных</p>
            <p className="text-xs text-muted-foreground">Необходимо для использования персонализированного функционала</p>
          </div>
          <Switch
            checked={form.dataProcessingConsent}
            onCheckedChange={(checked) => setForm((prev) => ({ ...prev, dataProcessingConsent: checked }))}
          />
        </div>
      </div>

      {!form.dataProcessingConsent ? (
        <p className="text-xs text-destructive">Для сохранения настроек нужно согласие на обработку персональных данных.</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={save} disabled={saving || !form.dataProcessingConsent}>
          {saving ? "Сохранение..." : "Сохранить настройки приватности"}
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            setExporting(true);
            await onExport();
            setExporting(false);
          }}
          disabled={exporting}
        >
          {exporting ? "Экспорт..." : "Экспортировать мои данные"}
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettings;

