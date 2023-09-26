import '../../css/chat.css'

import React from 'react';

const Message = ({ message }) => {

    const formattedTimestamp = new Date(message.timestamp).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
  return (
    <div className="message-item">
      <div className="message-content">
        <p className="message-text">{message.content}</p>
        <span className="message-time">{formattedTimestamp}</span>
      </div>
    </div>
  );
};

export default Message;
