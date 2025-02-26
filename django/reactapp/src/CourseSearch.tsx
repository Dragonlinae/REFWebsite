import { useState, useEffect } from 'react'
import axios from 'axios'
import { CourseInterface } from './CourseInterface';
import CoursePanel from './CoursePanel';
import CourseFilter from './CourseFilter';
import CourseSearchBar from './CourseSearchBar';
import './css/courseSearch.css';
import './css/core.css';

function getCourses() {
  return axios.get('/api/courses/' + window.location.search);
}

function CourseSearch() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const course = response.data[i];
          setCourses(courses => [...courses, course]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <a href="/home" className="cs-logo" aria-label="back to home">
        <img src="/static/img/logo.jpg" alt="logo" aria-hidden="true" decoding="async" />
      </a>
      <section id="classes">

        <div className="cs-container">

          <div className="cs-content">
            <span className="cs-topper">Classes</span>
            <h2 className="cs-title">Class Search and Registration</h2>
          </div>

          <CourseSearchBar />
          <div className="cs-wrapper">
            <CourseFilter />
            <ul id="cs-list" className='cs-card-group'>
              {courses.map(course => (
                <CoursePanel key={course.id} courseObj={course} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default CourseSearch
