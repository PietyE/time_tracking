import { type FC } from 'react';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UsersListItemContent } from './components/UsersListItemContent';
import { UsersListItemHeader } from './components/UsersListItemHeader';
import { SizingContainer } from 'shared/UI/SizingContainer';
import { AppRoutes } from 'constants/appRoutesConstants';
import type { User } from 'api/models/users';
import { styles } from './styles';

interface Props {
  user: Omit<User, 'permissions'>;
}

export const UsersListItem: FC<Props> = ({ user }): JSX.Element => {
  const { name, email, id } = user;
  const navigate = useNavigate();

  const onUserClick = (): void =>
    navigate(`/${AppRoutes.vilmates}${AppRoutes.singlePage}/${id}`);

  return (
    <SizingContainer size='extraSmall'>
      <Card
        onClick={onUserClick}
        sx={styles}
      >
        <UsersListItemHeader name={name} />
        <UsersListItemContent
          name={name}
          email={email}
        />
      </Card>
    </SizingContainer>
  );
};
