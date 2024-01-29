import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {Routes,Route} from 'react-router-dom'
import About from './components/About';
export default class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News pageSize={8} category="general" country="in" />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/business" element={<News pageSize={8} category="business" country="in" />} />
          <Route exact path="/entertainment" element={<News pageSize={8} category="entertainment" country="in" />} />
          <Route exact path="/health" element={<News pageSize={8} category="health" country="in" />} />
          <Route exact path="/science" element={<News pageSize={8} category="science" country="in" />} />
          <Route exact path="/sports" element={<News pageSize={8} category="sports" country="in" />} />
          <Route exact path="/technology" element={<News pageSize={8} category="technology" country="in" />} />
       </Routes>
        
      </div>
    )
  }
}
