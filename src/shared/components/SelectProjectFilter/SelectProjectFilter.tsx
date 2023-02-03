import { type FC, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type Theme,
} from '@mui/material';
import type {
  DeveloperProject,
  DeveloperProjects,
} from 'api/models/developerProjects';

interface Props {
  developerProjects: DeveloperProjects;

  onChange: (developerProject: DeveloperProject) => void;

  label?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  menuPaper: {
    maxHeight: theme.typography.pxToRem(150),
    maxWidth: theme.typography.pxToRem(200),
  },
}));

export const SelectProjectFilter: FC<Props> = ({
  developerProjects,
  onChange,
  label = 'Select',
}): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState<DeveloperProject>(developerProjects[0]);

  useEffect(() => {
    onChange(developerProjects[0]);
  }, []);
  const handleChange = (event: SelectChangeEvent): void => {
    setValue(JSON.parse(event.target.value));
    onChange(JSON.parse(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={handleChange}
        value={JSON.stringify(value || developerProjects[0])}
        label={label}
        sx={{ py: 10 }}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        {developerProjects.map((developerProject) => (
          <MenuItem
            value={JSON.stringify(developerProject)}
            key={developerProject?.id}
          >
            {developerProject?.project?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
