import React from 'react';
import block from 'bem-cn';

import Toto from 'features/toto/desktop';

export const TotalizatorLayout = () => {
  const b = block('toto-layout');
  return (
    <div className={b()}>
      <Toto />
    </div>
  );
};