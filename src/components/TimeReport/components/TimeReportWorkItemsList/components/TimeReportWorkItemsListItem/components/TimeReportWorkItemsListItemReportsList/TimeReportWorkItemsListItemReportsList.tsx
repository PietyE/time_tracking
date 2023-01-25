import { type FC } from 'react';
import Linkify from 'linkify-react';
import { Stack, Grid, IconButton, Typography, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MockItem {
  text: string;
  time: string;

  id: number;
}

const workItems: MockItem[] = [
  {
    text: 'Text',
    time: '1:00',

    id: 124,
  },
  {
    text: 'Text',
    time: '2:00',

    id: 123,
  },
  {
    text: 'Text',
    time: '3:00',

    id: 125,
  },
];

export const TimeReportWorkItemsListItemReportsList: FC = (): JSX.Element => (
  <Stack>
    {!!workItems.length &&
      workItems.map((workItem) => (
        <Grid
          container
          alignItems='center'
          justifyContent='flex-end'
          py={16}
          px={30}
          key={workItem.id}
        >
          <Grid
            item
            xs={7.3}
            sx={{
              '& a': {
                color: 'text.link',
              },
            }}
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
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    {!!workItems.length && <Divider />}
    {!!workItems.length && (
      <Grid
        container
        alignItems='center'
        justifyContent='flex-end'
        py={16}
        px={30}
      >
        <Grid
          item
          mr={85}
        >
          <Typography variant='subtitle1'>1:00</Typography>
        </Grid>
      </Grid>
    )}
  </Stack>
);
