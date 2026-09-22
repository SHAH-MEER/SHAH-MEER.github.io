(function () {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    var toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  }

  applyTheme(currentTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", currentTheme() === "light" ? "true" : "false");
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      setTheme(next);
    });
  });
})();
