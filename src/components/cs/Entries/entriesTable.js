
import React, {Component} from 'react';
import { Table } from 'reactstrap';


class EntriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderEntries() {
    return this.props.entries.map((entry, key) => {
      return (
        <tr key={entry.id}>
          <th scope="row">{entry.id}</th>
          <td>{entry.type}</td>
          <td>{entry.customer.first_name + ' ' + entry.customer.last_name}</td>
          <td>{(entry.timestamp ? entry.timestamp.toString() : null)}</td>
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
              <th>Timestamp</th>
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
