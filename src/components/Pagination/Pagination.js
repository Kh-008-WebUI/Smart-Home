import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: this.props.list,
      currentPage: 1,
      todosPerPage: 3
    };

    this.handleClick = (event) => {
      this.setState({
        currentPage: Number(event.target.id)
      });
    };
  }

  render () {
    const { list, currentPage, listPerPage } = this.state;
    const pageNumbers = [];

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul>
        {
          pageNumbers.map(number => {
            return (
              <li
                key={number}
                onClick={this.handleClick}>
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
  list: PropTypes.array
};

export default Pagination;
