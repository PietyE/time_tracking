import { type FC, type FormEvent, type PropsWithChildren } from 'react';
import { Grid } from '@mui/material';
import { FormProvider, type UseFormReturn } from 'react-hook-form';
import { TimeReportWorkItemsListItemButton } from './components/TimeReportWorkItemsListItemButton';
import { TimeReportWorkItemsListItemReport } from './components/TimeReportWorkItemsListItemReport';
import { TimeReportWorkItemsListItemTime } from './components/TimeReportWorkItemsListItemTime';
import { createStyles } from './styles';

interface Fields {
  title: string;
  duration: string;
}

interface Props {
  methods: UseFormReturn<Fields>;
  isValidationError: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const WorkItemForm: FC<PropsWithChildren<Props>> = ({
  methods,
  isValidationError = false,
  onSubmit,
  children,
}): JSX.Element => (
  <FormProvider {...methods}>
    <Grid
      container
      component='form'
      columnSpacing={24}
      alignItems='center'
      justifyContent='flex-end'
      maxWidth={971}
      sx={createStyles(isValidationError)?.container}
      onSubmit={onSubmit}
      ml={0}
    >
      {children && (
        <Grid
          item
          xs={3}
          p={0}
        >
          {children}
        </Grid>
      )}
      <Grid
        item
        xs={7}
        position='relative'
      >
        <TimeReportWorkItemsListItemReport />
      </Grid>
      <Grid
        item
        xs={1.1}
        position='relative'
      >
        <TimeReportWorkItemsListItemTime />
      </Grid>
      <Grid
        item
        xs={0.9}
      >
        <TimeReportWorkItemsListItemButton />
      </Grid>
    </Grid>
  </FormProvider>
);
