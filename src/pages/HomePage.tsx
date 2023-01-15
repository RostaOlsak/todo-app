import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import editPhoto from "../Icons/editPhoto.png";

const HomePage: React.FC = () => {
  const auth = getAuth();
  const userName = auth.currentUser?.email;

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);

  const addTask = (text: string) => {
    setTasks([...tasks, text]);
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
  };

  const editTask = (index: number, newTaskText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTaskText;
    setTasks(updatedTasks);
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
                <input type="checkbox" className="todo-input" />
                {index === editingTaskIndex ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                      className="input-edit"
                    />
                    <button className="save-button" onClick={() => editTask(index, taskText)}>
                      Save
                    </button>
                  </div>
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
