import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './index.scss';
import { resetProto } from '../../actions/builder.actions';
import { clearDeviceStatus } from '../../actions/addDevice.action';

class Message extends Component {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    this.props.clearDeviceStatus();
  }

  chooseMessage = () => {
    switch (this.props.status) {
      case 'PENDING':
        return (<p className='Message'>
          <i className="fa fa-3x fa-spinner fa-spin"></i></p>);
      case 'DONE':
        setTimeout(()=>{
          this.props.resetProto();
          this.props.router.push('/devices');
        }, 1000);
        return (<p className='Message'>
          <i className="fa fa-check-circle fa-3x"></i></p>);
      case 'FAIL':
        return (<p className='Message'>
          <i className="fa fa-times fa-3x"></i></p>);
      default:
        return '';
    }
  }

  render () {
    return (
        <div >
          {this.chooseMessage()}
        </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    status: store.addStatus.status
  };
}
function mapDispatchToProps (dispatch) {
  return {
    resetProto: bindActionCreators(resetProto, dispatch),
    clearDeviceStatus: bindActionCreators(clearDeviceStatus, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Message);

Message.propTypes = {
  status: PropTypes.string,
  resetProto: PropTypes.func,
  clearDeviceStatus: PropTypes.func,
  router: PropTypes.any
};
