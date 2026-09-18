// src/components/TodoForm.jsx - Receives addTodo callback via props
import React from 'react';

import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 mb-8"
    >
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a professional task... 📋"
          className="flex-1 px-6 py-4 text-xl border-2 border-gray-200 rounded-2xl focus:border-indigo-400 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        <button
          type="submit"
          className="px-10 py-4 bg-linear-to-r from-indigo-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TodoForm;