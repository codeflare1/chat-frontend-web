// ChatContext.js
import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

// Initialize socket connection
const socket = io('https://api.gatsbychat.com'); // Replace with your socket server URL

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

export const ChatProvider = ({ children }) => {
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [chatList, setChatList] = useState([]);
  const [refreshMsg, setRefreshMsg] = useState(false);

  useEffect(() => {
    const loginUserId = localStorage.getItem('loginUserId');

    const fetchChats = () => {
      console.log('Fetching chats for user ID:', loginUserId);
      socket.emit('getAllChats', { senderId: loginUserId });
      
      // Call fetchChats again after 1 second
      setTimeout(fetchChats, 1000);
    };

    const updateChatList = (chats) => {
      console.log('Received chats:', chats);
      setChatList(chats?.data || []);
    };

    // Fetch chats immediately
    fetchChats();

    // Set up socket listener
    socket.on('getChats', updateChatList);

    // Cleanup function
    return () => {
      socket.off('getChats', updateChatList);
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      selectedReceiverId,
      setSelectedReceiverId,
      selectedUser,
      setSelectedUser,
      chatList,
      setChatList,
      refreshMsg, setRefreshMsg
    }}>
      {children}
    </ChatContext.Provider>
  );
};
