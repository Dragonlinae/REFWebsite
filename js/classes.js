var searchbar = document.getElementById("search-bar");
var searchbtn = document.getElementById("search-submit");
var filterbtn = document.getElementById("filter-submit");

const ical_url = "https://calendar.google.com/calendar/ical/5776f8bf61796ec609993b0db2e3451b88f01b13059bee71af0f5abf8ea7b444%40group.calendar.google.com/public/basic.ics";

var search = new URLSearchParams(window.location.search).get("search");
var price_from = new URLSearchParams(window.location.search).get("price_from");
var price_to = new URLSearchParams(window.location.search).get("price_to");
var subjects = new URLSearchParams(window.location.search).get("subjects");
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

if (subjects != null) {
  subjects = subjects.split(",");
  var checkboxes = document.querySelectorAll("input[name='class-filter-subject']");
  for (var checkbox of checkboxes) {
    if (subjects.includes(checkbox.value)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
} else {
  var checkboxes = document.querySelectorAll("input[name='class-filter-subject']");
  for (var checkbox of checkboxes) {
    checkbox.checked = true;
  }
}

class Event {
  constructor(name, date, description, price) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.price = price;
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