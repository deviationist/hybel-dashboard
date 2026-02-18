import { type UnitSortField, type SortDirection } from "@/types/unit";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export function SortButton({
  label,
  field,
  currentSort,
  currentDirection,
  onClick,
}: {
  label: string;
  field: UnitSortField;
  currentSort?: UnitSortField;
  currentDirection?: SortDirection;
  onClick: (field: UnitSortField, direction: SortDirection | undefined) => void;
}) {
  const isActive = currentSort === field;

  const handleClick = () => {
    if (!isActive) {
      onClick(field, "asc");
    } else if (currentDirection === "asc") {
      onClick(field, "desc");
    } else {
      onClick(field, undefined);
    }
  };

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="xs"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={`Sort by ${label}${isActive ? `, ${currentDirection === "asc" ? "ascending" : "descending"}` : ""}`}
    >
      <ArrowUpDown className="size-3" />
      {label}
      {isActive && (
        <span className="text-[10px] opacity-70">
          {currentDirection === "asc" ? "A-Z" : "Z-A"}
        </span>
      )}
    </Button>
  );
}
