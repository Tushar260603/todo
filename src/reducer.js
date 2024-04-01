// reducer.js
import { ADD_TASK, REMOVE_TASK } from './actions';
//Explaination :-
/*
Initial State:

initialState: This object defines the initial state of the reducer,
 which includes a tasks array initialized as an empty array. 
 This is the initial state of the application before any actions
 are dispatched.

*/

const initialState = {
  tasks: []
};
/*
reducer: This function takes two parameters: state nd action

state: Represents the current state of the reducer. 
If no state is provided (e.g., when the application starts), 
it defaults to the initialState.

action: Represents the action dispatched to the reducer.
 Actions are plain JavaScript objects with a type property indicating 
 the type of action and an optional payload property carrying 
 additional data

 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
