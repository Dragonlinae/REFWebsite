import { Routes, Route } from 'react-router-dom';
import CourseSearch from './CourseSearch';
import Course from './Course';
import Footer from './Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/courses/" element={<CourseSearch />} />
        <Route path="/courses/:id" element={<Course />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
