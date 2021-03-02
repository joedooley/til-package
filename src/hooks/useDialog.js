import * as React from 'react';
import useToggle from '@hooks/useToggle';

export default function useDialog(initialValue = false) {
  const [isOpen, setIsOpen] = useToggle(initialValue);
  const toggle = React.useCallback(() => setIsOpen(isOpen => !isOpen), [setIsOpen]);

  return [isOpen, toggle];
}
