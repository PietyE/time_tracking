import { type FC, useState, type MouseEvent } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, IconButton, Typography } from '@mui/material';
import Linkify from 'linkify-react';
import { WorkItemActions } from './WorkItemActions';
import { styles } from './styles';

export const TimeReportWorkItemsListItemReportsListItem: FC =
  (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'open-popover' : 'closed-popover';

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
              work item text: google.com
            </Linkify>
          </Grid>
          <Grid
            item
            xs={1.05}
          >
            <Typography variant='h6'>1:00</Typography>
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
