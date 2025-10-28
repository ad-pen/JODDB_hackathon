import React, { useState } from 'react';
import '../static/styles_task_starting.scss';
import Person from '../assets/person_add_task.png';
import Header from './header'; // optional header component

const StartTask = () => {
  // States: 'idle', 'pending'
  const [taskState, setTaskState] = useState('idle');

  // form state
  const [operation, setOperation] = useState('');
  const [serial, setSerial] = useState('');
  const [numDevices, setNumDevices] = useState('');
  const [hoursSpent, setHoursSpent] = useState('');
  const [note, setNote] = useState('');

  const handlers = {
    handleShowTask: () => setTaskState('pending'),
    handleChangeTask: () => console.log('Change Task Clicked (Not Implemented)'),
    handleSubmit: (e) => {
      e.preventDefault();
      const payload = {
        operation,
        serial,
        numDevices: Number(numDevices),
        hoursSpent: Number(hoursSpent),
        note,
      };
      console.log('Submitting task confirmation:', payload);
      // TODO: wire this up to an API or parent handler as needed

      // reset form and return to idle
      setOperation('');
      setSerial('');
      setNumDevices('');
      setHoursSpent('');
      setNote('');
      setTaskState('idle');
    },
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="task-view-container">

          {/* Left Column (Always Visible) */}
          <div className="task-sidebar">
            <div className="left-column-container">
              <div className="task-icon-placeholder">
                <img src={Person} className='person-logo' alt="Start task icon"/>
              </div>
              <button className="btn btn-primary" onClick={handlers.handleShowTask}>
                START A NEW TASK
              </button>
            </div>
          </div>

          {/* Middle Column (Task Confirmation Form) */}
          <div className={`task-details-section ${taskState !== 'idle' ? 'is-visible' : ''}`}>
            {(taskState !== 'idle') && (
              <>
                <h2 className="section-title">TASK CONFIRMATION</h2>

                <form className="confirmation-form" onSubmit={handlers.handleSubmit}>
                  <div className="labels-box">
                    <ul>
                      <li>OPERATION NAME:</li>
                      <li>SERIAL NUMBER OF DEVICE USED:</li>
                      <li>NUMBER OF DEVICES:</li>
                      <li>HOURS SPENT:</li>
                    </ul>
                  </div>

                  <div className="inputs-box">
                    <div className="form-row">
                      <select
                        id="operation"
                        value={operation}
                        onChange={e => setOperation(e.target.value)}
                        required
                        aria-label="Operation / IO name"
                      >
                        <option value="">Select operation</option>
                        <option value="IO-Alpha">IO-Alpha</option>
                        <option value="IO-Beta">IO-Beta</option>
                        <option value="IO-Gamma">IO-Gamma</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <select
                        id="serial"
                        value={serial}
                        onChange={e => setSerial(e.target.value)}
                        required
                        aria-label="Serial number"
                      >
                        <option value="">Select serial</option>
                        <option value="SN-1001">SN-1001</option>
                        <option value="SN-1002">SN-1002</option>
                        <option value="SN-1003">SN-1003</option>
                      </select>
                    </div>

                    <div className="form-row small-inputs">
                      <div className="small-field">
                        <input
                          id="numDevices"
                          type="number"
                          min="0"
                          value={numDevices}
                          onChange={e => setNumDevices(e.target.value)}
                          required
                          placeholder="0"
                          aria-label="Number of devices"
                        />
                      </div>

                      <div className="small-field">
                        <input
                          id="hoursSpent"
                          type="number"
                          min="0"
                          step="0.1"
                          value={hoursSpent}
                          onChange={e => setHoursSpent(e.target.value)}
                          required
                          placeholder="0.0"
                          aria-label="Hours spent"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <textarea
                        id="note"
                        rows={4}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Add note"
                        aria-label="Add note"
                      />
                    </div>

                    <div className="form-row submit-row">
                      <button type="submit" className="btn btn-primary">SUBMIT</button>
                    </div>
                  </div>

                </form>
              </>
            )}
          </div>

          {/* Right column intentionally removed (timer / counter removed) */}

        </div>
      </main>
    </div>
  );
};

export default StartTask;