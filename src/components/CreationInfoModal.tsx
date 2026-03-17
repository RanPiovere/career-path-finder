import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Sparkles, UserPlus } from "lucide-react";

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
    return "Создавайте свои тесты с аккаунтом";
  }
  return "Публикуйте статьи с аккаунтом";
};

const getSubtitle = (type: CreationInfoType) => {
  if (type === "test") {
    return "Аккаунт нужен, чтобы сохранять тесты, возвращаться к ним позже и получать более персональные карьерные рекомендации.";
  }
  return "Аккаунт позволит публиковать материалы от своего имени, редактировать их и управлять своими публикациями.";
};

const getFeatures = (type: CreationInfoType) => {
  if (type === "test") {
    return [
      "Сохраняйте созданные тесты",
      "Возвращайтесь к ним позже",
      "Публикуйте материалы от своего имени",
      "Редактируйте и удаляйте свои материалы",
      "Получайте более точные персональные рекомендации",
    ];
  }
  return [
    "Публикуйте статьи от имени автора",
    "Сохраняйте свои материалы",
    "Возвращайтесь к черновикам и публикациям позже",
    "Редактируйте и удаляйте статьи",
    "Управляйте своей активностью в одном месте",
  ];
};

const CreationInfoModal = ({ open, type, onClose, onLogin, onRegister }: CreationInfoModalProps) => {
  const subtitle = getSubtitle(type);
  const features = getFeatures(type);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md rounded-2xl border border-border/60 bg-card/95 shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              {type === "test" ? <Sparkles className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
            </div>
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-lg md:text-xl font-display">
                {getTitle(type)}
              </DialogTitle>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 w-fit">
                <UserPlus className="h-3 w-3" />
                Быстро и бесплатно
              </span>
            </div>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-xl bg-muted/60 p-3 md:p-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" type="button" onClick={onClose} className="sm:w-auto w-full">
            Отмена
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={onRegister}
            className="sm:w-auto w-full border-accent/40 text-accent"
          >
            Зарегистрироваться
          </Button>
          <Button type="button" onClick={onLogin} className="sm:w-auto w-full">
            Войти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type { CreationInfoType, CreationInfoModalProps };
export default CreationInfoModal;

