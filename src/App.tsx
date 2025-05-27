import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { PlayerInfo } from './components/PlayerInfo'
import { Statistics } from './components/Statistics'
import { Settings } from './components/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<PlayerInfo />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Dashboard>
    </Router>
  )
}

export default App