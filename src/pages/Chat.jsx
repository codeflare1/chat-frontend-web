// Chat.js
import React from 'react';
import Layout from '../layout/Layout';
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';
import { ChatProvider } from '../context/ChatContext';  // Import ChatProvider

const Chat = ({ socket }) => {
  return (
    <ChatProvider>
      <Layout>
        <ChatList socket={socket} />
        <MainChat socket={socket} />
      </Layout>
    </ChatProvider>
  );
};

export default Chat;
