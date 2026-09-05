/* =========================================
   GOAL ZONE - NEWS
========================================= */


/*
   SAMPLE NEWS DATA

   Later, this array can be replaced with
   data from a real football news API.
*/

const newsData = [

  {
    category: "transfers",
    categoryName: "Transfers",
    title: "Transfer window continues to dominate football headlines",
    description:
      "Clubs across Europe continue to prepare their squads as transfer activity develops.",
    source: "Goal Zone",
    time: "30 minutes ago",
    icon: "🔄"
  },

  {
    category: "premier",
    categoryName: "Premier League",
    title: "Premier League clubs prepare for another exciting round",
    description:
      "Teams are getting ready for another weekend of competitive football.",
    source: "Goal Zone",
    time: "1 hour ago",
    icon: "🏴"
  },

  {
    category: "champions",
    categoryName: "Champions League",
    title: "European clubs begin preparations for continental football",
    description:
      "Top European teams are looking ahead to their next Champions League fixtures.",
    source: "Goal Zone",
    time: "2 hours ago",
    icon: "🏆"
  },

  {
    category: "international",
    categoryName: "International",
    title: "National teams continue preparations for upcoming fixtures",
    description:
      "International football preparations continue as teams look ahead to their next games.",
    source: "Goal Zone",
    time: "3 hours ago",
    icon: "🌍"
  },

  {
    category: "transfers",
    categoryName: "Transfers",
    title: "European clubs monitor potential new signings",
    description:
      "Several clubs are assessing their options as they look to strengthen their squads.",
    source: "Goal Zone",
    time: "4 hours ago",
    icon: "📝"
  },

  {
    category: "premier",
    categoryName: "Premier League",
    title: "Managers discuss team preparations ahead of matchday",
    description:
      "Managers are preparing their squads and making tactical plans for upcoming fixtures.",
    source: "Goal Zone",
    time: "5 hours ago",
    icon: "⚽"
  },

  {
    category: "champions",
    categoryName: "Champions League",
    title: "European football enters another exciting chapter",
    description:
      "Fans are looking forward to another round of major continental fixtures.",
    source: "Goal Zone",
    time: "6 hours ago",
    icon: "⭐"
  },

  {
    category: "international",
    categoryName: "International",
    title: "Football fans look ahead to the next international window",
    description:
      "Countries continue to prepare for important matches on the international calendar.",
    source: "Goal Zone",
    time: "8 hours ago",
    icon: "🌐"
  },

  {
    category: "premier",
    categoryName: "Premier League",
    title: "Football clubs focus on squad development",
    description:
      "Clubs continue working on their squads as the season progresses.",
    source: "Goal Zone",
    time: "10 hours ago",
    icon: "🎯"
  }

];


/* =========================================
   ELEMENTS
========================================= */

const newsGrid =
  document.getElementById("newsGrid");

const noNews =
  document.getElementById("noNews");

const newsCount =
  document.getElementById("newsCount");

const searchInput =
  document.getElementById("newsSearch");

const searchButton =
  document.getElementById("searchBtn");

const categoryButtons =
  document.querySelectorAll(".category-btn");


/* =========================================
   CURRENT FILTER
========================================= */

let currentCategory = "all";


/* =========================================
   CREATE NEWS CARD
========================================= */

function createNewsCard(news) {

  const card =
    document.createElement("article");

  card.className = "news-card";


  card.innerHTML = `

    <div class="news-card-image">
      ${news.icon}
    </div>


    <div class="news-card-content">

      <span class="news-card-category">
        ${news.categoryName}
      </span>


      <h3>
        ${news.title}
      </h3>


      <p>
        ${news.description}
      </p>


      <div class="news-card-meta">

        <span>
          ${news.source}
        </span>

        <span>
          ${news.time}
        </span>

      </div>

    </div>

  `;


  return card;

}


/* =========================================
   DISPLAY NEWS
========================================= */

function displayNews() {

  const searchTerm =
    searchInput.value
      .trim()
      .toLowerCase();


  let filteredNews =
    newsData.filter(news => {

      const matchesCategory =
        currentCategory === "all" ||
        news.category === currentCategory;


      const matchesSearch =
        searchTerm === "" ||
        news.title.toLowerCase().includes(searchTerm) ||
        news.description.toLowerCase().includes(searchTerm) ||
        news.categoryName.toLowerCase().includes(searchTerm);


      return (
        matchesCategory &&
        matchesSearch
      );

    });


  newsGrid.innerHTML = "";


  newsCount.textContent =
    `${filteredNews.length} ${
      filteredNews.length === 1
        ? "story"
        : "stories"
    }`;


  if (filteredNews.length === 0) {

    noNews.style.display = "block";

    return;

  }


  noNews.style.display = "none";


  filteredNews.forEach(news => {

    const card =
      createNewsCard(news);

    newsGrid.appendChild(card);

  });

}


/* =========================================
   CATEGORY BUTTONS
========================================= */

categoryButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      categoryButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      currentCategory =
        button.dataset.category;


      displayNews();

    }
  );

});


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
  "input",
  displayNews
);


searchButton.addEventListener(
  "click",
  displayNews
);


/* =========================================
   INITIAL LOAD
========================================= */

displayNews();


/* =========================================
   AUTOMATIC UPDATE PREPARATION
========================================= */

/*
   This function is intentionally prepared
   for a future real news API.

   Example future structure:

   async function loadNewsFromAPI() {

      const response =
        await fetch("/api/news");

      const data =
        await response.json();

      newsData.length = 0;

      newsData.push(...data);

      displayNews();
   }

   We will connect this later when the
   Goal Zone backend/API is ready.
*/


/* =========================================
   OPTIONAL REFRESH
========================================= */

setInterval(() => {

  /*
    For now we simply refresh the displayed
    news.

    Later this can call the real API so
    completely new stories appear automatically.
  */

  displayNews();

}, 60000);