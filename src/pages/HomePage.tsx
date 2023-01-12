import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const HomePage: React.FC = () => {
  const auth = getAuth();
  const userName = auth.currentUser?.email;

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const addTask = (text: string) => {
    setTasks([...tasks, text]);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addTask(taskText);
    setTaskText("");
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
        <button className="add-button" onClick={handleClick}>
          +
        </button>
      </form>
      <div className="big-task-input-container">
        <div className="task-input-container">
          {tasks.map((task, index) => (
            <div className="tasks-input" key={index}>
              <input type="checkbox"/>
              {task}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
