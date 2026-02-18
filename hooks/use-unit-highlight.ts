import { useCallback, useState } from "react";

export function useUnitHighlight() {
  const [highlightedUnitId, setHighlightedUnitId] = useState<string | null>(
    null,
  );

  const handleActionClick = useCallback((unitId: string) => {
    setHighlightedUnitId(unitId);
  }, []);

  const handleHighlightHandled = useCallback(() => {
    setHighlightedUnitId(null);
  }, []);

  return { highlightedUnitId, handleActionClick, handleHighlightHandled };
}
