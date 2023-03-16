import { type ChangeEvent, type FC, useState } from 'react';
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { updateProject } from 'redux/asyncActions/projectManagement';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { getUsers } from 'redux/selectors/users';
import {
  createSortingNames,
  isEqual,
} from 'shared/components/Autocomplete/helpers';
import { getManageModalProject } from 'redux/selectors/projectManagement';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import type { CreateProjectData } from 'api/models/projects';
import type { User } from 'api/models/users';

interface Fields {
  projectName: string;

  projectDescription: string;
}

// Make fields as object and general in the future
export const ManageProjectModalGeneralInformation: FC = (): JSX.Element => {
  const projectData = useAppShallowSelector(getManageModalProject);
  const { control } = useForm<Fields>({
    defaultValues: {
      projectName: projectData.projectInfo?.name,
      projectDescription: projectData.projectInfo?.description,
    },
  });
  const users = useAppShallowSelector(getUsers);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<Omit<User, 'permissions'> | Owner>(
    projectData.projectInfo?.owner || {
      id: 'No Owner',
      name: 'No Owner',
      email: 'No Owner',
    },
  );

  const totalMinutesOnProject = projectData.reports?.reduce(
    (acc, nextProject) => acc + nextProject?.total_minutes,
    0,
  );

  const handleUpdateName = (updatedProject: CreateProjectData): void => {
    void dispatch(
      updateProject({ id: projectData.projectInfo.id, updatedProject }),
    );
  };

  const handleUpdateDescription = (updatedProject: CreateProjectData): void => {
    void dispatch(
      updateProject({ id: projectData.projectInfo.id, updatedProject }),
    );
  };

  const handleChange = (
    _event: ChangeEvent<{}>,
    newUser: Omit<User, 'permissions'> | null | Owner,
  ): void => {
    if (newUser) {
      setUser(newUser);
      void dispatch(
        updateProject({
          id: projectData.projectInfo.id,
          updatedProject: { owner_id: newUser.id },
        }),
      );
    }
  };

  return (
    <Box
      py={32}
      px={26}
      mb={32}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={8}
      >
        <Typography variant='subtitle2'>PROJECT NAME</Typography>
        <Box width={280}>
          <Controller
            name='projectName'
            control={control}
            render={({ field }) => (
              <TextField
                label='Enter project name'
                placeholder='Project name'
                value={field.value}
                fullWidth
                disabled={projectData.projectInfo.is_archived}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={(_e) => {
                  handleUpdateName({ name: field.value });
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Divider
        sx={{
          mb: 8,
          mr: -25,
        }}
      />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={8}
      >
        <Typography variant='subtitle2'>PROJECT OWNER</Typography>
        <Box width={280}>
          <Autocomplete
            options={users}
            value={user}
            onChange={handleChange}
            clearOnEscape
            fullWidth
            autoComplete
            autoHighlight
            disablePortal
            blurOnSelect
            disabled={projectData.projectInfo.is_archived}
            disableClearable
            isOptionEqualToValue={(option, value) =>
              isEqual(option, value, ['id'])
            }
            getOptionLabel={(users) => users.name}
            // @ts-expect-error
            filterOptions={(options, state) =>
              createSortingNames(options, state, ['name'], false)
            }
            renderInput={(params) => (
              // @ts-expect-error
              <TextField
                {...params}
                label='Choose project owner'
                variant='outlined'
                disabled={projectData.projectInfo.is_archived}
              />
            )}
          />
        </Box>
      </Box>
      <Divider
        sx={{
          mb: 8,
          mr: -25,
        }}
      />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={16}
      >
        <Typography variant='subtitle2'>HOURS WORKED</Typography>
        <Typography flex='0 0 58%'>
          {parseMinToHoursAndMin(totalMinutesOnProject)}
        </Typography>
      </Box>
      <Controller
        name='projectDescription'
        control={control}
        render={({ field }) => (
          <TextField
            multiline
            placeholder='Project description'
            label='Enter description'
            fullWidth
            disabled={projectData.projectInfo.is_archived}
            rows={4}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={(_e) => {
              handleUpdateDescription({ description: field.value });
            }}
          />
        )}
      />
    </Box>
  );
};
