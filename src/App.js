import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function TodoForm({ addTodo, errorInput }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!value) {
      errorInput(true);
      return;
    }

    errorInput(false);
    addTodo(value);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className={'input'}
        type='text'
        value={value}
        placeholder={'Add todo here'}
        onChange={handleChange} />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState(
    [
      {
        text: 'Buy groceries',
        isComplete: true
      },
      {
        text: 'Pay rent',
        isComplete: false
      },
      {
        text: 'Purchase TV',
        isComplete: false
      }
    ]
  );

  const [error, setError] = useState(false);

  const addTodo = (text) => {
    const newTodos = [...todos, { 
      text,
      isComplete: false
     }]
    setTodos(newTodos);
  }

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const errorInput = (error) => {
    setError(error);
  }

  return (
    <div className="app">
      <div className={'todo-list ' + (error ? 'nudge' : '')}>
      {
        todos.map((todo, index) => 
        <Todo 
        todo={todo} 
        key={index} 
        index={index} 
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
         />
        )
      }
      <TodoForm addTodo={addTodo} errorInput={errorInput} />
      </div>
    </div>
  );
}

function Todo({ todo, index, toggleTodo, removeTodo }) {
  const completedStyle = {textDecoration: 'line-through'};
  
  return (
    <div>
      <div className="todo">
      <span style={ todo.isComplete ? completedStyle : null }>{ todo.text }</span>
      <div>
        <button type="button" onClick={() => toggleTodo(index)}>{ todo.isComplete ? 'Not Complete' : 'Complete' }</button>
        <button type="button" onClick={() => removeTodo(index)}>remove</button></div>
      </div>
    </div>
  );
}

export default App;
