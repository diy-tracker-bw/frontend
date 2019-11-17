import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { handleLogout } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
