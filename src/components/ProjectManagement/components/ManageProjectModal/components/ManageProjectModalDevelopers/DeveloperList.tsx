import { type ChangeEvent, type FC, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { Form } from 'react-router-dom';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { addDevelopersToProject } from 'redux/asyncActions/projectManagement';
import {
  getManageModalProjectInfo,
  getUserNotInTheProject,
} from 'redux/selectors/projectManagement';
import SearchIcon from 'shared/components/svg/SearchIcon';
import type { User, Users } from 'api/models/users';
import type { User as DevUser } from 'api/models/developerProjects';

interface Props {
  handleClose: VoidFunction;
}

export const DeveloperList: FC<Props> = ({ handleClose }): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const usersToAdd = useAppShallowSelector(getUserNotInTheProject);
  const [checked, setChecked] = useState<Users>([]);
  const dispatch = useAppDispatch();
  const { id } = useAppShallowSelector(getManageModalProjectInfo);

  const filterProjects = useMemo(
    () =>
      usersToAdd.filter((user) =>
        user.name
          .trim()
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase()),
      ),
    [searchValue],
  );
  const handleToggle = (value: Omit<User, 'permissions'>) => () => {
    const currentIndex = checked.findIndex((user) => user.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addDevelopers = (): void => {
    const addUsersPayload = checked.reduce(
      (users: Array<Partial<DevUser>>, nextU) => [
        ...users,
        { user_id: nextU.id, is_full_time: true, is_project_manager: false },
      ],
      [],
    );
    void dispatch(
      addDevelopersToProject({ project: id, users: addUsersPayload }),
    );
    handleClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setSearchValue(event.target.value);

  return (
    <Box
      position='absolute'
      bottom={0}
      left={0}
      p={16}
      border={1}
      borderColor='customGrey.STROKE_OPACITY_40'
      borderRadius={2}
      height={370}
      bgcolor='common.white'
      sx={{
        transform: 'translateX(-105%)',
      }}
    >
      <TextField
        value={searchValue}
        onChange={handleChange}
        placeholder='Search by name'
        sx={{
          mb: 15,
          '& svg': {
            mr: 10,
          },
        }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Form>
        <Box
          height={220}
          width={260}
          mb={10}
          sx={{ overflowY: 'auto' }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 260,
              bgcolor: 'background.paper',
            }}
          >
            {filterProjects.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;
              return (
                <ListItem
                  key={value.id}
                  disablePadding
                >
                  <ListItemButton
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <Checkbox
                        edge='start'
                        checked={checked.includes(value)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value.name}
                      primaryTypographyProps={{
                        noWrap: true,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider sx={{ mb: 10 }} />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Button
            variant='contained'
            onClick={addDevelopers}
          >
            Add selected
          </Button>
          <Button
            variant='outlined'
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
