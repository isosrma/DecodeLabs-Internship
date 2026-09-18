import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 flex items-center justify-between group">
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-md ${
            todo.completed
              ? 'bg-linear-to-r from-emerald-400 to-green-500 border-emerald-400 text-white scale-110'
              : 'border-gray-300 hover:border-indigo-400 hover:scale-110'
          }`}
        >
          {todo.completed && '✓'}
        </button>
        <span
          className={`text-xl font-medium transition-all duration-300 pr-4 ${
            todo.completed
              ? 'line-through text-gray-500 scale-95'
              : 'text-gray-800 group-hover:text-indigo-600'
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-3 rounded-2xl bg-linear-to-r from-red-400 to-rose-500 text-white hover:shadow-2xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        title="Delete task"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;