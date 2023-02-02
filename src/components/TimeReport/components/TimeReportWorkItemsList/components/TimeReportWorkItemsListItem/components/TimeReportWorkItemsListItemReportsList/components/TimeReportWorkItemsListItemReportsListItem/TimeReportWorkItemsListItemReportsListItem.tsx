import { type FC, type MouseEvent } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, IconButton, Typography } from '@mui/material';
import Linkify from 'linkify-react';
import { WorkItemActions } from './WorkItemActions';
import { useAppDispatch } from 'hooks/redux';
import { deleteWorkItem } from 'redux/asyncActions/timereports';
import { usePopover } from 'hooks/usePopover';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import type { WorkItem } from 'api/models/workItems';
import { styles } from './styles';

interface Props {
  currentDayWorkItem: WorkItem;
}

export const TimeReportWorkItemsListItemReportsListItem: FC<Props> = ({
  currentDayWorkItem,
}): JSX.Element => {
  const { id, open, handleClick, handleClose, anchorEl } = usePopover();
  const dispatch = useAppDispatch();

  const onDeleteWorkItem = (_event: MouseEvent<HTMLButtonElement>): void => {
    void dispatch(deleteWorkItem(currentDayWorkItem.id));
    handleClose();
  };

  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='flex-end'
        py={16}
        px={30}
      >
        <Grid
          item
          xs={7.3}
          sx={styles.link}
        >
          <Linkify options={{ target: '_blank' }}>
            {currentDayWorkItem.title}
          </Linkify>
        </Grid>
        <Grid
          item
          xs={1.05}
        >
          <Typography variant='h6'>
            {parseMinToHoursAndMin(currentDayWorkItem.duration)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={0.5}
        >
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
      <WorkItemActions
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onDeleteWorkItem={onDeleteWorkItem}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      />
    </>
  );
};
