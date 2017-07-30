import React from 'react';
import './NotificationsBell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchNotificationsRequest,
  changeStatusNotification,
  fetchAddNotifications
} from '../../actions/notifications.action';
import { ws } from '../../index';

class NotificationsBell extends React.Component {
  constructor (props) {
    super(props);
    this.buttonText = '';
    this.state = {
      showAllNotify: false
    };
  }

  componentDidMount () {
    ws.onmessage = msg => {
      this.props.fetchAddNotifications(msg.data);
    };
    this.props.getNotifications();
  }

  showAllNotify = () => {
    this.setState((prevState) => {
      return { showAllNotify: !prevState.showAllNotify };
    });
  }
  changeButtonText = () => {
    if (this.state.showAllNotify) {
      this.buttonText = 'hide viewed';
    } else {
      this.buttonText = 'show all';
    }
  }
  displayNotifyBell = () => {
    if (this.props.loadNotificationsStatus !== 'ERROR') {
      this.bell.classList.toggle('notification-display');
    }
    if (this.state.showAllNotify) {
      this.setState((prevState) => {
        return { showAllNotify: !prevState.showAllNotify };
      });
    }
  }
  changeNotifyView = (el) => {
    this.props.changeStatusNotification(el.target.id);
    console.log(el.target.closest('li').id);
  }
  addClassName = (item) => {
    let classForNotifyItem = '';

    if (!item.viewed) {
      classForNotifyItem += 'notification-item-marker';
    }
    if (item.emergency) {
      classForNotifyItem += ' notification-item-emergency';
    }
    return classForNotifyItem;
  }
  render () {
    let listNotify = this.props.notifications;
    const unViewedMessages = listNotify.filter((item) => !item.viewed);

    if (!this.state.showAllNotify) {
      listNotify = unViewedMessages;
    }

    this.changeButtonText();
    return (
    <div className="notification">
      <div className="notification-bell">
        <div className="notification-bell-self"
          onClick={this.displayNotifyBell}>
            <i className='fa fa-bell-o notification-bell__icon'></i>
            <div className={
            this.props.loadNotificationsStatus === 'ERROR' ?
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
                  className={ this.addClassName(item) }
                  key={key}>
                  <div className="notification-message">
                    <div className="notification-time">{item.time}</div>
                    <div className="notification-text">{item.text}</div>
                  </div>
                </li>);
            })
            }
          </ul>
          </div>
          <div className="notification-button">
            <button
              className="btn btn--primary"
              onClick={this.showAllNotify}>
              {this.buttonText}
            </button>
          </div>
        </div>

    </div>
    );
  }
}
function mapStateToProps (store) {
  return {
    notifications: store.notificationsReducer.notifications,
    loadNotificationsStatus: store.notificationsReducer.loadNotificationsStatus
  };
}
function mapDispatchToProps (dispatch) {
  return {
    fetchAddNotifications: (message) =>
      dispatch(fetchAddNotifications(message)),
    getNotifications: bindActionCreators(fetchNotificationsRequest, dispatch),
    changeStatusNotification:
      bindActionCreators(changeStatusNotification, dispatch)
  };
}

NotificationsBell.propTypes = {
  notifications: PropTypes.array,
  fetchAddNotifications: PropTypes.func,
  getNotifications: PropTypes.any,
  changeStatusNotification: PropTypes.func,
  loadNotificationsStatus: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
