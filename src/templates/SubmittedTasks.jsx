import React, { useState } from 'react';
import '../static/styles_submittedTasks.scss';

// --- Helper to format dates (for mock data) ---
const formatDate = (date) => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

// --- Updated mock data with dates ---
const mockTasks = [
  {
    id: 1,
    opName: "Alpha Test",
    serialNumber: "SN-12345",
    outputNumber: "OUT-001",
    status: "Pending",
    date: formatDate(today) // Today
  },
  {
    id: 2,
    opName: "Bravo Check",
    serialNumber: "SN-67890",
    outputNumber: "OUT-002",
    status: "Completed",
    date: formatDate(yesterday) // Yesterday
  },
  {
    id: 3,
    opName: "Charlie Scan",
    serialNumber: "SN-54321",
    outputNumber: "OUT-003",
    status: "Pending",
    date: formatDate(yesterday) // Yesterday
  },
  {
    id: 4,
    opName: "Delta Repair",
    serialNumber: "SN-09876",
    outputNumber: "OUT-004",
    status: "Failed",
    date: formatDate(twoDaysAgo) // Two days ago
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
  // --- State for filters ---
  const [filterType, setFilterType] = useState('all');
  const [customDate, setCustomDate] =useState(formatDate(new Date()));

  // --- Filtering Logic ---
  const todayStr = formatDate(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = formatDate(yesterdayDate);

  const filteredTasks = mockTasks.filter(task => {
    switch (filterType) {
      case 'today':
        return task.date === todayStr;
      case 'yesterday':
        return task.date === yesterdayStr;
      case 'custom':
        return task.date === customDate;
      case 'all':
      default:
        return true;
    }
  });

  return (
   <> 
    <main className="submitted-tasks-container">
      
      {/* --- NEW: Title and Filter Header --- */}
      <div className="title-header">
        <h1 className="submitted-title">SUBMITTED TASKS</h1>
        
        <div className="date-filter-container">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="custom">Select a date</option>
          </select>

          {/* --- Conditional date input --- */}
          {filterType === 'custom' && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          )}
        </div>
      </div>

      <hr className="title-divider" />
      
      <div className="tasks-grid">
        {/* --- Map over filteredTasks --- */}
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
    </>
  );
};

export default SubmittedTasks;