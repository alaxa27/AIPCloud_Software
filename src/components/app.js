import React, { Component } from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import TestCard from './testCard'
import Text from './Text/text'
import Opinion from './Opinion/opinion'
import Entries from './cs'
// import EmailsAnalysis from './emails/emailsAnalysis'

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


  // <Route path="/emails" name="Emails" component={EmailsAnalysis}/>
  render() {
    const history = createBrowserHistory();

    return (
      <Router history={history}>
        <Switch>
          <Route path="/test" name="Test" component={TestCard}/>
          <Route path="/text" name="Texte" component={Text} />
          <Route path="/opinion" name="Opinion" component={Opinion} />
          <Route path="/cs/entries" name="Entries" component={Entries} />
          <Redirect from="/cs" to="/cs/entries" />
          <Redirect from="/" to="/test" />
        </Switch>
      </Router>
    );
  }
}

export default App;
