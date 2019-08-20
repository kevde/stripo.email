const React = require('react');
const StripoWrapper = require('./index');

class StripoWrapperComponent extends React.Component {

  async componentDidMount() {
    const { settings } = this.props;
    await StripoWrapper.init(settings);
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}

module.exports = StripoWrapperComponent;