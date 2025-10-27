import React, { useState, useEffect } from 'react';
import '../static/styles_task_starting.scss';
import Logo from '../assets/cover_login.png';
import Person from '../assets/person_add_task.png';
// --- Header Component ---
const Header = () => (
  <header className="header">
    <div className="logo-container">
      <span className="logo-placeholder"><img src={Logo} className='logo'/></span>
    </div>
    <div className="user-container">
      <div className="user-icon">[User Icon]</div>
      <span className="username">Username</span>
      <span className="language-toggle">عربي</span>
      <div className="menu-icon">[Menu]</div>
      {/* Per your description, the "notifications" and "submitted tasks" 
        buttons would be rendered inside this menu when clicked.
      */}
    </div>
  </header>
);

// --- Timer Component ---
// This component manages the timer logic
const TaskTimer = ({ taskState }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    // Start interval only if state is 'active'
    if (taskState === 'active') {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // Clear interval if state is 'paused' or component unmounts
      clearInterval(interval);
    }
    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, [taskState]); // Dependency: re-run effect when taskState changes

  // Format time as MM:SS
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
    // Left Column Button: Show Middle Column
    handleShowTask: () => setTaskState('pending'),
    
    // Middle Column Button: Don't implement
    handleChangeTask: () => console.log('Change Task Clicked (Not Implemented)'),
    
    // Middle Column Button: Show Right Column
    handleStartTask: () => setTaskState('active'),
    
    // Right Column Button: Pause Timer
    handlePauseTask: () => setTaskState('paused'),
    
    // Right Column Button: Resume Timer
    handleResumeTask: () => setTaskState('active'),
    
    // Right Column Button: Go to Page 3
    handleFinishTask: () => {
      console.log('Task Finished. Transition to Page 3.');
      // Reset state for this demo
      setTaskState('idle'); 
    },
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="task-view-container">

          {/* === Left Column (Always Visible) === */}
          <div className="task-sidebar">
            <div className="task-icon-placeholder"><img src={Person} className=''/></div>
            <button className="btn btn-primary" onClick={handlers.handleShowTask}>
              START A NEW TASK
            </button>
          </div>

          {/* === Middle Column (Task Details) === */}
{/* === Middle Column (Task Details) === */}
<div className="task-details-section">
  {/* CHANGE THIS LINE: 
    Show this column as long as we are not 'idle'
  */}
  {(taskState !== 'idle') && (
    <>
      <h2 className="section-title">TASK DETAILS</h2>
      <div className="task-form">
        {/* These data fields will stay visible */}
        <div className="data-field">
          <span>PERFORMED TASK</span>
        </div>
        <div className="data-field">
          <span>SERIAL NUMBER</span>
        </div>
        <div className="data-field">
          <span>SELECT NUMBERS OF DEVICES</span>
        </div>

        {/* ADD THIS WRAPPER:
          Only show the buttons when the task is 'pending'
        */}
        {taskState === 'pending' && (
          <div className="button-group">
            <button type="button" className="btn btn-secondary" onClick={handlers.handleChangeTask}>
              CHANGE
            </button>
            <button type="button" className="btn btn-primary" onClick={handlers.handleStartTask}>
              START
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>

          {/* === Right Column (Task Timer) === */}
          <div className="task-timer-section">
            {/* Content renders only when state is 'active' or 'paused' */}
            {(taskState === 'active' || taskState === 'paused') && (
              <>
                <h2 className="section-title">TASK HAS STARTED</h2>
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