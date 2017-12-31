import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Container } from "reactstrap";
import classNames from "classnames";

export class Hero extends React.Component {

  static propTypes = {
    backgroundImage: PropTypes.string,
  };

  render() {
    const _style = {};
    if (this.props.backgroundImage) {
      _style.backgroundImage = `url(${this.props.backgroundImage})`;
    }
    const _className = classNames("neal-hero jumbotron jumbotron-fluid", this.props.className);
    return (
      <div {... this.props} className={_className} style={_style}>
        <Container>
          { this.props.children }
        </Container>
      </div>
    );
  }
}