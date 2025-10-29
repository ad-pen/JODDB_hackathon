import React from 'react';
import '../static/styles_jobOrderProgressBar.scss';
import productivityIcon from '../assets/productivity_icon.png'; 
import efficiencyIcon from '../assets/efficiency_icon.png';
import utilizationIcon from '../assets/utilization_icon.png';
import { useNavigate } from 'react-router-dom';

const JobOrderProgressPage = () => {
      const navigate = useNavigate();
  const handleJobOrderProgressClick = () => {
    console.log("Navigating to Job Order Progress details...");
  };

  const handleOrderClick = (orderNum) => {
    console.log(`Navigating to Order ${orderNum} details...`);
  };

  const handleCardClick = (cardName) => {
    if (cardName === 'Productivity') {
      navigate('/productivity');
      return;
    } else if (cardName === 'Efficiency') {
      navigate('/efficiency');
      return;
    } else if (cardName === 'Utilization') {
      navigate('/utilization');
      return;
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="job-order-section">
          <button className="section-title-button" onClick={handleJobOrderProgressClick}>
            JOB ORDER PROGRESS
          </button>
          <div className="progress-bars-container">
            <button className="progress-item" onClick={() => handleOrderClick(1)}>
              <span className="order-label">ORDER 1</span>
              <div className="progress-bar-wrapper">
                <div className="progress-bar progress-bar-1"></div>
              </div>
            </button>
            <button className="progress-item" onClick={() => handleOrderClick(2)}>
              <span className="order-label">ORDER 2</span>
              <div className="progress-bar-wrapper">
                <div className="progress-bar progress-bar-2"></div>
              </div>
            </button>
          </div>
        </section>

        <section className="kpi-cards-section">
          <div className="card" onClick={() => handleCardClick('Productivity')}>
            <div className="icon-wrapper">
              <img src={productivityIcon} alt="Productivity Icon" />
            </div>
            <span className="card-title">PRODUCTIVITY</span>
          </div>

          <div className="card" onClick={() => handleCardClick('Efficiency')}>
            <div className="icon-wrapper">
              <img src={efficiencyIcon} alt="Efficiency Icon" />
            </div>
            <span className="card-title">EFFICIENCY</span>
          </div>

          <div className="card" onClick={() => handleCardClick('Utilization')}>
            <div className="icon-wrapper">
              <img src={utilizationIcon} alt="Utilization Icon" />
            </div>
            <span className="card-title">UTILIZATION</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobOrderProgressPage;