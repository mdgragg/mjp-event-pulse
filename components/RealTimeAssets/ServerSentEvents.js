import React from 'react';
import PropTypes from 'prop-types';

let data = { hellp: 'wold' };

class ServerSentEvents extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDataChange = handleDataChange.bind(this);
    this.state = { data };

    this.handleDataChange = this.handleDataChange.bind(this);
  }

  componentDidMount() {
    const eventSource = new EventSource(this.props.endpoint);
    eventSource.onmessage = (e) => {
      const { data } = e;
      this.handleDataChange(data);
      console.log('new value: ', data);
    };
  }
  handleDataChange(data) {
    this.setState(JSON.parse(data));
  }

  render() {
    return <>{this.props.render(this.state)}</>;
  }
}
export default ServerSentEvents;
