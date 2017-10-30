import React, { Component } from 'react';


class Full extends Component {
  render() {
    return (
      <div className="app">
        {"<Header />"}
        <div className="app-body">
          {"<Sidebar {...this.props}/>"}
          <main className="main">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </main>
          {"<Aside />"}
        </div>
        {"<Footer />"}
      </div>
    );
  }
}

export default Full;
