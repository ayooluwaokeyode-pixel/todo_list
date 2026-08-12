import { useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false); // NEW STATE

  // Add or update task
  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      //Update existing task
      const updatedTasks = tasks.map((t, index) =>
      index === editIndex ? { ...t, text: task } : t
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    } else {
      // Add new task
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
    }

    setTask("");
  };

  // Delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setEditIndex(null);
  };

  // Mark tasks as done or undone
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
    i === index ? { ...t, completed: !t.completed} : t
  );
  setTasks(updatedTasks);
  };

  //Edit a task
  const editTask = (index) => {
    const selectedTask = tasks[index];
    if (selectedTask) {
      setTask(selectedTask.text);
      setEditIndex(index);
    }
  };

  // Filter Logic
  const filteredTasks = showCompleted ? tasks.filter((t) => t.completed) : tasks;

  return (
    <div className="container">
      <h1 className="title">To Do List App</h1>

      {/* Input Selection */}
      <div className="input-selection">
        <input type="text" placeholder="Enter a new task" value={task} onChange={(e) => 
          setTask(e.target.value)}
          className="task-input" />
        <button onClick={addOrUpdateTask} className="add-button">{editIndex !== null ? "Update Task" : "Add Task"}</button>
      </div>

      {/* Filter Button */}
      <div className="filter-selection">
        <button onClick={() => setShowCompleted(!showCompleted)} className="filter-button">
          {showCompleted ? "Show All Tasks" : "Show Completed Only"}
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-text"> {showCompleted ? "No completed tasks yet" : "No tasks yet. Add one above!"}</p> 
        ) : (
          <ul>
            {filteredTasks.map((task, index) => (
              <li key={index} className={`task-item ${task.completed ? "completed": ""}`}>
                <span onClick={() => toggleComplete(index)} className="task-text" title="Click me to mark complete or undo">{task.text}</span>
                <div className="buttons">
                  <button onClick={() => editTask(index)} className="edit-button">Edit</button>
                  <button onClick={() => deleteTask(index)} className="delete-button">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
