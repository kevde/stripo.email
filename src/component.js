import React from 'react';
import StripoWrapper from './index';

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

export default StripoWrapperComponent;