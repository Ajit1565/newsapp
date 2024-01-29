import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {Routes,Route} from 'react-router-dom'
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY
  state = {
    progress:0
  }


  setProgress = (progress) =>{
    this.setState({progress:progress})
  }
  

  render() {
    return (
      <div>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={2}
        progress={this.state.progress}
        
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="general" country="in" />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="business" country="in" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey}  pageSize={8} category="entertainment" country="in" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="health" country="in" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="science" country="in" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="sports" country="in" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} pageSize={8} category="technology" country="in" />} />
       </Routes>
        
      </div>
    )
  }
}
