import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Minimum loading time of 1 second

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader-content">
          <Image
            src="/Searching.gif"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
          <p className="loading-text">Loading...</p>
        </div>
        <style jsx>{`
          .preloader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .preloader-content {
            text-align: center;
          }
          .loading-text {
            margin-top: 20px;
            font-size: 18px;
            color: #333;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default Preloader;