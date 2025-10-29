import React from 'react';
import '../static/styles_productivityPage.scss';
import EngIcon from '../assets/eng.png';

const mockEmployees = [
  {
    id: 1,
    name: 'Mustafa Alkilani',
    totalHours: 160,
    totalOutput: 320,
    icon: EngIcon
  },
  {
    id: 2,
    name: 'Jane Doe',
    totalHours: 152,
    totalOutput: 350,
    icon: EngIcon
  },
  {
    id: 3,
    name: 'John Smith',
    totalHours: 168,
    totalOutput: 300,
    icon: EngIcon
  },
];
const MockProductivityChart = ({ hours, output }) => {
  const maxVal = Math.max(hours, output) * 1.1;
  const hoursHeight = (hours / maxVal) * 100;
  const outputHeight = (output / maxVal) * 100;

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
            <span>Total Working Hours: <strong>{employee.totalHours}</strong></span>
            <span>Total Output: <strong>{employee.totalOutput}</strong></span>
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
const ProductivityPage = () => {
  return (
    <div className="page-container">
      <main className="main-content">
        <h1 className="productivity-title">PRODUCTIVITY</h1>
        
        <div className="employee-list-container">
          {mockEmployees.map(employee => (
            <EmployeeProductivityCard key={employee.id} employee={employee} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductivityPage;
