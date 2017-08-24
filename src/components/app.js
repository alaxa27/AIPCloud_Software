import React, { Component } from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import TestCard from './testCard'
import EmailsAnalysis from './emails/emailsAnalysis'

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const history = createBrowserHistory();

    return (
      <HashRouter history={history}>
        <Switch>
          <Route path="/test" name="Test" component={TestCard}/>
          <Route path="/emails" name="Emails" component={EmailsAnalysis}/>
          <Redirect from="/" to="/test"/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
