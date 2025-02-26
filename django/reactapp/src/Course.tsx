import { useState, useEffect } from 'react';
import './css/core.css';
import axios from 'axios';
import { CourseInterface } from "./CourseInterface";
import { useParams } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

function Course() {

  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseInterface | null>(null);

  useEffect(() => {
    axios.get('/api/courses/?id=' + id)
      .then(response => {
        setCourse(response.data[0]);
      })
  }, []);

  if (course === null) {
    return <div></div>;
  } else if (course === undefined) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <a href="/home" className="cs-logo" aria-label="back to home">
        <img src="/static/img/logo.jpg" alt="logo" aria-hidden="true" decoding="async" />
      </a>
      <a href={course.application_page} className="cs-li-link cs-button-solid cs-top-right" aria-label="back to home">
        Apply Now
      </a>
      <section id="classes">

        <div className="cs-container">

          <div className="cs-content">
            <h2 className="cs-title">{course.course_name}</h2>
          </div>

          <div className="cs-wrapper">
            <div className="cs-content">
              <ImageCarousel images={course.pictures} />
            </div>
            <div className="cs-info">
              <h3 className="cs-h3">Course Information</h3>
              <span className="cs-tags">{course.tags.map(tag => <span className="cs-tag">{tag}</span>)}</span>
              <span className="cs-time">
                <img className="cs-icon" src="/static/img/clock.svg" alt="icon" width="24" height="24" loading="lazy" decoding="async" />
                {course.course_times.map(time => `${new Date(time.start_time).toLocaleString()} - ${new Date(time.end_time).toLocaleString()}`).join('\n')}
              </span>
              <span className="cs-description">
                <img className="cs-icon" src="/static/img/note.svg" alt="icon" width="24" height="24" loading="lazy" decoding="async" />
                {course.description}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Course;