import React from 'react';
import { WithChildren, WithSidebar } from '.';

export const WithApp = ({ children, ...props }) => {
  // console.debug('WithApp', { children, props });

  return (
    <WithSidebar {...props}>
      <WithChildren children={children} {...props} />
    </WithSidebar>
  );
};
