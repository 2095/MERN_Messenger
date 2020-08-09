import React from 'react';
import {connect} from 'react-redux';
import './profile.css';
import {setChosenUser, setFoundUsers} from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    chosenUser: state.chosenUser,
    foundUsers: state.foundUsers
  }};

const mapDispatchToProps = (dispatch) => {
  return {
      setChosenUser: (payload) => dispatch(setChosenUser(payload)),
      setFoundUsers: (payload) => dispatch(setFoundUsers(payload))
    }
};

class Profile extends React.Component{

  //Выбираем из найденных пользователей, с кем будем ввести диалог
  changeChosenUser = (user) => {
    this.props.setChosenUser(user.login);
    this.props.setFoundUsers([user]);
  }

  render(){
    return(
      <div className="card profile">
        <div className="card-body">
            {this.props.foundUsers.map(user => {
              return (
                <h5 className="card-title" onClick={()=>this.changeChosenUser(user)} key={user._id}>{user.login}</h5>)
            })}
          {/* <h5 className="card-title">{this.props.chosenUser}</h5> */}
          {/* <p className="card-text">Description</p> */}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);