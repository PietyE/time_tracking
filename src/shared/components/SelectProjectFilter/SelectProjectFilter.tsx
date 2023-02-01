import { type FC, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type {
  DeveloperProject,
  DeveloperProjects,
} from 'api/models/developerProjects';

interface Props {
  developerProjects: DeveloperProjects;

  onChange: (id: string) => void;

  label?: string;

  selectedProject?: DeveloperProject;
}

export const SelectProjectFilter: FC<Props> = ({
  developerProjects,
  onChange,
  label = 'Select',
  selectedProject,
}): JSX.Element => {
  const [value, setValue] = useState(() => developerProjects[0]);
  const handleChange = (event: SelectChangeEvent): void => {
    setValue(JSON.parse(event.target.value));
    onChange(JSON.parse(event.target.value).id);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={handleChange}
        value={JSON.stringify(
          selectedProject ?? (value || developerProjects[0]),
        )}
        label={label}
        sx={{ py: 10 }}
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
