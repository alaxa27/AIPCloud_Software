import React, {Component} from 'react';
import Spinner from '../Spinner';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

    toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/cs/entries">Dashboard</a>
          </li>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Demo
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <a href="/text">
                  Text
                </a>
              </DropdownItem>
              <DropdownItem>
                <a href="/opinion">
                  Opinion
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-bell"></i>
              <span className="badge badge-pill badge-danger">5</span>
            </a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-list"></i>
            </a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#">
              <i className="icon-location-pin"></i>
            </a>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
