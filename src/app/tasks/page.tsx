'use client';

import { useEffect, useState } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any>([]);
  const [taskInput, setTaskInput] = useState({
    name: '',
    description: '',
    category: '',
    deadline: '',
    predictedTime: '',
    dateToFinish: '',
    cycles: '',
    workTime: '',
    breakTime: '',
  });

  // Fetch tasks from the database
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  // Add a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskInput),
    }).then((res) => res.json());

    setTasks([...tasks, newTask]);
    setTaskInput({
      name: '',
      description: '',
      category: '',
      deadline: '',
      predictedTime: '',
      dateToFinish: '',
      cycles: '',
      workTime: '',
      breakTime: '',
    });
  };

  return (
    <div>
      <h1>Task Management</h1>

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={taskInput.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={taskInput.description}
          onChange={handleInputChange}
        />
        <select
          name="category"
          value={taskInput.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="timed">Timed</option>
          <option value="pomodoro">Pomodoro</option>
          <option value="checklist">Checklist</option>
        </select>

        {/* Conditional Fields for Timed Tasks */}
        {taskInput.category === 'timed' && (
          <>
            <input
              type="datetime-local"
              name="deadline"
              value={taskInput.deadline}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="predictedTime"
              placeholder="Predicted Time (minutes)"
              value={taskInput.predictedTime}
              onChange={handleInputChange}
              required
            />
          </>
        )}

        {/* Conditional Fields for Pomodoro Tasks */}
        {taskInput.category === 'pomodoro' && (
          <>
            <input
              type="date"
              name="dateToFinish"
              value={taskInput.dateToFinish}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="cycles"
              placeholder="Number of Cycles"
              value={taskInput.cycles}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="workTime"
              placeholder="Work Time (minutes)"
              value={taskInput.workTime}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="breakTime"
              placeholder="Break Time (minutes)"
              value={taskInput.breakTime}
              onChange={handleInputChange}
              required
            />
          </>
        )}

        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task:any) => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            {task.category === 'timed' && (
              <>
                <p>Deadline: {task.deadline}</p>
                <p>Predicted Time: {task.predictedTime} minutes</p>
              </>
            )}
            {task.category === 'pomodoro' && (
              <>
                <p>Date to Finish: {task.dateToFinish}</p>
                <p>Cycles: {task.cycles}</p>
                <p>Work Time: {task.workTime} minutes</p>
                <p>Break Time: {task.breakTime} minutes</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
