import React, {Component} from 'react';

class ChatBar extends Component {  
 
    render() {
    return (
      
        <footer className="chatbar">

        <input className="chatbar-username" 
        defaultValue={this.props.username}
        onKeyDown={this.handleNameChange}
        placeholder="Your Name (Optional)" />
                    
        <input className="chatbar-message"
        onKeyDown={this.handleChange}
        placeholder="Type a message and hit ENTER"/>
    
        </footer>
    );
  }

    handleChange = (event) => {
        //pressing enter passes event target's value
        if (event.keyCode === 13) {
            this.props.sendMessage(event.target.value)
            console.log(event.target.value)
            //then clears target
            event.target.value = "";

        }
    }     

    handleNameChange = (event) => {
        console.log("Name has changed")
        if (event.keyCode === 13) {
            this.props.sendName(event.target.value);
        console.log("Enter press")
        }
    }



}
export default ChatBar;


