import React from 'react';
import jsonNotifications from '../../data/notifications.json';
import './Notification.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchNotificationsRequest
} from '../../actions/loadNotifications.action';

class Notifications extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.getNotifications();
  }

  render () {
    return (
      <div className="dashboard-notification">
        <div className="dashboard-notification__notice">
          <span><i className="fa fa-bell-o"></i></span>
          <ul>
            {this.props.notifications.map((item, key) => {
              return (<li key={key}>
              {item.time} {item.notification}
            </li>);
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps (store) {
  return {
    notifications: store.notificationsReducer
  };
}
function mapDispatchToProps (dispatch) {
  return {
    getNotifications: bindActionCreators(fetchNotificationsRequest, dispatch)
  };
}

Notifications.propTypes = {
  notifications: PropTypes.array,
  getNotifications: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
