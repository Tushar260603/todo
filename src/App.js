import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import { connect } from 'react-redux';
import { addTask, removeTask } from './actions';
import {motion} from "framer-motion"
function App ({ tasks, addTask, removeTask }) {
  const [isCompleteScreen, setIsCompleteScreen] = useState (false);
  const [allTodos, setTodos] = useState ([]);
  const [newTitle, setNewTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

//if no task we should print something for it 

  const handleAddTodo = () => {
    /*Validation:

It checks if the newTitle (presumably representing the title of the new todo) is empty or contains only whitespace characters using trim().
If it's empty, it shows an alert message asking the user to enter a valid task title and returns from the function. */
    if (newTitle.trim() === '') {
      alert('Please enter a valid task title!');
      return;
    }
/*Creating a New Todo Item:

If the title is not empty, it creates a new todo item object (newTodoItem) 
with the provided title, description, and a unique ID generated using Date.now(). */
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      id: Date.now()
    };
    /*Updating State:

It dispatches an action (addTask) to add the new todo item to the Redux store. 
This assumes that addTask is a function that dispatches an action to add a new task 
to the Redux store. */

    addTask({ id: Date.now(), title:newTitle,description:newDescription });

/** It updates the local state (allTodos) by adding the new todo item to the existing array of todos.
It sets the state using setTodos. */
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newTodoItem);
    setTodos (updatedTodoArr);
   
    /**Updating Local Storage:

It updates the local storage with the updated todo list by serializing the 
updatedTodoArr array into a JSON string and storing it under the key 'todolist'. */
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));

    /**Clearing Input Fields:

It clears the input fields for the title and description by setting their respective state variables (newTitle and newDescription) to an empty string. */
    setNewTitle("")
    setNewDescription("")
  };



  const handleDeleteTodo = (index,taskId) => {
    // console.log(taskId)

    /**Copying the Todos Array:

It creates a copy of the allTodos array using the spread operator [...allTodos]. This is done to avoid mutating the original state directly. */
    let reducedTodo = [...allTodos];
    //here we r removing todo item
    reducedTodo.splice(index, 1); // Specify the number of items to remove (1 in this case)
    /**Dispatching an Action:

It dispatches an action (removeTask) to 
remove the task from the Redux store. This assumes that removeTask is a function that dispatches an action to remove a task from the Redux store. */
    removeTask(taskId);
    /**Updating Local Storage:

It updates the local storage with the updated todo list by serializing the reducedTodo array into a JSON string and storing it under the key 'todolist'

*/
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));

    setTodos(reducedTodo);
  };

  const handleComplete = index => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
     // Format the current date and time
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

       // Create a new object representing the completed todo item
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn, // Add a new property 'completedOn' with the formatted completion time
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push (filteredItem);
    setCompletedTodos (updatedCompletedArr);

    handleDeleteTodo (index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
    //we are setting completed tasks in localstorage and after that we get it and print it in completed section
  };


  // console.log(tasks)
  const handleDeleteCompletedTodo = index => {
    //it takes an index parameter, which represents the index of the completed todo item to be deleted

    let reducedTodo = [...completedTodos];
    reducedTodo.splice (index,1);
    /**It creates a copy of the completedTodos array using the spread operator [...completedTodos].
It removes the todo item at the specified index from the copied array using the splice method.
It updates the local storage with the modified array of completed todos by serializing it into a JSON string and storing it under the key 'completedTodos'.
It sets the state of completedTodos with the updated array containing the deleted todo item. */

    localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
    setCompletedTodos (reducedTodo);
  };

  useEffect (() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedTodo = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodo) {
      setTodos (savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos (savedCompletedTodo);
    }
  }, []);


  const handleEdit = (ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateToDo = ()=>{
    //it update the todo task
      let newToDo = [...allTodos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit("");
  }



  return (
    <> 
    <h1 style={{textAlign:"center",fontFamily:"cursive"}}>Todo List</h1>
   
    <div className="App">
        

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label style={{fontFamily:"cursive"}}>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle (e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label style={{fontFamily:"cursive"}}>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button style={{fontFamily:"cursive"}}
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area" >
          <button style={{fontFamily:"cursive"}}
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}
          >
            Todo
          </button>
          <button style={{fontFamily:"cursive"}}
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">

          {isCompleteScreen === false &&
            allTodos.map ((item, index) => {
              if(currentEdit===index){
                 return(
                  <motion.div 
              
                  
                  className='edit__wrapper' key={index}>
                  <input placeholder='Updated Title' 
                  onChange={(e)=>handleUpdateTitle(e.target.value)} 
                  value={currentEditedItem.title}  />
                  <textarea placeholder='Updated Title' 
                  rows={4}
                  onChange={(e)=>handleUpdateDescription(e.target.value)} 
                  value={currentEditedItem.description}  />
                   <button
              type="button"
              onClick={handleUpdateToDo}
              className="primaryBtn"
            >
              Update
            </button>
              </motion.div> 
                 ) 
              }else{
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
  
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo (index,item.id)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete (index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit  className="check-icon"
                        onClick={() => handleEdit (index,item)}
                        title="Edit?" />
                    </div>
  
                  </div>
                );
              }
              
            })}

          {isCompleteScreen === true &&
            completedTodos.map ((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>

                  <div>
                    <AiOutlineDelete
                    style={{marginLeft:"3%"}}
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo (index)}
                      title="Delete?"
                    />
                  </div>

                </div>
              );
            })}

        </div>
      </div>
    </div>
    </>
  );
}
const mapStateToProps = state => ({
  tasks: state.tasks
});

