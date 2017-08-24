import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';
import { connect } from 'react-redux';
import { ws } from '../../layouts/MainLayout/MainLayout';

class Chat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidUpdate () {
    this.chat.scrollIntoView();
  }
  onMessageInput = (e) => {
    this.setState({
      message: e.target.value
    });
  }
  onEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit();
    }
  }
  onSubmit = (e) => {
    ws.send(JSON.stringify({
      type: 'chat',
      data: {
        from: this.props.user,
        msg: this.state.message
      }
    }));
    this.setState({
      message: ''
    });
  }
  render () {
    return (
      <div className="chat">
        <h2 className="list-title">Chat</h2>
        <div>
          <ul className="chat-lines">
          {this.props.data.map((c, i) => (
            <li key={i} className="chat-line">
              <span className="chat-line__user">{c.from}</span>
              <span className="chat-line__colon">:</span>
              <span>{c.msg}</span>
            </li>
            )
          )}
          <div
            ref={(el)=>{
              this.chat = el;
            }}></div>
          </ul>
        </div>
        <textarea
          onChange={this.onMessageInput}
          onKeyPress={this.onEnter}
          value={this.state.message}
          className="chat-message"
          placeholder="Type your message..." />
        <input
          className="btn btn--primary"
          type="submit"
          value="Send Message"
          onClick={this.onSubmit} />
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    data: store.ws.chat,
    user: store.users.user.name
  };
}

Chat.propTypes = {
  data: PropTypes.array,
  user: PropTypes.string
};

export default connect(mapStateToProps)(Chat);
