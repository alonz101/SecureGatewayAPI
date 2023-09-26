import config from '../config';

const endpoint = config.API_ENDPOINT;

export const fetchProducts = async () => {
  const response = await fetch(`${endpoint}/products`);
  const data = await response.json();
  return data;
}

export const fetchMessages = async () => {
    const response = await fetch(`${endpoint}/messages`);
    const data = await response.json();
    return data;
  };
  
  export const postMessage = async (content) => {
    const response = await fetch(`${endpoint}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to post message');
    }
  
    return content;
  };

// Other functions to interact with endpoints
