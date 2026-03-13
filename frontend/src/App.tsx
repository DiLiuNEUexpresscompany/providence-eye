import { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import DocFan from './components/DocFan'
import BottomPanels from './components/BottomPanels'
import CommandBar from './components/CommandBar'
import DataSection from './components/DataSection'
import ThemeToggle from './components/ThemeToggle'

function getInitialTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="w-screen min-h-screen flex flex-col relative antialiased selection:bg-app-green selection:text-app-bg">
      <Header />
      <FilterBar />
      <DocFan />
      <BottomPanels />
      <DataSection />
      <CommandBar />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </div>
  )
}

export default App
