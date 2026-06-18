import { Routes, Route } from 'react-router-dom'
import { Layout, NotFound } from './shared/components'
import { StoriesList, StoryDetail } from './features/stories'
import { TimelineView } from './features/timeline'
import { ArchiveList } from './features/archive'

// Pages not yet migrated into src/features/* (Step 5).
import Homepage from './pages/Homepage'
import Maps from './pages/Maps'
import About from './pages/About'
import Exhibits from './pages/Exhibits'
import MapDetail from './pages/MapDetail'
import MapAtlas from './pages/MapAtlas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="maps" element={<Maps />} />
        <Route path="maps/atlas" element={<MapAtlas />} />
        <Route path="maps/atlas/:collectionId" element={<MapAtlas />} />
        <Route path="maps/:mapId" element={<MapDetail />} />
        <Route path="stories" element={<StoriesList />} />
        <Route path="stories/:storyId" element={<StoryDetail />} />
        <Route path="timeline" element={<TimelineView />} />
        <Route path="archive" element={<ArchiveList />} />
        <Route path="exhibits" element={<Exhibits />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
