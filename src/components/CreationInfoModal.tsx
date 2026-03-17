import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CreationInfoType = "test" | "blog";

type CreationInfoModalProps = {
  open: boolean;
  type: CreationInfoType;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

const getTitle = (type: CreationInfoType) => {
  if (type === "test") {
    return "Аккаунт нужен для создания тестов";
  }
  return "Аккаунт нужен для публикации статей";
};

const getLines = (type: CreationInfoType) => {
  const shared = [
    "Сохранять созданный вами контент и возвращаться к нему позже.",
    "Привязывать материалы к автору, чтобы читатели видели, кто их создал.",
    "Редактировать и удалять свои публикации в будущем.",
    "Сохранять персональные данные и результаты работы в одном месте.",
  ];

  if (type === "test") {
    return [
      "Аккаунт позволяет:",
      ...shared,
      "Использовать ваши тесты для более точной персонализации карьерных рекомендаций.",
    ];
  }

  return [
    "Аккаунт позволяет:",
    ...shared,
    "Публиковать статьи от вашего имени и управлять своими публикациями.",
  ];
};

const CreationInfoModal = ({ open, type, onClose, onLogin, onRegister }: CreationInfoModalProps) => {
  const lines = getLines(type);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle(type)}</DialogTitle>
          <DialogDescription>
            Чтобы продолжить, войдите в аккаунт или зарегистрируйтесь. Это займёт всего пару минут.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm text-muted-foreground">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" type="button" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="outline" type="button" onClick={onRegister}>
            Зарегистрироваться
          </Button>
          <Button type="button" onClick={onLogin}>
            Войти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type { CreationInfoType, CreationInfoModalProps };
export default CreationInfoModal;

