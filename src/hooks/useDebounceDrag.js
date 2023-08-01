import {useCallback, useRef} from 'react';

const useDebouncedDrag = (onDragCallback, delay = 300) => {
    const dragRef = useRef(null);

    const handleDrag = useCallback(
        (event) => {
            // Clear the previous timeout (if any)
            if (dragRef.current) {
                clearTimeout(dragRef.current);
            }

            // Set a new timeout with the specified delay
            dragRef.current = setTimeout(() => {
                onDragCallback(event);
            }, delay);
        },
        [onDragCallback, delay]
    );

    return handleDrag;
};

export default useDebouncedDrag;