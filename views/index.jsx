var React = require('react');
var DefaultLayout = require('./layouts/default');
var TpLinkContainer = require('./tpLinkContainer')

class root extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>{this.props.Welcome}</div>
        <TpLinkContainer />
      </DefaultLayout>
    );
  }
}

module.exports = root;
