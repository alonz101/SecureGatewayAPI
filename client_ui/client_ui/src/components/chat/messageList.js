import '../../css/chat.css'

import React, { useEffect } from 'react';

import Message from './message';
import { useSelector } from 'react-redux';

const MessageList = () => {
  const messages = useSelector(state => state.chat);

const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  return (
    <div className="message-list">
    {
    sortedMessages && sortedMessages.map(message => (
        <Message key={message.messageId} message={message} />
    ))}
    </div>
  );
};

export default MessageList;
