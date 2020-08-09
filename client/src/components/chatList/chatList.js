import React from 'react';
import './chatList.css';
import {connect} from 'react-redux';
import {setChosenUser, setFoundUsers, setMessageList} from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    contactList: state.contactList,
    chosenUser: state.chosenUser,
    authorizedUser: state.authorizedUser,
    messageList: state.messageList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      setChosenUser: (payload) => dispatch(setChosenUser(payload)),
      setFoundUsers: (payload) => dispatch(setFoundUsers(payload)),
      setMessageList: (payload) => dispatch(setMessageList(payload))
    }
};

class ChatList extends React.Component{

  //Получаем сообщения с выбранным пользователем с сервера
  getMessages(contact){
    this.props.setChosenUser(contact);
    this.fetchGetMessages(this.props.authorizedUser, this.props.chosenUser);
  }

  fetchGetMessages(receiver, sender){
    fetch('/api/message/getMessages', 
    {method: 'POST', 
    body: JSON.stringify({receiver, sender}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    }) 
    .then(data =>
      {
      this.props.setMessageList(data);
    }
    )
    .catch(error => console.log(error.message));
  }

  render(){
    return(
      <div className="chatList">
      <ul>
       {this.props.contactList.map(contact => {
        return (
         <li onClick={()=>this.getMessages(contact.name)} key={contact.id}>
            <div className="contact" >
              {contact.name}
            </div>
         </li>
        )
      })}
      </ul>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);