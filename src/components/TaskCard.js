import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  
    const [isUpdating, setIsUpdating] = useState(false);
    const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const updateHandler = () => {
    // created this function to pass id and updated data to parent component
    onUpdate(task.id, editedTask);
    setIsUpdating(false);
  };

  const deleteHandler = () => {
    // same also here passing data to parent component
    onDelete(task.id);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg mb-4 bg-gray-400">
      {isUpdating ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="border rounded-lg px-4 py-2 w-full resize-none"
            placeholder="Description"
            rows="3"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              onClick={updateHandler}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="font-bold mb-2">{task.title}</div>
          <p className="mb-2">{task.description}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={deleteHandler}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={() => {
                setEditedTask({
                  title: task.title,
                  description: task.description,
                });
                setIsUpdating(true);
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
