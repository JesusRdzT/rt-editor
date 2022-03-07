import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Header from './components/Header'
import Dashboard from './components/notesDashboard/Dashboard'
import Editor from './components/noteEditor/Editor'
import Welcome from './components/Welcome'

const App = () => {
  return (
    <div className="contentMargin">
      <Header/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home"/>}/>
          <Route path="/about" element={<Welcome/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/notepad/:title" element={<Editor/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

