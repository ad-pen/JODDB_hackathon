import React from 'react';
// We can reuse the same SCSS file
import '../static/styles_jobOrderProgressBar.scss';

/**
 * A modal component to display details for a specific job order.
 * @param {object} props
 * @param {object | null} props.order - The order object to display.
 * @param {function} props.onClose - Function to call when the modal should close.
 */
const OrderDetailsModal = ({ order, onClose }) => {
  // If no order is provided, render nothing (is hidden)
  if (!order) {
    return null;
  }

  // Calculate percentage for the chart
  const progressPercent = (order.actualOutput / order.requiredOutput) * 100;

  return (
    // The overlay covers the whole screen
    <div className="modal-overlay" onClick={onClose}>
      {/* The content box stops click propagation so clicking it doesn't close modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>

        <h2>
          {order.name} (ID: {order.id})
        </h2>

        <div className="modal-info">
          <p>
            <strong>Actual Output:</strong>
            <span>{order.actualOutput} units</span>
          </p>
          <p>
            <strong>Required Output:</strong>
            <span>{order.requiredOutput} units</span>
          </p>
        </div>

        <div className="modal-chart-container">
          <span className="chart-label">
            Progress ({progressPercent.toFixed(1)}%)
          </span>
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;