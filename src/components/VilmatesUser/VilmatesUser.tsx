import { type FC } from 'react';
import { VilmatesUserGoBackButton } from './components/VilmatesUserGoBackButton';
import { VilmatesUserInformation } from './components/VilmatesUserInformation';
import { MemoizedPageHeader } from 'shared/components/PageHeader';

export const VilmatesUser: FC = (): JSX.Element => (
  <>
    <MemoizedPageHeader title='Vilmates' />
    <VilmatesUserGoBackButton />
    <VilmatesUserInformation />
  </>
);
