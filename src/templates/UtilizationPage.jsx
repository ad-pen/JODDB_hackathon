import React, { useState } from 'react'; // Import useState
import '../static/styles_productivityPage.scss';
import EngIcon from '../assets/eng.png';

// --- UPDATED: Data now reflects Utilization ---
const AVAILABLE_TIME = 8; // Available hours per day

const mockEmployees = [
  {
    id: 1,
    name: 'Mustafa Alkilani',
    workingHoursPerDay: 7.5,
    icon: EngIcon
  },
  {
    id: 2,
    name: 'Jane Doe',
    workingHoursPerDay: 8.0,
    icon: EngIcon
  },
  {
    id: 3,
    name: 'John Smith',
    workingHoursPerDay: 6.5,
    icon: EngIcon
  },
  {
    id: 4,
    name: 'Aisha Khan',
    workingHoursPerDay: 7.8,
    icon: EngIcon
  },
];

// --- UPDATED: Chart component for Utilization ---
const MockUtilizationChart = ({ workingHours, availableHours }) => {
  const maxVal = Math.max(workingHours, availableHours) * 1.1;
  const workingHeight = maxVal > 0 ? (workingHours / maxVal) * 100 : 0;
  const availableHeight = maxVal > 0 ? (availableHours / maxVal) * 100 : 0;

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-bar-group">
          <div 
            className="chart-bar hours" // Reusing 'hours' style
            style={{ height: `${workingHeight}%` }}
          ></div>
          <span className="chart-label">Working</span>
        </div>
        <div className="chart-bar-group">
          <div 
            className="chart-bar output" // Reusing 'output' style
            style={{ height: `${availableHeight}%` }}
          ></div>
          <span className="chart-label">Available</span>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED: Card component for Utilization ---
const EmployeeUtilizationCard = ({ employee }) => {
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
            <span>WORKING HOURS: <strong>{employee.workingHoursPerDay}</strong></span>
            <span>AVAILABLE TIME: <strong>{AVAILABLE_TIME}</strong></span>
          </div>
        </div>
      </div>
      <div className="employee-chart">
        {/* --- UPDATED: Use new chart component --- */}
        <MockUtilizationChart 
          workingHours={employee.workingHoursPerDay} 
          availableHours={AVAILABLE_TIME}
        />
      </div>
    </div>
  );
};

const UtilizationPage = () => {
  // --- ADDED: State for search ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- ADDED: Filter logic ---
  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <main className="main-content">
        <h1 className="productivity-title">UTILIZATION</h1>
        
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
              <EmployeeUtilizationCard key={employee.id} employee={employee} />
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

export default UtilizationPage;