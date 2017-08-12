import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

class Pagination extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const pageNumbers = [];

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination-pages">
        {
          pageNumbers.map(number => {
            return (
              <li
                className="pagination-pages__num btn btn--default"
                key={number}
                id={number}
                onClick={this.props.handleClick}>
                {number}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Pagination.propTypes = {
  handleClick: PropTypes.func
};

export default Pagination;
