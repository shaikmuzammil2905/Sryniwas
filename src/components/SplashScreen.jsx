import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ finishLoading }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsFadingOut(true), 1200);
    const timer2 = setTimeout(() => finishLoading(), 1600);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [finishLoading]);

  return (
    <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="splash-logo-container">
        <img src="/image copy 2.png" alt="The Vastu Guru" className="splash-logo" />
      </div>
      <div className="splash-loader"></div>
    </div>
  );
};

export default SplashScreen;
