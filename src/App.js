import React, {useState, useRef, useEffect} from 'react'
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //load our todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log('Loaded from localStorage:', storedTodos);
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // save our todos
  useEffect(()=> {
    console.log('Saving to localStorage:', todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }

  // function to add todos
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === "") return 
    // add the todos to the prev todos
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete: false}]
  })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      <input ref={todoNameRef} type='text'/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
