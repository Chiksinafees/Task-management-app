import React, { useState } from "react";

const TaskList = ({ title, tasks, onDelete, onUpdate, onMove }) => {
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({});

  const moveTaskHandler = (taskId, newList) => {
    //passing (id and selected list in which want to move task) to parent component
    onMove(taskId, newList);
  };

  const updateTaskHandler = (taskId, updatedTask) => {
    //passing (id and updated task ) to parent component
    onUpdate(taskId, updatedTask);
  };

  const editHandler = (taskId, title, description) => {
    //updating (title and description )
    setEditedTask({ id: taskId, title, description });
    setIsEditing(true);
  };

  const saveTaskHandler = () => {
    //  first save the updated task and them pass it to parent component
    if (editedTask.title && editedTask.description) {
      updateTaskHandler(editedTask.id, {
        title: editedTask.title,
        description: editedTask.description,
      });
      setIsEditing(false);
    }
  };

  const cancelUpdateHandler = () => {
    // if we don't want to update task
    setIsEditing(false);
  };

  return (
    <div className="mb-4  rounded-lg ">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 rounded-lg shadow-md mb-4  bg-red-300"
        >
          {isEditing && editedTask.id === task.id ? (
            <div>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="border rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="border rounded px-3 py-2 mb-2 w-full "
              />
              <div className="flex justify-end">
                <button
                  className="bg-green-700 text-white px-4 py-2 mr-2 rounded-md"
                  onClick={saveTaskHandler}
                >
                  Save
                </button>
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded-md"
                  onClick={cancelUpdateHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-bold mb-1">{task.title}</div>
              <p className="text-sm mb-2">{task.description}</p>
              <div className="flex">
                <button
                  className="bg-blue-600 text-white px-4 py-2 mr-2 rounded-md"
                  onClick={() =>
                    editHandler(task.id, task.title, task.description)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-700 text-white px-4 py-2 mr-2 rounded-md"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
                <select
                  className="border rounded px-3 py-2 bg-gray-100"
                  onChange={(e) => moveTaskHandler(task.id, e.target.value)}
                  value={task.list}
                >
                  <option value="Pending Task">Pending Task</option>
                  <option value="In Process">In Process</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
