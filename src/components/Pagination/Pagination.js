import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

class Pagination extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const pageNumbers = [];
    const currentPage = this.props.currentPage;

    if (!this.props.totalPages || this.props.totalPages <= 1) {
      return null;
    }

    for (let i = 1; i <= this.props.totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination-pages">
        {
          pageNumbers.map(number => {
            return (
              <li
                className={currentPage === number ?
                'pagination-pages__num btn' :
                'pagination-pages__num btn btn--default'
                }
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
  handleClick: PropTypes.func,
  setPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number
};

export default Pagination;
