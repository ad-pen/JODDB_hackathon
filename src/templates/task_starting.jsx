import React, { useState } from 'react';
import '../static/styles_task_starting.scss';
import Person from '../assets/person_add_task.png';

const StartTask = () => {
  // States
  const [taskState, setTaskState] = useState('idle');
  const [operation, setOperation] = useState('');
  const [serial, setSerial] = useState('');
  const [numDevices, setNumDevices] = useState('');
  // const [hoursSpent, setHoursSpent] = useState(''); // <-- Removed
  const [startTime, setStartTime] = useState(''); // <-- Added
  const [endTime, setEndTime] = useState('');     // <-- Added
  const [note, setNote] = useState('');
  const [isIssueChecked, setIsIssueChecked] = useState(false);
  const [isDelayChecked, setIsDelayChecked] = useState(false);

  const handlers = {
    handleShowTask: () => setTaskState('pending'),
    handleChangeTask: () => console.log('Change Task Clicked (Not Implemented)'),
    handleSubmit: (e) => {
      e.preventDefault();
      const payload = {
        operation,
        serial,
        numDevices: Number(numDevices),
        // hoursSpent: Number(hoursSpent), // <-- Removed
        startTime, // <-- Added
        endTime,   // <-- Added
        note,
        isIssueChecked,
        isDelayChecked,
      };
      console.log('Submitting task confirmation:', payload);
      setTaskState('idle'); 
    },
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="task-view-container">
          <div className="task-sidebar">
            <div className="left-column-container">
              <div className="task-icon-placeholder">
                <img src={Person} className='person-logo' alt=" task icon"/>
              </div>
              <button className="btn btn-primary" onClick={handlers.handleShowTask}>
                LOG IN A NEW TASK
              </button>
            </div>
          </div>
          <div className={`task-details-section ${taskState !== 'idle' ? 'is-visible' : ''}`}>
            {(taskState !== 'idle') && (
              <>
                <h2 className="section-title">TASK CONFIRMATION</h2>

                <form className="confirmation-form" onSubmit={handlers.handleSubmit}>
                  
                  <div className="labels-box">
                    <ul>
                      <li>OPERATION NAME:</li>
                      <li>SERIAL NUMBER OF DEVICE USED:</li>
                      <li>ISSUE / DELAY:</li>
                      <li>NUMBER OF DEVICES:</li>
                      {/* You may want to add more labels here for the new inputs */}
                    </ul>
                  </div>
                  <div className="inputs-box">
                    <div className="form-row">
                      <select
                        id="operation"
                        value={operation}
                        onChange={e => setOperation(e.target.value)}
                        required
                      >
                        <option value="">Select operation</option>
                        <option value="IO-Alpha">IO-Alpha</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <select
                        id="serial"
                        value={serial}
                        onChange={e => setSerial(e.target.value)}
                        required
                      >
                        <option value="">Select serial</option>
                        <option value="SN-1001">SN-1001</option>
                      </select>
                    </div>
                    <div className="form-row check-boxes">
                      <label>
                        <input
                          type="checkbox"
                          checked={isIssueChecked}
                          onChange={() => setIsIssueChecked(!isIssueChecked)}
                        />
                        Issue
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={isDelayChecked}
                          onChange={() => setIsDelayChecked(!isDelayChecked)}
                        />
                        Delay
                      </label>
                    </div>

                    {/* --- MODIFIED SECTION --- */}
                    {/* 1. Number of devices in its own full-width row */}
                    <div className="form-row">
                      <input
                        id="numDevices"
                        type="number"
                        min="0"
                        value={numDevices}
                        onChange={e => setNumDevices(e.target.value)}
                        required
                        placeholder="Number of devices"
                      />
                    </div>

                    {/* 2. New row for side-by-side time inputs */}
                    <div className="form-row small-inputs">
                      <div className="small-field">
                        <label htmlFor="startTime">Task started</label>
                        <input
                          id="startTime"
                          type="time"
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                          required
                        />
                      </div>

                      <div className="small-field">
                        <label htmlFor="endTime">Task ended</label>
                        <input
                          id="endTime"
                          type="time"
                          value={endTime}
                          onChange={e => setEndTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* --- END OF MODIFIED SECTION --- */}

                    <div className="form-row">
                      <textarea
                        id="note"
                        rows={4}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Add note"
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
        </div>
      </main>
    </div>
  );
};

export default StartTask;