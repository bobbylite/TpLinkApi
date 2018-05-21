var React = require('react');
var DefaultLayout = require('./layouts/default');

// in app.js this is root '/'
class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Please go to localhost:3001/tplink</div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;
