import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import FilterSelect from '../FilterSelect/FilterSelect';
import Search from '../Search/Search';
import {
  filterAction,
  searchAction } from '../../actions/devices.action';
import { queryFromObject } from '../../utils/utils';
import { options } from '../../data/filterOptions';
import PropTypes from 'prop-types';

class ListHeader extends React.Component {
  constructor (props) {
    super(props);
    this.initialParams = {
      search: '',
      filter: 'all'
    };

    this.handleFilterSelect = (filterOption) => {
      this.props.filterAction(filterOption);
      this.updateUrl({ ...this.initialParams, filter:filterOption });
    };
    this.handleSearchResult = (searchValue) => {
      this.props.findItems(searchValue);
      this.updateUrl({ ...this.initialParams, search:searchValue });
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

    if (searchValue) {
      this.handleSearchResult(searchValue);
    }
  }
  componentWillUnmount () {
    this.props.filterAction('all');
    this.props.findItems('');
  }

  render () {
    return (
      <header className="device-list__header">
        <Search
          handleSearch={this.handleSearchResult}
          quantity={this.props.quantity}
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
    );
  }
}

const mapStateToProps = state =>({
  filterOption: state.searchAndFilter.filterOption,
  search: state.searchAndFilter.searchValue
});

const mapDispatchToProps = (dispatch) => ({
  filterAction: (filterOption) => dispatch(filterAction(filterOption)),
  findItems: (searchValue) => dispatch(searchAction(searchValue))
});

ListHeader.propTypes = {
  search: PropTypes.string,
  filterOption: PropTypes.string,
  filterAction: PropTypes.func,
  findItems: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  loadDevices: PropTypes.func,
  quantity: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader);
