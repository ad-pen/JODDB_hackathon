import React from 'react';
import '../static/styles_submittedTasks.scss';
import Header from './header';
/**
 * A single task card component.
 */
const mockTasks = [
  {
    id: 1,
    opName: "Alpha Test",
    serialNumber: "SN-12345",
    outputNumber: "OUT-001",
    status: "Pending"
  },
  {
    id: 2,
    opName: "Bravo Check",
    serialNumber: "SN-67890",
    outputNumber: "OUT-002",
    status: "Completed"
  },
  {
    id: 3,
    opName: "Charlie Scan",
    serialNumber: "SN-54321",
    outputNumber: "OUT-003",
    status: "Pending"
  },
  {
    id: 4,
    opName: "Delta Repair",
    serialNumber: "SN-09876",
    outputNumber: "OUT-004",
    status: "Failed"
  }
];

/**
 * A single, parameterized task card component.
 * It takes a 'task' object as a prop.
 */
const TaskCard = ({ task }) => {
  // Get the status in lowercase for the CSS class (e.g., "pending")
  const statusClass = task.status.toLowerCase(); 

  return (
    <div className="task-card" tabIndex="0">
      <div className="task-details">
        <ul>
          {/* We now show Label: Value */}
          <li>
            <strong>OP NAME:</strong>
            <span>{task.opName}</span>
          </li>
          <li>
            <strong>DEVICE SERIAL NUMBER:</strong>
            <span>{task.serialNumber}</span>
          </li>
          <li>
            <strong>OUTPUT NUMBER:</strong>
            <span>{task.outputNumber}</span>
          </li>
        </ul>
      </div>
      <div className="task-status">
        STATUS: <span className={`status ${statusClass}`}>{task.status.toUpperCase()}</span>
      </div>
    </div>
  );
};

/**
 * The main page component for "Submitted Tasks".
 */
const SubmittedTasks = () => {
  return (
   <> 
    <Header />
    <main className="submitted-tasks-container">
      <h1 className="submitted-title">SUBMITTED TASKS</h1>
      <hr className="title-divider" />
      
      <div className="tasks-grid">
        {/* Map over the mock tasks and render a card for each */}
        {mockTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
    </>
  );
};

export default SubmittedTasks;