import React, {useState} from "react";

interface TaskInputProps {
    task: string;
    onSave: (newTask: string) => void;
  }
  
  const TaskInput: React.FC<TaskInputProps> = ({ task, onSave }) => {
    const [editingTask, setEditingTask] = useState(task);
  
    return (
      <div>
        <input
          type="text"
          value={editingTask}
          onChange={(e) => setEditingTask(e.target.value)}
          className="input-edit"
        />
        <button className="save-button" onClick={() => onSave(editingTask)}>Save</button>
      </div>
    );
  };

  export default TaskInput;