import React, { useState } from 'react'; // Removed useMemo
import '../static/styles_productivityPage.scss';
import EngIcon from '../assets/eng.png';

// --- UPDATED: Data is back to a fixed total ---
const mockEmployees = [
  {
    id: 1,
    name: 'Mustafa Alkilani',
    totalHours: 160,
    totalOutput: 320,
    icon: EngIcon,
  },
  {
    id: 2,
    name: 'Jane Doe',
    totalHours: 152,
    totalOutput: 350,
    icon: EngIcon,
  },
  {
    id: 3,
    name: 'John Smith',
    totalHours: 168,
    totalOutput: 300,
    icon: EngIcon,
  },
  {
    id: 4,
    name: 'Aisha Khan',
    totalHours: 140,
    totalOutput: 310,
    icon: EngIcon,
  },
  {
    id: 5,
    name: 'Mustafa Hassan',
    totalHours: 160,
    totalOutput: 330,
    icon: EngIcon,
  },
];

// --- No change to this component ---
const MockProductivityChart = ({ hours, output }) => {
  const maxVal = Math.max(hours, output) * 1.1;
  const hoursHeight = maxVal > 0 ? (hours / maxVal) * 100 : 0;
  const outputHeight = maxVal > 0 ? (output / maxVal) * 100 : 0;

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-bar-group">
          <div
            className="chart-bar hours"
            style={{ height: `${hoursHeight}%` }}
          ></div>
          <span className="chart-label">Hours</span>
        </div>
        <div className="chart-bar-group">
          <div
            className="chart-bar output"
            style={{ height: `${outputHeight}%` }}
          ></div>
          <span className="chart-label">Output</span>
        </div>
      </div>
    </div>
  );
};

// --- No change to this component ---
const EmployeeProductivityCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <div className="employee-info">
        <div className="user-icon">
          <img src={employee.icon} alt={employee.name} />
        </div>
        <div className="user-details">
          <h2 className="user-name">{employee.name}</h2>
          <div className="user-stats">
            <span>
              Total Working Hours: <strong>{employee.totalHours}</strong>
            </span>
            <span>
              Total Output: <strong>{employee.totalOutput}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="employee-chart">
        <MockProductivityChart
          hours={employee.totalHours}
          output={employee.totalOutput}
        />
      </div>
    </div>
  );
};

// --- Main Page Component (Simplified) ---
const ProductivityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // --- UPDATED: Filter logic is now only for searching ---
  const filteredEmployees = mockEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <main className="main-content">
        <h1 className="productivity-title">PRODUCTIVITY</h1>

        {/* --- UPDATED: Filter controls now only contain search --- */}
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
          {/* --- UPDATED: Simplified "no results" message --- */}
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <EmployeeProductivityCard key={employee.id} employee={employee} />
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

export default ProductivityPage;