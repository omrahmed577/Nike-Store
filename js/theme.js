// ==========================================================================
// DARK MODE
// ==========================================================================

const darkModeButton = document.querySelector("#dark-mode-btn");

// ==========================================================================
// LOAD THEME
// ==========================================================================

function loadTheme() {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "true") {
    document.body.classList.add("dark-mode");

    if (darkModeButton) {
      darkModeButton.setAttribute("aria-pressed", "true");
    }
  }
}

// ==========================================================================
// TOGGLE
// ==========================================================================

if (darkModeButton) {
  darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const enabled = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", String(enabled));

    darkModeButton.setAttribute("aria-pressed", String(enabled));
  });
}

loadTheme();
