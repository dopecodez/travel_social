import React from 'react';
import './App.css';
import PostsWall from './list';

let App = () => {
  return (
    <div id="body">
      <h1 id="app-header">Travel Social</h1>
      <PostsWall />
    </div>
  );
}

export default App;
