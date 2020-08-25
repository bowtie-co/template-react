import React, { Fragment } from 'react';
import {
  WithChildren,
  WithContent
} from '.';
import {
  AppNavbar,
  AppAlert,
  AppFooter
} from '../../organisms';

export const WithNav = ({ children, className, ...props }) => {
  // const [ isCollapsed, setIsCollapsed ] = useState(false);
  // const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <Fragment>
      <section className='app'>
        <AppNavbar {...props} />

        <WithContent {...props}>
          <AppAlert {...props} />
          <WithChildren children={children} {...props}  />
        </WithContent>

        <AppFooter {...props} />
      </section>
    </Fragment>
  );
};
