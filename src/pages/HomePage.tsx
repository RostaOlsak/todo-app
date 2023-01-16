import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import editPhoto from "../Icons/editPhoto.png";
import TaskInput from "./TaskInput";

const HomePage: React.FC = () => {
  const auth = getAuth();
  const userName = auth.currentUser?.email;

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    const storedCheckedTasks = JSON.parse(localStorage.getItem("checkedTasks") || "[]");
    if (storedCheckedTasks) {
        setCheckedTasks(storedCheckedTasks);
    }
}, []);

  const addTask = (text: string) => {
    setTasks([...tasks, text]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, text]));
  };

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (taskText === "" || taskText === null) {
      return;
    }

    addTask(taskText);
    setTaskText("");
  };

  const deleteTodo = (index: number) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index: number, newTaskText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTaskText;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingTaskIndex(-1);
  };

  return (
    <section className="homepage-container">
      <div className="footer">
        <div className="title">
          TO<span className="span-title">:DO</span>
        </div>
        <div className="sign-out-container">
          <div className="user-email">{userName}</div>
          <button className="sign-out-button" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </div>
      </div>
      <form className="input-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="input-add"
          placeholder="Add a task"
        />
        <button className="add-button" onClick={addTodo}>
          +
        </button>
      </form>
      <div className="big-task-input-container">
        <div className="task-input-container">
          {tasks.map((task, index) => (
            <div className="tasks-input" key={index}>
              <div className="checkbox-with-text">
                <input
                  type="checkbox"
                  className="todo-input"
                  checked={checkedTasks[index]}
                  onChange={() => {
                    const updatedCheckedTasks = [...checkedTasks];
                    updatedCheckedTasks[index] = !checkedTasks[index];
                    setCheckedTasks(updatedCheckedTasks);
                    localStorage.setItem(
                      "checkedTasks",
                      JSON.stringify(updatedCheckedTasks)
                    );
                  }}
                />
                {index === editingTaskIndex ? (
                  <TaskInput
                    task={task}
                    onSave={(newTask) => editTask(index, newTask)}
                  />
                ) : (
                  <label htmlFor="todo-input" data-content={task}>
                    {task}
                  </label>
                )}
              </div>
              <div className="buttons-container">
                <button
                  className="edit-button"
                  onClick={() => setEditingTaskIndex(index)}
                >
                  <img className="img-edit" src={editPhoto} />
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="delete-button"
                >
                  <span className="delete-text-span">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
