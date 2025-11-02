import React from 'react';
import '../static/styles_modal.scss';
import AllOrdersPage from './allOrderPage';

export default function AllOrdersModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <AllOrdersPage />
      </div>
    </div>
  );
}