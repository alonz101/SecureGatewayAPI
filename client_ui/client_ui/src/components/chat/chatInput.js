import '../../css/chat.css';

import React, { useState } from 'react';

import { createMessage } from '../../features/chatSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const ChatInput = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim()) {
      const msg = {content ,messageId:uuidv4()}
      dispatch(createMessage(msg));
      setContent('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevents the default action (newline)
        handleSubmit(event); // Your function to send the message
    }
}


  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <textarea
        rows="4"
        value={content}
        onKeyDown={handleKeyDown}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
