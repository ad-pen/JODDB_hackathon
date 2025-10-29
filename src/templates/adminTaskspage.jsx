import React, { useState } from 'react';
import '../static/styles_adminTaskpage.scss';

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

// --- MODIFIED TaskPreviewModal ---
const TaskPreviewModal = ({ task, onClose, onApprove }) => {
  // Add state for the note
  const [note, setNote] = useState('');

  const handleApproveClick = () => {
    // Pass the note up to the parent component
    onApprove(note);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <ul className="modal-details-list">
          <li>TECHNICIAN NAME: <span>{task.techName}</span></li>
          <li>SUBMITTED DATE: <span>{task.submittedDate}</span></li>
          <li>OP NAME: <span>{task.opName}</span></li>
          <li>DEVICE SERIAL NUMBER: <span>{task.serialNumber}</span></li>
          <li>EXPECTED OUTPUT NUMBER: <span>{task.expectedOutput}</span></li>
          <li>ACTUAL OUTPUT: <span>{task.actualOutput}</span></li>
          <li>HOURS SPENT: <span>{task.hoursSpent}</span></li>
          
          {/* --- NEW NOTE SECTION --- */}
          <li className="note-section">
            <label htmlFor="adminNote">ADD A NOTE:</label>
            <textarea
              id="adminNote"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an optional note..."
              rows={3}
            />
          </li>
          {/* --- END NEW NOTE SECTION --- */}
        </ul>
        <div className="modal-actions">
          {/* Updated to call handleApproveClick */}
          <button className="modal-btn approve" onClick={handleApproveClick}>✔</button>
          {/* Kept as onClose */}
          <button className="modal-btn reject" onClick={onClose}>✖</button>
        </div>
      </div>
    </div>
  );
};

const AdminTasksPage = () => {
  const [showTasks, setShowTasks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEnter = (e) => {
    e.preventDefault();
    setShowTasks(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(mockTaskDetails); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // --- NEW: Handle Approve ---
  // This function receives the note from the modal
  const handleApprove = (note) => {
    console.log('Task Approved!');
    console.log('Submitted Note:', note);
    // Now, close the modal
    handleCloseModal();
  };

  return (
    <>
      <main className="admin-tasks-container">
      <section className="filter-section">
          <form className="filter-form" onSubmit={handleEnter}>
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

      {isModalOpen && (
        <TaskPreviewModal 
          task={selectedTask} 
          onClose={handleCloseModal} 
          onApprove={handleApprove} // Pass the new handler
        />
      )}
    </>
  );
};

export default AdminTasksPage;