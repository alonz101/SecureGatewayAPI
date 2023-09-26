import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="message-content">{message.content}</div>
      <div className="message-timestamp">{message.timestamp}</div>
    </div>
  );
};

export default Message;
