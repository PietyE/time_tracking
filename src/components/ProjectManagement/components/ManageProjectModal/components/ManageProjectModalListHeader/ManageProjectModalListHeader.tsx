import { type FC } from 'react';
import { Box, Grid, IconButton, Popover, Typography } from '@mui/material';
import { usePopover } from 'hooks/usePopover';
import { Info } from 'shared/components/svg/Info';
import { useAppShallowSelector } from 'hooks/redux';
import { getManageModalProjectInfo } from 'redux/selectors/projectManagement';

export const ManageProjectModalListHeader: FC = (): JSX.Element => {
  const { handleClose, handleClick, anchorEl, id, open } = usePopover();
  const projectInfo = useAppShallowSelector(getManageModalProjectInfo);
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      px={24}
      py={12}
      bgcolor='customGrey.STROKE_OPACITY_40'
    >
      <Grid item>
        <Typography>DEVELOPER NAME</Typography>
      </Grid>
      <Grid item>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Typography>PAYMENT PAYROLL</Typography>
          <IconButton
            onClick={handleClick}
            color='primary'
          >
            <Info />
          </IconButton>
          <Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                horizontal: 'center',
                vertical: 'top',
              }}
              sx={{
                zIndex: 999999999,
                top: 8,
                backdropFilter: 'none',
                '& .MuiPaper-root': {
                  top: 20,
                  maxWidth: 408,
                  padding: (theme) => theme.spacing(24, 32),
                  background: (theme) => theme.palette.common.white,
                  borderRadius: 3,
                },
              }}
            >
              <Box>
                <Typography
                  variant='h6'
                  gutterBottom
                >
                  Info
                </Typography>
                <Typography variant='body2'>
                  <b>Salary</b> - a developer has a salary payment. Does not
                  matter, how many hours they work on the project per month.
                  <br />
                  <b>Hourly payroll</b> - a developer has hourly payment. In
                  general, it is an additional extra payment to their salary.
                </Typography>
              </Box>
            </Popover>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={!projectInfo.is_archived ? 3 : 2.1}
      >
        <Typography>HOURS</Typography>
      </Grid>
    </Grid>
  );
};
