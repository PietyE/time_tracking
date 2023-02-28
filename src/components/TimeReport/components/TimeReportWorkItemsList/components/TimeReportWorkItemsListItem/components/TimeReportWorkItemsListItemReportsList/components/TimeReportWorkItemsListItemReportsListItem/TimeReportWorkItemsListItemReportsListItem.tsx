import { type FC, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, IconButton, Typography } from '@mui/material';
import Linkify from 'linkify-react';
import { EditingWorkItemForm } from './EditingWorkItemForm';
import { WorkItemActions } from './WorkItemActions';
import { useAppDispatch } from 'hooks/redux';
import { usePopover } from 'hooks/usePopover';
import { deleteWorkItem, updateWorkItem } from 'redux/asyncActions/timereports';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import type { UpdateWorkItemData, WorkItem } from 'api/models/workItems';
import { styles } from './styles';

interface Props {
  currentDayWorkItem: WorkItem;
  currentDayOrdinalNumber: number;
}

export const TimeReportWorkItemsListItemReportsListItem: FC<Props> = ({
  currentDayWorkItem,
  currentDayOrdinalNumber,
}): JSX.Element => {
  const { id, open, handleClick, handleClose, anchorEl } = usePopover();
  const dispatch = useAppDispatch();
  const [isEditingWorkItem, setIsEditingWorkItem] = useState<boolean>(false);
  const onDeleteWorkItem = (): void => {
    void dispatch(deleteWorkItem(currentDayWorkItem.id));
  };

  const onUpdateWorkItem = (
    updatedWorkItemFields: UpdateWorkItemData,
  ): void => {
    void dispatch(
      updateWorkItem({ id: currentDayWorkItem.id, ...updatedWorkItemFields }),
    );
  };

  const toggleEditWorkItem = (): void =>
    setIsEditingWorkItem(!isEditingWorkItem);

  const parsedDurationToHoursAndMin = parseMinToHoursAndMin(
    currentDayWorkItem.duration,
  );

  return isEditingWorkItem ? (
    <EditingWorkItemForm
      title={currentDayWorkItem.title}
      duration={parsedDurationToHoursAndMin}
      currentDayOrdinalNumber={currentDayOrdinalNumber}
      onUpdateWorkItem={onUpdateWorkItem}
      toggleEditWorkItem={toggleEditWorkItem}
    />
  ) : (
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
            <Typography sx={{ maxWidth: 510, lineBreak: 'anywhere' }}>
              {currentDayWorkItem.title}
            </Typography>
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
        onUpdateWorkItem={onUpdateWorkItem}
        toggleEditWorkItem={toggleEditWorkItem}
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
