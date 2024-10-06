import React from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import NewChat from '../components/NewChat';


const Chat = () => {
  return (
    <div>
    <Layout>
    {/* <ChatList/> */}
    <NewChat />
    Chat
    </Layout>
    </div>
  )
}

export default Chat
