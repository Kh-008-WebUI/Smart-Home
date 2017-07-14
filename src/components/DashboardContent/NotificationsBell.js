import React from 'react';
import './NotificationsBell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchNotificationsRequest,
  changeStatusNotification
} from '../../actions/notifications.action';

class NotificationsBell extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.getNotifications();
  }

  displayNotify = () => {
    this.bell.classList.toggle('notification-display');
  }
  getNotify = (el) => {
    this.props.changeStatusNotification(el.target.id);
  }
  render () {
    const listNotify = this.props.notifications;
    const unViewedMessages = listNotify.filter((item) => !item.viewed);

    return (
    <div className="notification">
        <div className="notification-bell">
          <div className="notification-bell-self"
            onClick={this.displayNotify}>
            <i className="fa fa-bell-o"></i>
            <div className={
              unViewedMessages === 0 ?
                'notification-undisplay' :
                'notification-round'
              }>
              <div className="notification-messages">
                {unViewedMessages.length}
              </div>
            </div>
          </div>
        </div>
        <div className="notification-list"
            ref={ (el)=>{
              this.bell = el;
            } }>
            <div className="notification-list__notice">
            <ul onClick={this.getNotify}>
            {this.props.notifications.map((item, key) => {
              return (
                <li
                  id={item.id}
                  className="notification-item-marker"
                  key={key}>
                  {item.time + ' '}
                  {item.notification}
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
    getNotifications: bindActionCreators(fetchNotificationsRequest, dispatch),
    changeStatusNotification:
      bindActionCreators(changeStatusNotification, dispatch)
  };
}

NotificationsBell.propTypes = {
  notifications: PropTypes.array,
  getNotifications: PropTypes.any,
  changeStatusNotification: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
