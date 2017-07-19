import React from 'react';
import './ListUsers.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadUsersRequest } from '../../actions/users.action';
import Avatar from '../Avatar/Avatar';

class ListUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadUsersRequest();
  }

  render () {
    if (this.props.loadUsersStatus === 'ERROR') {
      return (<section className="list-users-spinner">
        <i className="fa fa-times fa-3x"></i>
      </section>);
    }

    if (this.props.loadUsersStatus === 'PENDING') {
      return (<section className="list-users-spinner">
        <i className="fa fa-3x fa-spinner fa-spin spinner-dash"></i>
      </section>);
    }

    const list = this.props.currentUsers;

    if (list.length === 0) {
      return (<section className="list-users-spinner">
        User List is empty...
      </section>);
    }

    return (
      <section className="list-users">
        <h2 className="list-title">Users</h2>
        <ul className="list-menu-users">
          {list.map((item, key) => {
            return (
              <li key={item.id}>
                <Avatar item={item} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

ListUsers.propTypes = {
  currentUsers: PropTypes.array,
  loadUsersRequest: PropTypes.func.isRequired,
  loadUsersStatus: PropTypes.string
};

function mapStateToProps (store) {
  return {
    currentUsers: store.loadUsersReducer.users,
    loadUsersStatus: store.loadUsersReducer.loadUsersStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    loadUsersRequest: bindActionCreators(loadUsersRequest, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
