import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import Link from 'next/link';

const Navbar = ({ handleMenuClick }) => (
  <Menu onClick={handleMenuClick} theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
    <Menu.Item key="1">
      <Link href="/">
        <b>URL Shortener</b>
      </Link>
    </Menu.Item>
  </Menu>
);
Navbar.propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
};
export default Navbar;
