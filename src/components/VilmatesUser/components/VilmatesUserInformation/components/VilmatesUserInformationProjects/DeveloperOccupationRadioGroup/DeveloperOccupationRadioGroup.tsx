import { type ChangeEvent, type FC, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Occupation } from 'constants/occupation';
import { styles } from './styles';

interface Props {
  onChange: (newOccupation: boolean) => void;
  isFullTime: boolean;
}

export const DeveloperOccupationRadioGroup: FC<Props> = ({
  onChange,
  isFullTime,
}): JSX.Element => {
  const [value, setValue] = useState<Occupation | string>(() =>
    !isFullTime ? Occupation.PART_TIME : Occupation.FULL_TIME,
  );
  console.log(value);
  console.log(isFullTime);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value === Occupation.FULL_TIME);
    setValue(event.target.value);
  };

  return (
    <RadioGroup
      aria-label='occupation'
      name='occupation'
      value={value}
      onChange={changeHandler}
    >
      <FormControlLabel
        value={Occupation.FULL_TIME}
        control={<Radio />}
        label={Occupation.FULL_TIME}
        sx={styles}
      />
      <FormControlLabel
        value={Occupation.PART_TIME}
        control={<Radio />}
        label={Occupation.PART_TIME}
        sx={styles}
      />
    </RadioGroup>
  );
};
