import type { FC } from 'react';

import Spinner from 'shared/components/Spinner';

const Loading: FC = () => {
  return (
    <div className='loading_container'>
      <Spinner
        size={60}
        color='primary'
      />
    </div>
  );
};

export default Loading;
