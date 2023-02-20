import { type FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, List, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { VilmatesUserInformationProjectsForm } from './components/VilmatesUserInformationProjectsForm';
import { VilmatesUserInformationProjectsItem } from './components/VilmatesUserInformationProjectsItem';
import { DeveloperProjectsPermissions } from 'constants/permissions';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import {
  deleteDeveloperProject,
  updateDeveloperProject,
} from 'redux/asyncActions/developerProjects';
import { getSelectedDeveloperProjects } from 'redux/asyncActions/vilmateSinglePage';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';
import { getDeveloperProjectsVilmateSinglePage as getDeveloperProjectsVilmateSinglePageSelector } from 'redux/selectors/vilmateSinglePage';
import { SizingContainer } from 'shared/UI/SizingContainer';
import { styles } from './styles';

interface MyParams {
  id: string;
}

export const VilmatesUserInformationProjects: FC = (): JSX.Element => {
  const developerProjects = useAppShallowSelector(
    getDeveloperProjectsVilmateSinglePageSelector,
  );
  const dispatch = useAppDispatch();
  const [isFormShown, setIsFormShown] = useState<boolean>(false);
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);
  const { id: userId } = useParams<keyof MyParams>() as MyParams;

  useEffect(() => {
    if (userId) void dispatch(getSelectedDeveloperProjects(userId));
  }, [userId, dispatch]);

  const hideFormHandler = (): void => {
    setIsFormShown(false);
  };

  const showFormHandler = (): void => {
    setIsFormShown(true);
  };

  const onChangeOccupation = (
    developerProjectId: string,
    isFullTime: boolean,
  ): void => {
    void dispatch(
      updateDeveloperProject({
        developerProjectId,
        updatedData: { is_full_time: isFullTime },
      }),
    );
  };

  const deleteUserFromDeveloperProject = (developerProjectId: string): void => {
    void dispatch(deleteDeveloperProject(developerProjectId));
  };

  return (
    <SizingContainer size='small'>
      <Stack
        component='section'
        bgcolor='common.white'
        py={24}
        border={1}
        borderColor='customGrey.STROKE_OPACITY_40'
        borderRadius={1.5}
        boxShadow={1}
      >
        <Typography
          variant='h6'
          pb={16}
          pl={20}
        >
          Works on
        </Typography>
        <Divider />
        <List sx={styles}>
          {developerProjects.length ? (
            developerProjects
              .filter((developerProject) => developerProject.is_active)
              .map((developerProject) => (
                <VilmatesUserInformationProjectsItem
                  key={developerProject.id}
                  projectName={developerProject?.project?.name}
                  isFullTime={developerProject?.is_full_time}
                  owner={
                    developerProject?.project?.owner?.name ||
                    developerProject?.project?.owner?.email
                  }
                  developerProjectId={developerProject.id}
                  onChangeOccupation={onChangeOccupation}
                  onDelete={deleteUserFromDeveloperProject}
                />
              ))
          ) : (
            <Typography variant='subtitle1'>No projects</Typography>
          )}
        </List>
        {isFormShown && (
          <VilmatesUserInformationProjectsForm
            hideFormHandler={hideFormHandler}
            userId={userId}
            developerProjects={developerProjects}
          />
        )}
        {permissions?.includes(
          DeveloperProjectsPermissions.projects_add_developerproject,
        ) && (
          <Box
            mt={24}
            p={20}
            pb={0}
            border={1}
            borderColor='customGrey.STROKE_OPACITY_40'
          >
            <Button
              variant='contained'
              fullWidth
              startIcon={<AddIcon />}
              disabled={isFormShown}
              onClick={showFormHandler}
            >
              Assign to project
            </Button>
          </Box>
        )}
      </Stack>
    </SizingContainer>
  );
};
