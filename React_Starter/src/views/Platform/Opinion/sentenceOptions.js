import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import 'react-block-ui/style.css';

const options = [
  "Vous feriez mieux de raccrocher ! Ce Centre d’appels cherche à vous dissuader d’entrer en communication avec votre dit Service Client.",
  "Dans le cadre de notre démarche qualité et formation, votre appel est susceptible d’être enregistré.",
  "Je n’ai aucune solution à vous proposer.",
  "Je suis vraiment satisfait du service, au revoir et à bientôt."
]

class SentenceOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    const listOptions = options.map(function(option, i) {
      return (
        <ListGroupItem key={i} tag="button" onClick={() => {this.props.onClick(option)}} action>{option}</ListGroupItem>
      )
    }.bind(this))
    return (
      <ListGroup>
        <div className="options">
          {listOptions}
        </div>
      </ListGroup>
    );
  }
}

export default (SentenceOptions);
