import { type FC } from 'react';
import { Avatar } from 'shared/components/Avatar';

interface Props {
  name: string;
}

export const UsersListItemHeader: FC<Props> = ({ name }): JSX.Element => (
  <Avatar
    size='medium'
    name={name}
  />
);
