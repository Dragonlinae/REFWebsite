import React, { useEffect } from "react";
import './css/courseSearch.css';
import './css/core.css';
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { TagInterface } from "./CourseInterface";

function CourseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tags, setTags] = React.useState<TagInterface[]>([]);
  // const [price, setPrice] = React.useState({ priceFrom: "", priceTo: "" });
  // const [priceChoice, setPriceChoice] = React.useState({ price: "" });
  const [tagsChoice, setTagsChoice] = React.useState<{ tags: string[] }>({ tags: [] });
  const [archive, setArchive] = React.useState(false);

  useEffect(() => {
    axios.get('/api/tags').then((response) => {
      console.log(response.data);
      setTags(response.data);
      initializeFilters();
    });
  }, []);

  const initializeFilters = () => {
    // const priceFrom = searchParams.get("price_from") || "";
    // const priceTo = searchParams.get("price_to") || "";
    const tagsChecked = searchParams.get("tags")?.split(",") || [];
    const archiveOnly = searchParams.get("active") === "false" || false;

    // setPrice({ priceFrom: priceFrom, priceTo: priceTo });
    // if (priceFrom === "" && priceTo === "") {
    //   setPriceChoice({ price: "" });
    // }
    // else if (priceFrom === "0" && priceTo === "25") {
    //   setPriceChoice({ price: "0-25" });
    // }
    // else if (priceFrom === "25" && priceTo === "50") {
    //   setPriceChoice({ price: "25-50" });
    // }
    // else if (priceFrom === "50" && priceTo === "100") {
    //   setPriceChoice({ price: "50-100" });
    // }
    // else {
    //   setPriceChoice({ price: "other" });
    // }
    setTagsChoice({ tags: tagsChecked });
    setArchive(archiveOnly);
  }

  // const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   if (id === "class-filter-price_from") {
  //     setPrice({ priceFrom: value, priceTo: price.priceTo });
  //   } else {
  //     setPrice({ priceFrom: price.priceFrom, priceTo: value });
  //   }
  // }

  const tagChoiceTemplate = (tag: TagInterface) => {
    return (
      <li className="radio cs-text" key={tag.id}>
        <input type="checkbox" name="class-filter-tag" id={tag.tag_name} checked={tagsChoice.tags.includes(tag.tag_name)} onChange={updateTags} />
        <label htmlFor={tag.tag_name}>{tag.tag_name}</label>
      </li>
    );
  }

  const updateTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    console.log(tagsChoice.tags);
    console.log(id);
    if (tagsChoice.tags.includes(id)) {
      setTagsChoice({ tags: tagsChoice.tags.filter(tag => tag !== id) });
    } else {
      setTagsChoice({ tags: [...tagsChoice.tags, id] });
    }
  }


  // const setFilterPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id } = e.target;
  //   switch (id) {
  //     case "class-filter-price_1":
  //       setPrice({ priceFrom: "", priceTo: "" });
  //       setPriceChoice({ price: "" });
  //       break;
  //     case "class-filter-price_2":
  //       setPrice({ priceFrom: "0", priceTo: "25" });
  //       setPriceChoice({ price: "0-25" });
  //       break;
  //     case "class-filter-price_3":
  //       setPrice({ priceFrom: "25", priceTo: "50" });
  //       setPriceChoice({ price: "25-50" });
  //       break;
  //     case "class-filter-price_4":
  //       setPrice({ priceFrom: "50", priceTo: "100" });
  //       setPriceChoice({ price: "50-100" });
  //       break;
  //     case "class-filter-price_5":
  //       setPriceChoice({ price: "other" });
  //       break;
  //   }
  // }

  const filterCourses = () => {
    const params = new URLSearchParams();
    if (searchParams.get("name")) {
      params.set("name", searchParams.get("name")!);
    }
    // if (price.priceFrom) {
    //   params.set("price_from", price.priceFrom);
    // }
    // if (price.priceTo) {
    //   params.set("price_to", price.priceTo);
    // }
    if (tags.length > 0) {
      params.set("tags", tagsChoice.tags.join(","));
    }
    if (archive) {
      params.set("active", "false");
    }
    setSearchParams(params, { preventScrollReset: true });
    window.location.href = "/courses?" + params.toString();

  }

  const resetFilters = () => {
    const params = new URLSearchParams();
    if (searchParams.get("name")) {
      params.set("name", searchParams.get("name")!);
    }
    setSearchParams(params, { preventScrollReset: true });
    window.location.href = "/courses?" + params.toString();
  }

  return (
    <div className="cs-filter" id="filter">
      <div className="cs-content">
        <span className="cs-topper">Filters</span>
        <div className="class-filter">
          <div className="filter-categories">
            {/* <div className="filter-price" onChange={setFilterPrice}>
              <h3 className="cs-h2">
                <span>Price</span>
              </h3>
              <div className="radio cs-text">
                <input type="radio" name="class-filter-price" id="class-filter-price_1" checked={priceChoice.price === ""} />
                <label htmlFor="class-filter-price_1">Any Price</label>
              </div>
              <div className="radio cs-text">
                <input type="radio" name="class-filter-price" id="class-filter-price_2" checked={priceChoice.price === "0-25"} />
                <label htmlFor="class-filter-price_2">Under $25</label>
              </div>
              <div className="radio cs-text">
                <input type="radio" name="class-filter-price" id="class-filter-price_3" checked={priceChoice.price === "25-50"} />
                <label htmlFor="class-filter-price_3">$25 to $50</label>
              </div>
              <div className="radio cs-text">
                <input type="radio" name="class-filter-price" id="class-filter-price_4" checked={priceChoice.price === "50-100"} />
                <label htmlFor="class-filter-price_4">$50 to $100</label>
              </div>
              <div className="radio cs-text">
                <input type="radio" name="class-filter-price" id="class-filter-price_5" checked={priceChoice.price === "other"} />
                <label htmlFor="class-filter-price_5">Other (specify)</label>
              </div>
              <div className="htmlForm-group class-filter-price">
                <div className="row" onChange={changePrice}>
                  <label htmlFor="class-filter-price_from" className="sr-only"></label>
                  <input id="class-filter-price_from" type="number" min="0" className="cs-input" placeholder="From" value={price.priceFrom} disabled={priceChoice.price !== "other"} />
                  <label htmlFor="class-filter-price_to" className="sr-only"></label>
                  <input id="class-filter-price_to" type="number" min="0" className="cs-input" placeholder="To" value={price.priceTo} disabled={priceChoice.price !== "other"} />
                </div>
              </div>
            </div> */}

            <div id="subject-list" className="filter-subject">
              <h3 className="cs-h2">
                <span>Tags</span>
              </h3>
              <ul>
                {tags.map(tagChoiceTemplate)}
              </ul>

            </div>

            <div id="archive-only" className="filter-archive">
              <h3 className="cs-h2">
                <span>Archives</span>
              </h3>
              <input type="checkbox" name="class-filter-archive" id="class-filter-archive" checked={archive} onChange={(e) => setArchive(e.target.checked)} />
              <label htmlFor="class-filter-archive">View archived courses</label>
            </div>
          </div>

          <div>
            <button id="filter-submit" type="submit" className="cs-button-solid cs-submit" onClick={filterCourses}>Filter</button>
          </div>
          <div>
            <a id="filter-reset" className="cs-button-solid cs-reset" onClick={resetFilters}>Reset</a>
          </div>
        </div>
      </div>
      <svg className="cs-blob cs-blob1" width="442" height="181" viewBox="0 0 442 181" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M252.489 176.108C244.733 172.672 237.743 167.56 233.607 160.093C228.948 151.69 227.354 142.132 225.549 132.816C223.8 123.768 222.174 113.685 215.613 106.753C208.589 99.3218 198.222 97.9066 188.779 100.675C166.962 107.078 156.145 128.699 137.865 140.535C118.722 152.933 95.0075 153.342 73.3722 148.699C62.3132 146.324 51.3566 142.815 41.0171 138.203C30.8686 133.68 20.8553 127.989 12.8594 120.2C-2.16276 105.57 -10.1783 84.2517 -9.55104 63.3245C-8.95325 43.2506 0.0228515 23.804 14.7506 10.3204C22.1738 3.53059 30.7428 -1.34075 40.2622 -4.5846C51.981 -8.57532 64.6158 -10.0663 76.9261 -9.65981C102.269 -8.81824 126.961 -1.15108 152.35 -0.926177C163.586 -0.825539 175.416 -2.47133 185.922 -6.66437C193.811 -9.81028 200.921 -14.5819 206.464 -21.0179C212.258 -27.7462 216.011 -34.8556 220.16 -42.6607C224.937 -51.6552 230.308 -61.2842 237.391 -68.7204C251.7 -83.7333 270.343 -92.3086 290.843 -94.7755C291.2 -94.8203 291.58 -95.0076 291.837 -94.8858C301.964 -96.0097 313.029 -95.9034 323.089 -94.3296C345.245 -90.8693 366.002 -81.5288 385.148 -70.0269C403.396 -59.0679 420.725 -44.682 431.303 -25.8484C440.506 -9.46429 443.962 10.5596 438.364 28.7057C435.742 37.2122 431.19 44.2547 424.667 50.3485C417.408 57.1253 406.704 62.8476 396.616 60.5047C386.662 58.1937 380.375 47.1673 369.894 46.3661C360.556 45.6504 351.703 52.0242 346.149 59.0627C339.212 67.8512 337.553 79.4508 336.538 90.3136C335.513 101.224 335.511 112.159 333.11 122.89C328.818 142.079 319.042 160.548 302.294 171.587C287.917 181.051 268.283 183.1 252.489 176.108Z"
          fill="var(--blobColor)" />
      </svg>
      <svg className="cs-blob cs-blob2" width="423" height="152" viewBox="0 0 423 152" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M446 185.996C437.652 209.276 424.317 227.375 409 226.996C398.568 226.732 389.048 219.154 380 211.996C346.92 185.812 321.111 207.237 285 219.996C244.784 234.202 223.038 185.716 189 168.996C142.612 146.21 105.611 185.367 58.9998 204.996C34.8473 215.167 10.0832 211.93 1.9998 169.996C-9.5339 110.121 40.5169 96.6287 61.9998 87.9963C77.3226 81.8377 93.2386 72.8434 107 56.9963C119.705 42.3661 131.527 7.18936 146 0.99633C152.671 -1.85625 158.896 2.75738 164 8.99633C171.922 18.6733 177.895 32.0744 187 38.9963C204.137 52.031 224.119 57.6817 244 49.9963C263.795 42.3397 279.796 18.2702 299 7.99633C309.489 2.383 321.457 2.19178 330 10.9963C344.858 26.3211 348.113 61.1321 363 76.9963C379.775 94.8809 403.952 94.1948 424 78.9963C429.052 75.168 433.775 70.4414 439 67.9963C455.161 60.443 463.429 84.0291 462 108.996C460.542 134.291 454.106 163.405 446 185.996Z"
          fill="var(--blobColor)" />
      </svg>
    </div>
  );
}

export default CourseFilter;