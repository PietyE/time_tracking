import { type FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';
import { CreateProjectListItemForm } from './CreateProjectListItemForm';
import type { DeveloperProjects } from 'api/models/developerProjects';

interface Props {
  hideFormHandler: () => void;
  userId: string;
  developerProjects: DeveloperProjects;
}

export const VilmatesUserInformationProjectsForm: FC<Props> = ({
  developerProjects,
  hideFormHandler,
  userId,
}): JSX.Element => (
  <Stack
    display='flex'
    alignItems='flex-end'
    mt={16}
    px={20}
  >
    <IconButton
      disableRipple
      onClick={hideFormHandler}
    >
      <CloseIcon />
    </IconButton>
    <CreateProjectListItemForm
      userId={userId}
      hideForm={hideFormHandler}
      developerProjects={developerProjects}
    />
  </Stack>
);
