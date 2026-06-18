import { Routes, Route } from 'react-router-dom'
import { Layout, NotFound } from './shared/components'
import { StoriesList, StoryDetail } from './features/stories'
import { TimelineView } from './features/timeline'
import { ArchiveList } from './features/archive'
import { MapsList, MapAtlas, MapDetail } from './features/maps'
import { ExhibitsView } from './features/exhibits'
import { Homepage } from './features/home'
import { About } from './features/about'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="maps" element={<MapsList />} />
        <Route path="maps/atlas" element={<MapAtlas />} />
        <Route path="maps/atlas/:collectionId" element={<MapAtlas />} />
        <Route path="maps/:mapId" element={<MapDetail />} />
        <Route path="stories" element={<StoriesList />} />
        <Route path="stories/:storyId" element={<StoryDetail />} />
        <Route path="timeline" element={<TimelineView />} />
        <Route path="archive" element={<ArchiveList />} />
        <Route path="exhibits" element={<ExhibitsView />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
