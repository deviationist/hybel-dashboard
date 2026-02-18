import { cn } from "@/lib/utils";

export function StatusDot({ className }: { className: string }) {
  return (
    <span
      className={cn("inline-block size-2 rounded-full shadow-sm", className)}
    />
  );
}
