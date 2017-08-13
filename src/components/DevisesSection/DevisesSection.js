import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from '../../components/Message/Message';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';
import ListHeader from '../../components/ListHeader/ListHeader';

import PropTypes from 'prop-types';

class DevicesSection extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const filterOption = this.props.filterOption;

    if (typeof filterOption !== 'undefined') {
      this.props.filterAction(filterOption);
    }

    return (
      <section className="device-list">
        <h1 className="device-list__title">
          {this.props.locationOfDevices ?
            this.props.locationOfDevices.toUpperCase()
            : 'Your devices'}
        </h1>
        <ListHeader
          quantity={this.props.quantity}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match} />
        <section className="device-list__content">
          { this.props.children }
        </section>
        <Popup
          setPopupShown={this.props.setPopupShown}
          popupShown={this.props.popupShown}
          header="Confirm the action"
          text="Are you sure you want to remove the device?">
          <Button
            setPopupShown={this.props.setPopupShown}
            okHandler={() => {
              this.props.deleteDevice(this.props.currentId);
              this.props.setPopupShown();
            }}
            className={'btn popup__btn'}
            innerText={'Ok'}
          />
          <Button
            okHandler={() => {
              this.props.setPopupShown();
            }}
            className={'btn btn--default popup__btn'}
            innerText={'Cancel'}
          />
        </Popup>
        <Message
          clearStatus={this.props.clearStatus}
          header={'Error'}
        />
      </section>
    );
  }
}


DevicesSection.propTypes = {
  changeStatus: PropTypes.func,
  deleteDevice: PropTypes.func,
  loadDevices: PropTypes.func,
  filterOption: PropTypes.any,
  filterAction: PropTypes.func,
  devices: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  children: PropTypes.any,
  clearStatus: PropTypes.func,
  currentId: PropTypes.string,
  setPopupShown: PropTypes.func,
  popupShown: PropTypes.bool,
  quantity: PropTypes.number,
  locationOfDevices: PropTypes.string
};

export default DevicesSection;
