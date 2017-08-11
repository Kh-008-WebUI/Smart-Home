import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { Message } from '../../components/Message/Message';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';
import ListHeader from '../../components/ListHeader/ListHeader';
import {
  loadDevices,
  changeStatus,
  deleteDevice,
  updateDevice,
  clearStatus } from '../../actions/devices.action';
import { sendNotificationWS } from '../../actions/notifications.action';
import { filterItems } from '../../selectors';
import { sortDevicesByLocations } from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
require('./DeviceList.scss');

class DeviceList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      popupShown: false,
      currentId: '',
      currentPage: 1,
      todosPerPage: 6
    };

    this.setPopupShown = (id) => {
      const currentState = this.state.popupShown;

      this.setState({
        popupShown: !currentState,
        currentId: id
      });
    };

    this.changeStatus = (status, id) => {
      this.props.changeStatus({ status }, id);
    };
    this.deleteDevice = (id) => {
      this.props.deleteDevice(id);
    };
  }
  componentDidMount () {
    this.props.loadDevices();
  }

  renderDevices (locations, location) {
    return (
      locations[location].map((device, i) => {
        return (
          <DeviceListItem
            data={device}
            key={i}
            location={''}
            changeStatus={this.changeStatus}
            setPopupShown={this.setPopupShown}/>
        );
      })
    );
  }

  renderDeviceGroup () {
    const locations = sortDevicesByLocations(this.props.devices);

    return (
      Object.keys(locations).map((location, i) => {
        return (
          <div className="device-group" key={i}>
            <h2
              className="device-group__title">
                {location.toUpperCase()}
            </h2>
            <ReactCSSTransitionGroup
              className="device-group__items"
              transitionName="hide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {this.renderDevices(locations, location)}
            </ReactCSSTransitionGroup>
          </div>
        );
      })
    );
  }

  render () {
    const filterOption = this.props.match.params.filterOption;

    if (typeof filterOption !== 'undefined') {
      this.props.filterAction(filterOption);
    }

    return (
      <section className="device-list">
        <h1 className="device-list__title">Your devices</h1>
        <ListHeader
          quantity={this.props.devices.length}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match} />
        <section className="device-list__content">
          { this.props.status === 'DONE' && this.props.devices.length === 0 ?
            <span>You need to add device</span> : this.renderDeviceGroup()
          }
        </section>
        <Popup
            setPopupShown={this.setPopupShown}
            popupShown={this.state.popupShown}
            header="Confirm the action"
            text="Are you sure you want to remove the device?"
        >
          <Button
              setPopupShown={this.setPopupShown}
              okHandler={() => {
                this.deleteDevice(this.state.currentId);
                this.setPopupShown();
              }}
              className={'btn popup__btn'}
              innerText={'Ok'}
            />
            <Button
              okHandler={() => {
                this.setPopupShown();
              }}
              className={'btn btn--default popup__btn'}
              innerText={'Cancel'}
            />
        </Popup>
        <Message
          clearStatus={this.props.clearStatus}
          status={this.props.status}
          header={'Error'}
          text={this.props.errorText}
        />
      </section>
    );
  }
}

const mapStateToProps = state =>({
  devices: filterItems(state),
  status: state.devicesList.uploadStatus,
  errorText: state.devicesList.errorText
});

const mapDispatchToProps = (dispatch) => ({
  changeStatus: (data, id) => dispatch(updateDevice(data, id)),
  loadDevices: () => dispatch(loadDevices()),
  deleteDevice: (id) => dispatch(deleteDevice(id)),
  sendNotificationWS: (message) => dispatch(sendNotificationWS(message)),
  clearStatus: () => dispatch(clearStatus())
});

DeviceList.propTypes = {
  match: PropTypes.object,
  changeStatus: PropTypes.func,
  devices: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  loadDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  status: PropTypes.string,
  sendNotificationWS: PropTypes.func,
  errorText: PropTypes.string,
  clearStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
