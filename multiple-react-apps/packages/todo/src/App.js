import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App(props) {
  return (
    <div className="todo-app-outer">
      <div className="todo-app">
        <TodoList {...props} />
      </div>
    </div>
  );
}

export default App;
