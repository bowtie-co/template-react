import React, { Fragment } from 'react';
import {
  WithApp
} from '../../ecosystems';
import {
  DebugProps
} from '../../organisms';

export const AppHome = (props) => {
  return (
    <WithApp {...props}>
      <Fragment>
        <h1>Home</h1>
        <p>Welcome</p>
        <DebugProps debug {...props} />
      </Fragment>
    </WithApp>
  );
};
