import './css/courseSearch.css';
import './css/core.css';
import { CourseInterface } from "./CourseInterface";

function tagTemplate(tag: string) {
  return <span className="cs-tag">{tag}</span>;
}

function localTime(date: Date) {
  return new Date(date).toLocaleString();
}

interface CoursePanelProps {
  courseObj: CourseInterface;
}

function CoursePanel(props: CoursePanelProps) {
  const courseObj = props.courseObj;
  const classNamePrice = courseObj.cost === 0 ? "Free" : (courseObj.cost % 1 === 0 ? "$" + courseObj.cost : "$" + courseObj.cost.toFixed(2));
  return (
    <li className="cs-item">
      <a href={"/courses/" + courseObj.id} target="_blank" className="cs-link">
        <div className="cs-image-group">
          <picture className="cs-picture">
            <source media="(max-width: 600px)" srcSet={courseObj.pictures[0].picture} />
            <source media="(min-width: 601px)" srcSet={courseObj.pictures[0].picture} />
            <img decoding="async" src={courseObj.pictures[0].picture} alt="person" width="277" height="197"
              aria-hidden="true" />
          </picture>
          <svg className="cs-mask" width="369" height="249" viewBox="0 0 369 249" fill="none"
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <g clip-path="url(#clip0_3335_6487)">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M 370 0 H 0 V 251 H 370 V 0 Z M 345 25 C 355 93 357 158 345 225 C 237 210 129 208 25 225 C 14 155 12 92 25 25 C 133 14 238 13 345 25 Z"
                fill="var(--maskBG)" />
              <path
                d="M 374.4 0 Z M 348.9 25.5 C 359.1 94.86 361.14 161.16 348.9 229.5 C 238.74 214.2 128.58 212.16 22.5 229.5 C 11.28 158.1 9.24 93.84 22.5 25.5 C 132.66 14.28 239.76 13.26 348.9 25.5 Z"
                stroke="var(--maskBorder)" stroke-width="8" />
            </g>
            <defs>
              <clipPath id="clip0_3335_6487-1511">
                <rect width="369" height="249" fill="var(--maskBG)" />
              </clipPath>
            </defs>
          </svg>
          <strong className="cs-date">{classNamePrice}</strong>
        </div>
        <div className="cs-info">
          <h3 className="cs-h3">{courseObj.course_name}</h3>
          <span className="cs-tags">{courseObj.tags.map(tagTemplate)}</span>
          <span className="cs-time">
            <img className="cs-icon" src="/static/img/clock.svg" alt="icon" width="24" height="24" loading="lazy"
              decoding="async" />
            {`${localTime(courseObj.course_times[0].start_time)} - ${localTime(courseObj.course_times[0].end_time)}` + (courseObj.course_times.length > 1 ? `\n... +${courseObj.course_times.length - 1} more` : "")}
          </span>
          <span className="cs-description">
            <img className="cs-icon" src="/static/img/note.svg" alt="icon" width="24" height="24" loading="lazy"
              decoding="async" />
            {courseObj.short_description}
          </span>
        </div>
      </a>
    </li>
  );
}

export default CoursePanel;