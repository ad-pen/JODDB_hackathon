import React, { useState } from 'react';
import '../static/styles_task_starting.scss';
import Person from '../assets/person_add_task.png';

const StartTask = () => {
  // States
  const [taskState, setTaskState] = useState('idle');
  const [operationChoice, setOperationChoice] = useState(''); 
  const [selectedOperations, setSelectedOperations] = useState([]);
  const operationOptions = ['IO-Alpha', 'IO-Beta', 'IO-Gamma'];
  const [serialChoice, setSerialchoice] = useState('');
  const [selectedSerial, setSelectedSerial] = useState([]);
  const serialOptions = ['SN-1003', 'SN-1002', 'SN-1001'];
  const [numDevices, setNumDevices] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [isIssueChecked, setIsIssueChecked] = useState(false);
  const [isDelayChecked, setIsDelayChecked] = useState(false);

  const handlers = {
    handleShowTask: () => setTaskState('pending'),
    handleChangeTask: () => console.log('Change Task Clicked (Not Implemented)'),
    handleSubmit: (e) => {
      e.preventDefault();
       // --- Simple validation for selectedOperations ---
      if (selectedOperations.length === 0) {
        alert('Please add at least one operation.');
        return;
      }
      
      const payload = {
        operation :selectedOperations,
        serial : selectedSerial,
        numDevices: Number(numDevices),
        startTime,
        endTime,
        note,
        isIssueChecked,
        isDelayChecked,
      };
      console.log('Submitting task confirmation:', payload);
      setTaskState('idle'); // Reset form
      // --- Clear form fields on submit ---
      setSelectedOperations([]);
      setSerialchoice([]);
      setNumDevices('');
      setStartTime('');
      setEndTime('');
      setNote('');
      setIsIssueChecked(false);
      setIsDelayChecked(false);
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
                      <li>OPERATIONS NAME:</li>
                      <li>SERIAL NUMBER OF THE DEVICE:</li>
                      <li>ISSUE / DELAY:</li>
                      <li>NUMBER OF DEVICES:</li>
                      {/* --- Added labels for new time fields --- */}
                    </ul>
                  </div>
                  <div className="inputs-box">
                    
                    <div className="form-row">
                      <div className="operation-select-wrapper operation-serial-wrapper">
                        <div className="operation-select-row"></div>
                      <select
                        id="serial"
                        value={serialChoice}
                        onChange={e => setSerialchoice(e.target.value)}
                        aria-label="Select serial number to add"
                      >
                        <option value="">Select a serial num</option>
                        {operationOptions
                                .filter(opt => !selectedSerial.includes(opt))
                                  .map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))
                              }
                      </select>
                      <button
                              type="button"
                              // --- CHANGED: Updated class for styling ---
                              className="btn btn-accent" 
                              onClick={() => {
                                if (!serialChoice) return;
                                if (!selectedSerial.includes(serialChoice)) {
                                  setSelectedOperations(prev => [...prev, serialChoice]);
                                }
                                setSerialchoice('');                            }}
                              disabled={!serialChoice}
                            >
                              Add
                            </button>
                          </div>

                          {/* Selected operations shown below the select */}
                          {/* --- CHANGED: Added class for horizontal layout --- */}
                          <div className="selected-operations horizontal-layout">
                            {selectedSerial.length === 0 && (
                              <div className="hint">No serial added yet</div>
                            )}
                            {selectedSerial.map(op => (
                              <div key={op} className="operation-chip">
                                <span className="operation-name">{op}</span>
                              <button
                                  type="button"
                                  className="remove-op"
                                  onClick={() => setSelectedSerial(prev => prev.filter(x => x !== op))}
                                  aria-label={`Remove ${op}`}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                    {/* --- CHANGED: Wrapped in form-row for spacing --- */}
                    <div className="form-row">
                      <div className="operation-select-wrapper">
                          <div className="operation-select-row">
                            <select
                              id="operation"
                              value={operationChoice}
                              onChange={e => setOperationChoice(e.target.value)}
                              aria-label="Select operation to add"
                            >
                              <option value="">Select an operation</option>
                              {operationOptions
                                .filter(opt => !selectedOperations.includes(opt))
                                  .map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))
                              }
                            </select>
                            <button
                              type="button"
                              // --- CHANGED: Updated class for styling ---
                              className="btn btn-accent" 
                              onClick={() => {
                                if (!operationChoice) return;
                                if (!selectedOperations.includes(operationChoice)) {
                                  setSelectedOperations(prev => [...prev, operationChoice]);
                                }
                                setOperationChoice('');                            }}
                              disabled={!operationChoice}
                            >
                              Add
                            </button>
                          </div>

                          {/* Selected operations shown below the select */}
                          {/* --- CHANGED: Added class for horizontal layout --- */}
                          <div className="selected-operations horizontal-layout">
                            {selectedOperations.length === 0 && (
                              <div className="hint">No operations added yet</div>
                            )}
                            {selectedOperations.map(op => (
                              <div key={op} className="operation-chip">
                                <span className="operation-name">{op}</span>
                              <button
                                  type="button"
                                  className="remove-op"
                                  onClick={() => setSelectedOperations(prev => prev.filter(x => x !== op))}
                                  aria-label={`Remove ${op}`}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div> {/* --- End of new form-row wrapper --- */}

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

                    <div className="form-row">
                     <label htmlFor="startTime">Notes</label>

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