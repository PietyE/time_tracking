import { type MouseEvent, useState } from 'react';

interface ReturnType {
  id: string;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

export const usePopover = (): ReturnType => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'open-popover' : 'closed-popover';

  return {
    id,
    open,
    anchorEl,
    handleClick,
    handleClose,
  };
};
