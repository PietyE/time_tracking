import { type FC } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Content } from './Content';
import { syncWithGoogleSheets } from 'redux/asyncActions/syncWithGoogleSheets';
import Close from 'shared/components/svg/Close';
import { toggleModal } from 'redux/slices/syncWithGoogleSheets';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getSyncWithWithGoogleSheetsIsOpenErrorList } from 'redux/selectors/syncWithGoogleSheets';
import type { Fields } from '../../GoogleSyncWithDrive';
import { styles } from './styles';

// TODO: Refactor structure to 3 components ( modal header , main , footer )
export const GoogleSyncWithDriveModal: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    getSyncWithWithGoogleSheetsIsOpenErrorList,
  );
  const { reset, getValues } = useFormContext<Fields>();

  const { googleSheetLink: spreadsheet } = getValues();
  const handleToggle = (): void => {
    void dispatch(toggleModal());
  };

  const onSyncAgain = (): void => {
    dispatch(toggleModal());
    reset({ googleSheetLink: '' });
    void dispatch(syncWithGoogleSheets({ spreadsheet }));
  };

  const onForcePush = (): void => {
    dispatch(toggleModal());
    void dispatch(syncWithGoogleSheets({ is_agree: true, spreadsheet }));
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleToggle}
    >
      <Box
        position='absolute'
        top='50%'
        left='50%'
        width={630}
        boxShadow={1}
        border={1}
        borderColor='text.disabled'
        borderRadius={5}
        bgcolor='common.white'
        sx={styles.modalContainer}
      >
        <Box
          p={36}
          pb={0}
        >
          <Box mb={16}>
            <Typography
              variant='h6'
              component='p'
              mb={20}
            >
              Please correct the difference of users names
            </Typography>
            <Divider variant='fullWidth' />
            <IconButton
              onClick={handleToggle}
              sx={styles.closeButton}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            maxHeight={500}
            py={10}
            px={35}
            mb={30}
            overflow='auto'
            sx={styles.modalContentContainer}
          >
            <Content />
          </Box>
          <Box
            my={-1}
            mx={-36}
          >
            <ButtonGroup
              fullWidth
              variant='contained'
              sx={styles.buttonGroup}
            >
              <Button onClick={onForcePush}>Force Push</Button>
              <Button
                fullWidth
                onClick={onSyncAgain}
              >
                Sync again
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
