import { useCallback, useState } from "react";

export default function useToggle(initialState: boolean = false) {
  const [isOpen, toggle] = useState<boolean>(initialState);

  const onOpen = useCallback(() => {
    toggle(true);
  }, []);

  const onClose = useCallback(() => {
    toggle(false);
  }, []);

  const onToggle = useCallback(() => {
    toggle(!isOpen);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
