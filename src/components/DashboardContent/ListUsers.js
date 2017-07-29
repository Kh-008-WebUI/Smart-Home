import React from 'react';
import './ListUsers.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { loadUsersRequest,
  displayUsers } from '../../actions/users.action';
import Avatar from '../Avatar/Avatar';

class ListUsers extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.loadUsersRequest();
  }

  displayUsers = () => {
    this.props.displayUsers(!this.props.displayUsersStatus);
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

    const list = this.props.displayUsersStatus ? this.props.currentUsers :
    this.props.currentUsers.filter((item) => (item.home));

    list.sort((a, b) => (a.name > b.name));

    if (list.length === 0) {
      return (<section className="list-users-spinner">
        User List is empty...
      </section>);
    }

    return (
      <section className="list-users">
        <h2 className="list-title">Users
        <span className="person-at-home">
        <i className={
          'fa fa-home person-at-home' +
          (this.props.displayUsersStatus ? '' : '__all')}
        onClick={this.displayUsers}></i>
        </span>
        </h2>
        <ul className="list-menu-users">
          {list.map((item, key) => {
            return (
              <li key={item._id}>
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
  displayUsers: PropTypes.func.isRequired,
  displayUsersStatus: PropTypes.bool,
  loadUsersStatus: PropTypes.string
};

function mapStateToProps (store) {
  return {
    currentUsers: store.loadUsersReducer.users,
    loadUsersStatus: store.loadUsersReducer.loadUsersStatus,
    displayUsersStatus: store.loadUsersReducer.displayUsersStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    loadUsersRequest: bindActionCreators(loadUsersRequest, dispatch),
    displayUsers: bindActionCreators(displayUsers, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
