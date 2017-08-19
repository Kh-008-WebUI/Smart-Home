import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './builder.scss';
import DeviceForm from '../../components/DeviceForm/deviceForm';
import Prototype from '../../components/Prototype/Prototype';
import { Message } from '../../components/Message/Message';
import PropTypes from 'prop-types';
import {
  resetProto,
  deleteItem,
  editDevice,
  clearAddStatus } from '../../actions/builder.action';

class Builder extends Component {
  componentDidMount () {
    if (typeof this.props.match.params.id !== 'undefined') {
      this.props.editDevice(this.props.match.params.id);
    } else {
      this.props.resetBuilder();
    }
  }
  componentDidUpdate () {
    if (this.props.status === 'DONE') {
      setTimeout(()=>{
        this.props.resetBuilder();
        this.props.history.push('/devices');
      }, 1000);
    }
  }
  render () {
    return (
      <section className="builder device-list">
        <h1 className="device-list__title">Device Builder</h1>
        <DeviceForm />
        <Message
          clearStatus={this.props.clearAddStatus}
          status={this.props.status}
          header={'Error'}
          text={this.props.errorText}/>
        <h3 className="builder__title">Prototype</h3>
        <Prototype
          device={this.props.device}
          deleteItem={this.props.deleteItem} />
      </section>
    );
  }
}

function mapStateToProps (store) {
  return {
    device: store.builder.device,
    status: store.builder.uploadStatus,
    errorText: store.builder.errorText
  };
}

function mapDispatchToProps (dispatch) {
  return {
    deleteItem: bindActionCreators(deleteItem, dispatch),
    resetBuilder: bindActionCreators(resetProto, dispatch),
    editDevice: bindActionCreators(editDevice, dispatch),
    clearAddStatus: bindActionCreators(clearAddStatus, dispatch)
  };
}

Builder.propTypes = {
  status: PropTypes.string,
  device: PropTypes.object,
  resetBuilder: PropTypes.func,
  deleteItem: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  editDevice: PropTypes.func,
  clearAddStatus: PropTypes.func,
  errorText: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
