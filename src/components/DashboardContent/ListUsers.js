import React from 'react';
import './ListUsers.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadUsersRequest } from '../../actions/loadUsers.action';
import Avatar from '../Avatar/Avatar';

class ListUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadUsersRequest();
  }

  render () {
    const list = this.props.currentUsers.users;

    /* const {
      currentUsers: {
        users
      }
    } */
    const listAtHome = list.filter((item) => (item.home));

    return (
      <section className='list-persons'>
        {listAtHome.map((item, key) => {
          return (
            <li key={item.id}>
              <Avatar name={item.name} />
            </li>
          );
        })}
      </section>
    );
  }
}

ListUsers.propTypes = {
  currentUsers: PropTypes.object,
  loadUsersRequest: PropTypes.func.isRequired
};

function mapStateToProps (store) {
  return {
    currentUsers: store.loadUsersReducer
  };
}
function mapDispatchToProps (dispatch) {
  return {
    loadUsersRequest: bindActionCreators(loadUsersRequest, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
