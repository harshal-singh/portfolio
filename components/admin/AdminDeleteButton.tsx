import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export function AdminDeleteButton({
  onClick,
  label,
  className = "",
}: {
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`shrink-0 text-red-400 hover:text-red-300 ${className}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
