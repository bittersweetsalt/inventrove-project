import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const Timer = ({ duration = 3, targetRoute = "/inventory/productadd" }) => {
    const router = useRouter();
    const [seconds, setSeconds] = useState(duration);

    const redirect = useCallback(() => {
        router.push(targetRoute); // Navigate when timer reaches 0
    }, [router, targetRoute]);

    useEffect(() => {
        if (seconds <= 0) {
            redirect();
            return;
        }

        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [seconds, redirect]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h5">Redirecting in {seconds} seconds...</Typography>
        </div>
    );
};

export default Timer;