import { type FC, type SyntheticEvent, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Autocomplete, Box, TextField } from '@mui/material';
import { getDeveloperProjectId, getTwoArraysDifference } from './helpers';
import { DeveloperOccupationRadioGroup } from '../../DeveloperOccupationRadioGroup';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { updateDeveloperProject } from 'redux/asyncActions/developerProjects';
import { getProjects } from 'redux/asyncActions/projects';
import { addDeveloperToProject } from 'redux/asyncActions/vilmateSinglePage';
import { getProjects as getProjectsSelector } from 'redux/selectors/projects';
import Loading from 'shared/components/Loading';
import type { Project } from 'api/models/projects';
import type {
  CreateListData,
  DeveloperProjects,
} from 'api/models/developerProjects';
import { styles } from './styles';

interface Props3 {
  userId: string;
  hideForm: () => void;
  developerProjects: DeveloperProjects;
}

// TODO: refactor

export const CreateProjectListItemForm: FC<Props3> = ({
  userId,
  hideForm,
  developerProjects,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const projects = useAppShallowSelector(getProjectsSelector);
  const filteredProjects = getTwoArraysDifference(projects, developerProjects);

  const [selectedProject, setSelectedProject] = useState<Project>(
    {} as Project,
  );
  const [isFullTime, setIsFullTime] = useState(true);

  const onSelect = (_event: SyntheticEvent, value: Project): void => {
    setSelectedProject(value);
  };

  useEffect(() => {
    void dispatch(getProjects());
  }, [dispatch]);

  const payload: CreateListData = {
    project: selectedProject?.id,
    users: [
      {
        user_id: userId,
        is_full_time: isFullTime,
        is_project_manager: false,
        is_active: true,
      },
    ],
  };

  const setDeveloperProjectHandler = (): void => {
    hideForm();
    const developerProjectId = getDeveloperProjectId(
      selectedProject,
      developerProjects,
    );
    const functionToDispatch = developerProjectId
      ? updateDeveloperProject({
          developerProjectId,
          updatedData: { is_full_time: isFullTime, is_active: true },
        })
      : addDeveloperToProject(payload);

    // @ts-expect-error
    void dispatch(functionToDispatch);
  };

  useEffect(() => {
    if (!isEmpty(selectedProject)) {
      setDeveloperProjectHandler();
    }
  }, [selectedProject]);

  if (!filteredProjects || !filteredProjects.length) {
    return <Loading />;
  }

  return (
    <Box
      p={24}
      mt={4}
      width={1}
      border={1}
      borderColor='primary.main'
      borderRadius={1.5}
    >
      <Autocomplete
        placeholder='Select project'
        options={filteredProjects}
        value={isEmpty(selectedProject) ? filteredProjects[0] : selectedProject}
        // @ts-expect-error
        onChange={onSelect}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          // @ts-expect-error
          <TextField
            {...params}
            label={'Select project'}
            InputProps={{ ...params.InputProps }}
            variant='outlined'
            sx={styles.addDeveloperToProjectFormInput}
          />
        )}
      />
      <Box
        width={1}
        pt={16}
        display='flex'
        justifyContent='flex-end'
        color='customGrey.STROKE_OPACITY_40'
      >
        <DeveloperOccupationRadioGroup
          isFullTime={isFullTime}
          onChange={setIsFullTime}
        />
      </Box>
    </Box>
  );
};
