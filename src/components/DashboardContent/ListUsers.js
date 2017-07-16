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
    if (this.props.loadUsersStatus === 'Error') {
      return (<section className='list-users-spinner'>
        Loading error...
      </section>);
    }

    const list = this.props.currentUsers;

    if (list.length === 0) {
      return (<section className='list-users-spinner'>
        <i className='fa fa-3x fa-spinner fa-spin spinner-dash'></i>
      </section>);
    }

    return (
      <section className='list-users'>
        {list.map((item, key) => {
          return (
            <li key={item.id}>
              <Avatar item={item} />
            </li>
          );
        })}
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
