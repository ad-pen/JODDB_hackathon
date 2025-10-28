import React, { useState, useEffect } from 'react';
import '../static/styles_task_starting.scss';
import Person from '../assets/person_add_task.png';
import Header from './header'; // Assuming you have this component

// --- Timer Component ---
const TaskTimer = ({ taskState }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (taskState === 'active') {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [taskState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer-display">
      {formatTime(time)}
    </div>
  );
};


// --- Main Page Component ---
const StartTask = () => {
  // States: 'idle', 'pending', 'active', 'paused'
  const [taskState, setTaskState] = useState('idle');

  const handlers = {
    handleShowTask: () => setTaskState('pending'),
    handleChangeTask: () => console.log('Change Task Clicked (Not Implemented)'),
    handleStartTask: () => setTaskState('active'),
    handlePauseTask: () => setTaskState('paused'),
    handleResumeTask: () => setTaskState('active'),
    handleFinishTask: () => {
      console.log('Task Finished. Transition to Page 3.');
      setTaskState('idle'); 
    },
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="task-view-container">

          {/* === Left Column (Always Visible) === */}
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

          {/* === Middle Column (Task Details) === */}
          <div className={`task-details-section ${taskState !== 'idle' ? 'is-visible' : ''}`}>
            {(taskState !== 'idle') && (
              <>
                <h2 className="section-title">TASK DETAILS</h2>
                <div className="task-form">
                  <div className="data-field">
                    <span>PERFORMED TASK</span>
                  </div>
                  <div className="data-field">
                    <span>SERIAL NUMBER</span>
                  </div>
                  <div className="data-field">
                    <span>NUMBERS OF DEVICES</span>
                  </div>

                  {/* This div is now ALWAYS rendered */}
                  <div className="button-group">
                    {/* The buttons inside are conditional */}
                    {taskState === 'pending' && (
                      <>
                        <button type="button" className="btn btn-secondary" onClick={handlers.handleChangeTask}>
                          CHANGE
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handlers.handleStartTask}>
                          START
                        </button>
                      </>
                    )}
                  </div>
                  
                </div>
              </>
            )}
          </div>

          {/* === Right Column (Task Timer) === */}
          <div className={`task-timer-section ${taskState === 'active' || taskState === 'paused' ? 'is-visible' : ''}`}>
            {(taskState === 'active' || taskState === 'paused') && (
              <>
                <h2 className="section-title">Task has started..</h2>
                <TaskTimer taskState={taskState} />
                <div className="button-group">
                  {taskState === 'active' ? (
                    <button type="button" className="btn btn-secondary" onClick={handlers.handlePauseTask}>
                      PAUSE
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary" onClick={handlers.handleResumeTask}>
                      RESUME
                    </button>
                  )}
                  <button type="button" className="btn btn-primary" onClick={handlers.handleFinishTask}>
                    FINISH
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default StartTask;