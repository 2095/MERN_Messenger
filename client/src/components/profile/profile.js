import React from 'react';
import {connect} from 'react-redux';
import './profile.css'

const mapStateToProps = (state) => {
  return {
    chosenUser: state.chosenUser
  }};

class Profile extends React.Component{

  render(){
    return(
      <div className="card profile">
        <div className="card-body">
          <h5 className="card-title">{this.props.chosenUser}</h5>
          {/* <p className="card-text">Description</p> */}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile);