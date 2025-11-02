import React, { useState } from 'react'; // Import useState
import '../static/styles_productivityPage.scss';
import EngIcon from '../assets/eng.png';

// --- UPDATED: Data now reflects Efficiency ---
const mockEmployees = [
  {
    id: 1,
    name: 'Mustafa Alkilani',
    timeSpent: 150, // Time spent on tasks
    stdTime: 160,   // Standard time allowed for those tasks
    icon: EngIcon
  },
  {
    id: 2,
    name: 'Jane Doe',
    timeSpent: 160,
    stdTime: 152,
    icon: EngIcon 
  },
  {
    id: 3,
    name: 'John Smith',
    timeSpent: 170,
    stdTime: 168,
    icon: EngIcon 
  },
  {
    id: 4,
    name: 'Aisha Khan',
    timeSpent: 130,
    stdTime: 140,
    icon: EngIcon 
  },
];

// --- UPDATED: Chart component for Efficiency ---
const MockEfficiencyChart = ({ timeSpent, stdTime }) => {
  const maxVal = Math.max(timeSpent, stdTime) * 1.1;
  const spentHeight = maxVal > 0 ? (timeSpent / maxVal) * 100 : 0;
  const stdHeight = maxVal > 0 ? (stdTime / maxVal) * 100 : 0;

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-bar-group">
          <div 
            className="chart-bar hours" // You can create a new class or reuse 'hours'
            style={{ height: `${spentHeight}%` }}
          ></div>
          <span className="chart-label">Time Spent</span>
        </div>
        <div className="chart-bar-group">
          <div 
            className="chart-bar output" // You can create a new class or reuse 'output'
            style={{ height: `${stdHeight}%` }}
          ></div>
          <span className="chart-label">Std Time</span>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED: Card component for Efficiency ---
const EmployeeEfficiencyCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <div className="employee-info">
        <div className="user-icon">
          <img src={employee.icon} alt={employee.name} />
        </div>
        <div className="user-details">
          <h2 className="user-name">{employee.name}</h2>
          <div className="user-stats">
            {/* --- UPDATED: Correct labels and data --- */}
            <span>TIME SPENT: <strong>{employee.timeSpent}</strong></span>
            <span>STANDARD TIME: <strong>{employee.stdTime}</strong></span>
          </div>
        </div>
      </div>
      <div className="employee-chart">
        {/* --- UPDATED: Use new chart component --- */}
        <MockEfficiencyChart 
          timeSpent={employee.timeSpent} 
          stdTime={employee.stdTime} 
        />
      </div>
    </div>
  );
};

const EfficiencyPage = () => {
  // --- ADDED: State for search ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- ADDED: Filter logic ---
  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <main className="main-content">
        <h1 className="productivity-title">EFFICIENCY</h1>
        
        {/* --- ADDED: Search Bar --- */}
        <div className="filter-controls">
          <input
            type="search"
            placeholder="Search by employee name..."
            className="filter-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="employee-list-container">
          {/* --- UPDATED: Map over filtered list --- */}
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <EmployeeEfficiencyCard key={employee.id} employee={employee} />
            ))
          ) : (
            <p className="no-results-message">
              No employees found matching "{searchTerm}".
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default EfficiencyPage;