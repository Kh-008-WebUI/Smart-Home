/* import React from 'react';
import './Notification.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class Notifications extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="dashboard-notification">
        <div className="dashboard-notification__notice">
          <ul>
            { this.props.notifications.map((item, key) => {
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

Notifications.propTypes = {
  notifications: PropTypes.array
};

export default connect(mapStateToProps)(Notifications);
*/
