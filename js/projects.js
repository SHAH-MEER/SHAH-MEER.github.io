(function () {
  "use strict";

  var CATEGORY_LABELS = {
    dataviz: "Data Visualization",
    sql: "SQL",
    eda: "EDA & Statistics",
    ml: "Machine Learning",
    dl: "Deep Learning"
  };

  var CATEGORY_DESCRIPTIONS = {
    dataviz: "Dashboards and visual reporting built in Tableau and Power BI — turning raw tables into something a stakeholder can act on in seconds.",
    sql: "Query-driven analysis against relational databases — cohort analysis, window functions, and pulling the right numbers out of messy schemas.",
    eda: "Exploratory data analysis and statistical testing in Python and R — understanding what's actually going on in a dataset before modeling it.",
    ml: "Classical machine learning in Python and R — feature engineering, model selection, and evaluation on structured, tabular data.",
    dl: "Deep learning built in PyTorch — computer vision, NLP, and transformer-based models trained and fine-tuned from scratch."
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
      id: "tableau-sales-customer-dashboard",
      title: "Sales & Customer Dashboard",
      category: "dataviz",
      description: "Single Tableau workbook with two linked, navigable dashboards. Sales: KPI overview vs. prior year, monthly trends with high/low markers, subcategory sales-vs-profit, weekly trends with reference-line highlighting. Customer: KPI overview, order-count distribution, top 10 customers by profit. Filters for category, region, and year.",
      tags: ["Tableau", "Data Viz"],
      image: "images/sales-customer-dashboard.svg",
      links: [
        { label: "View Dashboard", url: "https://public.tableau.com/app/profile/shahmeer.shahzad/viz/SalesCustomerDashboards_17900316327280/CustomerDashboard", primary: true }
      ]
    },
    {
      id: "tableau-hr-dashboard",
      title: "HR Dashboard",
      category: "dataviz",
      description: "HR analytics dashboard covering hiring/termination trends, department and HQ-vs-branch breakdowns, a location map, demographic analysis (gender, age, education), and salary analysis by education/gender/department. Built on a synthetic dataset of ~8,950 HR records generated via a documented Python/ChatGPT pipeline.",
      tags: ["Tableau", "Data Viz"],
      image: "images/hr-dashboard-summary.svg",
      links: [
        { label: "View Dashboard", url: "https://public.tableau.com/app/profile/shahmeer.shahzad/viz/HRDashboard_17900316985570/HRSummary", primary: true }
      ]
    },
    {
      id: "ecommerce-sql-analysis",
      title: "E-commerce Orders Analysis",
      category: "sql",
      description: "Complex SQL queries over an e-commerce dataset — cohort retention, repeat purchase rate, and order value trends.",
      tags: ["SQL", "PostgreSQL"],
      image: null,
      links: [
        { label: "Read Write-up", url: "#", primary: true },
        { label: "View Queries", url: "#" }
      ]
    },
    {
      id: "attrition-sql-deepdive",
      title: "Employee Attrition Query Deep-Dive",
      category: "sql",
      description: "Window-function-heavy SQL exploring attrition patterns by department, tenure, and compensation band.",
      tags: ["SQL", "Window Functions"],
      image: null,
      links: [
        { label: "Read Write-up", url: "#", primary: true },
        { label: "View Queries", url: "#" }
      ]
    },
    {
      id: "housing-eda",
      title: "Exploring Housing Price Drivers",
      category: "eda",
      description: "Exploratory data analysis in Python identifying the strongest predictors of housing price in a public dataset.",
      tags: ["Python", "Pandas", "Statistics"],
      image: null,
      links: [
        { label: "Read Write-up", url: "#", primary: true },
        { label: "View Notebook", url: "#" }
      ]
    },
    {
      id: "churn-eda-r",
      title: "Customer Churn EDA in R",
      category: "eda",
      description: "R-based exploratory analysis of telecom customer churn, with hypothesis testing on key churn drivers.",
      tags: ["R", "Statistics"],
      image: null,
      links: [
        { label: "Read Write-up", url: "#", primary: true },
        { label: "View Notebook", url: "#" }
      ]
    },
    {
      id: "credit-default-classifier",
      title: "Credit Default Risk Classifier",
      category: "ml",
      description: "Gradient-boosted classifier predicting loan default risk, with feature importance and threshold tuning for recall.",
      tags: ["Python", "Scikit-learn"],
      image: null,
      links: [
        { label: "View Project", url: "#", primary: true },
        { label: "Source Code", url: "#" }
      ]
    },
    {
      id: "house-price-regression",
      title: "House Price Prediction",
      category: "ml",
      description: "Regularized regression models (Ridge/Lasso) in R for house price prediction with cross-validated tuning.",
      tags: ["R", "Regression"],
      image: null,
      links: [
        { label: "Read Write-up", url: "#", primary: true },
        { label: "Source Code", url: "#" }
      ]
    },
    {
      id: "chest-xray-ensemble-cnn",
      title: "Chest X-Ray Ensemble CNN Classification",
      category: "dl",
      description: "Ensemble convolutional neural network for classifying chest X-ray images, trained on GPU. Co-authored into a peer-reviewed publication in Medical Research Archives.",
      tags: ["PyTorch", "CV","Grad-CAM"],
      image: "images/chest-xray-ensemble-cnn.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/CXR-Ensemble", primary: true },
        { label: "Read Publication", url: "https://esmed.org/MRA/mra/article/view/7065" }
      ]
    },
    {
      id: "wildfire-risk-mapping",
      title: "Wildfire Risk Mapping",
      category: "dl",
      description: "Computer vision model classifying wildfire risk from imagery using ResNet18 with Grad-CAM for explainability. 98.75% accuracy, 0.999 ROC-AUC. Deployed live via Gradio on Hugging Face Spaces.",
      tags: ["PyTorch", "CV", "ResNet18", "Grad-CAM"],
      image: "images/wildfire-risk-mapping.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/wildfire-risk-mapping", primary: true },
        { label: "Source Code", url: "#" }
      ]
    },
    {
      id: "gnn-fraud-detection",
      title: "GNN Fraud Detection",
      category: "dl",
      description: "Fraud detection comparison on the Elliptic Bitcoin transaction dataset — XGBoost vs. GraphSAGE (GNN) with a temporal train/test split. XGBoost won on every metric (PR-AUC 0.80 vs. 0.50); diagnosed post-timestep-43 concept drift as a likely driver of the GNN's weaker performance, then tested a recency-weighting mitigation strategy.",
      tags: ["PyTorch", "GraphSAGE", "XGBoost", "Graph Neural Networks", "Concept Drift"],
      image: "images/gnn-fraud-detection.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/gnn-fraud-detection", primary: true },
        { label: "Source Code", url: "#" }
      ]
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

  // Scoped to the active tab so the pill list stays short as more projects
  // are added, rather than accumulating every tag across every category.
  function tagsForActiveCategory() {
    var set = {};
    projects
      .filter(function (p) { return p.category === state.category; })
      .forEach(function (p) {
        p.tags.forEach(function (t) { set[t] = true; });
      });
    return Object.keys(set).sort();
  }

  function renderTagPills() {
    var wrap = document.getElementById("tag-pills");
    if (!wrap) return;
    wrap.innerHTML = tagsForActiveCategory().map(function (tag) {
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

  function thumbHTML(p) {
    if (p.image) {
      return '<img class="project-thumb" src="' + p.image + '" alt="' + p.title + ' preview" loading="lazy">';
    }
    return '<div class="project-thumb project-thumb-placeholder" aria-hidden="true"><span>' +
      CATEGORY_LABELS[p.category] + "</span></div>";
  }

  function linksHTML(p) {
    return p.links.map(function (l) {
      var cls = l.primary ? "link-primary" : "link-secondary";
      return '<a class="' + cls + '" href="' + l.url + '" target="_blank" rel="noopener">' + l.label + " &rarr;</a>";
    }).join("");
  }

  function cardHTML(p) {
    return (
      '<article class="project-card">' +
      thumbHTML(p) +
      '<div class="project-card-body">' +
      '<div class="project-card-header">' +
      "<h3>" + p.title + "</h3>" +
      '<span class="project-category-badge">' + CATEGORY_LABELS[p.category] + "</span>" +
      "</div>" +
      "<p>" + p.description + "</p>" +
      '<div class="project-card-tags">' +
      p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") +
      "</div>" +
      '<div class="project-card-links">' + linksHTML(p) + "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderCategoryDescription() {
    var el = document.getElementById("category-description");
    if (!el) return;
    if (state.tag) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent = CATEGORY_DESCRIPTIONS[state.category] || "";
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
    renderCategoryDescription();
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
