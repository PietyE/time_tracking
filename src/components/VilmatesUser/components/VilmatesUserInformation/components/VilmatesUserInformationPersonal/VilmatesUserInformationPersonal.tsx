import React, {
  type FC,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { format, toDate } from 'date-fns';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Edit, Save, Close } from '@mui/icons-material';
import { usePrevious } from '../../../../../../hooks/usePrevious';
import { getIsLoadingVilmateSinglePage } from '../../../../../../redux/selectors/vilmateSinglePage';
import { SkeletonWrapper } from '../../../../../../shared/components/SkeletonWrapper';
import {
  type InputField,
  type Keys,
  type UserField,
  toCorrectFormCase,
} from '../../helpers';
import { RightSessionContainer } from '../RightSessionContainer';
import { getVilmateUsers as getVilmateUsersSelector } from 'redux/selectors/vilmates';
import { getVilmatesUsers } from 'redux/asyncActions/vilmates';
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowSelector,
} from 'hooks/redux';
import { UsersPermissions } from 'constants/permissions';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';
import { DateCustomInput } from 'shared/components/DateCustomInput';
import type { CreateUserData, User } from 'api/models/users';
import { _styles } from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './VilmatesUserInformationPersonal.module.scss';
interface Props {
  fields: InputField;
  actualPersonalInformation: UserField[];
  editingState: Record<Keys, boolean>;
  setIsEditingState: React.Dispatch<
    React.SetStateAction<Record<keyof InputField, boolean>>
  >;
  updateUserPersonalInformation: (userInfo: Partial<CreateUserData>) => void;
  errorsState: Record<Keys, boolean>;
  setErrorState: React.Dispatch<
    React.SetStateAction<Record<keyof InputField, boolean>>
  >;
}
export const VilmatesUserInformationPersonal: FC<Props> = ({
  fields,
  actualPersonalInformation,
  editingState,
  setIsEditingState,
  updateUserPersonalInformation,
  errorsState,
  setErrorState,
}): JSX.Element => {
  const { register, getValues, setValue } = useForm<InputField>({
    defaultValues: fields,
  });
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);
  const users = useAppShallowSelector(getVilmateUsersSelector);
  const isLoading = useAppSelector(getIsLoadingVilmateSinglePage);
  const dispatch = useAppDispatch();
  const [valueAutocomplete, setAutocompleteValue] = useState<
    Omit<User, 'permissions'>
  >(() => users[0]);
  const [autCompleteInput, setAutCompleteInput] = useState<string>('');
  const previousUser =
    usePrevious<Omit<User, 'permissions'>>(valueAutocomplete);

  const handleSave = (correctField: Keys): void => {
    if (!valueAutocomplete?.id) {
      if (previousUser) {
        onEndEdit(correctField);
        setAutocompleteValue(previousUser);
      }
      toast.warning('Field can not be empty');
      return;
    }
    onEndEdit(correctField);
    updateUserPersonalInformation({
      [correctField]: valueAutocomplete.id,
    });
  };

  const onSelect = (
    _event: SyntheticEvent,
    value: Omit<User, 'permissions'>,
  ): void => {
    setAutocompleteValue(value);
  };

  useEffect(() => {
    if (users.length) return;
    void dispatch(getVilmatesUsers());
  }, []);

  const canEditInfo = permissions?.includes(UsersPermissions.users_change_user);

  const onStartEdit = (correctField: Keys): void =>
    setIsEditingState({ ...editingState, [correctField]: true });

  const onEndEdit = (correctField: Keys): void =>
    setIsEditingState({ ...editingState, [correctField]: false });

  const onSave = (
    correctField: Keys,
    validationRule: RegExp,
    message: string,
  ): void => {
    const value = getValues(correctField);
    if (!validationRule.test(value)) {
      setValue(correctField, fields[correctField]);
      setErrorState({ ...errorsState, [correctField]: true });
      toast.warning(message);
      return;
    }
    if (value !== fields[correctField] || errorsState[correctField]) {
      setErrorState({ ...errorsState, [correctField]: false });
      updateUserPersonalInformation({
        [correctField]: value,
      });
    }
  };

  const onClose = (_event: SyntheticEvent, correctField: Keys): void => {
    setValue(correctField, fields[correctField]);
    onEndEdit(correctField);
  };

  const renderListItems = actualPersonalInformation?.map((information) => {
    const correctField = toCorrectFormCase<Keys>(information.title);
    const type = information.type;

    const renderItem = (): JSX.Element => {
      if (type === 'autocomplete')
        return (
          <SkeletonWrapper isLoading={isLoading}>
            {!!users.length && (
              <Autocomplete
                placeholder='Select project'
                options={users}
                value={valueAutocomplete || users[0]}
                inputValue={autCompleteInput}
                onInputChange={(_, newValue) => {
                  setAutCompleteInput(newValue);
                }}
                // @ts-expect-error
                onChange={onSelect}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  // @ts-expect-error
                  <TextField
                    {...params}
                    label={information.title}
                    InputProps={{ ...params.InputProps }}
                    variant='outlined'
                  />
                )}
                onBlur={(event) => {
                  if (
                    event?.relatedTarget?.id === `button-close-${correctField}`
                  ) {
                    onClose(event, correctField);
                    return;
                  }
                  handleSave(correctField);
                  onEndEdit(correctField);
                }}
                onFocus={() => onStartEdit(correctField)}
              />
            )}
          </SkeletonWrapper>
        );
      if (type === 'calendar')
        return (
          <DatePicker
            dateFormat='yyyy-MM-dd'
            disabled={!canEditInfo}
            selected={new Date(getValues(correctField))}
            maxDate={toDate(new Date())}
            // @ts-expect-error
            onChange={(date: number | Date) => {
              setValue(correctField, format(date, 'yyyy-MM-dd'));
            }}
            onCalendarClose={() =>
              onSave(
                correctField,
                information?.validationRule,
                information?.message,
              )
            }
            customInput={
              <DateCustomInput
                variant='outlined'
                label={information.title}
                disabled={canEditInfo}
              />
            }
          />
        );
      else
        return (
          <TextField
            variant='outlined'
            className={styles.information_textField}
            {...register(correctField)}
            onFocus={() => onStartEdit(correctField)}
            error={errorsState[correctField]}
            disabled={!canEditInfo}
            autoComplete='off'
            label={information.title}
            onBlur={(event) => {
              if (event?.relatedTarget?.id === `button-close-${correctField}`) {
                onClose(event, correctField);
                return;
              }
              onSave(
                correctField,
                information?.validationRule,
                information?.message,
              );
              onEndEdit(correctField);
            }}
          />
        );
    };

    return (
      <ListItem
        key={information.text}
        className={styles.list_item}
      >
        <ListItemAvatar className={styles.avatar}>
          {information.icon}
        </ListItemAvatar>
        {renderItem()}
        <Grid
          container
          alignItems='center'
          justifyContent='flex-start'
          direction='column'
        >
          {editingState[correctField] ? (
            <>
              <Grid item>
                <Button
                  className={styles.save}
                  sx={_styles?.button}
                >
                  <Save />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  id={`button-close-${correctField}`}
                  className={styles.close}
                  onClick={(event) => {
                    onClose(event, correctField);
                  }}
                  sx={_styles?.button}
                >
                  <Close />
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Edit />
            </Grid>
          )}
        </Grid>
      </ListItem>
    );
  });

  return (
    <RightSessionContainer title='Personal information'>
      <Box>
        <List
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 0,
          }}
        >
          {renderListItems}
        </List>
      </Box>
    </RightSessionContainer>
  );
};
