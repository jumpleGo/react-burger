import { useCallback, useRef } from "react";

const useDebouncedDrag = (
  onDragCallback: (event: MouseEvent) => void,
  delay = 300,
) => {
  const dragRef = useRef<number | null>(null);

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      // Clear the previous timeout (if any)
      if (dragRef.current !== null) {
        clearTimeout(dragRef.current);
      }

      // Set a new timeout with the specified delay
      dragRef.current = window.setTimeout(() => {
        onDragCallback(event);
      }, delay);
    },
    [onDragCallback, delay],
  );

  return handleDrag;
};

export default useDebouncedDrag;
