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
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    // webSocket server
    this.socket = new WebSocket("ws://localhost:3001");

    //send data to the server
    this.socket.onopen = event => {
      console.log("Client connected to socket server") 
    };
    
    // receiving messages from the server
    this.socket.onmessage = this.handleServerMessage;

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
      // addmessage={this.addmessage}  
      sendName={this.sendName}
      sendMessage={this.sendMessage}
      username={this.state.currentUser.name}
      />
  </div> 
    );
  }

  // addmessage(content) {
  //   const Oldmessages = this.state.messages;
  //   const chatObject = {
  //     username: "Bob",
  //     content,
  //   };
  //   const Newmessages = [...Oldmessages, chatObject];
  //   this.setState({ messages: Newmessages });
  // }

  sendMessage (newMessage) {
    console.log("Where is newMessage: ", newMessage)
    // if (this.state.newMessage) {
      const message = {
        username: this.state.currentUser.name,
        content: newMessage,
        id: Date.now(),
      };
      console.log("sendMessage", message)
      this.socket.send(JSON.stringify(message));
    // }
  }

  handleServerMessage = event => {
    console.log(event.data)
    const message = JSON.parse(event.data);
    // message[0].id = uuid();
    console.log("Message Obj: ", message, message.id, message.content)
    this.setState({messages: [...this.state.messages, message]}, 
      ()=>{console.log(this.state)});
  }

  sendName = (name) => {
    this.setState({currentUser:{name: name}})
  }


}
export default App;
