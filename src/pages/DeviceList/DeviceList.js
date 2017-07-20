import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { Message } from '../../components/Message/Message';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import Search from '../../components/Search/Search';
import { options } from '../../data/filterOptions';
import {
  filterAction,
  searchAction,
  loadDevices,
  changeStatus,
  deleteDeviceAsync } from '../../actions/devices.action';
import { filterItems } from '../../selectors';
import { queryFromObject } from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
require('./DeviceList.scss');

class DeviceList extends React.Component {
  constructor (props) {
    super(props);
    this.initialParams = {
      search: '',
      filter: this.props.filterOption
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
      this.props.changeStatus(status, id);
    };
    this.deleteDevice = (id) => {
      this.props.deleteDevice(id);
    };

    this.updateUrl = (params) => {
      const match = this.props.match;
      const history = this.props.history;

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

  renderDevices () {
    return this.props.devices.map((item, i) => {
      return (
        <DeviceListItem data={item} key={item.id}
          changeStatus={this.changeStatus}
          deleteDevice={this.deleteDevice}/>
      );
    });
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
          { this.props.status === 'DONE' ?
            <ReactCSSTransitionGroup transitionName="hide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {this.renderDevices()}
            </ReactCSSTransitionGroup> :
            <Message status={this.props.status}/>
            }
          {
            this.props.devices.length === 0
            && this.props.status === 'DONE'
            ? <span>Nothing here...</span> : <span></span>
          }
        </section>
      </section>
    );
  }
}

const mapStateToProps = state =>({
  devices: filterItems(state),
  filterOption: state.searchAndFilter.filterOption,
  search: state.searchAndFilter.searchValue,
  status: state.devicesList.uploadStatus
});

const mapDispatchToProps = (dispatch) => ({
  filterAction: (filterOption) => dispatch(filterAction(filterOption)),
  changeStatus: (status, id) => dispatch(changeStatus(status, id)),
  findItems: (searchValue) => dispatch(searchAction(searchValue)),
  loadDevices: () => dispatch(loadDevices()),
  deleteDevice: (id) => dispatch(deleteDeviceAsync(id))
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
  status: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
