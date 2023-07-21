import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const demoTask = [
    // created demo task for displaying as sample
    {
      id: 1,
      title: "Task 1",
      description: "Buy Birthday gift for sister",
      list: "Pending Task",
    },
    {
      id: 2,
      title: "Task 2",
      description: "long tour with cousins",
      list: "In Process",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Meeting with Boss",
      list: "Done",
    },
  ];

  const [tasks, setTasks] = useState(demoTask);  // use useState to update the state 

  const addTaskHandler = (newTask) => {
    // add function which add task, received data from child component 
    const taskWithId = {
      ...newTask,
      id: tasks.length + 1,
      list: "Pending Task",
    };
    setTasks([...tasks, taskWithId]);
  };

  const deleteTaskHandler = (taskId) => {
    // function added to delete task , used filter to match specific task, 
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTaskHandler = (taskId, updatedTask) => {
    // function to update task
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask }; //used spread and rest operator to copy existing task to update
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const moveTaskHandler = (taskId, newList) => {
    // function to move task from one list to another
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, list: newList };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const downloadInExcelHandler = () => {
    // to download task in excel created this function where we use blob
    const heading = ["id,title,description,list"];

    let tasksCsv = tasks.reduce((newArr, task) => {
      const { id, title, description, list } = task;
      newArr.push([id, title, description, list].join(","));
      return newArr;
    }, []);

    const data = [...heading, ...tasksCsv].join("\n");
    const fileName = "tasks.csv";
    const fileType = "text/csv";

    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  const taskLists = [
    { title: "Pending Task", filter: "Pending Task" },
    { title: "In Process", filter: "In Process" },
    { title: "Done", filter: "Done" },
  ];
  return (
    <div className="container mx-auto p-6 shadow-xl shadow-black bg-gray-200 mt-10">
      <h1 className="text-5xl font-bold mb-6 text-center ">
        Task Management App
      </h1>
      <TaskForm onAddTask={addTaskHandler} />
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4 mb-6 rounded-lg shadow-md hover:bg-green-600"
        onClick={downloadInExcelHandler}
      >
        Download in Excel
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskLists.map((list) => (
          <div key={list.filter} className="border rounded-lg p-6 bg-red-500">
            <h2 className="text-xl font-bold mb-4">{list.title}</h2>
            <TaskList                   // passing functions and data to child component 
              tasks={tasks.filter((task) => task.list === list.filter)}
              onDelete={deleteTaskHandler}
              onUpdate={updateTaskHandler}
              onMove={moveTaskHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
