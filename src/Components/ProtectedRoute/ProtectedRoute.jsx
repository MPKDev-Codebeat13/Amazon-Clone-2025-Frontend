import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {state:{msg, redirect}});
    }
  }, [user]);

  return children ;
}

export default ProtectedRoute;