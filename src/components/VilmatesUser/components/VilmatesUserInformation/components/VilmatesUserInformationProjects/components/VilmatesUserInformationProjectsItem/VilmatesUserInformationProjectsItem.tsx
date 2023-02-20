import { type FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import { useProjectSection } from './helpers';
import { DeveloperOccupationRadioGroup } from '../../DeveloperOccupationRadioGroup';
import { DeveloperProjectsPermissions } from 'constants/permissions';
import { useAppShallowSelector } from 'hooks/redux';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';
import { styles } from './styles';

interface Props {
  projectName: string;
  isFullTime: boolean;
  owner: string;

  developerProjectId: string;

  onDelete: (developerProjectId: string) => void;

  onChangeOccupation: (developerProjectId: string, ifFullTime: boolean) => void;
}

// TODO: refactor in future
export const VilmatesUserInformationProjectsItem: FC<Props> = (
  props,
): JSX.Element => {
  const {
    projectName,
    developerProjectId,
    isFullTime: _isFullTime,
    owner,
    onChangeOccupation,
    onDelete,
  } = props;

  const {
    isDeleteButtonDisabled,
    occupationLabel,
    isOccupationHovered,
    hoverOccupationHandler,
    blurOccupationHandler,
    isFullTime,
    setIsFullTime,
    setIsDeleteButtonDisabled,
  } = useProjectSection(_isFullTime);
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);

  const ownerLabel: string = owner || 'No owner';

  const occupationChangeHandler = (newOccupation: boolean): void => {
    setIsFullTime(newOccupation);
    onChangeOccupation(developerProjectId, newOccupation);
  };

  const deleteProjectHandler = (): void => {
    setIsDeleteButtonDisabled(true);
    onDelete(developerProjectId);
  };
  return (
    <ListItem sx={styles.listItem}>
      <Box
        display='flex'
        justifyContent='space-between'
        width={1}
        pb={16}
        sx={styles.container}
      >
        <Typography
          flexBasis='80%'
          variant='subtitle1'
          color='primary.main'
          maxWidth={150}
          sx={styles.title}
        >
          {projectName}
        </Typography>
        {permissions?.includes(
          DeveloperProjectsPermissions.projects_change_developerproject,
        ) &&
          owner && (
            <Box
              flexBasis='10%'
              display='flex'
              justifyContent='flex-end'
              alignItems='flex-start'
            >
              <IconButton
                color='primary'
                onClick={deleteProjectHandler}
                disabled={isDeleteButtonDisabled}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        width={1}
        pb={16}
        sx={styles.projectsContainer}
      >
        <Typography variant='body1'>{ownerLabel}</Typography>
        {permissions?.includes(
          DeveloperProjectsPermissions.projects_change_developerproject,
        ) &&
          owner && (
            <Box
              onMouseEnter={hoverOccupationHandler}
              onMouseLeave={blurOccupationHandler}
              display='flex'
              alignItems='center'
              justifyContent='flex-end'
              pb={18}
              sx={styles.projectsContainer}
            >
              {isOccupationHovered ? (
                <DeveloperOccupationRadioGroup
                  onChange={occupationChangeHandler}
                  isFullTime={isFullTime}
                />
              ) : (
                <Typography variant='body1'>{occupationLabel}</Typography>
              )}
            </Box>
          )}
      </Box>
    </ListItem>
  );
};
