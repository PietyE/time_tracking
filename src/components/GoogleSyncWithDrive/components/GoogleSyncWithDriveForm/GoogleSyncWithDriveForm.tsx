import { type FC } from 'react';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { type SubmitHandler, useFormContext } from 'react-hook-form';
import { styles } from '../../styles';
import { useAppDispatch } from 'hooks/redux';
import { syncWithGoogleSheets } from 'redux/asyncActions/syncWithGoogleSheets';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import type { Fields } from '../../GoogleSyncWithDrive';

export const GoogleSyncWithDriveForm: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<Fields>();

  const onSubmit: SubmitHandler<Fields> = ({ googleSheetLink }): void => {
    void dispatch(
      syncWithGoogleSheets({
        spreadsheet: googleSheetLink,
      }),
    );
  };

  const validationMessage = errors?.googleSheetLink?.message;

  return (
    <Box
      maxWidth={760}
      bgcolor='common.white'
      border={1}
      borderColor='text.disabled'
      borderRadius={2.5}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box p={15}>
        <Typography variant='h5'>Sync with Drive</Typography>
      </Box>
      <Divider />
      <Stack
        p={15}
        justifyContent='flex-start'
      >
        <Box
          mb={25}
          maxWidth={250}
        >
          <SelectMonthMemoized initialYear={2015} />
        </Box>
        <Box
          mb={validationMessage ? 30 : 15}
          maxWidth={1}
          position='relative'
          sx={styles.inputContainer}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: <AttachFileRoundedIcon sx={styles.inputIcon} />,
            }}
            placeholder='Paste link to google sheet'
            variant='outlined'
            label='Link to google sheet'
            {...register('googleSheetLink')}
            error={!!validationMessage}
          />
          {validationMessage && (
            <ValidationErrorMessage>{validationMessage}</ValidationErrorMessage>
          )}
        </Box>
        <Box maxWidth={120}>
          <Button
            variant='contained'
            startIcon={<CloudSyncRoundedIcon />}
            disabled={!!validationMessage}
            type='submit'
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
