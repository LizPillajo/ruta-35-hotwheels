import { useGameStore } from './store/useGameStore'
import StartPage from './components/pages/StartPage'
import GamePage from './components/pages/GamePage'

function App() {
  const { isPlaying } = useGameStore()

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
      {isPlaying ? <GamePage /> : <StartPage />}
    </div>
  )
}

export default App