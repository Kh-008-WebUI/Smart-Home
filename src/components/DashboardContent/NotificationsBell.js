import React from 'react';
import './NotificationsBell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchNotificationsRequest,
  changeStatusNotification,
  changeStatusAllNotifications,
  showAllHistoryNotifications
} from '../../actions/notifications.action';
import moment from 'moment';
import {
  findByProperty,
  sortEmergencyNotifications
} from '../../utils/utils';

class NotificationsBell extends React.Component {
  constructor (props) {
    super(props);
    this.buttonText = '';
    this.state = {
      showAllNotify: false
    };
  }

  componentDidMount () {
    this.props.getNotifications();
  }
  changeNotifyView = (el) => {
    const id = el.target.closest('li').id;
    const notification = findByProperty(this.props.notifications, '_id', id);

    this.props.changeStatusNotification(id, !notification.viewed);
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
  showAllNotify = () => {
    this.setState((prevState) => {
      return { showAllNotify: !prevState.showAllNotify };
    });
  }
  readAllNotify = () => {
    this.props.changeStatusAllNotifications();
  }
  showAllHistory = () => {
    this.props.showAllHistoryNotifications();
    console.log('componnet');
  }
  changeButtonText = () => {
    if (this.state.showAllNotify) {
      this.buttonText = 'Hide viewed';
    } else {
      this.buttonText = 'Show all';
    }
  }
  addClassNameViewed = (item) => {
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
    let listNotify = [...this.props.notifications];
    const emergencyList = listNotify.filter((item) =>
     item.emergency && (item.viewed === false));

    if (emergencyList.length) {
      sortEmergencyNotifications(emergencyList, listNotify);
    }
    const classForBellEmergency =
      'fa fa-bell-o notification-bell__icon bell-emergency';
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
              <i className={
                emergencyList.length === 0 ?
                'fa fa-bell-o notification-bell__icon' :
                classForBellEmergency
                }>
              </i>
              <div className={
                this.props.loadNotificationsStatus === 'ERROR' ?
                  'notification-round-error' : '' }>
              </div>
              <div
                className={
                  unViewedMessages.length === 0 ?
                  'remove-block' : 'notification-round' }>
                  {unViewedMessages.length}
              </div>
          </div>
        </div>
        <div className="notification-list"
          ref={ (el)=>{
            this.bell = el;
          } }>
          <div className="notification-list__notice">
            <ul
              onClick={this.changeNotifyView}>
              {listNotify.map((item, key) => {
                return (
                  <li
                    id={item._id}
                    className={ this.addClassNameViewed(item) }
                    key={key}>
                    <div className="notification-message">
                      <div className="notification-time">
                        {moment(item.time).format('MMM Do, h:mm a')}
                      </div>
                      <div className="notification-text">{item.text}</div>
                    </div>
                  </li>);
              })
              }
            </ul>
            </div>
            <div className="notification-button">
              <div
                className="notification-button-show-all"
                onClick={this.showAllNotify}>
                {this.buttonText}
              </div>
              <div
                className="notification-button-read-all"
                onClick={this.readAllNotify}>
                Read all
              </div>
              <div
                className="notification-button-all-history"
                onClick={this.showAllHistory}>
                All history
              </div>
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
    getNotifications: bindActionCreators(fetchNotificationsRequest, dispatch),
    changeStatusNotification: (id, viewed) =>
      dispatch(changeStatusNotification(id, viewed)),
    changeStatusAllNotifications: (statusForAll) =>
      dispatch(changeStatusAllNotifications()),
    showAllHistoryNotifications: () =>
      dispatch(showAllHistoryNotifications())
  };
}

NotificationsBell.propTypes = {
  notifications: PropTypes.array,
  fetchAddNotifications: PropTypes.func,
  getNotifications: PropTypes.any,
  changeStatusNotification: PropTypes.func,
  changeStatusAllNotifications: PropTypes.func,
  showAllHistoryNotifications: PropTypes.func,
  loadNotificationsStatus: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
