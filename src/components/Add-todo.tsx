import React from "react";

const AddTodo = () => {
  return (
    <section className="Add-background-box">
      <div className="title">TO:DO</div>
      <div className="input-container">
        <input type="text" className="add-input" />
        <button className="add-button">ADD</button>
      </div>
    </section>
  );
};

export default AddTodo;
