import React, { useContext, useEffect } from 'react';
import './App.css';
import Routing from './Router';
import { auth } from './Utility/firebase';
import { Type } from './Utility/action.type';
import { DataContext } from './Components/DataProvider/DataProvider';

function App() {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      dispatch({
        type: Type.SET_USER,
        user: authUser || null
      });
    });

    return () => unsubscribe(); // Clean up listener
  }, [dispatch]);

  return <Routing />;
}

export default App;
