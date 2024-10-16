import React from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';
import ArchiveChat from '../components/ArchiveChat';


const Chat = () => {
  return (
    <div>
    <Layout>
    {/* <ChatList/> */}
    <ArchiveChat/>

    {/* Chat */}
        <MainChat />
    </Layout>
    </div>
  )
}

export default Chat
