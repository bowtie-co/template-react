import React, { Fragment } from 'react';
import {
  WithApp
} from '../../ecosystems';
import {
  DebugProps
} from '../../organisms';

export const AppNotFound = (props) => {
  return (
    <WithApp {...props}>
      <Fragment>
        <h1>NotFound</h1>
        <p>Oops ...</p>
        <DebugProps debug {...props} />
      </Fragment>
    </WithApp>
  );
};
