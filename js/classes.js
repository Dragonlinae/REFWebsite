var searchbar = document.getElementById("search-bar");
var searchbtn = document.getElementById("search-submit");
var filterbtn = document.getElementById("filter-submit");

const sheets_url = "https://sheets.googleapis.com/v4/spreadsheets/1yEgfyIQXjRFRK1NP7gsAUPf_ZNHdeuvzEKP2mlmRDmk/values/Classes?key=AIzaSyBX3-78oW45d_03ov_QLOOmayHa9C6tjfE";

var classes = [];
var subjectList = new Set();


var search = new URLSearchParams(window.location.search).get("search");
var price_from = new URLSearchParams(window.location.search).get("price_from");
var price_to = new URLSearchParams(window.location.search).get("price_to");
var subjects = new URLSearchParams(window.location.search).get("subjects");
if (subjects != null) {
  subjects = subjects.split(",");
}
if (search != null) {
  search = decodeURIComponent(search);
  searchbar.value = search;
}
if (price_from != null && price_to != null && price_from != "" && price_to != "") {
  var priceRadios = document.querySelectorAll("input[name='class-filter-price']");
  for (var radio of priceRadios) {
    if (radio.getAttribute("from") == price_from && radio.getAttribute("to") == price_to) {
      radio.checked = true;
      break;
    }
    if (radio.id == "class-filter-price_5") {
      radio.setAttribute("from", price_from);
      radio.setAttribute("to", price_to);
      radio.checked = true;
      document.getElementById("class-filter-price_from").disabled = false;
      document.getElementById("class-filter-price_to").disabled = false;
      document.getElementById("class-filter-price_from").value = price_from;
      document.getElementById("class-filter-price_to").value = price_to;
    }
  }
} else {
  document.getElementById("class-filter-price_1").checked = true;
}

getClasses();


function getClasses() {
  fetch(sheets_url)
    .then(response => response.json())
    .then(data => {
      data = data.values;
      const headers = data[0];
      data = data.slice(1);
      classes = data.map(row => {
        var classObj = {};
        for (var i = 0; i < headers.length; i++) {
          classObj[headers[i]] = row[i];
        }
        classObj.Tags = classObj.Tags.split(",").map(tag => tag.trim());
        for (var tag of classObj.Tags) {
          subjectList.add(tag);
        }
        classObj.Price = parseFloat(classObj.Price);
        return classObj;
      });

      displayClasses();
    });
}

function getTemplate(classObj) {
  var tagTemplate = classObj.Tags.map(tag => `<span class="cs-tag">${tag}</span>`).join("");
  var classPrice = classObj.Price == 0 ? "Free" : `$${classObj.Price}`;

  return `<li class="cs-item">
<a href="${classObj.Application}" target="_blank" class="cs-link">
  <div class="cs-image-group">
    <picture class="cs-picture">
      <source media="(max-width: 600px)" srcset="${classObj.Picture}">
      <source media="(min-width: 601px)" srcset="${classObj.Picture}">
      <img decoding="async" src="${classObj.Picture}" alt="person" width="277" height="197"
        aria-hidden="true">
    </picture>
    <svg class="cs-mask" width="369" height="249" viewBox="0 0 369 249" fill="none"
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
    <strong class="cs-date">${classPrice}</strong>
  </div>
  <div class="cs-info">
    <h3 class="cs-h3">${classObj.Name}</h3>
    ${tagTemplate}
    <span class="cs-time">
      <img class="cs-icon" src="img/clock.svg" alt="icon" width="24" height="24" loading="lazy"
        decoding="async">
      ${classObj.Time}
    </span>
    <span class="cs-description">
      <img class="cs-icon" src="img/note.svg" alt="icon" width="24" height="24" loading="lazy"
        decoding="async">
      ${classObj.Description}
    </span>
  </div>
</a>
</li>`
}

function checkCriteria(classObj) {
  if (price_from != null && price_to != null && price_from != "" && price_to != "") {
    if (classObj.Price < price_from || classObj.Price > price_to) {
      return false;
    }
  }

  if (subjects != null) {
    var classSubjects = classObj.Tags;
    console.log(classSubjects);
    for (var subject of subjects) {
      console.log(subject);
      if (classSubjects.includes(subject)) {
        return true;
      }
    }
    return false;
  }
}

function displayClasses() {
  if (search != null && search != "") {
    const fuse = new Fuse(classes, {
      keys: ["Name", "Description", "Tags"]
    });
    classes = fuse.search(search).map(item => item.item);
  }

  var subjectsList = document.getElementById("subject-list");
  for (var subject of subjectList) {
    var subjectCheckbox = `<div class="checkbox cs-text">
  <input name="class-filter-subject" type="checkbox" value="${subject}" id="class-filter-subject_${subject}">
  <label for="class-filter-subject_${subject}">${subject}</label>
</div>`
    subjectsList.innerHTML += subjectCheckbox;
  }

  if (subjects == null) {
    subjects = Array.from(subjectList);
  }

  var classesList = document.getElementById("class-list");
  for (var classObj of classes) {
    if (checkCriteria(classObj)) {
      var template = getTemplate(classObj);
      classesList.innerHTML += template;
    }
  }

  checkSubjects();
}

function checkSubjects() {
  var checkboxes = document.querySelectorAll("input[name='class-filter-subject']");
  for (var checkbox of checkboxes) {
    if (subjects.includes(checkbox.value)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}

var priceRadios = document.querySelectorAll("input[name='class-filter-price']");
for (var radio of priceRadios) {
  radio.addEventListener("change", function () {
    filterClasses(this.id);
  });
}

function filterClasses(id) {
  if (id == "class-filter-price_5") {
    document.getElementById("class-filter-price_from").disabled = false;
    document.getElementById("class-filter-price_to").disabled = false;
  } else {
    document.getElementById("class-filter-price_from").disabled = true;
    document.getElementById("class-filter-price_to").disabled = true;
  }
}

document.getElementById("class-filter-price_from").addEventListener("change", function () {
  document.getElementById("class-filter-price_5").setAttribute("from", this.value);
});

document.getElementById("class-filter-price_to").addEventListener("change", function () {
  document.getElementById("class-filter-price_5").setAttribute("to", this.value);
});

searchbar.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    searchbtn.click();
  }
});

filterbtn.addEventListener("click", function () {
  searchbtn.click();
});

searchbtn.addEventListener("click", function () {
  var search = searchbar.value;
  var price_from = document.querySelector("input[name='class-filter-price']:checked").getAttribute("from");
  var price_to = document.querySelector("input[name='class-filter-price']:checked").getAttribute("to");
  var subjects = [];
  var checkboxes = document.querySelectorAll("input[name='class-filter-subject']");
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      subjects.push(checkbox.value);
    }
  }

  search = encodeURIComponent(search);
  var params = new URLSearchParams(window.location.search);
  params.set("search", search);
  params.set("price_from", price_from);
  params.set("price_to", price_to);
  params.set("subjects", subjects.join(","));
  window.location.search = params.toString();
});