import { type FC, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type { DeveloperProjects } from 'api/models/developerProjects';

interface SelectFilterProps {
  options: DeveloperProjects;

  selectedProject: string;

  onChange: (id: string) => void;
}

type Props = SelectFilterProps;

export const SelectFilter: FC<Props> = ({
  options,
  selectedProject,
  onChange,
}): JSX.Element => {
  const [value, setValue] = useState(selectedProject);
  const handleChange = (event: SelectChangeEvent): void => {
    setValue(event.target?.value);
    onChange(event.target?.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select your project</InputLabel>
      <Select
        onChange={handleChange}
        value={value}
      >
        {options.map((developerProject) => (
          <MenuItem
            value={developerProject?.project?.id}
            key={developerProject?.project?.id}
          >
            {developerProject?.project?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
