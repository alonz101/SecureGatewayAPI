import '../../css/chat.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatInput from '../../components/chat/chatInput';
import MessageList from '../../components/chat/messageList';
import Pusher from 'pusher-js';
import { addReceivedMessage } from '../../features/chatSlice';

const ChatContainer = () => {

  const dispatch = useDispatch();
  const chatMessages = useSelector(state => state.chat); // Moved outside the callback

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('07ebf45267848f2a1268', {
      cluster: 'mt1',
    });

    // Subscribe to the channel you're pushing messages to
    const channel = pusher.subscribe('chat-channel');

    // Bind a function to handle new messages
    channel.bind('new-message', (data) => {
      // Check if message already exists in the Redux store
      const messageExists = chatMessages.some(message => message.messageId === data.messageId);
      
      if (!messageExists) {
        // Add the new message to the Redux store
        dispatch(addReceivedMessage(data));
      }
    });

    // Unbind and unsubscribe when the component is unmounted
    return () => {
      channel.unbind_all();
      pusher.unsubscribe('chat-channel');
    };
  }, [dispatch, chatMessages]);

  
  return (
    <div className="chat-container">
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
