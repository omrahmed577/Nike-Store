import { openLogin } from "./auth.js";

const userIcon =
  document.querySelector("#open-account-btn") ||
  document.querySelector("#user-btn");

const userMenu = document.querySelector("#user-menu");
const logoutButton = document.querySelector("#logout-btn");
const profileName = document.querySelector("#profile-name");
const profileRole = document.querySelector("#profile-role");

const SESSION_KEY = "nike_session";

function loadCurrentUser() {
  const saved =
    localStorage.getItem("currentUser") || localStorage.getItem("nike_user");

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("nike_user");
    return null;
  }
}

function loadSession() {
  const savedSession = sessionStorage.getItem(SESSION_KEY);

  if (!savedSession) return null;

  try {
    return JSON.parse(savedSession);
  } catch {
    return {
      token: savedSession,
    };
  }
}

function getSessionUser() {
  const session = loadSession();

  if (!session) return null;

  return session.user || session.currentUser || session.account || null;
}

function getActiveUser() {
  return getSessionUser() || loadCurrentUser();
}

function isLoggedIn() {
  return Boolean(sessionStorage.getItem(SESSION_KEY) || loadCurrentUser());
}

export function updateUserMenu(user) {
  if (!user) {
    resetUserMenuUI();
    return;
  }

  if (profileName) {
    profileName.textContent =
      user.username || user.name || user.email || "User";
  }

  if (profileRole) {
    profileRole.textContent = user.role || "User";
  }

  if (userIcon) {
    userIcon.title = `Welcome, ${user.username || user.name || "User"}`;

    userIcon.style.color = "var(--primary-color, #1c0080)";
  }
}

function resetUserMenuUI() {
  if (profileName) {
    profileName.textContent = "Guest";
  }

  if (profileRole) {
    profileRole.textContent = "";
  }

  if (userIcon) {
    userIcon.title = "Account";
    userIcon.style.color = "";
    userIcon.classList.remove("active");
    userIcon.setAttribute("aria-expanded", "false");
  }

  if (userMenu) {
    userMenu.hidden = true;
    userMenu.classList.remove("active");
  }
}

function refreshSession() {
  const user = getActiveUser();

  if (user && isLoggedIn()) {
    updateUserMenu(user);
  } else {
    resetUserMenuUI();
  }
}

function openUserMenu() {
  if (!userMenu || !userIcon) return;

  userMenu.hidden = false;
  userMenu.classList.add("active");
  userIcon.classList.add("active");
  userIcon.setAttribute("aria-expanded", "true");
}

function closeUserMenu() {
  if (!userMenu || !userIcon) return;

  userMenu.hidden = true;
  userMenu.classList.remove("active");
  userIcon.classList.remove("active");
  userIcon.setAttribute("aria-expanded", "false");
}

function toggleUserMenu() {
  if (!userMenu) return;

  if (userMenu.hidden) {
    openUserMenu();
  } else {
    closeUserMenu();
  }
}

window.addEventListener("userLoggedIn", (event) => {
  if (event.detail) {
    updateUserMenu(event.detail);
  } else {
    refreshSession();
  }

  closeUserMenu();
});

window.addEventListener("sessionUpdated", () => {
  refreshSession();
});

window.addEventListener("storage", (event) => {
  if (
    event.storageArea === localStorage &&
    (event.key === "currentUser" || event.key === "nike_user")
  ) {
    refreshSession();
  }

  if (event.storageArea === sessionStorage && event.key === SESSION_KEY) {
    refreshSession();

    if (!event.newValue) {
      closeUserMenu();
    }
  }
});

if (userIcon) {
  userIcon.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    refreshSession();

    if (!isLoggedIn()) {
      closeUserMenu();
      openLogin();
      return;
    }

    toggleUserMenu();
  });
}

if (userMenu) {
  userMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

document.addEventListener("click", (event) => {
  if (!userMenu || !userIcon) return;

  const clickedInsideMenu = userMenu.contains(event.target);
  const clickedIcon = userIcon.contains(event.target);

  if (!clickedInsideMenu && !clickedIcon) {
    closeUserMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeUserMenu();
  }
});

if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("nike_user");
    localStorage.removeItem("currentUser");

    resetUserMenuUI();
    openLogin();
  });
}

function initializeUserMenu() {
  closeUserMenu();
  refreshSession();
}

initializeUserMenu();
