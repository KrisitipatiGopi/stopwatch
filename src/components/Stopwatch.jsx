import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          let { hours, minutes, seconds } = prev;
          seconds += 1;

          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes === 60) {
            minutes = 0;
            hours += 1;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }
  };

  const stopClock = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  return (
    <div className="mainContainer">
      <div className="innerContainer">
        <h1>StopWatch</h1>
        <p className="text">
          {String(time.hours).padStart(2, '0')}:
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="buttonContainer">
        <button onClick={startTimer}>START</button>
        <button onClick={stopClock}>STOP</button>
      </div>
    </div>
  );
};

export default Stopwatch;
