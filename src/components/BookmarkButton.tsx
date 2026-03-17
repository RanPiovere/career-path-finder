import { MouseEvent, useEffect, useState } from "react";
import { Bookmark as BookmarkIcon, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getOrCreateVisitorId } from "@/services/visitService";
import { BookmarkItemType, isBookmarked, toggleBookmark } from "@/services/bookmarkService";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type BookmarkButtonProps = {
  itemId: string;
  title: string;
  itemType: BookmarkItemType;
};

const BookmarkButton = ({ itemId, title, itemType }: BookmarkButtonProps) => {
  const { user } = useAuth();
  const [userKey, setUserKey] = useState<string>("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const key = user?.email || getOrCreateVisitorId();
    setUserKey(key);
    setActive(isBookmarked(key, itemId, itemType));
  }, [user, itemId, itemType]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!userKey) {
      return;
    }
    const nextActive = !active;
    setActive(nextActive);
    toggleBookmark(userKey, itemId, itemType, title);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleClick}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          {active ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkIcon className="h-4 w-4" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <span className="text-xs">
          {active ? "Удалить из закладок" : "Сохранить в закладки"}
        </span>
      </TooltipContent>
    </Tooltip>
  );
};

export default BookmarkButton;

