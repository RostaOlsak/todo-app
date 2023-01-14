import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import edit from "../Icons/edit-xxl.png"

const HomePage: React.FC = () => {
  const auth = getAuth();
  const userName = auth.currentUser?.email;

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

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
                <label htmlFor="todo-input" data-content={task}>
                  {task}
                </label>
              </div>
              <div className="buttons-container">
              <button className="edit-button"><img className="img-edit" src={edit} /></button>
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
