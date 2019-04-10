import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 12345
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 54321
        }
      ]
    };
    this.addmessage = this.addmessage.bind(this);
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
    // const msg = { 
    //   messages: [
    //     {
    //       username,
    //       content,
    //       id
    //       },
    //     ]
    //   };

    //send data to the server
    this.socket.onopen = event => {
      console.log("Client connected to socket server") 
    };
    
    // receiving messages from the server
    this.socket.onmessage = event => {
      console.log(`Got message from the server: ${event.data}`);
    }

    //closing connection
    this.onClose = () => {
      console.log("Client disconnected");
    }

  }
  
  addmessage(content) {
    const Oldmessages = this.state.messages;
    const chatObject = {
      username: "Bob",
      content,
    };
    const Newmessages = [...Oldmessages, chatObject];
    this.setState({ messages: Newmessages });
  }

  render() {
    // more code here..
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
      addmessage={this.addmessage}
      currentUser={this.state.currentUser}
      />
  </div> 
    );
  }
}
export default App;
