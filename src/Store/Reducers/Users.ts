import { actionTypes } from '../../Constants/index';

const initState = {

  characters: [],
  
};

const CharactersReducer = (state = initState, action: { type: any; payload: { char_id: any; }; }) => {
   
  switch (action.type) {

    case actionTypes.GET_CHARACTERS: {
      return {
        ...state,
        characters: action.payload,
      };
    }
    default:
      return state;
  }
};

export default CharactersReducer;