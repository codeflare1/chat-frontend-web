import React from 'react'
import Layout from '../layout/Layout'
import ChatList from '../components/ChatList';
import NewChat from '../components/NewChat';
import GroupMember from '../components/GroupMember';
import GroupName from '../components/GroupName';
import GroupInvitation from '../components/GroupInvitation';


const Chat = () => {
  return (
    <div>
    <Layout>
    {/* <ChatList/> */}
    {/* <NewChat /> */}
    {/* <GroupMember /> */}
    <GroupName />
    <GroupInvitation />
    Chat
    </Layout>
    </div>
  )
}

export default Chat
