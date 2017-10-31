import React, {Component} from 'react';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {(this.props.isLoading === "true" || this.props.isLoading === true
          ? <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          : null)
        }
      </div>
    );
  }
}

export default Spinner;
