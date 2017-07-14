import React from 'react';
import './NotificationsBell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchNotificationsRequest
} from '../../actions/notifications.action';

class NotificationsBell extends React.Component {
  constructor (props) {
    super(props);
  }

  // componentDidMount () {
  //   this.props.getNotifications();
  // }

  render () {
    return (
    <div className="notification">
        <div className="notification-bell">
          <div className="notification-bell-self">
            <i className="fa fa-bell-o"></i>
            <div className="notification-round">
              <div className="notification-messages">5</div>
            </div>
          </div>
        </div>
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

NotificationsBell.propTypes = {
  notifications: PropTypes.array,
  getNotifications: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
