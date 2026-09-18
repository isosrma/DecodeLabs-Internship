import React from 'react';
import { useState } from 'react';
import Header from './Header';
import TodoForm from './Form';
import TodoList from './List';

function TodoDemo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Callbacks for Form and List
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  // Filtered todos for List component
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header gets filter state + callback - DEMO props drilling */}
        <Header filter={filter} onFilterChange={updateFilter} />

        {/* Form gets addTodo callback */}
        <TodoForm onAddTodo={addTodo} />

        {/* List gets filteredTodos + callbacks - SHOWS drilling effect */}
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default TodoDemo;