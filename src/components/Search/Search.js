import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

const Search = (props) => {
  return (
    <div className="searchBox">
      <div className="searchBox__results">
        <span>{props.quantity}</span> devices
      </div>
      <div>
        <input
          type="text"
          name="search"
          placeholder="Find a device"
          value={props.value}
          className="searchBox__field"
          onChange={e => {
            props.handleSearch(e.target.value);
          }}/>
      </div>
    </div>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  quantity: PropTypes.number,
  value: PropTypes.string
};

export default Search;
