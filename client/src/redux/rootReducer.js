import {combineReducers} from 'redux';

const initialState = {
    login: '',
    password: '',
    loggedIn: false,
    authorizedUser: '',
    chosenUser: ''
}

export  function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'setLogin':
          return {
              ...state,
              login: action.payload  
        };
    
        case 'setPassword':
          return {
            ...state,
            password: action.payload  
      };
    
        case 'changeLoggedIn':
          return {
            ...state,
            loggedIn: !state.loggedIn  
      };

      case 'setAuthorizedUser': 
        return {
          ...state,
          authorizedUser: action.payload  
    };

      case 'setChosendUser': 
        return {
          ...state,
          chosenUser: action.payload  
    };
    
        default:
          return state;
      }
}