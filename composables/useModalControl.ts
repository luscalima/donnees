interface ModalControlOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export function useModalControl(options?: ModalControlOptions) {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
    options?.onOpen?.();
  }

  function close() {
    isOpen.value = false;
    options?.onClose?.();
  }

  return {
    isOpen,
    open,
    close,
  };
}
