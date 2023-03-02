import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useAppShallowSelector } from 'hooks/redux';
import { getManageModalProjectInfo } from 'redux/selectors/projectManagement';

interface Props {
  handleOpen: VoidFunction;
}

export const AddDevelopers: FC<Props> = ({ handleOpen }): JSX.Element => {
  const open = (): void => {
    if (!projectInfo.owner) return;
    handleOpen();
  };

  const projectInfo = useAppShallowSelector(getManageModalProjectInfo);
  return (
    <Box
      bgcolor='customGrey.STROKE_OPACITY_40'
      sx={{
        borderBottomLeftRadius: (theme) => 5 * theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => 5 * theme.shape.borderRadius,
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        color={
          projectInfo.is_archived || !projectInfo.owner
            ? 'text.disabled'
            : 'primary.main'
        }
        flexShrink={1}
        onClick={open}
        py={18}
        px={24}
        sx={{
          cursor: projectInfo.is_archived ? 'auto' : 'pointer',
          '& svg': {
            mr: 10,
          },
        }}
      >
        <Add />
        <Typography variant='subtitle2'>Add new developers</Typography>
      </Box>
    </Box>
  );
};
