import { type FC } from 'react';
import { Box, List, Typography } from '@mui/material';
import { renderUsersAndSortByName } from '../../helpers';
import { getSyncWithWithGoogleSheetsUsers } from 'redux/selectors/syncWithGoogleSheets';
import { useAppShallowSelector } from 'hooks/redux';
import { styles } from './styles';

export const Content: FC = (): JSX.Element => {
  const { in_db: fromDb, in_sheet: fromSheet } = useAppShallowSelector(
    getSyncWithWithGoogleSheetsUsers,
  );
  const usersAmount = (users: string[]): string =>
    users.length ? `(${users.length})` : '';

  return (
    <Box
      display='flex'
      justifyContent='space-between'
    >
      <List
        sx={{
          maxWidth: 434 / 2,
        }}
      >
        <Typography
          mb={24}
          fontWeight='fontWeightSemiBold'
          variant='h6'
          component='p'
        >
          Database {usersAmount(fromDb)}
        </Typography>
        {renderUsersAndSortByName(fromDb)}
      </List>
      <List sx={styles.usersGoogleSheetList}>
        <Typography
          mb={24}
          fontWeight='fontWeightSemiBold'
          variant='h6'
          component='p'
          gutterBottom
          maxWidth={200}
        >
          Google Sheet {usersAmount(fromSheet)}
        </Typography>
        {renderUsersAndSortByName(fromSheet)}
      </List>
    </Box>
  );
};
