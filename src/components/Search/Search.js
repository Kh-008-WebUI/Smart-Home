import React from 'react';
import PropTypes from 'prop-types';
require('./search.scss');

const Search = (props) => {
  return (
    <div className='searchBox'>
      <div className='searchBox__results'>
        <span>{props.quantity}</span> devices
      </div>
      <div>
        <input
          type="text"
          name="search"
          placeholder="Find a device"
          className='searchBox__field'
          onChange={e => {
            props.handleSearch(e.target.value);
          }}/>
        <button className='btn searchBox__btn'>Search</button>
      </div>
    </div>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  quantity: PropTypes.number
};

export default Search;
