import { Tab, Tabs } from '@mui/material';

import ChatContainer from '../chat/chatContainer';
import Product from '../product/product';
import React from 'react';

// import ProductList from '../components/ProductList';


// import Chat from '../components/Chat';




function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Products" />
        <Tab label="Chat" />
      </Tabs>
      {value === 0 && <Product />}
      {value === 1 && <ChatContainer />}
    </div>
  );
}

export default Home;
