import { Tab, Tabs } from '@mui/material';

import About from '../about/about';
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
    <div className="home-contianer" >
      <Grid container justifyContent="center">
      <Tabs value={value} onChange={handleChange} 
      sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
          fontSize: '1rem',
        }}>
        <Tab label="About"
          sx={{
            minWidth: '70px',
            minHeight: '50px',
            fontSize: '1.1rem',
          }} />
        <Tab label="Store"
          sx={{
            minWidth: '70px',
            minHeight: '50px',
            fontSize: '1.1rem',
          }} />
        <Tab label="Chat"           
          sx={{
            minWidth: '70px',
            minHeight: '50px',
            fontSize: '1.1rem',
          }} />
      </Tabs>
      </Grid>
      {value === 0 && <About />}
      {value === 1 && <Product />}
      {value === 2 && <ChatContainer />}


    </div>
  );
}

export default Home;
