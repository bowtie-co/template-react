import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';
import { AppIcon } from '../../atoms';

export const AppNavbar = ({ children, ...props }) => {
  console.debug('AppNavbar', { props });

  const [ isNavOpen, setIsNavOpen ] = useState(false);
  const toggleNav = () => setIsNavOpen(prevState => !prevState);

  return (
    <Navbar className='AppNavbar top-nav-section' expand="md">
      <NavbarBrand href={'/'}>
        React App
      </NavbarBrand>

      <NavbarToggler onClick={toggleNav} />

      {/* TODO: How to better structure the layout + collapse for better mobile UX? */}
      <Collapse isOpen={isNavOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink title={'title'} href={'//google.com'} target='_blank' rel='noopener noreferrer'>
              <AppIcon className='fab fa-github' color='#07102c' size='md' />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
