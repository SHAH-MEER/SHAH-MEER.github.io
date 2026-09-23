(function () {
  "use strict";

  var CATEGORY_LABELS = {
    dataviz: "Data Visualization",
    datamodel: "Data Modeling",
    sql: "SQL",
    eda: "EDA & Statistics",
    ml: "Machine Learning",
    dl: "Deep Learning"
  };

  var CATEGORY_DESCRIPTIONS = {
    dataviz: "Dashboards and visual reporting built in Tableau and Excel - turning raw tables into something a stakeholder can act on in seconds.",
    datamodel: "Data modeling in Power BI - star schemas, relationships, and DAX measures that make the visuals possible. Modeling work only for now; visualization stays in Tableau.",
    sql: "Query-driven analysis against relational databases - cohort analysis, window functions, and pulling the right numbers out of messy schemas.",
    eda: "Exploratory data analysis and statistical testing in Python and R - understanding what's actually going on in a dataset before modeling it.",
    ml: "Classical machine learning in Python and R - feature engineering, model selection, and evaluation on structured, tabular data.",
    dl: "Deep learning built in PyTorch - computer vision, NLP, and transformer-based models trained and fine-tuned from scratch."
  };

  // Curated whitelist for the "Filter by tag" pills - deliberately just
  // languages/tools/subfields, not one-off techniques. Project cards still
  // show their full tag list; this only controls what's promoted to a
  // clickable filter. Add a tag here only if it's worth filtering by.
  var FILTERABLE_TAGS = new Set([
    "Python", "R", "PostgreSQL", "Tableau", "Excel", "Power BI", "PyTorch", "CV", "NLP", "Transformers"
  ]);

  // Tags reserved per category so a planned filter can appear before any
  // project uses it yet (e.g. NLP work you haven't published). Anything a
  // project actually tags (and that's in FILTERABLE_TAGS) shows up too -
  // this list just guarantees these appear even with zero matches today.
  var CATEGORY_RESERVED_TAGS = {
    dataviz: ["Tableau", "Excel"],
    datamodel: ["Power BI"],
    dl: ["PyTorch", "CV", "NLP", "Transformers"]
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
    { name: "Excel", fallback: "XLS" },
    { name: "Power BI", fallback: "PBI" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Jupyter", icon: "devicon-jupyter-plain colored" },
    { name: "Statistics", fallback: "Σ" }
  ];

  // Each project is one object; add a new one here (and give it a unique id)
  // to add a card to the site.
  var projects = [
    {
      id: "tableau-sales-customer-dashboard",
      title: "Sales & Customer Dashboard",
      category: "dataviz",
      description: "Two linked Tableau dashboards built for sales managers and marketing teams to track 2023 performance and customer behavior. Sales grew to $733K, up 20.4% YoY, but Tables is the only subcategory losing money, and most customers never place a second order, a retention gap the topline growth is masking.",
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
      description: "HR analytics dashboard built for HR managers to track headcount, demographics, and pay equity across 8,950 employee records. The workforce is 89% still active, but the pay gap between genders doesn't close with education, it widens: $8K among Bachelor's-level staff, $13K among PhD holders.",
      tags: ["Tableau", "Data Viz"],
      image: "images/hr-dashboard-summary.svg",
      links: [
        { label: "View Dashboard", url: "https://public.tableau.com/app/profile/shahmeer.shahzad/viz/HRDashboard_17900316985570/HRSummary", primary: true }
      ]
    },
    {
      id: "excel-sales-dashboard",
      title: "Interactive Sales Dashboard - Excel",
      category: "dataviz",
      description: "Fully interactive Excel dashboard for an outdoor/camping gear retailer's 2026 sales, built with PivotTables and native charting only - no Power BI or Tableau involved. Slicers for order date, customer type, region, and sales channel drive KPI cards, a revenue-vs-gross-profit trend, category and bestseller breakdowns, and a European revenue map; $645,223 in revenue across 6,698 units, led by Camping ($198,505) and Trail Boots (449 units sold).",
      tags: ["Excel", "Data Viz"],
      image: "images/sales-excel-dashboard.png",
      links: [
        { label: "View Project", url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fshah-meer.github.io%2Fexcel%2FInteractive%20Excel%20Sales%20Dashboard.xlsx", primary: true }
      ]
    },
    {
      id: "excel-water-sports-rentals",
      title: "Water Sports Rentals Sales Dashboard - Excel",
      category: "dataviz",
      description: "Excel dashboard for a seasonal water-sports rental business - a 2026 annual report tracking $150,925 in revenue across exactly 3,000 rentals ($50.31 average) with a sharp July peak and steep spring/fall drop-off. Breaks performance down by booking channel (online bookings lead, ahead of walk-ins and resort guests), by team member (Ava Martinez tops the leaderboard), and by equipment (stand-up paddleboards and kayaks are the most-rented items).",
      tags: ["Excel", "Data Viz"],
      image: "images/water-sports-rentals-excel.png",
      links: [
        { label: "View Project", url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fshah-meer.github.io%2Fexcel%2FWater-Sports-Rentals-Sales-Dashboard-FINAL.xlsx", primary: true }
      ]
    },
    {
      id: "powerbi-nightmare-star-schema",
      title: "Nightmare to Star Schema: Power BI Data Model",
      category: "datamodel",
      description: "Refactored a messy, real-world 23-table enterprise dataset (sales, inventory, shipments, marketing) into a clean Power BI star/galaxy schema. Built header-detail, factless-fact, accumulating-snapshot, and role-playing-dimension patterns, a central DAX measures table, and dynamic row-level security by region - while protecting total sales figures from merge-driven row fan-out.",
      tags: ["Power BI", "DAX", "Star Schema"],
      image: "images/powerbi-nightmare-star.png",
      links: [
        { label: "View Report", url: "#", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/Power-bi-nightmare-star" }
      ]
    },
    {
      id: "sql-data-warehouse",
      title: "SQL Data Warehouse Project",
      category: "sql",
      description: "End-to-end SQL Server data warehouse built entirely in T-SQL, following the Medallion Architecture. Bronze layer bulk-loads raw CRM and ERP CSV extracts as-is; Silver layer deduplicates, trims, and standardizes codes (gender, marital status) and dates via stored procedures; Gold layer exposes a star schema of business-ready views - dim_customers (CRM/ERP gender resolution), dim_products (active products with category), and fact_sales. SQL-based data quality tests validate PK uniqueness, whitespace, standardization, and fact-to-dimension referential integrity.",
      tags: ["SQL", "T-SQL", "SQL Server", "Data Warehouse", "ETL"],
      image: "images/data_architecture.png",
      links: [
        { label: "Source Code", url: "https://github.com/SHAH-MEER/sql-data-warehouse-project", primary: true }
      ]
    },
    {
      id: "olist-retention-analysis",
      title: "Why Don't Customers Come Back? - Olist Retention Analysis",
      category: "sql",
      description: "SQL and Python retention analysis built around a single question from Olist's VP of Growth: why is the repeat-purchase rate stuck near 3%, and which levers are worth pulling first. Delivery speed and review score, the two explanations most people reach for, barely move the needle (even a perfect first order only returns 3% of the time), ruling out expensive fixes like faster logistics or review-driven seller programs. The one real signal: customers who paid by voucher on their first order return at 4.52%, about 45% above the 3.12% baseline, pointing toward deliberate voucher issuance as a retention lever worth testing, not just a service-recovery tool.",
      tags: ["SQL", "PostgreSQL", "Python", "Quarto", "Cohort Analysis"],
      image: "images/project-flow.jpg",
      links: [
        { label: "Read Report", url: "reports/retention_story.html", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/olist-retention-analysis" }
      ]
    },
    {
      id: "cookie-cats-ab-test",
      title: "Cookie Cats A/B Test Case Study",
      category: "eda",
      description: "A/B test case study on Cookie Cats' progression-gate placement, walking through power analysis, frequentist and Bayesian readings, and the cost of peeking early. Moving the gate from level 30 to 40 looked directionally worse but inconclusive on Day 1, the test was underpowered for the true effect size, and only became statistically decisive on Day 7, where the later gate cost roughly 820 retained players per 100,000 installs a week after install.",
      tags: ["R", "Quarto", "A/B Testing", "Bayesian Statistics"],
      image: "images/cookie-cats-ab-test.png",
      links: [
        { label: "Read Report", url: "reports/cookie-cats-ab-test.html", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/EDA-Statistics/tree/master/ab-test-cookie-cats" }
      ]
    },
    {
      id: "financial-markets-eda",
      title: "Financial Markets Return Normality Case Study",
      category: "eda",
      description: "Python and Quarto case study testing whether daily stock returns are normally distributed, the assumption most VaR risk models rely on. Across SPY and seven sector-diverse stocks, returns show heavy tails (a 4-standard-deviation SPY day happens 120x more often than normal predicts) and volatility that clusters instead of staying constant. The cost: a normal-distribution VaR model breaches its own 99% threshold up to 2.6x too often, and understates SPY's 1-in-100-day loss on a $1M position by $5,752, a risk desk sizing capital off that number would be short by a quarter.",
      tags: ["Python", "Quarto", "Statistics", "Time Series"],
      image: "images/financial-markets-py.png",
      links: [
        { label: "Read Report", url: "reports/financial-markets-eda.html", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/EDA-Statistics/tree/master/financial-markets-eda" }
      ]
    },
    {
      id: "fandango-ratings-eda",
      title: "Fandango Ratings Bias Case Study",
      category: "eda",
      description: "A replication and extension of FiveThirtyEight's 2015 investigation into Fandango's movie ratings. Fandango's displayed stars were never lower than the rating its own votes implied, running about 0.9 stars above four other review platforms on average. The inflation wasn't hidden in Fandango's obscure titles either, it nearly doubled on the site's most-voted films (1.24 stars vs. 0.63), the ones with the most riding on them commercially.",
      tags: ["Python", "Quarto", "Statistics"],
      image: "images/fandango-vs-538.png",
      links: [
        { label: "Read Report", url: "reports/fandango-ratings-eda.html", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/EDA-Statistics/tree/master/fandango-ratings-eda" }
      ]
    },
    {
      id: "churn-prediction-ml",
      title: "Customer Churn Prediction",
      category: "ml",
      description: "End-to-end churn pipeline for DS/ML engineer roles, built around what happens after a model ships. Three candidate models tie within a point on test ROC-AUC, so CI automatically retrains and promotes whichever wins. The champion catches 80% of churners at 52% precision, one real alert for every false one, leaving the threshold as the actual business decision.",
      tags: ["Python", "Scikit-learn", "XGBoost", "MLflow", "SHAP"],
      image: "images/churn-prediction-ml.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/churn-prediction", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/churn-prediction" }
      ]
    },
    {
      id: "chest-xray-ensemble-cnn",
      title: "Chest X-Ray Ensemble CNN Classification",
      category: "dl",
      description: " Peer-reviewed ensemble of five CNNs (ResNet50/101, DenseNet121, EfficientNet-B0/B4) for 3-class chest X-ray classification, published in Medical Research Archives, Nov 2025. Trained on 12,841 images, the ensemble beat every individual model on the test set (98.05% vs. 97.82%), with a 0.99 F1-score on tuberculosis, the class where errors matter most.",
      tags: ["PyTorch", "CV","Grad-CAM"],
      image: "images/chest-xray-ensemble-cnn.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/CXR-Ensemble", primary: true },
        { label: "Read Publication", url: "https://esmed.org/MRA/mra/article/view/7065" },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/CXR-Ensemble" }
      ]
    },
    {
      id: "wildfire-risk-mapping",
      title: "Wildfire Risk Mapping",
      category: "dl",
      description: "ResNet18 wildfire classifier on 42,850 Canadian satellite images, built around calibrated risk probabilities (temperature scaling, checked against a Brier score) and Grad-CAM explanations, not just a fire or no-fire verdict. Test accuracy is 98.75% (F1 0.989, ROC-AUC 0.999), deployed live on Hugging Face with verified prediction parity between the local and deployed runs.",
      tags: ["PyTorch", "CV", "ResNet18", "Grad-CAM"],
      image: "images/wildfire-risk-mapping.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/wildfire-risk-mapping", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/WildfireRiskMaping" }
      ]
    },
    {
      id: "gnn-fraud-detection",
      title: "GNN Fraud Detection",
      category: "dl",
      description: "Head-to-head test of whether graph structure actually helps Bitcoin fraud detection: XGBoost (tabular) vs. GraphSAGE (GNN) on a temporal 203K-transaction split, never random, so future graph structure can't leak into training. XGBoost won on every metric (PR-AUC 0.802 vs. 0.499, recall at 90% precision 0.731 vs. 0.020), a result consistent with the original Elliptic paper's own finding. Both models collapse after a documented concept-drift point in the underlying network; diagnostics show it's genuine concept drift, not simple distribution shift, and a recency-weighting fix improves overall PR-AUC (0.380 to 0.433) without fixing the post-drift collapse.",
      tags: ["PyTorch", "GraphSAGE", "XGBoost", "Graph Neural Networks", "Concept Drift"],
      image: "images/gnn-fraud-detection.png",
      links: [
        { label: "View Project", url: "https://huggingface.co/spaces/SHAH-MEER/gnn-fraud-detection", primary: true },
        { label: "Source Code", url: "https://github.com/SHAH-MEER/GNNFraudDetecttion" }
      ]
    }
  ];

  // Exposed so other pages (e.g. the printable project summary) can reuse
  // this data as the single source of truth instead of duplicating it.
  window.SiteData = {
    projects: projects,
    categoryLabels: CATEGORY_LABELS
  };

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

  // Scoped to the active tab, and filtered down to FILTERABLE_TAGS, so the
  // pill list stays short as more projects (and more descriptive tags) are
  // added rather than accumulating every tag across every category.
  function tagsForActiveCategory() {
    var set = {};
    (CATEGORY_RESERVED_TAGS[state.category] || []).forEach(function (t) { set[t] = true; });
    projects
      .filter(function (p) { return p.category === state.category; })
      .forEach(function (p) {
        p.tags.forEach(function (t) {
          if (FILTERABLE_TAGS.has(t)) set[t] = true;
        });
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
      : '<p class="empty-state">No projects here yet - check back soon.</p>';
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
