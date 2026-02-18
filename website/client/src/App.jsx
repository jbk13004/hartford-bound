import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Pages
import Homepage from './pages/Homepage'
import Maps from './pages/Maps'
import Stories from './pages/Stories'
import Timeline from './pages/Timeline'
import Archive from './pages/Archive'
import About from './pages/About'
import Exhibits from './pages/Exhibits'
import StoryDetail from './pages/StoryDetail'
import MapDetail from './pages/MapDetail'
import MapAtlas from './pages/MapAtlas'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="maps" element={<Maps />} />
        <Route path="maps/atlas" element={<MapAtlas />} />
        <Route path="maps/atlas/:collectionId" element={<MapAtlas />} />
        <Route path="maps/:mapId" element={<MapDetail />} />
        <Route path="stories" element={<Stories />} />
        <Route path="stories/:storyId" element={<StoryDetail />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="archive" element={<Archive />} />
        <Route path="exhibits" element={<Exhibits />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
