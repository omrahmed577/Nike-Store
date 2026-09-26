/* =========================================================
   ELEMENTS
========================================================= */

const menuButton = document.querySelector(".menu");
const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebar-overlay");
const closeSidebarButton = document.querySelector("#close-sidebar");

const sidebarLinks = document.querySelectorAll(".sidebar-link");
const mainNavLinks = document.querySelectorAll(".main-nav-link");

const sections = document.querySelectorAll(
  "#Home, #Products, #About, #Review, #Services",
);

/* =========================================================
   OPEN SIDEBAR
========================================================= */

function openSidebar() {
  if (!sidebar || !sidebarOverlay) return;

  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");

  sidebar.setAttribute("aria-hidden", "false");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "true");
  }

  document.body.classList.add("sidebar-open");
}

/* =========================================================
   CLOSE SIDEBAR
========================================================= */

function closeSidebar() {
  if (!sidebar || !sidebarOverlay) return;

  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");

  sidebar.setAttribute("aria-hidden", "true");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
  }

  document.body.classList.remove("sidebar-open");
}

/* =========================================================
   TOGGLE SIDEBAR
========================================================= */

function toggleSidebar() {
  if (!sidebar) return;

  if (sidebar.classList.contains("active")) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/* =========================================================
   MENU BUTTON
========================================================= */

if (menuButton) {
  menuButton.addEventListener("click", toggleSidebar);
}

/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeSidebarButton) {
  closeSidebarButton.addEventListener("click", closeSidebar);
}

/* =========================================================
   OVERLAY
========================================================= */

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}

/* =========================================================
   SIDEBAR LINKS
========================================================= */

sidebarLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    closeSidebar();
  });
});

/* =========================================================
   GET CURRENT SECTION
========================================================= */

function getCurrentSection() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop - 180 &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = `#${section.id}`;
    }
  });

  return currentSection;
}

/* =========================================================
   UPDATE SIDEBAR ACTIVE LINK
========================================================= */

function updateActiveSidebar() {
  const currentSection = getCurrentSection();

  sidebarLinks.forEach((link) => {
    const targetSection = link.getAttribute("href");

    link.classList.toggle("active", targetSection === currentSection);
  });
}

/* =========================================================
   UPDATE NAVBAR ACTIVE LINK
========================================================= */

function updateActiveNavbar() {
  const currentSection = getCurrentSection();

  mainNavLinks.forEach((link) => {
    const targetSection = link.getAttribute("href");

    link.classList.toggle("active", targetSection === currentSection);
  });
}

/* =========================================================
   UPDATE ALL NAVIGATION
========================================================= */

function updateNavigation() {
  updateActiveSidebar();
  updateActiveNavbar();
}

/* =========================================================
   NAVBAR LINKS
========================================================= */

mainNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();
  });
});

/* =========================================================
   SCROLL
========================================================= */

window.addEventListener("scroll", updateNavigation);

/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
  }
});

/* =========================================================
   INITIALIZE
========================================================= */

updateNavigation();
