import React from 'react';
import Popup from "reactjs-popup";
import {connect} from 'react-redux';
import {setLogin, setPassword, changeLoggedIn, setAuthorizedUser, setChosendUser} from '../../redux/actions';
import './searchPanel.css';
import { Alert  } from "react-alert";
import Select from "react-dropdown-select";



const mapStateToProps = (state) => {
  return {
    login: state.login,
    password: state.password,
    loggedIn: state.loggedIn,
    authorizedUser: state.authorizedUser,
    chosenUser: state.chosenUser
  }};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (payload) => dispatch(setLogin(payload)),
    setPassword: (payload) => dispatch(setPassword(payload)),
    changeLoggedIn: () => dispatch(changeLoggedIn()),
    setAuthorizedUser: (payload) => dispatch(setAuthorizedUser(payload)),
    setChosendUser: (payload) => dispatch(setChosendUser(payload))
  }
  };

class SearchPanel extends React.Component{

  // state = {
  //   login: '',
  //   password: '',
  //   loggedIn: false
  // }


  fetchRegistration(login, password) {
    fetch('/api/auth/register', 
    {method: 'POST', 
    body: JSON.stringify({login, password}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      return res.json();
    }) 
    .then(data =>
      // this.setState({
      //   login: '',
      //   password: ''
     // })
      {
      this.props.setLogin('');
      this.props.setPassword('');
      alert(data.message);
    }
    )
    .catch(error => console.log(error.message));
  }

  fetchLogin(login, password) {
    fetch('/api/auth/login', 
    {method: 'POST', 
    body: JSON.stringify({login, password}),
    headers: {'Content-Type': 'application/json' }})
    .then(res => {
      // if (!res.ok) { throw new Error('Something went wrong') }
      return res.json();
    })  
    .then(data =>
      // this.setState({
      //   //login: '',
      //   password: '',
      //   loggedIn: !loggedIn
      // })
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
      this.props.setChosendUser(login);
    }
    )
    .catch(error =>  console.log(error.message));
  }

  logOut(){
    // this.setState({
    //   login: '',
    //   password: '',
    //   loggedIn: !loggedIn
    // })
    this.props.setLogin('');
    this.props.setPassword('');
    this.props.changeLoggedIn();
    this.props.setAuthorizedUser('');
  }

  loginChange = (e) => {
    const login = e.target.value;

    // this.setState({login});
    this.props.setLogin(login);
  }

  passwordChange = (e) => {
    const password = e.target.value;

    // this.setState({password});
    this.props.setPassword(password);
  }

  searchChange = (e) => {
    this.props.setChosendUser(e[0].name);
  }

  render(){

    // const {login, password, loggedIn} = this.state;

    if (!this.props.loggedIn){
    return(
      <div className="form-inline">
        <Select  type="text" placeholder="Search" aria-label="Search" options={[{id: 1, name: 'Test2'}]} 
                onChange={(values) => this.searchChange(values)} style={{width: '50rem', margin: '10px'}}  dropdownHandle={false} 
                 noDataLabel='' multi={false} valueField={'id'} labelField={'name'} searchBy={'name'} clearable={true}
                 />
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
        <Select  type="text" placeholder="Search" aria-label="Search" options={[{id: 1, name: 'Test2'}]} 
                onChange={(values) => this.searchChange(values)} style={{width: '50rem', margin: '10px'}}  dropdownHandle={false} 
                 noDataLabel='' multi={false} valueField={'id'} labelField={'name'} searchBy={'name'} clearable={true}
                 />
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
