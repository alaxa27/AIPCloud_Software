import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Row } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actions from '../actions/entries';

// Initialize Cloud Firestore through Firebase
// Add a second document with a generated ID.
// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
//
// db.collection("entries").add({
//   type: 'conversation',
//   customer: 'Benjamin Dallard',
//   sale: 'Taqiyeddine Sakmeche',
//   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   duration: 120
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(err) {
//   console.error("Error: ", err);
// })

// db.collection("entries").get().then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.data());
//   })
// })
/////////////////


class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchEntries();
  }

  renderEntries() {
    return this.props.entries.map((entry, key) => {
      return(<h1 id={key}>{entry.customer}</h1>)
    })
  }

  render() {

    return (
      <Row>
        <h1>HEY</h1>
        <br />
        <BootstrapTable data={this.props.entries}>
          <TableHeaderColumn dataField='id' isKey={ true }>Key</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='customer'>Customer Name</TableHeaderColumn>
          <TableHeaderColumn dataField='timestamp'>Timestamp</TableHeaderColumn>
        </BootstrapTable>
      </Row>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     entries: state.entries
//   }
// }

function mapStateToProps(state) {
  return {
    entries: state.cs.entries.entries
  }
}

export default connect(mapStateToProps, actions)(Entries);
