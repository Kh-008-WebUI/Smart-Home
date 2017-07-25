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

  displayNotifyBell = () => {
    if (this.props.loadNotifacationsStatus !== 'ERROR') {
      this.bell.classList.toggle('notification-display');
    }
  }
  changeNotifyView = (el) => {
    this.props.changeStatusNotification(el.target.id);
  }
  render () {
    const listNotify = this.props.notifications;
    const unViewedMessages = listNotify.filter((item) => !item.viewed);

    return (
    <div className="notification">
      <div className="notification-bell">
        <div className="notification-bell-self"
          onClick={this.displayNotifyBell}>
            <i className='fa fa-bell-o notification-bell__icon'></i>
            <div className={
            this.props.loadNotifacationsStatus === 'ERROR' ?
            'notification-round-error' : '' }></div>
            <div className={
            unViewedMessages.length === 0 ?
            'remove-block' : 'notification-round' }>
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
          <ul onClick={this.changeNotifyView}>
            {listNotify.map((item, key) => {
              return (
                <li
                  id={item._id}
                  className={item.viewed ? '' : 'notification-item-marker'}
                  key={key}>
                  <div className="notification-message">
                    <div className="notification-time">{item.time}</div>
                    <div>{item.notificationText}</div>
                  </div>
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
    notifications: store.notificationsReducer.notifications,
    loadNotifacationsStatus: store.notificationsReducer.loadNotifacationsStatus
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
  changeStatusNotification: PropTypes.func,
  loadNotifacationsStatus: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
