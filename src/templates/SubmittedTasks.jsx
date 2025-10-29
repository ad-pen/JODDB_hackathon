import React from 'react';
import '../static/styles_submittedTasks.scss';
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
const TaskCard = ({ task }) => {
  const statusClass = task.status.toLowerCase(); 

  return (
    <div className="task-card" tabIndex="0">
      <div className="task-details">
        <ul>
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

const SubmittedTasks = () => {
  return (
   <> 
    <main className="submitted-tasks-container">
      <h1 className="submitted-title">SUBMITTED TASKS</h1>
      <hr className="title-divider" />
      
      <div className="tasks-grid">
        {mockTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
    </>
  );
};

export default SubmittedTasks;