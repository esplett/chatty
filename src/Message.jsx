import React, {Component} from 'react';


class Message extends Component {
  render() {
    if (this.props.message.type === "incomingMessage") {
      return (
   
        <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
        </div>
        );

      } else {
        return (<div class="notification">
        <span class="notification-content" className="notification">{this.props.message.content}</span>
      </div>)
      }
    }
}
export default Message;



