import React, {Component} from "react";
import {Button, ListGroup, ListGroupItem } from "reactstrap";
import EmailCard from '../emailCard'
import emails from './emailsList'

class EmailsAnalysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailSubject: '',
      emailContent: 'No email selected.',
      showCard: false
    };
  }

  showEmailContent(subject, content) {
    this.setState({
      emailSubject: subject,
      emailContent: content,
      showCard: false
    })
  }

  ToggleButtonCard() {
    if (!this.state.showCard && this.state.emailContent !== 'No email selected.') {
      return <Button onClick={() => this.setState({showCard: true})} color="primary">Analyze</Button>;
    } else if (this.state.showCard){
      return <EmailCard text={this.state.emailContent} />
    }
  }

  render() {

    const emailsList = emails.map(item => {
                        return (
                          <ListGroupItem
                            tag="button"
                            onClick={() => this.showEmailContent(item.subject, item.content)}
                            action
                          >
                            <b>{item.subject}</b>
                            <span style={{float: 'right'}}>{item.time}</span>
                            <br/>
                            {item.sender}
                          </ListGroupItem>
                        );
                      })

    const leftDivStyle = {
      float: 'left',
      width: '30%',
    };

    const rightDivStyle = {
      float: 'right',
      width: '70%',
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: '50px',
      paddingLeft: '30px',
      paddingRight: '30px',
    };

    return (
      <div>
        <div style={leftDivStyle}>
          <h4 style={{textAlign: 'center'}} className="card-header card-title">
            Inbox
          </h4>
          <ListGroup style={{noGutters: 'True'}}>
            {emailsList}
          </ListGroup>
        </div>
        <div style={rightDivStyle}>
          <div>
            <h3 style={{marginTop: '40px', marginBottom: '20px'}}>{this.state.emailSubject}</h3>
            {this.state.emailContent}
          </div>
          <div style={{marginTop: '30px'}}>
            {this.ToggleButtonCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default EmailsAnalysis;
