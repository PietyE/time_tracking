import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import { useAppDispatch } from 'hooks/redux';
import { syncWithGoogleSheets } from 'redux/asyncActions/syncWithGoogleSheets';
import { PageHeader } from 'shared/components/PageHeader';
import { SelectMonthMemoized } from 'shared/components/SelectMonth';
import { googleSyncWithDriveSchema } from 'shared/validationSchema';

interface Fields {
  googleSheetLink: string;
}

export const GoogleSyncWithDrive: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(googleSyncWithDriveSchema),
  });

  const onSubmit: SubmitHandler<Fields> = ({ googleSheetLink }): void => {
    void dispatch(
      syncWithGoogleSheets({
        spreadsheet: googleSheetLink,
      }),
    );
    reset({ googleSheetLink: '' });
  };

  const validationMessage = errors?.googleSheetLink?.message;

  return (
    <>
      <PageHeader title='Project report' />
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
            sx={{
              '& .MuiFormControl-root .MuiInputBase-root.Mui-error fieldset': {
                borderColor: 'error.main',
              },
            }}
          >
            <TextField
              fullWidth
              InputProps={{
                startAdornment: <AttachFileRoundedIcon sx={{ mr: 10 }} />,
              }}
              placeholder='Paste link to google sheet'
              variant='outlined'
              label='Link to google sheet'
              {...register('googleSheetLink')}
              error={!!validationMessage}
            />
            {validationMessage && (
              <ValidationErrorMessage>
                {validationMessage}
              </ValidationErrorMessage>
            )}
          </Box>
          <Box maxWidth={120}>
            <Button
              variant='contained'
              startIcon={<CloudSyncRoundedIcon />}
              disabled={!!validationMessage}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
