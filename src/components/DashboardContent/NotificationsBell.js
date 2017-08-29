import React from 'react';
import './NotificationsBell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchNotificationsRequest,
  changeStatusNotification,
  changeStatusAllNotifications,
  showAllHistoryNotifications,
  requestUnreadNotificationsCount
} from '../../actions/notifications.action';
import moment from 'moment';
import {
  findByProperty,
  sortEmergencyNotifications
} from '../../utils/utils';
import InfiniteScroll from 'react-infinite-scroller';

class NotificationsBell extends React.Component {
  constructor (props) {
    super(props);
    this.buttonText = '';
    this.state = {
      willShowReadNotifications: false,
      itemsPerPage: 10
    };
  }

  componentDidMount () {
    this.props.getUnreadNotificationsCount();
  }

  componentWillUpdate (nextProps, nextState) {
    // This way we can determine if a scroller component reload was needed.
    if (this.props.timestamp !== nextProps.timestamp ||
        this.state.willShowReadNotifications !==
        nextState.willShowReadNotifications) {
      this.scrollComponent.pageLoaded = 1;
    }

    if (this.state.willShowReadNotifications !==
        nextState.willShowReadNotifications) {
      // these aren't the droids you're looking for
      setTimeout(() => this.loadItems(1, true), 0);
    }
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
    if (this.state.willShowReadNotifications) {
      this.toggleReadNotificaitonsVisibility();
    }
  }
  toggleReadNotificaitonsVisibility = () => {
    this.setState((prevState) => {
      return {
        willShowReadNotifications: !prevState.willShowReadNotifications
      };
    });
  }
  readAllNotify = () => {
    this.props.changeStatusAllNotifications();
  }
  showAllHistory = () => {
    this.props.showAllHistoryNotifications();
  }
  changeButtonText = () => {
    if (this.state.willShowReadNotifications) {
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
  loadItems (page, reload = false) {
    if (this.state.willShowReadNotifications) {
      this.props.getNotifications(page, this.state.itemsPerPage, reload);
    }
    else {
      this.props.getUnreadNotificationsOfToday(
        page,
        this.state.itemsPerPage,
        reload
      );
    }
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

    if (!this.state.willShowReadNotifications) {
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
                  this.props.unreadCount === 0 ?
                  'remove-block' : 'notification-round' }>
                  {this.props.unreadCount}
              </div>
          </div>
        </div>
        <div className="notification-list"
          ref={ (el)=>{
            this.bell = el;
          } }>
          <div className="notification-list__notice">
            <div className={ (((this.props.unreadCount.length) === 0) &&
              (this.state.willShowReadNotifications === false)) ?
              'notification-unread-block unread-block-display' :
              'notification-unread-block'
              }>
              You have no unread messages
            </div>
            <InfiniteScroll
              threshold={-10}
              useWindow={false}
              loadMore={this.loadItems.bind(this)}
              hasMore={this.props.willLoadMore}
              ref={scrollComponent => {
                this.scrollComponent = scrollComponent;
              }}
            >
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
            </InfiniteScroll>
            </div>
            <div className="notification-button">
              <div
                className="notification-button-show-all"
                onClick={this.toggleReadNotificaitonsVisibility}>
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
    loadNotificationsStatus: store.notificationsReducer.loadNotificationsStatus,
    willLoadMore: store.notificationsReducer.willLoadMore,
    unreadCount: store.notificationsReducer.unreadCount,
    timestamp: store.notificationsReducer.timestamp
  };
}
function mapDispatchToProps (dispatch) {
  return {
    getNotifications: (pageNumber, itemsPerPage, reload) =>
      dispatch(fetchNotificationsRequest(
        pageNumber,
        itemsPerPage,
        reload,
        false
      )
    ),
    getUnreadNotificationsOfToday: (pageNumber, itemsPerPage, reload) =>
      dispatch(fetchNotificationsRequest(
        pageNumber,
        itemsPerPage,
        reload,
        true
      )
    ),
    changeStatusNotification: (id, viewed) =>
      dispatch(changeStatusNotification(id, viewed)),
    changeStatusAllNotifications: () =>
      dispatch(changeStatusAllNotifications()),
    showAllHistoryNotifications: () =>
      dispatch(showAllHistoryNotifications()),
    getUnreadNotificationsCount: () =>
      dispatch(requestUnreadNotificationsCount())
  };
}

NotificationsBell.propTypes = {
  notifications: PropTypes.array,
  fetchAddNotifications: PropTypes.func,
  getNotifications: PropTypes.func,
  getUnreadNotificationsOfToday: PropTypes.func,
  changeStatusNotification: PropTypes.func,
  changeStatusAllNotifications: PropTypes.func,
  showAllHistoryNotifications: PropTypes.func,
  loadNotificationsStatus: PropTypes.string,
  willLoadMore: PropTypes.bool,
  unreadCount: PropTypes.number,
  getUnreadNotificationsCount: PropTypes.func,
  timestamp: PropTypes.number
};

NotificationsBell.defaultProps = {
  willLoadMore: true,
  unreadCount: 0
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
