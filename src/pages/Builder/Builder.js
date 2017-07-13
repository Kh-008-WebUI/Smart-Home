import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './builder.scss';
import DeviceForm from '../../components/DeviceForm/deviceForm';
import { Prototype } from '../../components/Prototype/Prototype';
import { Message } from '../../components/Message/Message';
import PropTypes from 'prop-types';
import {
  resetProto,
  deleteItem,
  addDescription } from '../../actions/builder.action';

class Builder extends Component {
  constructor (props) {
    super(props);
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
      <section className='builder'>
        <h1 className='device-list__title'>Device Builder</h1>
        <DeviceForm />
        <Message status={this.props.status} />
        <h3 className="builder__title">Prototype</h3>
        <Prototype
          device={this.props.device}
          deleteItem={this.props.deleteItem}
          addDescription={this.props.addDescription} />
      </section>
    );
  }
}

function mapStateToProps (store) {
  return {
    device: store.builder.device,
    status: store.builder.uploadStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    deleteItem: bindActionCreators(deleteItem, dispatch),
    resetBuilder: bindActionCreators(resetProto, dispatch),
    addDescription: bindActionCreators(addDescription, dispatch)
  };
}

Builder.propTypes = {
  status: PropTypes.string,
  device: PropTypes.object,
  resetBuilder: PropTypes.func,
  clearDeviceStatus: PropTypes.func,
  addDescription: PropTypes.func,
  deleteItem: PropTypes.func,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
