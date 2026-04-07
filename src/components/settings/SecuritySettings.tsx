import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SecuritySettingsData } from "@/services/accountSettingsService";

type SecuritySettingsProps = {
  value: SecuritySettingsData;
  onSave: (value: SecuritySettingsData) => Promise<void>;
};

const SecuritySettings = ({ value, onSave }: SecuritySettingsProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState(value);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteOpen, setDeleteOpen] = useState(false);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    return score;
  }, [newPassword]);

  const passwordLabel = ["Слабый", "Слабый", "Средний", "Хороший", "Надёжный"][passwordScore];

  const validatePassword = () => {
    const next: Record<string, string> = {};
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) next.currentPassword = "Введите текущий пароль";
      if (newPassword.length < 8) next.newPassword = "Минимум 8 символов";
      if (newPassword !== confirmPassword) next.confirmPassword = "Пароли не совпадают";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const saveSecurity = async () => {
    if (!validatePassword()) return;
    setSaving(true);
    await onSave(data);
    setSaving(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Смена пароля</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Введите текущий пароль"
            />
            {errors.currentPassword ? <p className="text-xs text-destructive">{errors.currentPassword}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Минимум 8 символов"
            />
            {errors.newPassword ? <p className="text-xs text-destructive">{errors.newPassword}</p> : null}
            <p className="text-xs text-muted-foreground">Сложность: {passwordLabel}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите новый пароль"
            />
            {errors.confirmPassword ? <p className="text-xs text-destructive">{errors.confirmPassword}</p> : null}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Двухфакторная аутентификация</h3>
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="font-medium">Включить 2FA</p>
            <p className="text-xs text-muted-foreground">Дополнительная защита аккаунта при входе</p>
          </div>
          <Switch
            checked={data.twoFactorEnabled}
            onCheckedChange={(checked) => setData((prev) => ({ ...prev, twoFactorEnabled: checked }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Активные сессии</h3>
        <div className="space-y-3">
          {data.activeSessions.map((session) => (
            <div key={session.id} className="rounded-xl border border-border p-4">
              <div className="font-medium text-sm">{session.device}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {session.os} · {session.location}
              </div>
              <div className="text-xs text-muted-foreground">Последняя активность: {session.lastActive}</div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setData((prev) => ({ ...prev, activeSessions: [prev.activeSessions[0]] }))}
        >
          Выйти со всех устройств
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={saveSecurity} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить настройки безопасности"}
        </Button>
        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          Удалить аккаунт
        </Button>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтвердите удаление аккаунта</DialogTitle>
            <DialogDescription>
              Это действие необратимо. Все персональные данные и результаты будут удалены.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => setDeleteOpen(false)}>
              Подтвердить удаление
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecuritySettings;

