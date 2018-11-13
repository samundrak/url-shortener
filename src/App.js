import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from './components/Layout';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}
  handleMenuClick() {}

  render() {
    return <Layout handleMenuClick={this.handleMenuClick}>{React.cloneElement(this.props.children)}</Layout>;
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
