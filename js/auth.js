// ==========================================================================
// AUTHENTICATION
// ==========================================================================

const loginSection = document.querySelector("#login");

const loginForm = document.querySelector("#login-form");

const usernameInput = document.querySelector("#username");

const passwordInput = document.querySelector("#password");

const closeLoginButton = document.querySelector(".close-login");

const signupSection = document.querySelector("#signup");

const signupForm = document.querySelector("#signup-form");

const closeSignupButton = document.querySelector(".close-signup");

const showLoginButton = document.querySelector("#show-login");

const showSignupButton = document.querySelector("#show-signup");

const signupUsernameInput = document.querySelector("#signup-username");

const signupPasswordInput = document.querySelector("#signup-password");

const confirmPasswordInput = document.querySelector("#confirm-password");

// ==========================================================================
// USERS
// ==========================================================================

function getUsers() {
  return JSON.parse(localStorage.getItem("nike_users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("nike_users", JSON.stringify(users));
}

// ==========================================================================
// OPEN LOGIN
// ==========================================================================

export function openLogin() {
  if (signupSection) {
    signupSection.hidden = true;

    signupSection.classList.remove("active");
  }

  if (loginSection) {
    loginSection.hidden = false;

    loginSection.classList.add("active");
  }
}

// ==========================================================================
// CLOSE LOGIN
// ==========================================================================

function closeLogin() {
  if (!loginSection) return;

  const loggedIn = sessionStorage.getItem("nike_session");

  if (!loggedIn) {
    alert("Please login or sign up first.");
    return;
  }

  loginSection.classList.remove("active");
  loginSection.hidden = true;
}

// ==========================================================================
// OPEN SIGNUP
// ==========================================================================

function openSignup() {
  if (loginSection) {
    loginSection.hidden = true;

    loginSection.classList.remove("active");
  }

  if (signupSection) {
    signupSection.hidden = false;

    signupSection.classList.add("active");
  }
}

// ==========================================================================
// CLOSE SIGNUP
// ==========================================================================

function closeSignup() {
  if (!signupSection) return;

  signupSection.classList.remove("active");

  signupSection.hidden = true;
}

// ==========================================================================
// SHOW SIGNUP
// ==========================================================================

if (showSignupButton) {
  showSignupButton.addEventListener("click", openSignup);
}

// ==========================================================================
// SHOW LOGIN
// ==========================================================================

if (showLoginButton) {
  showLoginButton.addEventListener("click", () => {
    closeSignup();

    openLogin();
  });
}

// ==========================================================================
// CLOSE BUTTONS
// ==========================================================================

if (closeLoginButton) {
  closeLoginButton.addEventListener("click", closeLogin);
}

if (closeSignupButton) {
  closeSignupButton.addEventListener("click", closeSignup);
}

// ==========================================================================
// SIGNUP
// ==========================================================================

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = signupUsernameInput?.value.trim() || "";

    const password = signupPasswordInput?.value.trim() || "";

    const confirmPassword = confirmPasswordInput?.value.trim() || "";

    if (!username || !password || !confirmPassword) {
      alert("Please complete all fields.");

      return;
    }

    if (username.length < 3) {
      alert("Username must be at least 3 characters.");

      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");

      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    const users = getUsers();

    const exists = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );

    if (exists) {
      alert("This username already exists.");

      return;
    }

    const newUser = {
      id: Date.now(),

      username,

      password,

      role: "User",
    };

    users.push(newUser);

    saveUsers(users);

    alert("Account created successfully!");

    signupForm.reset();

    closeSignup();

    openLogin();

    if (usernameInput) {
      usernameInput.value = username;
    }
  });
}

// ==========================================================================
// LOGIN
// ==========================================================================

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput?.value.trim() || "";

    const password = passwordInput?.value.trim() || "";

    if (!username || !password) {
      alert("Please enter username and password.");

      return;
    }

    const users = getUsers();

    const user = users.find(
      (item) =>
        item.username.toLowerCase() === username.toLowerCase() &&
        item.password === password,
    );

    if (!user) {
      alert("Incorrect username or password.");

      return;
    }

    sessionStorage.setItem("nike_session", "true");

    localStorage.setItem("nike_user", user.username);

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Welcome back, ${user.username}!`);

    loginForm.reset();

    closeLogin();

    // Tell user-menu to refresh
    window.dispatchEvent(
      new CustomEvent("userLoggedIn", {
        detail: user,
      }),
    );
  });
}

// ==========================================================================
// INITIAL AUTH CHECK
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const session = sessionStorage.getItem("nike_session");

  if (!session) {
    openLogin();
  } else {
    if (loginSection) {
      loginSection.hidden = true;
      loginSection.classList.remove("active");
    }

    if (signupSection) {
      signupSection.hidden = true;
      signupSection.classList.remove("active");
    }
  }
});
