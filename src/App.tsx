import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import StudyPage from './components/StudyPage'
import WorkPage from './components/WorkPage'
import MobilityPage from './components/MobilityPage'
import TourismPage from './components/TourismPage'
import STMPage from './components/STMPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="estudiar" element={<StudyPage />} />
          <Route path="trabajar" element={<WorkPage />} />
          <Route path="moverse" element={<MobilityPage />} />
          <Route path="turismo" element={<TourismPage />} />
          <Route path="stm" element={<STMPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
