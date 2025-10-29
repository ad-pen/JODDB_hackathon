import React, { useState } from 'react';
import '../static/styles_jobOrderProgressBar.scss';
import productivityIcon from '../assets/productivity_icon.png';
import efficiencyIcon from '../assets/efficiency_icon.png';
import utilizationIcon from '../assets/utilization_icon.png';
import { useNavigate } from 'react-router-dom';
import OrderDetailsModal from './OrderDetailsModal';
import { allJobOrders } from './mockData'; // Import the new centralized data

// --- NEW: We only want to show the first 5 orders on the main page ---
const sampleJobOrders = allJobOrders.slice(0, 5);

const JobOrderProgressPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // --- UPDATED: This button now navigates to the new page ---
  const handleJobOrderProgressClick = () => {
    console.log('Navigating to All Job Orders page...');
    navigate('/all-orders'); // <-- This is the new route
  };

  const handleOrderClick = (order) => {
    console.log(`Showing details for ${order.name}...`);
    setSelectedOrder(order);
  };

  const handleCardClick = (cardName) => {
    if (cardName === 'Productivity') {
      navigate('/productivity');
    } else if (cardName === 'Efficiency') {
      navigate('/efficiency');
    } else if (cardName === 'Utilization') {
      navigate('/utilization');
    }
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="job-order-section">
          <button
            className="section-title-button"
            onClick={handleJobOrderProgressClick}
          >
            JOB ORDER PROGRESS
          </button>
          <div className="progress-bars-container">
            {/* --- UPDATED: Map over the new 'sampleJobOrders' array --- */}
            {sampleJobOrders.map((order) => {
              const percent = (order.actualOutput / order.requiredOutput) * 100;
              return (
                <button
                  className="progress-item"
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                >
                  <span className="order-label">{order.name}</span>
                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="kpi-cards-section">
          {/* ... (Your KPI cards remain unchanged) ... */}
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

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default JobOrderProgressPage;