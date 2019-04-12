import React, {Component} from 'react';

class ChatBar extends Component {  
 
    render() {
    return (
      
        <footer className="chatbar">
            <form>
                <input className="chatbar-username" 
                    defaultValue={this.props.username}
                    onKeyDown={this.handleNameChange}
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

    handleChange = (event) => {
        //if you press enter passes event target's value
        //then clears target
        if (event.keyCode === 13) {
            this.props.sendMessage(event.target.value)
            console.log(event.target.value)
            event.target.value = "";

        }
    }     

    handleNameChange = (event) => {
        if (event.keyCode === 13) {
            this.props.sendName(event.target.value);
        }
    }



}
export default ChatBar;


