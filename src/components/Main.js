import React, { useContext } from 'react'
import MediaSlider from './common/MediaSlider'
import MainChat from '../components/MainChat';
import { ChatContext } from '../context/ChatContext';

const Main = ({ socket }) => {
    const { isMediaShow } = useContext(ChatContext); // Access context values
    return (
        isMediaShow ?
            <MediaSlider socket={socket} /> :
            <MainChat socket={socket} />

    )
}

export default Main
