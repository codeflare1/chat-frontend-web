import React, { useState } from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';


const Chat = ({socket}) => {
const [selectedReceiverId,setSelectedReceiverId] = useState("")
console.log("selectedIdsselectedIds",selectedReceiverId)

  return (
    <div>
    <Layout>
    <ChatList socket={socket} setSelectedReceiverId ={setSelectedReceiverId}/>
    <MainChat socket={socket} selectedReceiverId={selectedReceiverId} />
    </Layout>
    </div>
  )
}

export default Chat
