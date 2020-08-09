import React from 'react';
import './messageList.css';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  }
};

class MessageList extends React.Component{


    render(){
        return(
          <div className="messageList">
            <ul>
             {this.props.messageList.map(message => {
              return (
               <li className="message" key={message._id}>
                  <div className="sender">
                    {message.sender}
                  </div>
                    <div className="time">
                    {message.time}
                  </div>
                  <div className="textMessage">
                    {message.textMessage}
                  </div>
               </li>
              )
            })}
            </ul>
          </div>
        )
      }
}


export default connect(mapStateToProps)(MessageList);