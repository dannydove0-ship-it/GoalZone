/* =========================================
   GOAL ZONE - MATCHES
========================================= */

const pastMatches = [
  {
    competition: "Premier League",
    filter: "premier",
    home: "Arsenal",
    away: "Chelsea",
    homeScore: 2,
    awayScore: 1,
    time: "FT"
  },

  {
    competition: "La Liga",
    filter: "laliga",
    home: "Barcelona",
    away: "Real Madrid",
    homeScore: 3,
    awayScore: 2,
    time: "FT"
  },

  {
    competition: "Champions League",
    filter: "champions",
    home: "PSG",
    away: "Bayern Munich",
    homeScore: 1,
    awayScore: 1,
    time: "FT"
  }
];


const todayMatches = [
  {
    competition: "Premier League",
    filter: "premier",
    home: "Liverpool",
    away: "Manchester United",
    time: "15:00"
  },

  {
    competition: "Premier League",
    filter: "premier",
    home: "Manchester City",
    away: "Tottenham",
    time: "17:30"
  },

  {
    competition: "La Liga",
    filter: "laliga",
    home: "Atletico Madrid",
    away: "Sevilla",
    time: "20:00"
  }
];


const upcomingMatches = [
  {
    competition: "Premier League",
    filter: "premier",
    home: "Chelsea",
    away: "Liverpool",
    time: "15:00"
  },

  {
    competition: "La Liga",
    filter: "laliga",
    home: "Real Madrid",
    away: "Valencia",
    time: "18:30"
  },

  {
    competition: "Champions League",
    filter: "champions",
    home: "Barcelona",
    away: "PSG",
    time: "20:00"
  }
];


let selectedDate = new Date();
let currentFilter = "all";


/* =========================================
   ELEMENTS
========================================= */

const pastContainer =
  document.getElementById("pastMatches");

const todayContainer =
  document.getElementById("todayMatches");

const upcomingContainer =
  document.getElementById("upcomingMatches");

const selectedDateElement =
  document.getElementById("selectedDate");

const dayNameElement =
  document.getElementById("dayName");

const prevDay =
  document.getElementById("prevDay");

const nextDay =
  document.getElementById("nextDay");


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date) {

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

}


/* =========================================
   UPDATE DATE
========================================= */

function updateDateDisplay() {

  const today = new Date();

  selectedDateElement.textContent =
    formatDate(selectedDate);


  if (
    selectedDate.toDateString() ===
    today.toDateString()
  ) {

    dayNameElement.textContent = "Today";

  } else if (
    selectedDate < today
  ) {

    dayNameElement.textContent = "Selected Date";

  } else {

    dayNameElement.textContent = "Upcoming Date";

  }

}


/* =========================================
   CREATE MATCH CARD
========================================= */

function createMatchCard(match, status) {

  const card = document.createElement("div");

  card.className = "match-card";


  let statusHTML = "";

  if (status === "finished") {

    statusHTML = `
      <span class="status finished">
        Finished
      </span>
    `;

  } else {

    statusHTML = `
      <span class="status upcoming">
        Upcoming
      </span>
    `;

  }


  let scores = "";

  if (status === "finished") {

    scores = `
      <div class="team">
        <span class="team-name">
          ${match.home}
        </span>

        <span class="team-score">
          ${match.homeScore}
        </span>
      </div>

      <div class="team">
        <span class="team-name">
          ${match.away}
        </span>

        <span class="team-score">
          ${match.awayScore}
        </span>
      </div>
    `;

  } else {

    scores = `
      <div class="team">
        <span class="team-name">
          ${match.home}
        </span>
      </div>

      <div class="team">
        <span class="team-name">
          ${match.away}
        </span>
      </div>
    `;

  }


  card.innerHTML = `

    <div>

      <div class="match-competition">
        ${match.competition}
      </div>

      <div class="match-time">
        ${match.time}
      </div>

    </div>


    <div class="match-teams">
      ${scores}
    </div>


    <div class="match-status">

      ${statusHTML}

      <div class="match-date">
        ${formatDate(selectedDate)}
      </div>

    </div>

  `;


  return card;

}


/* =========================================
   FILTER MATCHES
========================================= */

function filterMatches(matches) {

  if (currentFilter === "all") {
    return matches;
  }

  return matches.filter(
    match => match.filter === currentFilter
  );

}


/* =========================================
   DISPLAY MATCHES
========================================= */

function displayMatches() {

  updateDateDisplay();


  pastContainer.innerHTML = "";
  todayContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";


  const filteredPast =
    filterMatches(pastMatches);

  const filteredToday =
    filterMatches(todayMatches);

  const filteredUpcoming =
    filterMatches(upcomingMatches);


  /* PAST */

  if (filteredPast.length === 0) {

    pastContainer.innerHTML = `
      <div class="empty-matches">
        No past matches available.
      </div>
    `;

  } else {

    filteredPast.forEach(match => {

      pastContainer.appendChild(
        createMatchCard(match, "finished")
      );

    });

  }


  /* TODAY */

  if (filteredToday.length === 0) {

    todayContainer.innerHTML = `
      <div class="empty-matches">
        No matches available for this date.
      </div>
    `;

  } else {

    filteredToday.forEach(match => {

      todayContainer.appendChild(
        createMatchCard(match, "upcoming")
      );

    });

  }


  /* UPCOMING */

  if (filteredUpcoming.length === 0) {

    upcomingContainer.innerHTML = `
      <div class="empty-matches">
        No upcoming matches available.
      </div>
    `;

  } else {

    filteredUpcoming.forEach(match => {

      upcomingContainer.appendChild(
        createMatchCard(match, "upcoming")
      );

    });

  }

}


/* =========================================
   PREVIOUS DAY
========================================= */

prevDay.addEventListener("click", () => {

  selectedDate.setDate(
    selectedDate.getDate() - 1
  );

  displayMatches();

});


/* =========================================
   NEXT DAY
========================================= */

nextDay.addEventListener("click", () => {

  selectedDate.setDate(
    selectedDate.getDate() + 1
  );

  displayMatches();

});


/* =========================================
   COMPETITION FILTER
========================================= */

const competitionButtons =
  document.querySelectorAll(".competition-btn");


competitionButtons.forEach(button => {

  button.addEventListener("click", () => {

    competitionButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter =
      button.dataset.filter;

    displayMatches();

  });

});


/* =========================================
   INITIAL LOAD
========================================= */

displayMatches();