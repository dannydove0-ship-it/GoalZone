/* =========================================
   GOAL ZONE
   THREE-DOT NAVIGATION + FEATURED MATCH API
========================================= */


/* =========================================
   THREE-DOT NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


/* OPEN MENU */

if (menuBtn) {

  menuBtn.addEventListener("click", function () {

    sideMenu.classList.add("open");

    menuOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

  });

}


/* CLOSE MENU */

function closeMenu() {

  if (sideMenu) {
    sideMenu.classList.remove("open");
  }

  if (menuOverlay) {
    menuOverlay.classList.remove("show");
  }

  document.body.style.overflow = "";

}


/* CLOSE BUTTON */

if (closeBtn) {

  closeBtn.addEventListener(
    "click",
    closeMenu
  );

}


/* CLOSE WHEN CLICKING OVERLAY */

if (menuOverlay) {

  menuOverlay.addEventListener(
    "click",
    closeMenu
  );

}


/* CLOSE WITH ESCAPE KEY */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      closeMenu();

    }

  }
);


/* CLOSE MENU AFTER SELECTING A LINK */

const menuLinks =
  document.querySelectorAll(".menu-link");

menuLinks.forEach(function (link) {

  link.addEventListener(
    "click",
    function () {

      closeMenu();

    }
  );

});


/* =========================================
   GOAL ZONE API
========================================= */

const GOAL_ZONE_API =
  "https://goalzone-hqj5.onrender.com";


/* =========================================
   LOAD FEATURED MATCH
========================================= */

async function loadFeaturedMatch() {

  const featuredMatch =
    document.getElementById("featuredMatch");

  const homeTeam =
    document.getElementById("homeTeam");

  const awayTeam =
    document.getElementById("awayTeam");

  const homeBadge =
    document.getElementById("homeBadge");

  const awayBadge =
    document.getElementById("awayBadge");

  const matchTime =
    document.getElementById("matchTime");

  const matchDate =
    document.getElementById("matchDate");

  const message =
    document.getElementById("featuredMessage");

  const competition =
    document.getElementById("featuredCompetition");


  /* STOP IF FEATURED SECTION DOES NOT EXIST */

  if (!featuredMatch || !homeTeam || !awayTeam) {

    return;

  }


  /* LOADING MESSAGE */

  homeTeam.textContent = "Loading...";

  awayTeam.textContent = "Loading...";

  if (matchTime) {
    matchTime.textContent = "—";
  }

  if (matchDate) {
    matchDate.textContent = "Loading match...";
  }


  try {

    /* GET FIXTURES FROM GOAL ZONE BACKEND */

    const response = await fetch(
      `${GOAL_ZONE_API}/api/fixtures?competition=PL`
    );


    /* CHECK SERVER RESPONSE */

    if (!response.ok) {

      throw new Error(
        "Could not load fixtures"
      );

    }


    /* CONVERT RESPONSE TO JSON */

    const data =
      await response.json();


    console.log(
      "Goal Zone fixtures:",
      data
    );


    /* SUPPORT DIFFERENT API RESPONSE FORMATS */

    const matches =
      data.matches ||
      data.response ||
      data.fixtures ||
      [];


    /* NO MATCHES */

    if (!Array.isArray(matches) ||
        matches.length === 0) {

      homeTeam.textContent =
        "No match";

      awayTeam.textContent =
        "available";

      if (matchTime) {
        matchTime.textContent = "—";
      }

      if (matchDate) {
        matchDate.textContent =
          "No upcoming fixture";
      }

      if (message) {
        message.textContent =
          "No upcoming Premier League match is available.";
      }

      return;

    }


    /* GET FIRST MATCH */

    const match =
      matches[0];


    /* =====================================
       TEAM INFORMATION
    ===================================== */

    const home =
      match.homeTeam ||
      match.teams?.home ||
      match.home ||
      {};

    const away =
      match.awayTeam ||
      match.teams?.away ||
      match.away ||
      {};


    /* TEAM NAMES */

    homeTeam.textContent =
      home.name ||
      match.homeTeamName ||
      "Home Team";

    awayTeam.textContent =
      away.name ||
      match.awayTeamName ||
      "Away Team";


    /* TEAM BADGES */

    if (homeBadge) {

      const homeLogo =
        home