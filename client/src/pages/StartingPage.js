import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from './StartingPage.module.css'; // Updated import
import { AnimatedBackground } from 'animated-backgrounds';

function StartingPage() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // State for backdrop visibility

    useEffect(() => {
        const title = document.getElementById("animatedTitle");

        const handleAnimationEnd = () => {
            title.classList.add(styles.shineColor);
            setOpen(true); // Open backdrop after animation ends
        };

        title.addEventListener('animationend', handleAnimationEnd);

        return () => {
            title.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);

    useEffect(() => {
        
        sessionStorage.setItem('hasSeenStartingPage', 'true');

        if (open) { 
            // Navigate to LandingPage after 3 seconds
            const timer = setTimeout(() => {
                navigate("/landing"); // Change this to the correct path for LandingPage
            }, 2000); // 3000 milliseconds = 3 seconds

            return () => clearTimeout(timer); // Cleanup the timeout on unmount
        }
    }, [open, navigate]); 

    return (
        <>
            <div className={`w-full min-h-screen flex justify-center items-center flex-col`}>
            <AnimatedBackground animationName="starryNight" />
                <h1 id="animatedTitle" className={styles.animatedTitle}>Nutri Health</h1>
                <p className={styles.paragraph}>Hope you are feeling better today!</p>
            </div>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open} // Optional: close backdrop on click
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default StartingPage;
