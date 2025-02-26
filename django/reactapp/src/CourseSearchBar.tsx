import React from "react";
import './css/courseSearch.css';
import './css/core.css';

class CourseSearchBar extends React.Component {

  searchCourses() {
    const search = (document.getElementById("search-bar") as HTMLInputElement)?.value || "";
    const curr_params = new URLSearchParams(window.location.search);
    curr_params.set("name", search);
    window.location.href = "/courses?" + curr_params.toString();
  }

  render() {
    return (
      <div className="cs-search">
        <input className="cs-input" type="text" id="search-bar" name="find-us" placeholder="Search for classes" onKeyDown={(e) => { if (e.key === 'Enter') { this.searchCourses(); } }} />
        <button className="cs-button-solid cs-submit" type="submit" id="search-submit" onClick={this.searchCourses}>Search</button>
      </div>
    );
  }
}

export default CourseSearchBar;