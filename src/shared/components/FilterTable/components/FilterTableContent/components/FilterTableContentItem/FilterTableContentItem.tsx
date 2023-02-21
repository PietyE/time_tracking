import { type FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import get from 'lodash/get';
import { FilterTableContentDropDownItem } from '../FilterTableContentDropDownItem';
import { parseMinToHoursAndMin } from 'shared/utils/dateOperations';
import Clock from 'shared/components/svg/mainMenu/Clock';
import { styles } from './styles';

interface Props {
  row: object;
  isHaveDropDown: boolean;
  keyToName: string[];
  keyToMail: string[];
  keyToTime: string[];
  keyToId: string[];
  keyToDropDownValues: string[];
  keyToDropDownValueId: string[];
  keyToDropDownValueName: string[];
  keyToDropDownValueTime: string[];
}

export const FilterTableContentItem: FC<Props> = ({
  row,
  isHaveDropDown,
  keyToName,
  keyToId,
  keyToMail,
  keyToTime,
  keyToDropDownValues,
  keyToDropDownValueId,
  keyToDropDownValueName,
  keyToDropDownValueTime,
}): JSX.Element => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  const toggleDropDown = (): void => setIsOpenDropDown(!isOpenDropDown);

  const renderDeveloperProjectList = (): JSX.Element => (
    <Typography
      noWrap
      textAlign='left'
      width={450}
    >
      {get(row, keyToDropDownValues).map((dropDownValue: any) =>
        get(dropDownValue, keyToDropDownValueName),
      )}
    </Typography>
  );

  // row item is different in both UI so this realization the fastest, but to think about some other dynamic rendering
  // Table header is example
  const renderRow = (): JSX.Element =>
    isHaveDropDown ? (
      <>
        <Grid
          item
          xs={3.5}
        >
          <Box
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            sx={styles}
          >
            <Clock />
            <Stack>
              <Typography>{get(row, keyToName)}</Typography>
              <Typography
                maxWidth={150}
                noWrap
              >
                {get(row, keyToMail)}
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={6.5}
        >
          {renderDeveloperProjectList()}
        </Grid>
        <Grid
          item
          xs={1.7}
        >
          <Typography>
            {get(row, keyToTime)
              ? parseMinToHoursAndMin(get(row, keyToTime))
              : '0:00'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={0.3}
        >
          <IconButton onClick={toggleDropDown}>
            <KeyboardArrowDownIcon
              transform={isOpenDropDown ? 'rotate(180)' : 'rotate(0)'}
            />
          </IconButton>
        </Grid>
      </>
    ) : (
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        py={10}
      >
        <Grid item>
          <Typography variant='subtitle1'>{get(row, keyToName)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            {get(row, keyToTime)
              ? parseMinToHoursAndMin(get(row, keyToTime))
              : '0:00'}
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <Stack
      key={get(row, keyToId)}
      width={1}
    >
      <Grid
        item
        py={15}
        px={30}
        bgcolor='common.white'
        border={1}
        borderRadius={1.5}
        borderColor={isOpenDropDown ? 'primary.main' : 'text.disabled'}
        mb={15}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='flex-start'
        >
          {renderRow()}
        </Grid>
      </Grid>
      {isHaveDropDown &&
        isOpenDropDown &&
        get(row, keyToDropDownValues)?.length && (
          <Box
            borderRadius={1.5}
            bgcolor='background.grey'
            position='relative'
            top={-15}
            border={1}
            borderColor={isOpenDropDown ? 'primary.main' : 'text.disabled'}
          >
            {get(row, keyToDropDownValues).map((dropDownValue: object) => (
              <FilterTableContentDropDownItem
                key={get(dropDownValue, keyToDropDownValueId)}
                dropDownValue={dropDownValue}
                keyToDropDownValueId={keyToDropDownValueId}
                keyToDropDownValueTime={keyToDropDownValueTime}
                keyToDropDownValueName={keyToDropDownValueName}
              />
            ))}
          </Box>
        )}
    </Stack>
  );
};
