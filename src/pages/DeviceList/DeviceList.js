import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { Message } from '../../components/Message/Message';
import { Popup } from '../../components/Popup/Popup';
import { Button } from '../../components/Button/Button';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import Search from '../../components/Search/Search';
import { options } from '../../data/filterOptions';
import {
  filterAction,
  searchAction,
  loadDevices,
  changeStatus,
  deleteDevice,
  updateDevice,
  clearStatus } from '../../actions/devices.action';
import { sendNotificationWS } from '../../actions/notifications.action';
import { filterItems } from '../../selectors';
import { queryFromObject,
         sortDevicesByLocations } from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
require('./DeviceList.scss');

class DeviceList extends React.Component {
  constructor (props) {
    super(props);
    this.initialParams = {
      search: '',
      filter: 'all'
    };
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

    this.handleFilterSelect = (filterOption) => {
      this.props.filterAction(filterOption);
      this.updateUrl({ ...this.initialParams, filter:filterOption });
    };
    this.handleSearchResult = (searchValue) => {
      this.props.findItems(searchValue);
      this.updateUrl({ ...this.initialParams, search:searchValue });
    };
    this.changeStatus = (status, id) => {
      this.props.changeStatus({ status }, id);
    };
    this.deleteDevice = (id) => {
      this.props.deleteDevice(id);
    };
    this.updateUrl = (params) => {
      const match = this.props.match;
      const history = this.props.history;

      this.initialParams = params;
      history.push({
        pathname: match.url,
        search: queryFromObject(params)
      });
    };
  }
  componentDidMount () {
    const location = this.props.location;
    const searchValue = queryString.parse(location.search).search;

    if (this.props.devices.length === 0) {
      this.props.loadDevices();
    }
    if (searchValue) {
      this.handleSearchResult(searchValue);
    }
  }
  componentWillUnmount () {
    this.props.filterAction('all');
    this.props.findItems('');
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
        <header className="device-list__header">
          <Search
            handleSearch={this.handleSearchResult}
            quantity={this.props.devices.length}
          />
          <div className="device-list__header--right">
            <FilterSelect
              handleSelect={this.handleFilterSelect}
              options={options}
            />
            <Link to={'/builder'} className="btn btn--primary add-item-button">
              New
            </Link>
          </div>
        </header>
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
  filterOption: state.searchAndFilter.filterOption,
  search: state.searchAndFilter.searchValue,
  status: state.devicesList.uploadStatus,
  errorText: state.devicesList.errorText
});

const mapDispatchToProps = (dispatch) => ({
  filterAction: (filterOption) => dispatch(filterAction(filterOption)),
  changeStatus: (data, id) => dispatch(updateDevice(data, id)),
  findItems: (searchValue) => dispatch(searchAction(searchValue)),
  loadDevices: () => dispatch(loadDevices()),
  deleteDevice: (id) => dispatch(deleteDevice(id)),
  sendNotificationWS: (message) => dispatch(sendNotificationWS(message)),
  clearStatus: () => dispatch(clearStatus())
});

DeviceList.propTypes = {
  search: PropTypes.string,
  filterOption:  PropTypes.string,
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
