import React, {Component} from 'react';
import {
  Table,
  Input,
  Row,
  Col,
  Card,
  CardBlock
} from 'reactstrap';

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
      return (
        <tr key={entry.id}>
          <th scope="row">
            <a href={"/cs/entry/" + entry.id}>{entry.id}</a>
          </th>
          <td>
            {(entry.checked
              ? <i className="icon-check icons"></i>
              : null)}
          </td>
          <td>{entry.type}</td>
          <td>{entry.customer.first_name + ' ' + entry.customer.last_name}</td>
          <td>{entry.sales.first_name + ' ' + entry.sales.last_name}</td>
          <td>
            {(entry.timestamp
              ? entry.timestamp.toLocaleString()
              : null)}
          </td>
          <td><input type="checkbox" onClick={this.handleCheck}/></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Card>
        <CardBlock>
          <Row>
            <Col>
              <Table hover className="text-center">
                <thead className="thead-default">
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">
                      <i className="icon-check icons font-2xl d-block mt-4"></i>
                    </th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Customer</th>
                    <th className="text-center">Sales</th>
                    <th className="text-center">Timestamp</th>
                    <th className="text-center"><input type="checkbox"/></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderEntries()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBlock>
      </Card>
    );
  }
}

export default EntriesTable;
