(function () {
  "use strict";

  var CATEGORY_ORDER = ["dataviz", "datamodel", "sql", "eda", "ml", "dl"];

  function linkHTML(l) {
    return '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a>";
  }

  function projectHTML(p) {
    var primary = p.links.filter(function (l) { return l.primary; })[0] || p.links[0];
    var secondary = p.links.filter(function (l) { return l !== primary; });
    var titleHTML = primary ? linkHTML({ url: primary.url, label: p.title }) : p.title;
    var secondaryHTML = secondary.length
      ? '<p class="summary-links">' + secondary.map(linkHTML).join(" &middot; ") + "</p>"
      : "";

    return (
      '<article class="summary-project">' +
      "<h3>" + titleHTML + "</h3>" +
      "<p>" + p.description + "</p>" +
      '<p class="summary-tags">' + p.tags.join(" &middot; ") + "</p>" +
      secondaryHTML +
      "</article>"
    );
  }

  function categoryHTML(categoryId, label, projects) {
    var items = projects.filter(function (p) { return p.category === categoryId; });
    if (!items.length) return "";
    return (
      '<section class="summary-category">' +
      "<h2>" + label + "</h2>" +
      items.map(projectHTML).join("") +
      "</section>"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = window.SiteData;
    var root = document.getElementById("summary-root");
    if (!data || !root) return;

    root.innerHTML = CATEGORY_ORDER
      .map(function (cat) { return categoryHTML(cat, data.categoryLabels[cat] || cat, data.projects); })
      .join("");

    var dateEl = document.getElementById("generated-date");
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    }

    var printBtn = document.getElementById("print-btn");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
  });
})();
