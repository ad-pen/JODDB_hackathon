import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allJobOrders } from './mockData'; // Import all orders
import OrderDetailsModal from './OrderDetailsModal'; // Reuse the modal
import '../static/styles_jobOrderProgressBar.scss'; // Reuse the same styles

const AllOrdersPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // This handler is identical to the one on the main page
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="job-order-section">
          {/* This title button now acts as a "Back" button */}
          <button
            className="section-title-button"
            onClick={() => navigate(-1)} // navigate(-1) goes to the previous page
          >
            BACK
          </button>

          {/* This container reuses the same class.
            The 'flex-wrap: wrap' style in your SCSS
            will automatically create the grid.
          */}
          <div className="progress-bars-container">
            {/* We map over the ENTIRE allJobOrders array */}
            {allJobOrders.map((order) => {
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
      </main>

      {/* The modal logic is identical */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default AllOrdersPage;