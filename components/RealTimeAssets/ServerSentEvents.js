import React from 'react';
import PropTypes from 'prop-types';

let data = { hellp: 'wold' };

class ServerSentEvents extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDataChange = handleDataChange.bind(this);
    this.state = { data: null };

    this.handleDataChange = this.handleDataChange.bind(this);
  }

  componentDidMount() {
    try {
      const eventSource = new EventSource(this.props.endpoint);
      eventSource.onmessage = (e) => {
        console.log('new message');
        const { data } = e;
        this.handleDataChange(data);
      };
      eventSource.onerror = (err) => {
        console.log('err: ', err);
        this.handleDataChange({ name: null });
      };
    } catch (error) {
      console.log('error in mounting: ', error);
      this.handleDataChange({ name: null });
    }
  }

  handleDataChange(data) {
    console.log('handle data change');
    if (typeof data === 'string') {
      return this.setState(JSON.parse(data));
    }
    this.setState(data);
  }

  render() {
    return <>{this.props.render(this.state)}</>;
  }
}
export default ServerSentEvents;
