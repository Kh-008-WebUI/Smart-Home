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
    const list = this.props.currentUsers.users;
    // const listAtHome = list.filter((item) => (item.home));
    const listAtHome = this.props.currentUsers.users;

    if (list.length === 0) {
      return (<section className='list-users-spinner'>
        <i className='fa fa-3x fa-spinner fa-spin spinner-dash'></i>
      </section>);
    }

    return (
      <section className='list-users'>
        {listAtHome.map((item, key) => {
          return (
            <li key={item.id}>
              <Avatar item={item} h/>
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
