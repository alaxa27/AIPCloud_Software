import React, { Component } from 'react';
import {Router, Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import TestCard from './testCard'
import Text from './Text'
import Opinion from './Opinion'
import { Entries, Entry } from './cs'

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
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/test" name="Test" component={TestCard}/>
          <Route path="/text" name="Texte" component={Text} />
          <Route path="/opinion" name="Opinion" component={Opinion} />
          <Route path="/cs/entries" name="Entries" component={Entries} />
          <Route path="/cs/entry/:id" name="Entry" component={Entry} />
          <Redirect from="/" to="/cs/entries" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
