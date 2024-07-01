import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Timer = ({propFunctions, message}) => {
  const [seconds, setSeconds] = useState(5);  // Initialize the seconds state to 0
  const [isActive, setIsActive] = useState(true);  // Initialize the isActive state to false

  useEffect(() => {
    let interval = null;  // Declare an interval variable to hold the timer ID
    if (isActive) {
        // If the timer is active, set an interval to update the seconds state every second
        interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);  // Update seconds using the previous state value
        }, 1000);
        if(seconds == 0){
            setIsActive(false);
            propFunctions();
        }
    } 
    return () => clearInterval(interval);  // Clear the interval when the component unmounts or isActive/seconds changes
  }, [isActive, seconds]);  // The effect depends on isActive and seconds


  return (
    <div>
      <Typography> {message} {seconds} </ Typography>
    </div>
  );
};

export default Timer;
