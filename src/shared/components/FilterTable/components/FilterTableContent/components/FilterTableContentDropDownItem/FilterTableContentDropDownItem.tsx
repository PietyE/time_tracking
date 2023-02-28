import { type FC } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import get from 'lodash/get';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import { styles } from './styles';

interface Props {
  keyToDropDownValueId: string[];
  keyToDropDownValueName: string[];
  keyToDropDownValueTime: string[];
  keyToRate: string[];

  dropDownValue: object;
}

export const FilterTableContentDropDownItem: FC<Props> = ({
  dropDownValue,
  keyToDropDownValueId,
  keyToDropDownValueTime,
  keyToDropDownValueName,
  keyToRate,
}): JSX.Element => {
  const isFullTime = get(dropDownValue, keyToRate);
  return (
    <>
      <Grid
        item
        key={get(dropDownValue, keyToDropDownValueId)}
        py={15}
        px={30}
        zIndex={2}
        sx={styles}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='flex-end'
        >
          <Grid
            item
            xs={3.5}
          />
          <Grid
            item
            xs={5}
          >
            <Typography textAlign='left'>
              {get(dropDownValue, keyToDropDownValueName)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3.5}
          >
            <Typography textAlign='center'>
              {isFullTime
                ? 'Salary'
                : parseMinToHoursAndMin(
                    get(dropDownValue, keyToDropDownValueTime),
                  )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider flexItem />
    </>
  );
};
