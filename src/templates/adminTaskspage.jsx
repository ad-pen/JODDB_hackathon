import React, { useState } from 'react';
import '../static/styles_adminTaskpage.scss';

// --- Mock Data ---
// In a real app, this would come from your DB
const mockTasks = [
  { id: 1, taskNum: 'TASK 1', performed: 'PERFORMED TASK', tech: 'TECHNICIAN NAME', status: 'STATUS' },
  { id: 2, taskNum: 'TASK 2', performed: 'PERFORMED TASK', tech: 'TECHNICIAN NAME', status: 'STATUS' },
  { id: 3, taskNum: 'TASK 3', performed: 'PERFORMED TASK', tech: 'TECHNICIAN NAME', status: 'STATUS' },
  { id: 4, taskNum: 'TASK 4', performed: 'PERFORMED TASK', tech: 'TECHNICIAN NAME', status: 'STATUS' },
];

const mockTaskDetails = {
  techName: 'Mustafa Alkilani',
  submittedDate: '2025-10-28',
  opName: 'Alpha Test',
  serialNumber: 'SN-12345',
  expectedOutput: 50,
  actualOutput: 48,
  hoursSpent: '2.5',
};
// -------------------


/**
 * The Popup Modal Component
 */
const TaskPreviewModal = ({ task, onClose }) => {
  return (
    // The dark background overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content itself (stops click from closing) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <ul className="modal-details-list">
          <li>TECHNICIAN NAME: <span>{task.techName}</span></li>
          <li>SUBMITTED DATE: <span>{task.submittedDate}</span></li>
          <li>OP NAME: <span>{task.opName}</span></li>
          <li>DEVICE SERIAL NUMBER: <span>{task.serialNumber}</span></li>
          <li>EXPECTED OUTPUT NUMBER: <span>{task.expectedOutput}</span></li>
          <li>ACTUAL OUTPUT: <span>{task.actualOutput}</span></li>
          <li>HOURS SPENT: <span>{task.hoursSpent}</span></li>
        </ul>
        <div className="modal-actions">
          <button className="modal-btn approve" onClick={onClose}>✔</button>
          <button className="modal-btn reject" onClick={onClose}>✖</button>
        </div>
      </div>
    </div>
  );
};


/**
 * The Main Admin Page Component
 */
const AdminTasksPage = () => {
  // State to control when the task list appears
  const [showTasks, setShowTasks] = useState(false);
  
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // We use mock details here, but you would pass a real task ID
  const [selectedTask, setSelectedTask] = useState(null);

  // Handler for the "ENTER" button
  const handleEnter = (e) => {
    e.preventDefault();
    setShowTasks(true);
  };

  // Handler for clicking a task row
  const handleTaskClick = (task) => {
    // In a real app, you'd fetch details based on task.id
    setSelectedTask(mockTaskDetails); 
    setIsModalOpen(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <main className="admin-tasks-container">
        
        {/* --- Left Column: Filters --- */}
        <section className="filter-section">
          <form className="filter-form" onSubmit={handleEnter}>
            {/* Custom dropdown for Employee */}
            <div className="form-group">
              <label htmlFor="employee">SELECT EMPLOYEE</label>
              <div className="custom-select">
                <select id="employee" defaultValue="">
                  <option value="" disabled>Select an employee...</option>
                  <option value="mustafa">Mustafa Alkilani</option>
                  <option value="john">John Doe</option>
                </select>
              </div>
            </div>

            {/* Custom dropdown for Date */}
            <div className="form-group">
              <label htmlFor="date">SELECT DATE</label>
              <div className="custom-select">
                <select id="date" defaultValue="">
                  <option value="" disabled>Select a date...</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              ENTER
            </button>
          </form>
        </section>

        {/* --- Right Column: Task List --- */}
        <section className="tasks-list-section">
          {showTasks && (
            <div className="tasks-list">
              {mockTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="task-row" 
                  onClick={() => handleTaskClick(task)}
                >
                  <span className="task-num">{task.taskNum}</span>
                  <span className="task-field">{task.performed}</span>
                  <span className="task-field">{task.tech}</span>
                  <span className="task-field status">{task.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Render the modal only if it's open */}
      {isModalOpen && (
        <TaskPreviewModal task={selectedTask} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AdminTasksPage;