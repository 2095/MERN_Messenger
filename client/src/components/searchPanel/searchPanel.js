import React from 'react';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import {setLogin, setPassword, changeLoggedIn, setAuthorizedUser, setChosenUser, setMessageList, setFoundUsers, addNewContact} 
  from '../../redux/actions';
import './searchPanel.css';
import { Alert  } from "react-alert";



const mapStateToProps = (state) => {
  return {
    login: state.login,
    password: state.password,
    loggedIn: state.loggedIn,
    authorizedUser: state.authorizedUser,
    chosenUser: state.chosenUser,
    messageList: state.messageList,
    foundUsers: state.foundUsers,
    contactList: state.contactList
  }};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (payload) => dispatch(setLogin(payload)),
    setPassword: (payload) => dispatch(setPassword(payload)),
    changeLoggedIn: () => dispatch(changeLoggedIn()),
    setAuthorizedUser: (payload) => dispatch(setAuthorizedUser(payload)),
    setChosenUser: (payload) => dispatch(setChosenUser(payload)),
    setMessageList: (payload) => dispatch(setMessageList(payload)),
    setFoundUsers: (payload) => dispatch(setFoundUsers(payload)),
    addNewContact: (payload) => dispatch(addNewContact(payload))
  }
  };

class SearchPanel extends React.Component{

  //Регистрация пользователя
  fetchRegistration(login, password) {
    fetch('/api/auth/register', 
    {method: 'POST', 
    body: JSON.stringify({login, password}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    }) 
    .then(data =>
      {
      this.props.setLogin('');
      this.props.setPassword('');
      alert(data.message);
    }
    )
    .catch(error => console.log(error.message));
  }

  //Вход пользователя
  fetchLogin(login, password) {
    fetch('/api/auth/login', 
    {method: 'POST', 
    body: JSON.stringify({login, password}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    })  
    .then(data =>
      {
      if (data.message){
        this.props.setLogin('');
        this.props.setPassword('');
        alert(data.message);
        throw new Error(data.message)
      };         
      this.props.setPassword('');
      this.props.changeLoggedIn();
      this.props.setAuthorizedUser(login);
      this.props.setChosenUser(login);
      this.fetchGetContact(login);
    }
    )
    .catch(error =>  console.log(error.message));
  }

  //Поиск пользователей по части имени
  fetchSearch(partialName) {
    fetch('/api/users/findUsers', 
    {method: 'POST', 
    body: JSON.stringify({partialName}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    })  
    .then(data =>
      this.props.setFoundUsers(data)
    )
    .catch(error =>  console.log(error.message));
  }

  //Получение всех пользователей, у которого с авторизированным пользователем открыты диалоги
  fetchGetContact(contact1) {
    fetch('/api/users/getContacts', 
    {method: 'POST', 
    body: JSON.stringify({contact1}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    })  
    .then(data =>
        this.getContactList(data)
    )
    .catch(error =>  console.log(error.message));
  }

  getContactList(contactList){
    for (const obj in contactList){
      this.props.addNewContact({name: contactList[obj].contact2, id: contactList[obj]._id})
    }
  }

  //Выход пользователя
  logOut(){
    this.props.setLogin('');
    this.props.setPassword('');
    this.props.changeLoggedIn();
    this.props.setAuthorizedUser('');
    this.props.setChosenUser('');
    this.props.setMessageList([]);
    this.props.setFoundUsers([]);
  }

  loginChange = (e) => {
    const login = e.target.value;

    this.props.setLogin(login);
  }

  passwordChange = (e) => {
    const password = e.target.value;

    this.props.setPassword(password);
  }

  searchChange = (e) => {
    if(e.target.value != '' && this.props.authorizedUser != ''){
      this.fetchSearch(e.target.value);
    } 
    else{
      this.props.setFoundUsers([])
    }
  }

  render(){

    if (!this.props.loggedIn){
    return(
      <div className="form-inline">
        <input className="inputSearch" type="text" placeholder="Search" aria-label="Search" onChange={this.searchChange}/>
         <Popup trigger={<button className="btn btn-primary btn-sm mr-1" type="button">Sign Up</button>} popupWindow>
          <div className="popupWindow">
            <div className="popupHeader"> Sign Up
            </div>
              <div className="popupContent">
                <input className="popupSearch m-2 d-flex" type="text" placeholder="Login" aria-label="Login" value={this.props.login}
                onChange={this.loginChange} />
                <input className="popupSearch m-2 d-flex" type="text" placeholder="Password" aria-label="Password" 
                value={this.props.password} onChange={this.passwordChange} />
              </div>
              <div className="popupActions">
                <button className="btn btn-primary btn-sm"
                  type="button" onClick={() => this.fetchRegistration(this.props.login, this.props.password)}>
                  Sign Up
                </button>
              </div>
          </div>
         </Popup>
         <Popup trigger={<button className="btn btn-primary btn-sm" type="button">Log In</button>} popupWindow>
         <div className="popupWindow">
            <div className="popupHeader"> Log In
            </div>
              <div className="popupContent">
                <input className="popupSearch m-2 d-flex" type="text" placeholder="Login" aria-label="Login" value={this.props.login}
                onChange={this.loginChange}/>
                <input className="popupSearch m-2 d-flex" type="text" placeholder="Password" aria-label="Password" value={this.props.password}
                onChange={this.passwordChange}/>
              </div>
              <div className="popupActions">
                <button className="btn btn-primary btn-sm"
                  type="button" onClick={() => this.fetchLogin(this.props.login, this.props.password)}>
                  Log In
                </button>
              </div>
          </div>
         </Popup>
      </div>
    )
  }
  else{
    return(
      <div className="form-inline">
        <input className="inputSearch" type="text" placeholder="Search" aria-label="Search" onChange={this.searchChange}/>
        <button className="btn btn-primary btn-sm logButton">
          {this.props.login}
        </button>
        <button className="btn btn-primary btn-sm exitButton"
        type="button" onClick={() => this.logOut()}>
          Log out
        </button>
      </div>
    )
  }
  }}


  export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
