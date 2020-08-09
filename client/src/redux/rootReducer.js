const initialState = {
    login: '',
    password: '',
    loggedIn: false,
    authorizedUser: '',
    chosenUser: '',
    currentMessage: '',
    messageList: [],
    foundUsers: [],
    contactList: []
}

export function rootReducer(state = initialState, action){
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

      case 'setChosenUser': 
        return {
          ...state,
          chosenUser: action.payload  
    };

      case 'setCurrentMessage': 
        return {
          ...state,
          currentMessage: action.payload  
    };

      case 'setMessageList': 
        return {
          ...state,
          messageList: action.payload  
};

      case 'setFoundUsers': 
          return {
             ...state,
             foundUsers: action.payload  
      };

      case 'addNewContact': 
          return {
             ...state,
             contactList: [...state.contactList, action.payload]  
      };
    
        default:
          return state;
      }
}