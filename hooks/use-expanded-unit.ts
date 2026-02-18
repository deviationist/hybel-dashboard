import { useCallback, useEffect, useState } from "react";

export function useExpandedUnit(
  highlightedUnitId?: string | null,
  onHighlightHandled?: () => void,
) {
  const [manualExpandedId, setManualExpandedId] = useState<string | null>(null);

  const expandedId = highlightedUnitId ?? manualExpandedId;

  const handleToggle = useCallback((unitId: string) => {
    setManualExpandedId((prev) => (prev === unitId ? null : unitId));
  }, []);

  useEffect(() => {
    if (!highlightedUnitId) return;
    const timeout = setTimeout(() => {
      onHighlightHandled?.();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [highlightedUnitId, onHighlightHandled]);

  return { expandedId, handleToggle };
}
