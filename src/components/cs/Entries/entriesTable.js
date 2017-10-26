
import React, {Component} from 'react';
import { Table, Input } from 'reactstrap';



class EntriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheck() {
    console.log("ee ");
  }

  renderEntries() {
    return this.props.entries.map((entry, key) => {
      entry.checked = false;
      return (
          <tr key={entry.id}>
            <th scope="row">{entry.id}</th>
            <td>{entry.type}</td>
            <td>{entry.customer.first_name + ' ' + entry.customer.last_name}</td>
            <td>{entry.sales.first_name + ' ' + entry.sales.last_name}</td>
            <td>{(entry.timestamp ? entry.timestamp.toString() : null)}</td>
            <td><input type="checkbox" checked={entry.checked} onClick={this.handleCheck}/></td>
          </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Customer</th>
              <th>Sales</th>
              <th>Timestamp</th>
              <th><input type="checkbox" onClick={() => {console.log("fefefe")} }/></th>
            </tr>
          </thead>
          <tbody>
            {this.renderEntries()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EntriesTable;
