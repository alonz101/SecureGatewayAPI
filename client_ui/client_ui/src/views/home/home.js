import { Tab, Tabs } from '@mui/material';

import ChatContainer from '../chat/chatContainer';
import Grid from '@mui/material/Grid';
import Product from '../product/product';
import React from 'react';

function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="home-contianer">
      <Grid container justifyContent="center">
      <Tabs value={value} onChange={handleChange} 
      sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
          fontSize: '1.5rem',
        }}>
        <Tab label="Products"
          sx={{
            minWidth: '200px',
            minHeight: '70px',
          }} />
        <Tab label="Chat"           
          sx={{
            minWidth: '200px',
            minHeight: '70px',
          }} />
      </Tabs>
      </Grid>
      {value === 0 && <Product />}
      {value === 1 && <ChatContainer />}


    </div>
  );
}

export default Home;
