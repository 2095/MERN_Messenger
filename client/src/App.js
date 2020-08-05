import React from 'react';
import './App.css';
import SearchPanel from './components/searchPanel';
import ChatList from './components/chatList';
import Chat from './components/chat';
import Profile from './components/profile';

export default class App extends React.Component {

  render(){

    return(
      <div className="container">
        <SearchPanel className="search-panel d-flex"/>
        <div className="row justify-content-between">
          <ChatList />
          <Chat />
          <Profile />
        </div>
      </div>
  )
};
}
