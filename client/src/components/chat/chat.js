import React from 'react';
import './chat.css'
import SendMessageForm from '../sendMessageForm';
import MessageList from '../messageList';


export default class Chat extends React.Component{

  render(){
    return(
      <div className="chat">
        < MessageList />
        < SendMessageForm />
      </div>
    )
  }
}