const mapDispatchToProps = {
  addTask,
  removeTask
};


export default connect(mapStateToProps, mapDispatchToProps) (App);




















// import React, { useState, useEffect } from 'react';
// import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
// import { BsCheckLg } from 'react-icons/bs';
// import { connect } from 'react-redux';
// import { addTask, removeTask } from './actions';

// function App({ tasks, addTask, removeTask }) {
//   const [isCompleteScreen, setIsCompleteScreen] = useState(false);
//   const [allTodos, setTodos] = useState([]);
//   const [newTitle, setNewTitle] = useState('');
//   const [newDescription, setNewDescription] = useState('');
//   const [completedTodos, setCompletedTodos] = useState([]);
//   const [currentEdit, setCurrentEdit] = useState('');
//   const [currentEditedItem, setCurrentEditedItem] = useState('');

//   // Rest of your code remains unchanged

//   const handleAddTodo = () => {
    
//     let newTodoItem = {
//       title: newTitle,
//       description: newDescription,
//       id: Date.now()
//     };
//     addTask({ id: Date.now(), title:newTitle,description:newDescription });
//     let updatedTodoArr = [...allTodos];
//     updatedTodoArr.push (newTodoItem);
//     setTodos (updatedTodoArr);
   
//     localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
//     setNewTitle("")
//     setNewDescription("")
//   };

//   const handleDeleteTodo = (index,taskId) => {
//     // console.log(taskId)
//     let reducedTodo = [...allTodos];
//     reducedTodo.splice(index, 1); // Specify the number of items to remove (1 in this case)
//     removeTask(taskId);
//     localStorage.setItem('todolist', JSON.stringify(reducedTodo));
//     setTodos(reducedTodo);
//   };

//   const handleComplete = index => {
//     let now = new Date ();
//     let dd = now.getDate ();
//     let mm = now.getMonth () + 1;
//     let yyyy = now.getFullYear ();
//     let h = now.getHours ();
//     let m = now.getMinutes ();
//     let s = now.getSeconds ();
//     let completedOn =
//       dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

//     let filteredItem = {
//       ...allTodos[index],
//       completedOn: completedOn,
//     };

//     let updatedCompletedArr = [...completedTodos];
//     updatedCompletedArr.push (filteredItem);
//     setCompletedTodos (updatedCompletedArr);
//     handleDeleteTodo (index);
//     localStorage.setItem (
//       'completedTodos',
//       JSON.stringify (updatedCompletedArr)
//     );
//   };
//   // console.log(tasks)
//   const handleDeleteCompletedTodo = index => {
//     let reducedTodo = [...completedTodos];
//     reducedTodo.splice (index,1);

//     localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
//     setCompletedTodos (reducedTodo);
//   };

//   useEffect (() => {
//     let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
//     let savedCompletedTodo = JSON.parse (
//       localStorage.getItem ('completedTodos')
//     );
//     if (savedTodo) {
//       setTodos (savedTodo);
//     }

//     if (savedCompletedTodo) {
//       setCompletedTodos (savedCompletedTodo);
//     }
//   }, []);


//   const handleEdit = (ind,item)=>{
//     console.log(ind);
//     setCurrentEdit(ind);
//     setCurrentEditedItem(item);
//   }

//   const handleUpdateTitle = (value)=>{
//     setCurrentEditedItem((prev)=>{
//       return {...prev,title:value}
//     })
//   }

//   const handleUpdateDescription = (value)=>{
//     setCurrentEditedItem((prev)=>{
//       return {...prev,description:value}
//     })
//   }

//   const handleUpdateToDo = ()=>{
//       let newToDo = [...allTodos];
//       newToDo[currentEdit] = currentEditedItem;
//       setTodos(newToDo);
//       setCurrentEdit("");
//   }


//   return (
//     <div className="App">
//       <h1 className="text-3xl font-bold my-4">Todo List</h1>

//       <div className="max-w-lg mx-auto p-4 border border-gray-200 rounded-md">
//         <div className="mb-4">
//           <input
//             type="text"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             placeholder="What's the task title?"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             value={newDescription}
//             onChange={(e) => setNewDescription(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             placeholder="What's the task description?"
//           />
//         </div>
//         <div>
//           <button
//             type="button"
//             onClick={handleAddTodo}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-center mt-4">
//         <button
//           className={`mx-2 py-2 px-4 rounded-md ${
//             isCompleteScreen === false ? 'bg-blue-500 text-white' : 'bg-gray-300'
//           }`}
//           onClick={() => setIsCompleteScreen(false)}
//         >
//           Todo
//         </button>
//         <button
//           className={`mx-2 py-2 px-4 rounded-md ${
//             isCompleteScreen === true ? 'bg-blue-500 text-white' : 'bg-gray-300'
//           }`}
//           onClick={() => setIsCompleteScreen(true)}
//         >
//           Completed
//         </button>
//       </div>

//       <div className="max-w-lg mx-auto mt-4">
//         {isCompleteScreen === false &&
//           allTodos.map((item, index) => {
//             // Rest of your code remains unchanged
//           })}

//         {isCompleteScreen === true &&
//           completedTodos.map((item, index) => {
//             // Rest of your code remains unchanged
//           })}
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   tasks: state.tasks,
// });

// const mapDispatchToProps = {
//   addTask,
//   removeTask,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);












