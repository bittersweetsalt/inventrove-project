import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Timer = ({route, handleBack}) => {
  const [seconds, setSeconds] = useState(3);  // Initialize the seconds state to 0
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
            handleBack();
        }
    } 
    return () => clearInterval(interval);  // Clear the interval when the component unmounts or isActive/seconds changes
  }, [isActive, seconds]);  // The effect depends on isActive and seconds

  return (
    <div>
      <Typography> This will reroute to the previous page in: {seconds} seconds</ Typography>
    </div>
  );
};

export default Timer;
