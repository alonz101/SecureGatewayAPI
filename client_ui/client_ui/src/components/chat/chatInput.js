import '../../css/chat.css';

import React, { useState } from 'react';

import { createMessage } from '../../features/chatSlice';
import { useDispatch } from 'react-redux';

const ChatInput = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim()) {
      dispatch(createMessage(content));
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <textarea
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;
