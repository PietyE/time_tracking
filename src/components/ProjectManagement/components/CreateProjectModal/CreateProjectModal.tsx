import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { createNewProject } from 'redux/asyncActions/projectManagement';
import Close from 'shared/components/svg/Close';
import { createProjectSchema } from 'shared/validationSchema';
import { getProjectsWithTotalMinutes } from 'redux/selectors/projectManagement';
import { styles } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Fields {
  name: string;
}

export const CreateProjectModal: FC<Props> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(createProjectSchema),
  });
  const dispatch = useAppDispatch();
  const projects = useAppShallowSelector(getProjectsWithTotalMinutes);

  const onCreateNewProject: SubmitHandler<Fields> = ({ name }): void => {
    const isProjectExist = projects.find((project) => project.name === name);
    if (isProjectExist) {
      toast.error('Project with this name is already exist');
      return;
    }
    void dispatch(createNewProject({ name }));
    resetField('name');
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
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
          py={24}
          px={32}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h5'>New project</Typography>
          <IconButton
            onClick={onClose}
            sx={styles.closeIcon}
          >
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box
          p={32}
          component='form'
          onSubmit={handleSubmit(onCreateNewProject)}
        >
          <Typography
            variant='subtitle1'
            mb={16}
          >
            Project name
          </Typography>
          <Box
            position='relative'
            mb={64}
            sx={{
              '& .MuiFormControl-root .MuiInputBase-root.Mui-error fieldset': {
                borderColor: 'error.main',
              },
            }}
          >
            <TextField
              fullWidth
              placeholder='Project name'
              autoComplete='off'
              label='Enter project name'
              error={!!errors.name?.message}
              {...register('name')}
            />
            <ValidationErrorMessage>
              {errors.name?.message}
            </ValidationErrorMessage>
          </Box>
          <Button
            variant='contained'
            fullWidth
            type='submit'
          >
            Create a new project
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
