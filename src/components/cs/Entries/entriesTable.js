import React, {Component} from 'react';
import {Input, Row, Col, Card, CardBody} from 'reactstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Spinner from '../Spinner'

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
        <TableRow key={entry.id}>
          <TableRowColumn>
            <a href={"/cs/entry/" + entry.id}>{entry.id}</a>
          </TableRowColumn>
          <TableRowColumn>
            {(entry.checked
              ? <i className="icon-check icons"></i>
              : null)}
            <div>
              <Spinner isLoading={entry.analyzing}/>
            </div>
          </TableRowColumn>
          <TableRowColumn>{entry.type}</TableRowColumn>
          <TableRowColumn>{entry.customer.first_name + ' ' + entry.customer.last_name}</TableRowColumn>
          <TableRowColumn>{entry.sales.first_name + ' ' + entry.sales.last_name}</TableRowColumn>
          <TableRowColumn>
            {(entry.timestamp
              ? entry.timestamp.toLocaleString()
              : null)}
          </TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Table fixedHeader fixedFooter multiSelectable height={'540px'}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>
                      <i className="icon-check icons font-2xl d-block mt-4"></i>
                    </TableHeaderColumn>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Customer</TableHeaderColumn>
                    <TableHeaderColumn>Sales</TableHeaderColumn>
                    <TableHeaderColumn>Timestamp</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody showRowHover>
                  {this.renderEntries()}
                </TableBody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default EntriesTable;
