import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';
import classnames from 'classnames'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import Opinion from './Opinion/opinion.js'

class TestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Opinion />
    );
  }
}

export default (TestCard);
