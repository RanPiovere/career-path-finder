import { ComponentType } from "react";
import { Bell, Lock, Shield, Target, Trophy, UserCircle2, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "overview"
  | "profile"
  | "security"
  | "notifications"
  | "career"
  | "privacy"
  | "results";

type SettingsSidebarProps = {
  value: SettingsTab;
  onChange: (value: SettingsTab) => void;
};

const items: Array<{ id: SettingsTab; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "profile", label: "Профиль", icon: UserCircle2 },
  { id: "security", label: "Безопасность", icon: Lock },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "career", label: "Карьерные предпочтения", icon: Target },
  { id: "privacy", label: "Приватность", icon: Shield },
  { id: "results", label: "Мои результаты", icon: Trophy },
];

const SettingsSidebar = ({ value, onChange }: SettingsSidebarProps) => {
  return (
    <aside className="w-full md:w-72">
      <div className="md:sticky md:top-24 rounded-2xl border border-border bg-card p-3 space-y-1 overflow-x-auto">
        <div className="md:block flex gap-2 min-w-max md:min-w-0">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "w-full md:w-full text-left rounded-xl px-3 py-2.5 text-sm transition-colors flex items-center gap-2 whitespace-nowrap",
                value === item.id
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export type { SettingsTab };
export default SettingsSidebar;

