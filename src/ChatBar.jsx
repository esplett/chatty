import React, {Component} from 'react';

class ChatBar extends Component {  
    handleChange = (event) => {
        //if you press enter passes event target's value
        //then clears target
        if (event.keyCode === 13) {
            this.props.addmessage(event.target.value)
            addmessage(event.target.value)
            event.target.value = "";
        }
    }     

    render() {
    return (
      
        <footer className="chatbar">
            <form>
                <input className="chatbar-username" 
                    defaultValue={this.props.currentUser.name}
                    placeholder="Your Name (Optional)" />
                    
                <input 
                    className="chatbar-message"
                    onKeyDown={this.handleChange}
                    placeholder="Type a message and hit ENTER" 
                    />
            </form>
        </footer>
    );
  }
}
export default ChatBar;


