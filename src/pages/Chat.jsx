import React, { useState } from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import MainChat from '../components/MainChat';
// import ArchiveChat from '../components/ArchiveChat';


const Chat = ({ socket }) => {
  const [selectedReceiverId, setSelectedReceiverId] = useState("")
  const [selectedUser, setSelectedUser] = useState({})
  const [chatList, setChatList] = useState([]);


  return (
    <div>
      <Layout>
        <ChatList socket={socket} setSelectedReceiverId={setSelectedReceiverId}
          selectedReceiverId={selectedReceiverId}
          setSelectedUser={setSelectedUser}
          setChatList={setChatList}
          chatList={chatList}

        />
        <MainChat socket={socket} selectedReceiverId={selectedReceiverId} setChatList={setChatList} selectedUser={selectedUser} />
        {/* <ChatList/> */}
        {/* <ArchiveChat/> */}

        {/* Chat */}
        {/* <MainChat /> */}
      </Layout>
    </div>
  )
}

export default Chat
