var React = require('react');
var DefaultLayout = require('./layouts/default');

// in app.js this is root '/'
class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Dear {this.props.name}</div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;
