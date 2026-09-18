import React from 'react';

import TodoItem from "./Items";

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-linear-to-r from-indigo-400 to-blue-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            ✅
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No tasks yet!
          </h3>
          <p className="text-gray-500">
            Add your first professional task above
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo} // Drilled callback
            onDelete={onDeleteTodo} // Drilled callback
          />
        ))
      )}
    </div>
  );
}



export default TodoList;