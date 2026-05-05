import { useState, useCallback } from 'react'
import Home from './pages/Home'
import FloatingDarkToggle from './components/FloatingDarkToggle'
import IntroLoader from './components/IntroLoader'

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
      {loading && <IntroLoader onComplete={handleIntroComplete} />}
      {!loading && <FloatingDarkToggle dark={dark} toggleDark={toggleDark} />}
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {!loading && <Home toggleDark={toggleDark} dark={dark} />}
      </div>
    </div>
  )
}

export default App