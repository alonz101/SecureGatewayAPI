import ChatInput from '../../components/chat/chatInput';
import MessageList from '../../components/chat/messageList';
import React from 'react';

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
