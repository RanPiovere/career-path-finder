import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestResultItem } from "@/services/accountSettingsService";

type TestResultsSettingsProps = {
  items: TestResultItem[];
};

const TestResultsSettings = ({ items }: TestResultsSettingsProps) => {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <p className="font-medium">Пока нет пройденных тестов</p>
        <p className="text-sm text-muted-foreground mt-1">Пройдите тесты, и здесь появится история с результатами.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">Дата прохождения: {item.completedAt}</p>
            <p className="text-sm mt-1">Результат: {item.result}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={item.status === "completed" ? "default" : "secondary"}>
              {item.status === "completed" ? "Завершён" : "В процессе"}
            </Badge>
            <Button size="sm" variant="outline">
              Посмотреть
            </Button>
            <Button size="sm">Скачать PDF</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestResultsSettings;

