import { Button } from "@/components/ui/button";

export function FilterToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="xs"
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
}
