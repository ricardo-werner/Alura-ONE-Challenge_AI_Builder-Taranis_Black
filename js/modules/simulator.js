/* ==========================================================================
  MÓDULO DE COMPARATIVOS E SIMULADOR DE CENÁRIOS (/js/modules/simulator.js)
  Parte 5: Página 6 (Comparador Atual vs. Futuro, Simulador de Premissas e T5)
   ========================================================================== */

const ScenarioSimulator = (function () {
  let currentCompView = 'current'; // 'current', 'future', 'both'
  let simState = {
    cancelRecPct: 25,
    triageRedPct: 75,
    freightRedPct: 50,
    boletoRedPct: 70,
    closingTargetDays: 2
  };

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatCompactBRL(val) {
    const abs = Math.abs(val);
    if (abs >= 1000000) {
      return 'R$ ' + (val / 1000000).toFixed(2).replace('.', ',') + ' mi';
    }
    return 'R$ ' + Math.round(val / 1000).toLocaleString('pt-BR') + ' mil';
  }

  /**
   * 1. Renderiza os 6 Cards do Comparativo de Cenários (Fiel às Imagens 1 e 2)
   */
  function renderScenarioComparator() {
    const container = document.getElementById('scenario-comparator-cards-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.scenarioComparisons) return;

    const items = db.scenarioComparisons;

    if (currentCompView === 'both') {
      container.innerHTML = '<div class="comp-cards-grid">' + items
        .map(function (item) {
          return (
            '<article class="comp-scenario-card">' +
            '  <p class="comp-metric-label">' + escapeHtml(item.metricTitle) + '</p>' +
            '  <div class="comp-side-by-side-box">' +
            '    <div class="comp-half-pane">' +
            '      <span class="comp-pill-current">' + escapeHtml(item.currentBadge) + ' (Atual)</span>' +
            '      <p class="comp-big-value" style="font-size:1.15rem; margin-top:0.35rem;">' + escapeHtml(item.currentValue) + '</p>' +
            '      <p class="comp-desc-text" style="font-size:0.79rem;">' + escapeHtml(item.currentDesc) + '</p>' +
            '    </div>' +
            '    <div class="comp-half-pane">' +
            '      <span class="comp-pill-future">' + escapeHtml(item.futureBadge) + ' (Futuro)</span>' +
            '      <p class="comp-big-value" style="font-size:1.15rem; margin-top:0.35rem;">' + escapeHtml(item.futureValue) + '</p>' +
            '      <p class="comp-desc-text" style="font-size:0.79rem;">' + escapeHtml(item.futureDesc) + '</p>' +
            '    </div>' +
            '  </div>' +
            '</article>'
          );
        })
        .join('') + '</div>';
      return;
    }

    const isFuture = currentCompView === 'future';

    container.innerHTML = '<div class="comp-cards-grid">' + items
      .map(function (item) {
        const val = isFuture ? item.futureValue : item.currentValue;
        const badge = isFuture ? item.futureBadge : item.currentBadge;
        const desc = isFuture ? item.futureDesc : item.currentDesc;
        const pillClass = isFuture ? 'comp-pill-future' : 'comp-pill-current';
        const cardModeClass = isFuture ? 'mode-future' : 'mode-current';

        return (
          '<article class="comp-scenario-card ' + cardModeClass + '">' +
          '  <div>' +
          '    <p class="comp-metric-label">' + escapeHtml(item.metricTitle) + '</p>' +
          '    <p class="comp-big-value">' + escapeHtml(val) + '</p>' +
          '    <span class="' + pillClass + '">' + escapeHtml(badge) + '</span>' +
          '  </div>' +
          '  <p class="comp-desc-text">' + escapeHtml(desc) + '</p>' +
          '</article>'
        );
      })
      .join('') + '</div>';
  }

  /**
   * 2. Calcula os Benefícios e Cenários do T5 a partir das premissas atuais do Simulador
   */
  function calculateSimulation() {
    const db = window.TARANIS_DB;
    const bases = db.simulatorModel.bases;
    const defs = db.simulatorModel.defaults;

    const isOfficial =
      simState.cancelRecPct === defs.cancelRecPct &&
      simState.triageRedPct === defs.triageRedPct &&
      simState.freightRedPct === defs.freightRedPct &&
      simState.boletoRedPct === defs.boletoRedPct &&
      simState.closingTargetDays === defs.closingTargetDays;

    // Caso 1: Crédito Assistido
    const creditMarginAnnual = bases.canceledOrdersExposure * (simState.cancelRecPct / 100) * bases.dreGrossMargin;
    const minMonthlyHoursSaved = Math.round((180 * 40 * (simState.triageRedPct / 100)) / 60);
    const maxMonthlyHoursSaved = Math.round((220 * 40 * (simState.triageRedPct / 100)) / 60);

    // Caso 2: Leitura de Propostas
    const freightAnnual = bases.emergencyFreightExposure * (simState.freightRedPct / 100);
    const boletoAnnual = bases.boletoErrorExposure * (simState.boletoRedPct / 100);
    const proposalsAnnual = freightAnnual + boletoAnnual;

    // Caso 3: Conciliação
    const daysSaved = Math.max(0, bases.currentClosingDays - simState.closingTargetDays);
    const conciliationAnnual = bases.closingDelayExposure * (daysSaved / bases.currentClosingDays);

    // Totais Anuais e Trimestrais
    const totalAnnualBenefit = creditMarginAnnual + proposalsAnnual + conciliationAnnual;
    const pctOfAnnualGap = (totalAnnualBenefit / bases.annualEbitdaGap) * 100;

    const quarterlyPilotBenefit = creditMarginAnnual / 4;
    const quarterlyAll3Benefit = totalAnnualBenefit / 4;
    const pctOfT4Deficit = (quarterlyAll3Benefit / bases.t4QuarterlyGap) * 100;

    // T5 Cenário A (Tendência Linear: base 3,9% / R$ 553,8 mil sobre R$ 14,2 mi)
    const t5TrendPilotEbitda = bases.t5TrendBaseEbitda + quarterlyPilotBenefit;
    const t5TrendPilotMargin = (t5TrendPilotEbitda / bases.t5ProjectedRevenue) * 100;
    const t5TrendAll3Ebitda = bases.t5TrendBaseEbitda + quarterlyAll3Benefit;
    const t5TrendAll3Margin = (t5TrendAll3Ebitda / bases.t5ProjectedRevenue) * 100;

    // T5 Cenário B (Patamar T4: base 7,5% / R$ 1,065 mi sobre R$ 14,2 mi)
    const t5FlatPilotEbitda = bases.t5FlatBaseEbitda + quarterlyPilotBenefit;
    const t5FlatPilotMargin = (t5FlatPilotEbitda / bases.t5ProjectedRevenue) * 100;
    const t5FlatAll3Ebitda = bases.t5FlatBaseEbitda + quarterlyAll3Benefit;
    const t5FlatAll3Margin = (t5FlatAll3Ebitda / bases.t5ProjectedRevenue) * 100;

    return {
      isOfficial,
      creditMarginAnnual,
      minMonthlyHoursSaved,
      maxMonthlyHoursSaved,
      proposalsAnnual,
      conciliationAnnual,
      totalAnnualBenefit,
      pctOfAnnualGap,
      quarterlyPilotBenefit,
      quarterlyAll3Benefit,
      pctOfT4Deficit,
      t5TrendPilotEbitda,
      t5TrendPilotMargin,
      t5TrendAll3Ebitda,
      t5TrendAll3Margin,
      t5FlatPilotEbitda,
      t5FlatPilotMargin,
      t5FlatAll3Ebitda,
      t5FlatAll3Margin
    };
  }

  /**
   * 3. Atualiza os Painéis do Simulador e o Gráfico SVG dos Cenários do T5
   */
  function updateSimulatorUI() {
    const calc = calculateSimulation();

    // Atualiza rótulos dos sliders
    const lblCancel = document.getElementById('val-sim-cancel');
    const lblTriage = document.getElementById('val-sim-triage');
    const lblFreight = document.getElementById('val-sim-freight');
    const lblBoleto = document.getElementById('val-sim-boleto');
    const lblClosing = document.getElementById('val-sim-closing');

    if (lblCancel) lblCancel.textContent = simState.cancelRecPct + '%';
    if (lblTriage) lblTriage.textContent = simState.triageRedPct + '% (' + Math.round(40 * (1 - simState.triageRedPct / 100)) + ' min)';
    if (lblFreight) lblFreight.textContent = simState.freightRedPct + '%';
    if (lblBoleto) lblBoleto.textContent = simState.boletoRedPct + '%';
    if (lblClosing) lblClosing.textContent = simState.closingTargetDays + ' dias úteis';

    // Badge de status oficial vs. customizado
    const modeBadge = document.getElementById('sim-status-badge');
    if (modeBadge) {
      if (calc.isOfficial) {
        modeBadge.className = 'exec-badge exec-badge-info';
        modeBadge.textContent = 'Premissas Oficiais do Relatório (Hipóteses a Validar)';
      } else {
        modeBadge.className = 'exec-badge exec-badge-warn';
        modeBadge.textContent = 'Simulação Hipotética Customizada';
      }
    }

    // Resultados calculados no painel direito
    const totalEl = document.getElementById('sim-res-total');
    const gapShareEl = document.getElementById('sim-res-gap-share');
    const breakdownEl = document.getElementById('sim-res-breakdown');

    if (totalEl) totalEl.textContent = '≈ ' + formatCompactBRL(calc.totalAnnualBenefit) + '/ano';
    if (gapShareEl) {
      gapShareEl.innerHTML =
        'Potencial para <strong>endereçar cerca de ' + calc.pctOfAnnualGap.toFixed(0) + '% do gap anual de EBITDA</strong> (R$ 4,08 mi) e cobrir <strong>~' + calc.pctOfT4Deficit.toFixed(0) + '% do déficit trimestral do T4</strong>.';
    }

    if (breakdownEl) {
      breakdownEl.innerHTML =
        '<div class="quarter-stat-row"><span>1. Crédito Assistido (Piloto):</span><strong>≈ ' + formatCompactBRL(calc.creditMarginAnnual) + '/ano (+ ' + calc.minMonthlyHoursSaved + ' a ' + calc.maxMonthlyHoursSaved + ' h/mês)</strong></div>' +
        '<div class="quarter-stat-row"><span>2. Leitura de Propostas (Onda 2):</span><strong>≈ ' + formatCompactBRL(calc.proposalsAnnual) + '/ano</strong></div>' +
        '<div class="quarter-stat-row"><span>3. Conciliação Assistida (Onda 2):</span><strong>≈ ' + formatCompactBRL(calc.conciliationAnnual) + '/ano</strong></div>' +
        '<div class="quarter-stat-row"><span>Ponto de Equilíbrio (Custo Máx.):</span><strong style="color:var(--brand-gold);">&lt; ' + formatCompactBRL(calc.totalAnnualBenefit) + '/ano</strong></div>';
    }

    renderT5ScenarioChartAndTable(calc);
  }

  /**
   * 4. Renderiza o Gráfico SVG e a Tabela dos Cenários Ilustrativos do T5
   */
  function renderT5ScenarioChartAndTable(calc) {
    const svgContainer = document.getElementById('t5-scenarios-svg-container');
    const tableContainer = document.getElementById('t5-scenarios-table-container');
    if (!svgContainer || !tableContainer) return;

    const w = 660;
    const h = 290;
    const padL = 56;
    const padR = 46;
    const padT = 34;
    const padB = 46;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const maxY = 24;

    function getX(idx) {
      return padL + (idx * (plotW / 4)); // 0=T1, 1=T2, 2=T3, 3=T4, 4=T5
    }
    function getY(pct) {
      return padT + plotH - (Math.max(0, Math.min(maxY, pct)) / maxY) * plotH;
    }

    const hist = [
      { q: 'T1', orc: 19.7, real: 16.4 },
      { q: 'T2', orc: 19.7, real: 15.6 },
      { q: 'T3', orc: 20.5, real: 9.2 },
      { q: 'T4', orc: 20.9, real: 7.5 }
    ];

    const xT4 = getX(3);
    const yT4 = getY(7.5);
    const xT5 = getX(4);

    const yTrendBase = getY(3.9);
    const yTrendAll3 = getY(calc.t5TrendAll3Margin);
    const yFlatBase = getY(7.5);
    const yFlatAll3 = getY(calc.t5FlatAll3Margin);

    let svg = '<svg class="exec-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-labelledby="t5-svg-title t5-svg-desc">';
    svg += '<title id="t5-svg-title">Trajetória da Margem EBITDA (T1 a T4) e Cenários Ilustrativos do 5º Trimestre (T5)</title>';
    svg += '<desc id="t5-svg-desc">Gráfico exibindo a queda da margem EBITDA de 16,4% no T1 para 7,5% no T4 e projetando o T5 em dois cenários ilustrativos: Cenário A (tendência 3,9%, subindo para ' + calc.t5TrendAll3Margin.toFixed(1).replace('.', ',') + '% com as 3 iniciativas) e Cenário B (patamar T4 7,5%, subindo para ' + calc.t5FlatAll3Margin.toFixed(1).replace('.', ',') + '% com as 3 iniciativas).</desc>';

    // Zona sombreada do T5 (Ilustrativo)
    svg += '<rect x="' + ((xT4 + xT5) / 2) + '" y="' + padT + '" width="' + (w - padR - ((xT4 + xT5) / 2) + 20) + '" height="' + plotH + '" fill="rgba(212, 167, 46, 0.08)" stroke="rgba(212, 167, 46, 0.35)" stroke-dasharray="4,4" />';
    svg += '<text x="' + xT5 + '" y="' + (padT + 16) + '" text-anchor="middle" font-size="10.5" font-weight="800" fill="#D4A72E">T5 ILUSTRATIVO</text>';

    // Grade horizontal
    [0, 5, 10, 15, 20].forEach(function (tick) {
      const y = getY(tick);
      svg += '<line x1="' + padL + '" y1="' + y + '" x2="' + (w - padR) + '" y2="' + y + '" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" />';
      svg += '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="currentColor" opacity="0.75">' + tick + '%</text>';
    });

    // Curvas históricas T1 a T4
    const orcPts = hist.map(function (d, i) { return getX(i) + ',' + getY(d.orc); }).join(' ');
    const realPts = hist.map(function (d, i) { return getX(i) + ',' + getY(d.real); }).join(' ');

    svg += '<polyline fill="none" stroke="#9FB0C4" stroke-width="2.5" stroke-dasharray="6,4" points="' + orcPts + '" />';
    svg += '<polyline fill="none" stroke="#D4A72E" stroke-width="3.5" points="' + realPts + '" />';

    // Ramificações do T4 para o T5:
    // 1. Cenário A Base (3,9% - tendência sem ação)
    svg += '<line x1="' + xT4 + '" y1="' + yT4 + '" x2="' + xT5 + '" y2="' + yTrendBase + '" stroke="#FB7185" stroke-width="2.5" stroke-dasharray="4,4" />';
    // 2. Cenário A + 3 Iniciativas (≈ 5,7%)
    svg += '<line x1="' + xT4 + '" y1="' + yT4 + '" x2="' + xT5 + '" y2="' + yTrendAll3 + '" stroke="#FBBF24" stroke-width="2.5" stroke-dasharray="6,3" />';
    // 3. Cenário B Base (7,5% - patamar T4)
    svg += '<line x1="' + xT4 + '" y1="' + yT4 + '" x2="' + xT5 + '" y2="' + yFlatBase + '" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4,4" />';
    // 4. Cenário B + 3 Iniciativas (≈ 9,2%)
    svg += '<line x1="' + xT4 + '" y1="' + yT4 + '" x2="' + xT5 + '" y2="' + yFlatAll3 + '" stroke="#34D399" stroke-width="3" />';

    // Marcadores T1 a T4
    hist.forEach(function (d, i) {
      const x = getX(i);
      const yR = getY(d.real);
      svg += '<circle cx="' + x + '" cy="' + yR + '" r="5.5" fill="#D4A72E" stroke="#0E1E33" stroke-width="2" />';
      svg += '<text x="' + x + '" y="' + (yR - 10) + '" text-anchor="middle" font-size="11" font-weight="800" fill="#D4A72E">' + String(d.real).replace('.', ',') + '%</text>';
      svg += '<text x="' + x + '" y="' + (h - 16) + '" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">' + d.q + '</text>';
    });

    // Marcadores no T5
    svg += '<text x="' + xT5 + '" y="' + (h - 16) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#D4A72E">T5 (Cenários)</text>';

    // Ponto B + 3 Iniciativas (9,2%)
    svg += '<circle cx="' + xT5 + '" cy="' + yFlatAll3 + '" r="6" fill="#34D399" stroke="#0E1E33" stroke-width="2" />';
    svg += '<text x="' + (xT5 - 10) + '" y="' + (yFlatAll3 - 8) + '" text-anchor="end" font-size="11" font-weight="800" fill="#6EE7B7">B + 3 Inic.: ' + calc.t5FlatAll3Margin.toFixed(1).replace('.', ',') + '%</text>';

    // Ponto B Base (7,5%)
    svg += '<rect x="' + (xT5 - 4.5) + '" y="' + (yFlatBase - 4.5) + '" width="9" height="9" fill="#38BDF8" />';
    svg += '<text x="' + (xT5 - 10) + '" y="' + (yFlatBase + 4) + '" text-anchor="end" font-size="10.5" font-weight="700" fill="#7DD3FC">B Base: 7,5%</text>';

    // Ponto A + 3 Iniciativas (5,7%)
    svg += '<circle cx="' + xT5 + '" cy="' + yTrendAll3 + '" r="5.5" fill="#FBBF24" stroke="#0E1E33" stroke-width="1.5" />';
    svg += '<text x="' + (xT5 - 10) + '" y="' + (yTrendAll3 + 4) + '" text-anchor="end" font-size="10.5" font-weight="800" fill="#FDE047">A + 3 Inic.: ' + calc.t5TrendAll3Margin.toFixed(1).replace('.', ',') + '%</text>';

    // Ponto A Base (3,9%)
    svg += '<polygon points="' + xT5 + ',' + (yTrendBase - 6) + ' ' + (xT5 - 5.5) + ',' + (yTrendBase + 5) + ' ' + (xT5 + 5.5) + ',' + (yTrendBase + 5) + '" fill="#FB7185" />';
    svg += '<text x="' + (xT5 - 10) + '" y="' + (yTrendBase + 14) + '" text-anchor="end" font-size="10.5" font-weight="700" fill="#FDA4AF">A Tendência: 3,9%</text>';

    svg += '</svg>';
    svgContainer.innerHTML = svg;

    // Tabela comparativa do T5 (Receita projetada ≈ R$ 14,2 mi)
    let tbl = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Comparação dos cenários ilustrativos do 5º Trimestre (T5)">';
    tbl += '<thead><tr>';
    tbl += '<th scope="col">Cenário Ilustrativo do T5 (Receita ≈ R$ 14,2 mi)</th>';
    tbl += '<th scope="col" class="num">Sem Iniciativas (Base)</th>';
    tbl += '<th scope="col" class="num">+ Piloto Crédito (≈ ' + formatCompactBRL(calc.quarterlyPilotBenefit) + '/trim)</th>';
    tbl += '<th scope="col" class="num">+ 3 Iniciativas (≈ ' + formatCompactBRL(calc.quarterlyAll3Benefit) + '/trim)</th>';
    tbl += '</tr></thead><tbody>';

    tbl += '<tr>';
    tbl += '<td><strong>Cenário A: Tendência Linear Continua</strong><br/><span style="font-size:0.76rem; color:var(--text-muted);">Caso a perda de margem do T1&rarr;T4 persista</span></td>';
    tbl += '<td class="num"><span class="exec-badge exec-badge-alert">3,9%</span><br/>≈ R$ 554 mil</td>';
    tbl += '<td class="num"><strong>' + calc.t5TrendPilotMargin.toFixed(1).replace('.', ',') + '%</strong><br/>≈ ' + formatCompactBRL(calc.t5TrendPilotEbitda) + '</td>';
    tbl += '<td class="num"><span class="exec-badge exec-badge-warn">≈ ' + calc.t5TrendAll3Margin.toFixed(1).replace('.', ',') + '%</span><br/><strong>≈ ' + formatCompactBRL(calc.t5TrendAll3Ebitda) + '</strong></td>';
    tbl += '</tr>';

    tbl += '<tr>';
    tbl += '<td><strong>Cenário B: Manutenção do Patamar do T4</strong><br/><span style="font-size:0.76rem; color:var(--text-muted);">Caso a operação estabilize no nível atual</span></td>';
    tbl += '<td class="num"><span class="exec-badge exec-badge-info">7,5%</span><br/>≈ R$ 1,06 mi</td>';
    tbl += '<td class="num"><strong>' + calc.t5FlatPilotMargin.toFixed(1).replace('.', ',') + '%</strong><br/>≈ ' + formatCompactBRL(calc.t5FlatPilotEbitda) + '</td>';
    tbl += '<td class="num"><span class="exec-badge exec-badge-ok">≈ ' + calc.t5FlatAll3Margin.toFixed(1).replace('.', ',') + '%</span><br/><strong>≈ ' + formatCompactBRL(calc.t5FlatAll3Ebitda) + '</strong></td>';
    tbl += '</tr>';

    tbl += '</tbody></table></div>';
    tableContainer.innerHTML = tbl;
  }

  function bindPart5Events() {
    // 1. Segmented Pill Toggle (Atual | Futuro previsto | Lado a Lado)
    const segBtns = document.querySelectorAll('.seg-toggle-btn');
    segBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCompView = btn.getAttribute('data-comp-view') || 'current';
        segBtns.forEach(function (b) {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        renderScenarioComparator();
        const live = document.getElementById('sr-live-announcer');
        if (live) {
          live.textContent = 'Visualização do comparativo alterada para ' + btn.textContent.trim();
        }
      });
    });

    // 2. Sliders do Simulador
    const sliderMap = [
      { id: 'sim-slider-cancel', key: 'cancelRecPct' },
      { id: 'sim-slider-triage', key: 'triageRedPct' },
      { id: 'sim-slider-freight', key: 'freightRedPct' },
      { id: 'sim-slider-boleto', key: 'boletoRedPct' },
      { id: 'sim-slider-closing', key: 'closingTargetDays' }
    ];

    sliderMap.forEach(function (item) {
      const el = document.getElementById(item.id);
      if (!el) return;
      el.addEventListener('input', function () {
        simState[item.key] = parseInt(el.value, 10);
        updateSimulatorUI();
      });
    });

    // 3. Botão Restaurar Premissas Oficiais
    const btnReset = document.getElementById('btn-reset-simulator');
    if (btnReset) {
      btnReset.addEventListener('click', function () {
        const defs = window.TARANIS_DB.simulatorModel.defaults;
        simState = {
          cancelRecPct: defs.cancelRecPct,
          triageRedPct: defs.triageRedPct,
          freightRedPct: defs.freightRedPct,
          boletoRedPct: defs.boletoRedPct,
          closingTargetDays: defs.closingTargetDays
        };
        sliderMap.forEach(function (item) {
          const el = document.getElementById(item.id);
          if (el) el.value = String(simState[item.key]);
        });
        updateSimulatorUI();
        const live = document.getElementById('sr-live-announcer');
        if (live) {
          live.textContent = 'Premissas do simulador restauradas para os valores oficiais do relatório.';
        }
      });
    }
  }

  function init() {
    renderScenarioComparator();
    updateSimulatorUI();
    bindPart5Events();
  }

  return {
    init
  };
})();

window.ScenarioSimulator = ScenarioSimulator;
