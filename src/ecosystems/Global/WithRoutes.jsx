import React from 'react';
import { useRoutes } from 'hookrouter';
import { AppNotFound } from '../../pages';

export const WithRoutes = ({ children, ...props }) => {
  // console.debug('WithRoutes', { children, routes });
  const appRouteAction = useRoutes(props.routes);

  return (typeof appRouteAction === 'function') ? appRouteAction(props) : <AppNotFound {...props} />;
};
