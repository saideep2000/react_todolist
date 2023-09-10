import React, {useState} from 'react'
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([{id: 1, name:'Todo 1' , complete:false}, {id: 2, name:'Todo 2' , complete:true}])


  return (
    <>
      <TodoList todos = {todos}/>
      <input type='text'/>
      <button>Add Todo</button>
      <button>Clear Complete</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
