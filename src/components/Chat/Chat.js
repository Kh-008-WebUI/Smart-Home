import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';
import { connect } from 'react-redux';
import { ws } from '../../index';

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

  onSubmit = (e) => {
    ws.send(JSON.stringify({
      type: 'chat',
      data: {
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
              <span>{c.from}</span>
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
          value={this.state.message}
          className="chat-message"
          placeholder="Type your message..." />
        <input
          className="btn btn--primary btn--signup btn--signup-active"
          type="submit"
          onClick={this.onSubmit} />
      </div>
    );
  }
}

function mapStateToProps (store) {
  return {
    data: store.ws.chat
  };
}

Chat.propTypes = {
  data: PropTypes.array
};

export default connect(mapStateToProps)(Chat);
