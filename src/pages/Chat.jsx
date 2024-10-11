import React from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';


const Chat = () => {
  return (
    <div>
    <Layout>
    <ChatList/>
    {/* <GroupInvitation /> */}

    {/* Chat */}
        <MainChat />
    </Layout>
    </div>
  )
}

export default Chat
