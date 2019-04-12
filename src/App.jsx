import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: { name: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] //messages coming from the server will be stored here as they arrive
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // webSocket server
    this.socket = new WebSocket("ws://localhost:3001");

    //send data to the server
    this.socket.onopen = event => {
      console.log("Client connected to socket server") 
    };
    
    // receiving messages from the server
    this.socket.onmessage = this.handleServerMessage.bind(this);

    //closing connection
    this.onClose = () => {
      console.log("Client disconnected");
    }

  }

  render() {
    return (
  <div>   
    <nav className="navbar">
      <a href="/" className="navbar-brand">PIT STOP</a>
      <img src="/build/vortex.png"></img>
    </nav>
    <div className="zizek">
      <img src="/build/Zizek.jpg"></img>
    </div>
    <MessageList messages={this.state.messages}/>
    <ChatBar
      sendName={this.sendName}
      sendMessage={this.sendMessage}
      username={this.state.currentUser.name}
      />
  </div> 
    );
  }

  sendMessage (newMessage) {
    console.log("Where is newMessage: ", newMessage)
      const message = {
        username: this.state.currentUser.name,
        content: newMessage,
        type: "postMessage"
      };
      console.log("sendMessage", message)
      this.socket.send(JSON.stringify(message));
  }

  handleServerMessage = event => {
    console.log(event.data)
    const message = JSON.parse(event.data);
    switch(message.type) {
      case "incomingMessage":
      //handle incoming message
      console.log("Message Obj: ", message, message.id, message.content)
      this.setState({messages: [...this.state.messages, message]}, 
      ()=>{console.log(this.state)});
      break;
      case "incomingNotification":
      this.setState({messages: [...this.state.messages, message]})
      break;
    } 
  }

  sendName = name => {
    let oldName = this.state.currentUser.name;
    this.setState({currentUser:{name: name}})
    // if (oldName = "") {
    //   let oldName = Anonymous
    // }
    const username = {
        name: name,
        content: `${oldName} changed their name to ${name} `,
        type: "postNotification"
      }
    this.socket.send(JSON.stringify(username))
    console.log("sent to server")
  }

  userCountChanged = userCount => {
    
  }


}
export default App;
