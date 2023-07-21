import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

  const addTaskHandler = (e) => {
    e.preventDefault();
    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
    };
    onAddTask(newTask);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <form onSubmit={addTaskHandler} className="mb-4 space-y-4 ">
      <label className="block font-serif font-bold text-xl">
        Task Title:
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border rounded px-4 py-2 w-full"
          required
        />
      </label>
      <label className="block font-serif font-bold text-xl">
        Task Description:
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="border rounded px-4 py-2 w-full resize-none"
          rows="3"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
