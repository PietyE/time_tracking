import { type ChangeEvent, type FC, useState } from 'react';
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAppShallowSelector } from 'hooks/redux';
import { getUsers } from 'redux/selectors/users';
import {
  createSortingNames,
  isEqual,
} from 'shared/components/Autocomplete/helpers';
import type { User } from 'api/models/users';

interface Fields {
  projectName: string;
  projectDescription: string;
}

// Make fields as object and general in the future
export const ManageProjectModalGeneralInformation: FC = (): JSX.Element => {
  const { control } = useForm<Fields>();
  const users = useAppShallowSelector(getUsers);
  const [user, setUser] = useState<Omit<User, 'permissions'>>(users[0]);

  const handleChange = (
    _event: ChangeEvent<{}>,
    newUser: Omit<User, 'permissions'> | null,
  ): void => {
    if (newUser) {
      setUser(newUser);
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
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={(_e) => {
                  console.log(_e);
                  field.onBlur();
                  console.log(field);
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
        <Typography flex='0 0 58%'>130h</Typography>
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
            rows={4}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={(_e) => {
              console.log(_e);
              field.onBlur();
              console.log(field);
            }}
          />
        )}
      />
    </Box>
  );
};
