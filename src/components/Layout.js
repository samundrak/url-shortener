import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';
import antCss from 'antd/dist/antd.css';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';

const { Header, Content } = Layout;

const SimpleLayout = ({ children, handleMenuClick }) => (
  <Fragment>
    <style global jsx>
      {antCss}
    </style>
    <Head>
      <title> URL Shortener</title>
      <meta charSet="utf-8" />
    </Head>
    <Header className="header">
      <div className="logo" />
      <Navbar handleMenuClick={handleMenuClick} />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>{React.cloneElement(children)}</Content>
      </Layout>
    </Content>
  </Fragment>
);

SimpleLayout.propTypes = {
  children: propTypes.element.isRequired,
  handleMenuClick: propTypes.func.isRequired,
};
export default SimpleLayout;
