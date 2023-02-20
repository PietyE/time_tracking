import { type FC } from 'react';
import { UsersList } from './components/UsersList';
import { MemoizedPageHeader } from 'shared/components/PageHeader';

export const Vilmates: FC = (): JSX.Element => (
  <>
    <MemoizedPageHeader title='Vilmates' />
    <UsersList />
  </>
);
