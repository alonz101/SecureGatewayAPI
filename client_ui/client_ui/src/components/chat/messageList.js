import Message from './message';
import React from 'react';
import { useSelector } from 'react-redux';

const MessageList = () => {
  const messages = useSelector(state => state.messages);

  return (
    <div className="message-list">
      {messages.map(message => (
        <Message key={message.messageId} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
