import { type FC } from 'react';
import { Button, Popover, type PopoverProps, Stack } from '@mui/material';
import { Edit, SwapHoriz, Delete } from '@mui/icons-material';
import { styles } from '../styles';
interface Props {
  anchorEl: Element | ((element: Element) => Element) | null;

  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export const WorkItemActions: FC<PopoverProps & Props> = ({
  id,
  open,
  anchorEl,
  onClose,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  ...props
}): JSX.Element => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
    transitionDuration={150}
    {...props}
  >
    <Stack
      p={8}
      sx={styles.popup}
    >
      <Button
        startIcon={<Edit />}
        color='black'
        fullWidth
      >
        Edit the report
      </Button>
      <Button
        startIcon={<SwapHoriz />}
        color='black'
        fullWidth
      >
        Swap to other project
      </Button>
      <Button
        startIcon={<Delete />}
        color='black'
        fullWidth
      >
        Delete the report
      </Button>
    </Stack>
  </Popover>
);
