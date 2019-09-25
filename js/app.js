const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

const base = `https://en.wikipedia.org/w/api.php`;

const url = `?action=query&format=json&origin=*&list=search&srsearch=`;

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const value = search.value;

  if (value === "") {
    showFeedback("please enter a valid search value");
  } else {
    search.value = "";

    ajaxWiki(value);
  }
});

function showFeedback(text) {
  feedback.classList.add("showItem");
  feedback.textContent = text;

  setTimeout(function() {
    feedback.classList.remove("showItem");
  }, 1500);
}

async function ajaxWiki(search) {
  output.innerHTML = ``;

  loading.classList.add("showItem");

  const wikiURL = `${base}${url}${search}`;

  // fetch API

  // fetch(wikiURL)
  //   .then(data => data.json())
  //   .then(data => displayData(data.query.search))
  //   .catch(e => console.log(e));

  // ASYNC await

  const result = await fetch(wikiURL);
  const response = await result.json();
  const data = response.query.search;
  displayData(data);
}

function displayData(data) {
  loading.classList.remove("showItem");
  console.log(data);
  data.forEach(function(search) {
    const link = `http://en.wikipedia.org/?curid=`;
    const card = document.createElement("div");
    card.classList.add("col-10", "mx-auto", "col-md-6", "col-lg-4", "my-3");

    card.innerHTML = `
        <div class="card card-body">
          <h1 class="card-title blueText">${search.title}</h1>
          <p>${search.snippet}</p>
          <a href="${link}${search.pageid}" target="_blank" class="my-2 text-capitalize">read
            more...</a>


        </div>`;

    output.appendChild(card);
  });
}
