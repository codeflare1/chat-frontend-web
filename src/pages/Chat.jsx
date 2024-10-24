import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';
import { ChatProvider } from '../context/ChatContext';
import ProgressLoader from '../components/ProgressLoader';

const Chat = ({ socket }) => {
  const [loading, setLoading] = useState(true); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prev + 10;
      });
    }, 400); 

    const timeoutId = setTimeout(() => {
      setLoading(false);
      clearInterval(intervalId);
    }, 4500);

    return () => {
      clearTimeout(timeoutId); 
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <ChatProvider>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
          <div className='mb-4'>
            <img src="./loader.png" alt="Loading..." className='animate-pulse' />
          </div>
              <ProgressLoader progress={progress} />
            <p style={{ textAlign: 'center', marginTop: '10px', color: '#555' }}>Loading...</p>
        </div>
      ) : (
        <Layout>
          <ChatList socket={socket} />
          <MainChat socket={socket} />
        </Layout>
      )}
    </ChatProvider>
  );
};

export default Chat;
