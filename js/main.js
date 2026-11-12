/* ==========================================================================
  PONTO DE ENTRADA PRINCIPAL (/js/main.js) — TARANIS BLACK
  Inicializa a Página 1 (Visão Executiva), KPIs interativos e Rodapé
   ========================================================================== */

(function () {
  function renderKpiDetail(kpiId) {
    const db = window.TARANIS_DB;
    if (!db || !db.executiveKpis) return;

    const kpi = db.executiveKpis.find((item) => item.id === kpiId) || db.executiveKpis[0];
    const titleEl = document.getElementById('kpi-detail-title');
    const catEl = document.getElementById('kpi-detail-category');
    const textEl = document.getElementById('kpi-detail-text');
    const metricsContainer = document.getElementById('kpi-detail-metrics');

    if (titleEl) titleEl.textContent = kpi.detailTitle;
    if (catEl) catEl.textContent = kpi.dataCategory;
    if (textEl) textEl.textContent = kpi.detailText;

    if (metricsContainer && kpi.detailMetrics) {
      metricsContainer.innerHTML = kpi.detailMetrics
        .map(function (m) {
          return (
            '<div class="kpi-mini-stat">' +
            '<span>' + m.label + '</span>' +
            '<strong>' + m.value + '</strong>' +
            '</div>'
          );
        })
        .join('');
    }

    const cards = document.querySelectorAll('.kpi-card-btn');
    cards.forEach(function (card) {
      const isSelected = card.getAttribute('data-kpi-id') === kpi.id;
      card.setAttribute('aria-expanded', isSelected ? 'true' : 'false');
    });
  }

  function setupExecutiveKpiCards() {
    const cards = document.querySelectorAll('.kpi-card-btn');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        const kpiId = card.getAttribute('data-kpi-id');
        renderKpiDetail(kpiId);
        const live = document.getElementById('sr-live-announcer');
        if (live) {
          live.textContent = 'Detalhamento atualizado para ' + card.querySelector('.kpi-card-label').textContent;
        }
      });
    });

    renderKpiDetail('kpi-ebitda');
  }

  function bindSocialPlaceholders() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    });
  }

  function initFooterYear() {
    bindSocialPlaceholders();
    const yearSpan = document.getElementById('year-footer');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  function bootstrap() {
    initFooterYear();
    setupExecutiveKpiCards();
    if (window.ExecutiveCharts) {
      window.ExecutiveCharts.init();
    }
    if (window.ScenarioSimulator) {
      window.ScenarioSimulator.init();
    }
    if (window.MenuController) {
      window.MenuController.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
