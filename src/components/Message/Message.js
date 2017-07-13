import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './index.scss';

export default class Message extends Component {
  constructor (props) {
    super(props);
  }

  chooseMessage = () => {
    switch (this.props.status) {
      case 'PENDING':
        return (<p className='Message'>
          <i className="fa fa-3x fa-spinner fa-spin"></i></p>);
      case 'DONE':
        setTimeout(()=>{
          this.props.resetBuilder();
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

Message.propTypes = {
  status: PropTypes.string,
  resetBuilder: PropTypes.func,
  clearDeviceStatus: PropTypes.func,
  router: PropTypes.any
};
