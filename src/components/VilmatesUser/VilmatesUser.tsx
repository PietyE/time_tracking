import { type FC } from 'react';
import { VilmateUserGoBackButton } from './components/VilmateUserGoBackButton';
import { MemoizedPageHeader } from 'shared/components/PageHeader';

export const VilmatesUser: FC = (): JSX.Element => (
  <>
    <MemoizedPageHeader title='Vilmates' />
    <VilmateUserGoBackButton />
  </>
);
