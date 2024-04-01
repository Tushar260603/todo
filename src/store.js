// store.js

//Explaination :-
/*

The createStore function is imported from the Redux library.
The reducer function, which I created earlier, is imported from the reducer.js file
 The reducer defines how the state of the application should change in response 
 to actions dispatched to the store.

The createStore function takes the reducer function as an argument and returns a Redux store object.

Inside the createStore function, the initial state of the store is set based on
 the initial state defined in the reducer.

The store constant holds the reference to the Redux store created by createStore(reducer)

Finally, the store object is exported as the default export of this module.

*/



import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;




/*
The store provides methods to:
Dispatch actions: Actions are dispatched to the store to trigger state changes.
*/