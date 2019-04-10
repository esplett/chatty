import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
   
    <div className="message">
    <span className="message-username">{this.props.message.username}</span>
    <span className="message-content">{this.props.message.content}</span>
    </div>
    // <div className="message system">
    // Georges Bataille changed their name to Cretin.
    // </div>

    );
  }
}
export default Message;



