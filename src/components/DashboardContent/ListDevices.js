import React from 'react';
import './ListDevices.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadDevices,
  changeStatus,
  deleteDevice,
  updateDevice } from '../../actions/devices.action.js';
import DeviceListItem from '../DeviceListItem/DeviceListItem';
import { Message } from '../Message/Message';
import { Popup } from '../Popup/Popup';
import { Button } from '../Button/Button';
import { filterItems } from '../../selectors/';

class ListDevices extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      popupShown: false,
      currentId: ''
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
    if (this.props.devices.length === 0) {
      this.props.loadDevices();
    }
  }
  render () {
    const listDevices = this.props.devices.slice(0, 3);

    if (listDevices.length === 0) {
      return (
      <section className="list-device-spinner">
        <i className="fa fa-3x fa-spinner fa-spin spinner-dash"></i>
      </section>);
    }
    return (
      <section className="list-device">
        <h2 className="list-title">Popular devices</h2>
        <div className="list-device-group">
          {listDevices.map((item, key) => {
            return (
              <DeviceListItem
                data={item}
                key={key}
                location={item.location}
                changeStatus={this.changeStatus}
                setPopupShown={this.setPopupShown}
              />
            );
          })
          }
        </div>
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
  loadDevices: bindActionCreators(loadDevices, dispatch),
  changeStatus: (data, id) => dispatch(updateDevice(data, id)),
  deleteDevice: (id) => dispatch(deleteDevice(id))
});

ListDevices.propTypes = {
  devices: PropTypes.array,
  loadDevices: PropTypes.func,
  changeStatus: PropTypes.func,
  errorText: PropTypes.string,
  status: PropTypes.string,
  deleteDevice: PropTypes.func,
  clearStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDevices);
