import React from 'react';
import List from './components/List';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const displayLongest = useSelector(state => state.displayButtonLongest);
  console.log("uee" + displayLongest);
    return (<List/>);
  }

export default App;
