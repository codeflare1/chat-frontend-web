import React, { useState } from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';
import ArchiveChat from '../components/ArchiveChat';


const Chat = ({socket}) => {
const [selectedReceiverId,setSelectedReceiverId] = useState("")
console.log("selectedIdsselectedIds",selectedReceiverId)

  return (
    <div>
    <Layout>
    <ChatList socket={socket} setSelectedReceiverId ={setSelectedReceiverId} selectedReceiverId={selectedReceiverId}/>
    <MainChat socket={socket} selectedReceiverId={selectedReceiverId} />
    {/* <ChatList/> */}
    {/* <ArchiveChat/> */}

    {/* Chat */}
        {/* <MainChat /> */}
    </Layout>
    </div>
  )
}

export default Chat
