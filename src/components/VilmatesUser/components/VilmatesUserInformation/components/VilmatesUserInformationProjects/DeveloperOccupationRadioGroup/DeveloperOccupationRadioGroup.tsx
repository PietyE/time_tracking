import { type ChangeEvent, type FC, useMemo } from 'react';
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
  const occupationValue = useMemo(
    () => (!isFullTime ? Occupation.PART_TIME : Occupation.FULL_TIME),
    [isFullTime],
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value === Occupation.FULL_TIME);
  };

  return (
    <RadioGroup
      aria-label='occupation'
      name='occupation'
      value={occupationValue}
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
