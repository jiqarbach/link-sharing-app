// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccountPage from './pages/CreateAccountPage'
import LinksPage from './pages/LinksPage'
import ProfileDetailsPage from './pages/ProfileDetailsPage'
import Preview from './pages/Preview'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<CreateAccountPage />} /> 
      <Route path="/links" element={<LinksPage />}/>
      <Route path="/profile" element={<ProfileDetailsPage />}/>
      <Route path="/preview" element={<Preview />}/>

    </Routes>
  )
}