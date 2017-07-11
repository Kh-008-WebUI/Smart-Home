import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import Search from '../../components/Search/Search';
import { options } from '../../data/filterOptions';
import { filterAction,
  searchAction } from '../../actions/searchAndFilter.action';
import { changeStatus } from '../../actions/changeStatus.action';
import { filterItems } from '../../selectors';
import { loadDevicesAsync } from '../../actions/loadDevices.action';
import { deleteDeviceAsync } from '../../actions/deleteDevice.action';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
require('./DeviceList.scss');

class DeviceList extends React.Component {
  constructor (props) {
    super(props);

    this.handleFilterSelect = (filterOption) => {
      this.props.filterAction(filterOption);
    };
    this.handleSearchResult = (searchValue) => {
      this.props.findItems(searchValue);
    };
    this.changeStatus = (index) => {
      this.props.changeStatus(index);
    };
    this.deleteDevice = (id) => {
      this.props.deleteDevice(id);
    };
  }
  componentDidMount () {
    this.props.loadDevices();
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
    const searchValue = this.props.search;
    const filterOption = this.props.filterOption;

    return (
      <section className='device-list'>
        <h1 className='device-list__title'>Your devices</h1>
        <header className='device-list__header'>
          <Search
            handleSearch={this.handleSearchResult}
            quantity={this.props.devices.length}
          />
          <div className='device-list__header--right'>
            <FilterSelect
              handleSelect={this.handleFilterSelect}
              options={options}
            />
            <Link to={'/builder'} className="btn btn--primary add-item-button">
              New
            </Link>
          </div>
        </header>
        <section className='device-list__content'>
          { this.props.devices.length === 0 ?
            <p><i className="fa fa-3x fa-spinner fa-spin"></i></p> :
            <ReactCSSTransitionGroup transitionName="hide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {this.renderDevices()}
            </ReactCSSTransitionGroup>
            }
        </section>
      </section>
    );
  }
}

const mapStateToProps = state =>({
  devices: filterItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  filterAction: (filterOption) => dispatch(filterAction(filterOption)),
  changeStatus: (index) => dispatch(changeStatus(index)),
  findItems: (searchValue) => dispatch(searchAction(searchValue)),
  loadDevices: () => dispatch(loadDevicesAsync()),
  deleteDevice: (id) => dispatch(deleteDeviceAsync(id))
});

DeviceList.propTypes = {
  search: PropTypes.string,
  filterOption:  PropTypes.object,
  match: PropTypes.object,
  changeStatus: PropTypes.func,
  devices: PropTypes.array,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  loadDevices: PropTypes.func,
  deleteDevice: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
