/* =========================================
   GOAL ZONE - LIVE PAGE
========================================= */


/* =========================================
   REFRESH BUTTON
========================================= */

const refreshBtn = document.getElementById("refreshBtn");
const updateMessage = document.getElementById("updateMessage");

if (refreshBtn) {

  refreshBtn.addEventListener("click", function () {

    refreshBtn.textContent = "↻ Updating...";

    refreshBtn.disabled = true;

    setTimeout(function () {

      refreshBtn.textContent = "✓ Updated";

      updateMessage.textContent =
        "✓ Scores updated just now";

      setTimeout(function () {

        refreshBtn.textContent = "↻ Refresh";

        refreshBtn.disabled = false;

      }, 1500);

    }, 800);

  });

}


/* =========================================
   COMPETITION FILTER
========================================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const matchCards =
  document.querySelectorAll(".live-match-card");


filterButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    filterButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");


    const selected =
      button.textContent.trim().toUpperCase();


    matchCards.forEach(function(card) {

      const competition =
        card.querySelector(".competition");

      if (!competition) return;


      if (selected === "ALL") {

        card.style.display = "";

      }

      else if (
        competition.textContent.trim() === selected
      ) {

        card.style.display = "";

      }

      else {

        card.style.display = "none";

      }

    });

  });

});