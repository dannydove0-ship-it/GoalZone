/* =========================================
   GOAL ZONE
   THREE-DOT NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


/* OPEN MENU */

menuBtn.addEventListener("click", function () {

  sideMenu.classList.add("open");

  menuOverlay.classList.add("show");

  document.body.style.overflow = "hidden";

});


/* CLOSE MENU */

function closeMenu() {

  sideMenu.classList.remove("open");

  menuOverlay.classList.remove("show");

  document.body.style.overflow = "";

}


closeBtn.addEventListener("click", closeMenu);

menuOverlay.addEventListener("click", closeMenu);


/* CLOSE MENU WITH ESCAPE KEY */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeMenu();

  }

});


/* CLOSE MENU AFTER SELECTING A LINK */

const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach(function(link) {

  link.addEventListener("click", function() {

    closeMenu();

  });

});