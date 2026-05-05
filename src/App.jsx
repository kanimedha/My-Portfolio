import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Achivements from './pages/Achivements'
import Contact from './pages/Contact'
import IntroLoader from './components/IntroLoader'
import FloatingDarkToggle from './components/FloatingDarkToggle'

function App() {
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleDark = () => {
    setDark(d => !d)
    document.documentElement.classList.toggle('dark')
  }

  const handleIntroComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <div className={dark ? 'dark' : ''}>
      {/* Cinematic intro loader */}
      {loading && <IntroLoader onComplete={handleIntroComplete} />}

      {/* Floating dark mode toggle — always visible */}
      {!loading && <FloatingDarkToggle dark={dark} toggleDark={toggleDark} />}

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Router>
          <Routes>
            <Route path="/"            element={<Home        toggleDark={toggleDark} dark={dark} />} />
            <Route path="/about"       element={<About />} />
            <Route path="/education"   element={<Education />} />
            <Route path="/projects"    element={<Projects />} />
            <Route path="/achivements" element={<Achivements />} />
            <Route path="/contact"     element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
