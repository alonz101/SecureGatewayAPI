import './App.css';

import Home from './views/home/home'
import { fetchProductsThunk } from './features/productsSlice'
import { getMessages } from './features/chatSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(getMessages());

  }, [dispatch]);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
