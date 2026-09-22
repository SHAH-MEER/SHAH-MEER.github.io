(function () {
  "use strict";

  var CATEGORY_LABELS = {
    dataviz: "Data Visualization",
    sql: "SQL",
    eda: "EDA & Statistics",
    ml: "Machine Learning",
    dl: "Deep Learning"
  };

  var skills = [
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "R", icon: "devicon-r-original colored" },
    { name: "SQL", fallback: "SQL" },
    { name: "Pandas", icon: "devicon-pandas-original colored" },
    { name: "NumPy", icon: "devicon-numpy-original colored" },
    { name: "Scikit-learn", fallback: "skl" },
    { name: "PyTorch", icon: "devicon-pytorch-original colored" },
    { name: "Tableau", fallback: "Tab" },
    { name: "Power BI", fallback: "PBI" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
    { name: "Statistics", fallback: "Σ" }
  ];

  // Placeholder projects — replace with real work. Each project is one object;
  // add a new one here (and give it a unique id) to add a card to the site.
  var projects = [
    {
      id: "retail-sales-dashboard",
      title: "Retail Sales Performance Dashboard",
      category: "dataviz",
      description: "Interactive Tableau dashboard tracking sales, margin, and regional performance across a simulated retail chain.",
      tags: ["Tableau", "Data Viz"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "regional-revenue-tracker",
      title: "Regional Revenue Tracker",
      category: "dataviz",
      description: "Power BI report with DAX measures for YoY revenue comparisons and drill-down by region and product line.",
      tags: ["Power BI", "DAX"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "ecommerce-sql-analysis",
      title: "E-commerce Orders Analysis",
      category: "sql",
      description: "Complex SQL queries over an e-commerce dataset — cohort retention, repeat purchase rate, and order value trends.",
      tags: ["SQL", "PostgreSQL"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "attrition-sql-deepdive",
      title: "Employee Attrition Query Deep-Dive",
      category: "sql",
      description: "Window-function-heavy SQL exploring attrition patterns by department, tenure, and compensation band.",
      tags: ["SQL", "Window Functions"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "housing-eda",
      title: "Exploring Housing Price Drivers",
      category: "eda",
      description: "Exploratory data analysis in Python identifying the strongest predictors of housing price in a public dataset.",
      tags: ["Python", "Pandas", "Statistics"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "churn-eda-r",
      title: "Customer Churn EDA in R",
      category: "eda",
      description: "R-based exploratory analysis of telecom customer churn, with hypothesis testing on key churn drivers.",
      tags: ["R", "Statistics"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "credit-default-classifier",
      title: "Credit Default Risk Classifier",
      category: "ml",
      description: "Gradient-boosted classifier predicting loan default risk, with feature importance and threshold tuning for recall.",
      tags: ["Python", "Scikit-learn"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "house-price-regression",
      title: "House Price Prediction",
      category: "ml",
      description: "Regularized regression models (Ridge/Lasso) in R for house price prediction with cross-validated tuning.",
      tags: ["R", "Regression"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "cnn-image-classification",
      title: "Image Classification with CNNs",
      category: "dl",
      description: "Convolutional network built in PyTorch for multi-class image classification, trained from scratch and fine-tuned.",
      tags: ["PyTorch", "CV"],
      links: { repo: "#", writeup: "#" }
    },
    {
      id: "transformer-sentiment",
      title: "Sentiment Analysis with Transformers",
      category: "dl",
      description: "Fine-tuned transformer model in PyTorch for sentiment classification on review text.",
      tags: ["PyTorch", "NLP", "Transformers"],
      links: { repo: "#", writeup: "#" }
    }
  ];

  var state = { category: "dataviz", tag: null };

  function renderSkills() {
    var grid = document.getElementById("skills-grid");
    if (!grid) return;
    grid.innerHTML = skills.map(function (s) {
      var visual = s.icon
        ? '<i class="' + s.icon + '"></i>'
        : '<span class="skill-fallback">' + s.fallback + "</span>";
      return '<div class="skill-chip">' + visual + "<span>" + s.name + "</span></div>";
    }).join("");
  }

  function allTags() {
    var set = {};
    projects.forEach(function (p) {
      p.tags.forEach(function (t) { set[t] = true; });
    });
    return Object.keys(set).sort();
  }

  function renderTagPills() {
    var wrap = document.getElementById("tag-pills");
    if (!wrap) return;
    wrap.innerHTML = allTags().map(function (tag) {
      var active = state.tag === tag ? " active" : "";
      return '<button class="tag-pill' + active + '" data-tag="' + tag + '">' + tag + "</button>";
    }).join("");
    wrap.querySelectorAll(".tag-pill").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.tag = state.tag === btn.dataset.tag ? null : btn.dataset.tag;
        render();
      });
    });
  }

  function cardHTML(p) {
    return (
      '<article class="project-card">' +
      '<div class="project-card-header">' +
      "<h3>" + p.title + "</h3>" +
      '<span class="project-category-badge">' + CATEGORY_LABELS[p.category] + "</span>" +
      "</div>" +
      "<p>" + p.description + "</p>" +
      '<div class="project-card-tags">' +
      p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") +
      "</div>" +
      '<div class="project-card-links">' +
      '<a href="' + p.links.repo + '" target="_blank" rel="noopener">Repo &rarr;</a>' +
      '<a href="' + p.links.writeup + '" target="_blank" rel="noopener">Write-up &rarr;</a>' +
      "</div>" +
      "</article>"
    );
  }

  function renderProjects() {
    var grid = document.getElementById("project-grid");
    var status = document.getElementById("filter-status");
    if (!grid) return;

    var list;
    if (state.tag) {
      list = projects.filter(function (p) { return p.tags.indexOf(state.tag) !== -1; });
      status.hidden = false;
      status.innerHTML = 'Showing all projects tagged “' + state.tag + '” across every category.' +
        '<button id="clear-filter" type="button">Clear</button>';
      var clearBtn = document.getElementById("clear-filter");
      if (clearBtn) clearBtn.addEventListener("click", function () { state.tag = null; render(); });
    } else {
      list = projects.filter(function (p) { return p.category === state.category; });
      status.hidden = true;
      status.innerHTML = "";
    }

    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : '<p class="empty-state">No projects here yet — check back soon.</p>';
  }

  function renderTabs() {
    document.querySelectorAll(".tab").forEach(function (tab) {
      var isActive = !state.tag && tab.dataset.category === state.category;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function render() {
    renderTagPills();
    renderTabs();
    renderProjects();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSkills();

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        state.category = tab.dataset.category;
        state.tag = null;
        render();
      });
    });

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    render();
  });
})();
