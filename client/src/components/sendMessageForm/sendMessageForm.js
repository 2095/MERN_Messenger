import React from 'react';
import './sendMessageForm.css';
import {connect} from 'react-redux';
import {setCurrentMessage, setMessageList, addNewContact} from '../../redux/actions';


const mapStateToProps = (state) => {
    return {
        currentMessage: state.currentMessage,
        authorizedUser: state.authorizedUser,
        chosenUser: state.chosenUser,
        messageList: state.messageList,
        contactList: state.contactList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentMessage: (payload) => dispatch(setCurrentMessage(payload)),
        setMessageList: (payload) => dispatch(setMessageList(payload)),
        addNewContact: (payload) => dispatch(addNewContact(payload))
    }
};


class SendMessageForm extends React.Component{

    sendMessage = () => {
      if(this.props.chosenUser != this.props.authorizedUser){
        this.fetchCreateMessage(this.props.currentMessage, this.props.chosenUser, this.props.authorizedUser);
        this.fetchCreateContact(this.props.authorizedUser, this.props.chosenUser);
        this.props.setCurrentMessage('');
      }
    }

    //Создание сообщения на сервере
    fetchCreateMessage(textMessage, receiver, sender){
        fetch('/api/message/createMessage',
        {method: 'POST', 
        body: JSON.stringify({textMessage, receiver, sender}),
        headers: {'Content-Type': 'application/json' }})
        .then(res => {
            return res.json();
          })
        .then(data =>
          {
            this.props.setCurrentMessage('');
            this.props.setMessageList(data); 
          }
        )
        .catch(error =>  console.log(error.message));
    }

    //Создание диалога с пользователем
    fetchCreateContact(contact1, contact2){
      fetch('/api/users/createContacts',
      {method: 'POST', 
      body: JSON.stringify({contact1, contact2}),
      headers: {'Content-Type': 'application/json' }})
      .then(res => {
          return res.json();
        })
      .then(data =>
        { 
          if(!data.message){
             this.props.addNewContact({name: data.contact2, id: data._id}); 
          }
        }
      )
      .catch(error =>  console.log(error.message));
  }

    render(){
        return(
          <div className="sendMessageForm input-group">
              <textarea className="form-control custom-control" rows="3" value = {this.props.currentMessage}
                onChange={(e) =>  this.props.setCurrentMessage(e.target.value)}></textarea>     
                <span className="input-group-addon btn btn-primary" onClick={()=>this.sendMessage()}>Send</span>       
          </div>
        )
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);