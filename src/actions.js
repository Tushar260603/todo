// actions.js
//Explaination :-

/*
defines two action types (ADD_TASK and REMOVE_TASK) and 
action creators (addTask and removeTask) in a Redux application.

Action types are string constants that represent the type of action that occurred in application,
ADD_TASK represents an action type for adding a task, while REMOVE_TASK represents an action type for removing a task



Action Creators (addTask and removeTask):

Action creators are functions that create and return action objects.
These action objects typically contain a type property indicating the type of
action and optionally a payload property carrying any additional data relevant
to the action.

In the addTask action creator, it accepts a task parameter and returns 
an action object with the ADD_TASK type and the task as its payload.
In the removeTask action creator, it accepts a taskId parameter and returns
an action object with the REMOVE_TASK type and the taskId as its payload.

*/


export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export const addTask = task => ({
  type: ADD_TASK,
  payload: task
});

export const removeTask = taskId => ({
  type: REMOVE_TASK,
  payload: taskId
});
