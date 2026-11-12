/* ==========================================================================
  MÓDULO DE GRÁFICOS E TABELAS EXECUTIVAS (/js/modules/charts.js)
  Parte 2: Renderização dinâmica da Página 2 (Indicadores) e Página 3 (Diagnóstico)
   ========================================================================== */

const ExecutiveCharts = (function () {
  let currentPeriod = 'ANUAL';
  let currentDreFilter = 'all';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * 1. Renderiza o Gráfico SVG da Evolução Trimestral da Margem EBITDA (T1 a T4)
   * Reage dinamicamente ao filtro selecionado (ANUAL, T1, T2, T3, T4) destacando o trimestre no gráfico,
   * desenhando o conector de Gap (p.p. e R$) e permitindo clicar direto nas colunas do SVG.
   */
  function renderQuarterlyMarginSvg(activePeriod) {
    currentPeriod = activePeriod || currentPeriod || 'ANUAL';
    const container = document.getElementById('svg-quarterly-margin-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.quarterlyMarginChart) return;

    const series = [
      { q: 'T1', orcado: 19.7, realizado: 16.4, ebitdaOrc: 'R$ 2,11 mi', ebitdaReal: 'R$ 1,78 mi', gapRs: '-R$ 330,5 mil', gapPp: '-3,3 p.p.', recReal: 'R$ 10,85 mi' },
      { q: 'T2', orcado: 19.7, realizado: 15.6, ebitdaOrc: 'R$ 2,25 mi', ebitdaReal: 'R$ 1,83 mi', gapRs: '-R$ 414,5 mil', gapPp: '-4,1 p.p.', recReal: 'R$ 11,75 mi' },
      { q: 'T3', orcado: 20.5, realizado: 9.2,  ebitdaOrc: 'R$ 2,60 mi', ebitdaReal: 'R$ 1,16 mi', gapRs: '-R$ 1,45 mi',   gapPp: '-11,3 p.p.', recReal: 'R$ 12,50 mi' },
      { q: 'T4', orcado: 20.9, realizado: 7.5,  ebitdaOrc: 'R$ 2,89 mi', ebitdaReal: 'R$ 1,00 mi', gapRs: '-R$ 1,89 mi',   gapPp: '-13,4 p.p.', recReal: 'R$ 13,40 mi' }
    ];

    const width = 640;
    const height = 290;
    const padLeft = 58;
    const padRight = 42;
    const padTop = 44;
    const padBottom = 52;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;
    const maxY = 25;

    function getX(i) {
      return padLeft + 35 + (i * ((plotW - 70) / (series.length - 1)));
    }
    function getY(val) {
      return padTop + plotH - (val / maxY) * plotH;
    }

    const isAnnual = currentPeriod === 'ANUAL';

    let svg = '<svg class="exec-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-labelledby="svg-q-title svg-q-desc">';
    svg += '<title id="svg-q-title">Evolução Trimestral da Margem EBITDA — Visão ' + escapeHtml(currentPeriod) + '</title>';
    svg += '<desc id="svg-q-desc">Gráfico interativo comparando a margem EBITDA orçada (19,7% a 20,9%) com a realizada (16,4% no T1, 15,6% no T2, 9,2% no T3 e 7,5% no T4). Período em foco: ' + escapeHtml(currentPeriod) + '.</desc>';

    const bannerText = isAnnual
      ? 'VISÃO ANUAL CONSOLIDADA (T1 A T4) — Média Orçada: 20,3% | Média Realizada: 11,9% | Gap Anual: -R$ 4,08 mi'
      : 'FOCO NO ' + currentPeriod + ' — Clique em outro trimestre ou em "Anual Consolidado" para comparar';
    svg += '<rect x="' + padLeft + '" y="6" width="' + plotW + '" height="24" rx="5" fill="rgba(15, 92, 110, 0.35)" stroke="rgba(212, 167, 46, 0.5)" stroke-width="1" />';
    svg += '<text x="' + (padLeft + 12) + '" y="22" font-size="11" font-weight="700" fill="#D4A72E">' + escapeHtml(bannerText) + '</text>';

    [0, 5, 10, 15, 20, 25].forEach(function (tick) {
      const y = getY(tick);
      svg += '<line x1="' + padLeft + '" y1="' + y + '" x2="' + (width - padRight) + '" y2="' + y + '" stroke="currentColor" stroke-opacity="0.15" stroke-width="1" />';
      svg += '<text x="' + (padLeft - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="currentColor" opacity="0.75">' + tick + '%</text>';
    });

    if (isAnnual) {
      const yAvg = getY(11.9);
      svg += '<line x1="' + padLeft + '" y1="' + yAvg + '" x2="' + (width - padRight) + '" y2="' + yAvg + '" stroke="#D4A72E" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="3,4" />';
      svg += '<text x="' + (width - padRight - 4) + '" y="' + (yAvg - 5) + '" text-anchor="end" font-size="10" font-weight="700" fill="#D4A72E" opacity="0.9">Média Realizada no Ano: 11,9%</text>';
    }

    series.forEach(function (d, i) {
      const x = getX(i);
      const isSelected = !isAnnual && d.q === currentPeriod;
      if (isSelected) {
        svg += '<rect x="' + (x - 48) + '" y="' + padTop + '" width="96" height="' + plotH + '" rx="8" fill="rgba(212, 167, 46, 0.14)" stroke="#D4A72E" stroke-width="1.5" stroke-dasharray="4,3" />';
      }
    });

    const orcadoPts = series.map(function (d, i) { return getX(i) + ',' + getY(d.orcado); }).join(' ');
    const realizadoPts = series.map(function (d, i) { return getX(i) + ',' + getY(d.realizado); }).join(' ');

    const lineOpacity = isAnnual ? '1' : '0.42';
    svg += '<polyline fill="none" stroke="#38BDF8" stroke-opacity="' + lineOpacity + '" stroke-width="3" stroke-dasharray="8,5" points="' + orcadoPts + '" />';
    svg += '<polyline fill="none" stroke="#D4A72E" stroke-opacity="' + lineOpacity + '" stroke-width="3.5" points="' + realizadoPts + '" />';

    series.forEach(function (d, i) {
      const x = getX(i);
      const yOrc = getY(d.orcado);
      const yReal = getY(d.realizado);
      const isFocused = isAnnual || d.q === currentPeriod;
      const ptOpacity = isFocused ? '1' : '0.32';

      if (!isAnnual && d.q === currentPeriod) {
        svg += '<line x1="' + x + '" y1="' + (yOrc + 6) + '" x2="' + x + '" y2="' + (yReal - 6) + '" stroke="#FB7185" stroke-width="2.5" stroke-dasharray="3,3" />';
        const midY = (yOrc + yReal) / 2;
        const badgeX = i >= 2 ? x - 124 : x + 14;
        svg += '<rect x="' + badgeX + '" y="' + (midY - 22) + '" width="112" height="42" rx="6" fill="#0E1E33" stroke="#FB7185" stroke-width="1.5" />';
        svg += '<text x="' + (badgeX + 56) + '" y="' + (midY - 5) + '" text-anchor="middle" font-size="11" font-weight="800" fill="#FDA4AF">Desvio: ' + d.gapPp + '</text>';
        svg += '<text x="' + (badgeX + 56) + '" y="' + (midY + 12) + '" text-anchor="middle" font-size="10.5" font-weight="700" fill="#FFFFFF">' + d.gapRs + '</text>';
      }

      svg += '<g class="svg-quarter-trigger" data-q="' + d.q + '" style="cursor:pointer;">';
      svg += '<rect x="' + (x - 36) + '" y="' + (height - 44) + '" width="72" height="36" rx="6" fill="' + (!isAnnual && d.q === currentPeriod ? '#D4A72E' : 'transparent') + '" />';
      svg += '<text x="' + x + '" y="' + (height - 26) + '" text-anchor="middle" font-size="12" font-weight="800" fill="' + (!isAnnual && d.q === currentPeriod ? '#0E1E33' : 'currentColor') + '" opacity="' + (isFocused ? '1' : '0.55') + '">' + d.q + '</text>';
      svg += '<text x="' + x + '" y="' + (height - 12) + '" text-anchor="middle" font-size="10" font-weight="600" fill="' + (!isAnnual && d.q === currentPeriod ? '#0E1E33' : 'currentColor') + '" opacity="' + (isFocused ? '0.9' : '0.45') + '">' + d.ebitdaReal + '</text>';

      const sqSize = (!isAnnual && d.q === currentPeriod) ? 14 : 10;
      svg += '<rect x="' + (x - sqSize / 2) + '" y="' + (yOrc - sqSize / 2) + '" width="' + sqSize + '" height="' + sqSize + '" fill="#0E1E33" stroke="#38BDF8" stroke-width="2.5" opacity="' + ptOpacity + '" />';
      svg += '<text x="' + x + '" y="' + (yOrc - 12) + '" text-anchor="middle" font-size="' + (!isAnnual && d.q === currentPeriod ? '12.5' : '11') + '" font-weight="700" fill="#38BDF8" opacity="' + ptOpacity + '">' + String(d.orcado).replace('.', ',') + '%</text>';

      const cRad = (!isAnnual && d.q === currentPeriod) ? 8.5 : 6;
      if (!isAnnual && d.q === currentPeriod) {
        svg += '<circle cx="' + x + '" cy="' + yReal + '" r="14" fill="rgba(212, 167, 46, 0.28)" />';
      }
      svg += '<circle cx="' + x + '" cy="' + yReal + '" r="' + cRad + '" fill="#D4A72E" stroke="#0E1E33" stroke-width="2" opacity="' + ptOpacity + '" />';
      svg += '<text x="' + x + '" y="' + (yReal + 22) + '" text-anchor="middle" font-size="' + (!isAnnual && d.q === currentPeriod ? '13.5' : '12') + '" font-weight="800" fill="#D4A72E" opacity="' + ptOpacity + '">' + String(d.realizado).replace('.', ',') + '%</text>';
      svg += '</g>';
    });

    svg += '</svg>';
    container.innerHTML = svg;

    const triggers = container.querySelectorAll('.svg-quarter-trigger');
    triggers.forEach(function (g) {
      g.addEventListener('click', function () {
        const q = g.getAttribute('data-q');
        selectQuarterPeriod(q);
      });
    });
  }

  /**
   * 2. Atualiza o Card Lateral de Detalhe Trimestral (Anual, T1, T2, T3, T4)
   */
  function updateQuarterSpotlight(periodKey) {
    const db = window.TARANIS_DB;
    if (!db || !db.quarterlyAnalysis) return;
    const info = db.quarterlyAnalysis[periodKey] || db.quarterlyAnalysis.ANUAL;

    const titleEl = document.getElementById('q-spotlight-title');
    const statsEl = document.getElementById('q-spotlight-stats');
    const insightEl = document.getElementById('q-spotlight-insight');

    if (titleEl) titleEl.textContent = info.title;
    if (insightEl) insightEl.textContent = info.insight;

    if (statsEl) {
      statsEl.innerHTML =
        '<div class="quarter-stat-row"><span>Receita Orçada:</span><strong>' + escapeHtml(info.receitaOrcada) + '</strong></div>' +
        '<div class="quarter-stat-row"><span>Receita Realizada:</span><strong>' + escapeHtml(info.receitaRealizada) + '</strong></div>' +
        '<div class="quarter-stat-row"><span>EBITDA Orçado:</span><strong>' + escapeHtml(info.ebitdaOrcado) + '</strong></div>' +
        '<div class="quarter-stat-row"><span>EBITDA Realizado:</span><strong>' + escapeHtml(info.ebitdaRealizado) + '</strong></div>' +
        '<div class="quarter-stat-row"><span>Desvio de EBITDA:</span><strong style="color:#FB7185;">' + escapeHtml(info.gapEbitda) + '</strong></div>' +
        '<div class="quarter-stat-row"><span>Lucro Líquido:</span><strong>' + escapeHtml(info.lucroLiquido) + '</strong></div>';
    }
  }

  /**
   * 3. Renderiza os Cards de Desempenho por Linha de Produto (Aba 2)
   */
  function renderProductLines() {
    const container = document.getElementById('product-lines-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.sheets || !db.sheets.receita_por_produto) return;

    const rows = db.sheets.receita_por_produto;
    let html = '<div class="product-cards-grid">';

    rows.forEach(function (row) {
      const name = row['Linha de Produto'] || '';
      const isTotal = name.includes('TOTAL');
      const varStr = String(row['Variação (%)'] || '');
      const isNegative = varStr.startsWith('-');
      const badgeClass = isTotal ? 'exec-badge-info' : (isNegative ? 'exec-badge-warn' : 'exec-badge-ok');

      html +=
        '<article class="product-line-card"' + (isTotal ? ' style="border: 1.5px solid var(--brand-gold);"' : '') + '>' +
        '  <div class="product-line-top">' +
        '    <h4>' + escapeHtml(name) + '</h4>' +
        '    <span class="exec-badge ' + badgeClass + '">' + escapeHtml(varStr) + ' vs. Orçado</span>' +
        '  </div>' +
        '  <div class="product-metrics-strip">' +
        '    <div><span>Participação</span><strong>' + escapeHtml(String(row['Participação (%)']).replace('.', ',')) + '</strong></div>' +
        '    <div><span>Realizado Anual</span><strong>' + escapeHtml(row['Realizado Anual (R$)']) + '</strong></div>' +
        '    <div><span>Margem Bruta</span><strong>' + escapeHtml(String(row['Margem Bruta Média']).replace('.', ',')) + '</strong></div>' +
        '  </div>' +
        '  <p class="product-bottleneck-note"><strong>Gargalo observado:</strong> ' + escapeHtml(row['Gargalo Principal Observado']) + '</p>' +
        '</article>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * 4. Renderiza a Tabela Interativa do DRE (Aba 1 - 22 linhas) com filtro de visão e destaque da coluna do trimestre ativo
   */
  function renderDreTable(filterMode) {
    currentDreFilter = filterMode || currentDreFilter || 'all';
    const container = document.getElementById('dre-table-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.sheets || !db.sheets.dre_orcado_vs_realizado) return;

    const rows = db.sheets.dre_orcado_vs_realizado;
    const criticalKeywords = ['Cancelamentos', 'Fretes', 'Reentregas', 'Sistemas Legados', 'Devedores Duvidosos', 'Despesas Financeiras'];

    const filtered = rows.filter(function (row) {
      const label = String(row['Estrutura Contábil / Conta de Resultado'] || '');
      const isSubtotal = label.includes('TOTAL') || label.includes('RECEITA LÍQUIDA') || label.includes('LUCRO') || label.includes('EBITDA');
      const isCritical = criticalKeywords.some(function (kw) { return label.includes(kw); });

      if (currentDreFilter === 'summary') {
        return isSubtotal;
      }
      if (currentDreFilter === 'critical') {
        return isSubtotal || isCritical;
      }
      return true;
    });

    const colHighlight = ' style="background-color: rgba(212, 167, 46, 0.22); border-bottom: 2px solid var(--brand-gold);"';
    let html = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Demonstração do Resultado do Exercício — Orçado versus Realizado">';
    html += '<thead><tr>';
    html += '<th scope="col">Conta de Resultado (DRE)</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'T1' ? colHighlight : '') + '>T1 Realizado</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'T2' ? colHighlight : '') + '>T2 Realizado</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'T3' ? colHighlight : '') + '>T3 Realizado</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'T4' ? colHighlight : '') + '>T4 Realizado</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'ANUAL' ? colHighlight : '') + '>Anual Orçado</th>';
    html += '<th scope="col" class="num"' + (currentPeriod === 'ANUAL' ? colHighlight : '') + '>Anual Realizado</th>';
    html += '<th scope="col" class="num">Var. Anual (%)</th>';
    html += '</tr></thead><tbody>';

    const cellHl = ' style="background-color: rgba(212, 167, 46, 0.11); font-weight: 700;"';

    filtered.forEach(function (row) {
      const label = String(row['Estrutura Contábil / Conta de Resultado'] || '');
      const isHeader = !row['TOTAL ANUAL ORÇADO'] && !row['TOTAL ANUAL REALIZADO'];
      const isSubtotal = label.includes('TOTAL') || label.includes('RECEITA LÍQUIDA') || label.includes('LUCRO') || label.includes('EBITDA');
      const isCritical = criticalKeywords.some(function (kw) { return label.includes(kw); });

      let rowClass = '';
      if (isHeader) rowClass = 'row-section-header';
      else if (isSubtotal) rowClass = 'row-subtotal';
      else if (isCritical) rowClass = 'row-critical-deviation';

      html += '<tr class="' + rowClass + '">';
      html += '<td>' + escapeHtml(label.trim()) + '</td>';
      html += '<td class="num"' + (currentPeriod === 'T1' ? cellHl : '') + '>' + escapeHtml(row['T1 Realizado (R$)'] || '—') + '</td>';
      html += '<td class="num"' + (currentPeriod === 'T2' ? cellHl : '') + '>' + escapeHtml(row['T2 Realizado (R$)'] || '—') + '</td>';
      html += '<td class="num"' + (currentPeriod === 'T3' ? cellHl : '') + '>' + escapeHtml(row['T3 Realizado (R$)'] || '—') + '</td>';
      html += '<td class="num"' + (currentPeriod === 'T4' ? cellHl : '') + '>' + escapeHtml(row['T4 Realizado (R$)'] || '—') + '</td>';
      html += '<td class="num"' + (currentPeriod === 'ANUAL' ? cellHl : '') + '>' + escapeHtml(row['TOTAL ANUAL ORÇADO'] || '—') + '</td>';
      html += '<td class="num"' + (currentPeriod === 'ANUAL' ? cellHl : '') + '>' + escapeHtml(row['TOTAL ANUAL REALIZADO'] || '—') + '</td>';
      html += '<td class="num">' + escapeHtml(row['VAR ANUAL (%)'] || '—') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  /**
   * 5. Renderiza na Página 3 (Diagnóstico) a Decomposição do Gap de R$ 4,08 mi
   */
  function renderGapDecomposition() {
    const container = document.getElementById('gap-decomposition-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.gapDecomposition) return;

    const items = db.gapDecomposition;
    const maxEstouro = 1.36;
    let html = '<div class="gap-bars-list">';

    items.forEach(function (item) {
      const widthPct = Math.max(8, Math.round((item.estouroVal / maxEstouro) * 100));
      const fillClass = item.isCritical5 ? 'gap-bar-fill-critical' : 'gap-bar-fill-other';
      const badgeClass = item.isCritical5 ? 'exec-badge-alert' : 'exec-badge-info';

      html +=
        '<div class="gap-bar-item">' +
        '  <div class="gap-bar-header">' +
        '    <span class="gap-bar-title">' + item.rank + '. ' + escapeHtml(item.name) + '</span>' +
        '    <span class="gap-bar-figures">' +
        '      Estouro: <strong>' + escapeHtml(item.estouroLabel) + '</strong> (' + escapeHtml(item.shareOfGap) + ' do gap) &middot; ' +
        '      <span class="exec-badge ' + badgeClass + '">' + escapeHtml(item.varOrcado) + ' vs. Orçado</span>' +
        '    </span>' +
        '  </div>' +
        '  <div class="gap-bar-track" role="img" aria-label="' + escapeHtml(item.name) + ': ' + escapeHtml(item.estouroLabel) + ' (' + escapeHtml(item.shareOfGap) + ' do gap total)">' +
        '    <div class="' + fillClass + '" style="width: ' + widthPct + '%;"></div>' +
        '  </div>' +
        '  <p class="gap-bar-caption">' +
        (item.orcado !== '—' ? 'Orçado: <strong>' + escapeHtml(item.orcado) + '</strong> &rarr; Realizado: <strong>' + escapeHtml(item.realizado) + '</strong> &mdash; ' : '') +
        escapeHtml(item.causeSummary) +
        '  </p>' +
        '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * 6. Renderiza na Página 3 (Diagnóstico) a Tabela de Evolução das Anomalias (T1 -> T4) e os 5 Gargalos da Aba 3
   */
  function renderDiagnosisTables() {
    const anomaliesEl = document.getElementById('anomalies-table-container');
    const gargalosEl = document.getElementById('gargalos-aba3-container');
    const auditEl = document.getElementById('audit-inconsistencies-container');
    const db = window.TARANIS_DB;
    if (!db) return;

    if (anomaliesEl && db.costAnomaliesEvolution) {
      let html = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Evolução das anomalias de custo do T1 ao T4 como percentual da receita bruta">';
      html += '<thead><tr>';
      html += '<th scope="col">Rubrica do DRE</th>';
      html += '<th scope="col" class="num">% Receita (Orçado)</th>';
      html += '<th scope="col" class="num">T1 Realizado (% Receita e Desvio)</th>';
      html += '<th scope="col" class="num">T4 Realizado (% Receita e Desvio)</th>';
      html += '<th scope="col">Status</th>';
      html += '</tr></thead><tbody>';

      db.costAnomaliesEvolution.forEach(function (row) {
        const isCrit = row.status.includes('Crítica');
        html += '<tr class="' + (isCrit ? 'row-critical-deviation' : '') + '">';
        html += '<td><strong>' + escapeHtml(row.rubrica) + '</strong></td>';
        html += '<td class="num">' + escapeHtml(row.orcadoPctRec) + '</td>';
        html += '<td class="num">' + escapeHtml(row.t1PctRec) + '</td>';
        html += '<td class="num"><strong>' + escapeHtml(row.t4PctRec) + '</strong></td>';
        html += '<td><span class="exec-badge ' + (isCrit ? 'exec-badge-alert' : 'exec-badge-ok') + '">' + escapeHtml(row.status) + '</span></td>';
        html += '</tr>';
      });

      html += '</tbody></table></div>';
      anomaliesEl.innerHTML = html;
    }

    if (gargalosEl && db.sheets && db.sheets.gargalos_operacionais) {
      let html = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Gargalos operacionais mapeados no levantamento interno">';
      html += '<thead><tr>';
      html += '<th scope="col">Métrica Operacional / Financeira</th>';
      html += '<th scope="col">Meta Interna</th>';
      html += '<th scope="col">Situação Atual</th>';
      html += '<th scope="col">Desvio Crítico</th>';
      html += '<th scope="col">Exposição Anual Mapeada</th>';
      html += '<th scope="col">Causa Raiz Observada</th>';
      html += '</tr></thead><tbody>';

      db.sheets.gargalos_operacionais.forEach(function (g) {
        html += '<tr>';
        html += '<td><strong>' + escapeHtml(g['Métrica Operacional / Financeira']) + '</strong></td>';
        html += '<td><span class="exec-badge exec-badge-info">' + escapeHtml(g['Meta / Benchmark']) + '</span></td>';
        html += '<td><span class="exec-badge exec-badge-alert">' + escapeHtml(g['Situação Atual (Real)']) + '</span></td>';
        html += '<td>' + escapeHtml(g['Desvio Crítico']) + '</td>';
        html += '<td class="num"><strong>' + escapeHtml(g['Custo / Impacto Anual Estimado']) + '</strong></td>';
        html += '<td>' + escapeHtml(g['Causa Raiz Identificada']) + '</td>';
        html += '</tr>';
      });

      html += '</tbody></table></div>';
      gargalosEl.innerHTML = html;
    }

    if (auditEl && db.dataInconsistenciesAudit) {
      auditEl.innerHTML = db.dataInconsistenciesAudit
        .map(function (item) {
          return (
            '<div class="audit-point-card">' +
            '  <strong>' + escapeHtml(item.code) + ' &mdash; ' + escapeHtml(item.topic) + '</strong>' +
            '  <p>' + escapeHtml(item.detail) + '</p>' +
            '  <p style="margin:0; color: var(--accent-primary); font-weight:600;">Diretriz adotada: ' + escapeHtml(item.decision) + '</p>' +
            '</div>'
          );
        })
        .join('');
    }
  }

  function selectQuarterPeriod(period) {
    currentPeriod = period || 'ANUAL';
    const qButtons = document.querySelectorAll('.btn-quarter-select');
    qButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-period') === currentPeriod ? 'true' : 'false');
    });
    renderQuarterlyMarginSvg(currentPeriod);
    updateQuarterSpotlight(currentPeriod);
    renderDreTable(currentDreFilter);
    const live = document.getElementById('sr-live-announcer');
    if (live) {
      live.textContent = 'Gráfico e tabela do DRE atualizados para o período ' + currentPeriod;
    }
  }

  function bindPart2Controls() {
    const qButtons = document.querySelectorAll('.btn-quarter-select');
    qButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const period = btn.getAttribute('data-period');
        selectQuarterPeriod(period);
      });
    });

    const dreButtons = document.querySelectorAll('.btn-dre-filter');
    dreButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const mode = btn.getAttribute('data-dre-mode');
        dreButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderDreTable(mode);
      });
    });

    const accButtons = document.querySelectorAll('.exec-accordion-btn');
    accButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const isExp = btn.getAttribute('aria-expanded') === 'true';
        const nextExp = !isExp;
        btn.setAttribute('aria-expanded', String(nextExp));
        const targetId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(targetId);
        if (panel) {
          if (nextExp) panel.removeAttribute('hidden');
          else panel.setAttribute('hidden', 'hidden');
        }
      });
    });
  }


  /* ========================================================================
     PARTE 3: RENDERIZADORES DO SIPOC (6 ETAPAS) E ISHIKAWA (6M EM SVG)
     ======================================================================== */
  let currentSipocStep = 1;
  let currentSipocMode = 'as-is-plus-ia'; // 'as-is', 'as-is-plus-ia', 'table'
  let currentIshikawaFilter = 'all'; // 'all', 'R', 'top3', 'S'
  let selectedIshikawaCategory = null;

  function renderSipocSection() {
    const stepperEl = document.getElementById('sipoc-stepper-container');
    const detailEl = document.getElementById('sipoc-stage-detail-container');
    const db = window.TARANIS_DB;
    if (!stepperEl || !detailEl || !db || !db.sipocSteps) return;

    const steps = db.sipocSteps;

    // 1. Renderiza os 6 botões do Stepper
    stepperEl.innerHTML = steps
      .map(function (s) {
        const isSel = s.step === currentSipocStep && currentSipocMode !== 'table';
        return (
          '<button type="button" role="tab" class="sipoc-step-btn" data-step="' + s.step + '" aria-selected="' + (isSel ? 'true' : 'false') + '">' +
          '  <div class="sipoc-step-top"><span>Etapa ' + s.step + '</span><span>&rarr;</span></div>' +
          '  <div class="sipoc-step-name">' + escapeHtml(s.shortName) + '</div>' +
          '  <div class="sipoc-step-pain">' + escapeHtml(s.painBadge) + '</div>' +
          '</button>'
        );
      })
      .join('');

    stepperEl.querySelectorAll('.sipoc-step-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentSipocStep = parseInt(btn.getAttribute('data-step'), 10) || 1;
        if (currentSipocMode === 'table') {
          currentSipocMode = 'as-is-plus-ia';
          syncSipocModeButtons();
        }
        renderSipocSection();
      });
    });

    // 2. Se estiver no modo Tabela Completa, renderiza o Quadro 2.1 + 2.2 completo
    if (currentSipocMode === 'table') {
      let tbl = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Matriz SIPOC completa das 6 etapas">';
      tbl += '<thead><tr>';
      tbl += '<th scope="col">Etapa</th>';
      tbl += '<th scope="col">Fornecedores (S)</th>';
      tbl += '<th scope="col">Entradas (I)</th>';
      tbl += '<th scope="col">Processo Atual (P)</th>';
      tbl += '<th scope="col">Saídas (O)</th>';
      tbl += '<th scope="col">Clientes (C)</th>';
      tbl += '<th scope="col">Dor / Tempo (AS-IS)</th>';
      tbl += '<th scope="col">Onde a IA Entra (Proposta)</th>';
      tbl += '</tr></thead><tbody>';

      steps.forEach(function (s) {
        tbl += '<tr>';
        tbl += '<td><strong>' + escapeHtml(s.title) + '</strong></td>';
        tbl += '<td>' + escapeHtml(s.suppliers) + '</td>';
        tbl += '<td>' + escapeHtml(s.inputs) + '</td>';
        tbl += '<td>' + escapeHtml(s.processAsIs) + '</td>';
        tbl += '<td>' + escapeHtml(s.outputs) + '</td>';
        tbl += '<td>' + escapeHtml(s.customers) + '</td>';
        tbl += '<td><span class="exec-badge exec-badge-alert">' + escapeHtml(s.painBadge) + '</span><br/>' + escapeHtml(s.painTime) + '</td>';
        tbl += '<td>' + escapeHtml(s.aiLayer) + '<br/><strong>Decisão:</strong> ' + escapeHtml(s.humanDecision) + '</td>';
        tbl += '</tr>';
      });

      tbl += '</tbody></table></div>';
      detailEl.innerHTML = tbl;
      return;
    }

    // 3. Renderiza o Detalhe da Etapa Selecionada (S - I - P - O - C + Dor + Camada IA)
    const active = steps.find(function (s) { return s.step === currentSipocStep; }) || steps[0];
    const showAi = currentSipocMode === 'as-is-plus-ia';

    let html = '<div class="sipoc-detail-stage">';
    html += '  <div class="sipoc-stage-header">';
    html += '    <div>';
    html += '      <span class="page-eyebrow">Etapa ' + active.step + ' de 6 &middot; Matriz SIPOC</span>';
    html += '      <h4>' + escapeHtml(active.title) + '</h4>';
    html += '    </div>';
    html += '    <div style="display:flex; gap:0.5rem; align-items:center;">';
    html += '      <button type="button" class="btn-filter-pill" id="btn-sipoc-prev"' + (active.step <= 1 ? ' disabled' : '') + '>&larr; Etapa Anterior</button>';
    html += '      <button type="button" class="btn-filter-pill" id="btn-sipoc-next"' + (active.step >= 6 ? ' disabled' : '') + '>Próxima Etapa &rarr;</button>';
    html += '    </div>';
    html += '  </div>';

    html += '  <div class="sipoc-columns-grid">';
    html += '    <div class="sipoc-col-box"><span class="sipoc-col-letter">S &mdash; Fornecedores</span><p>' + escapeHtml(active.suppliers) + '</p></div>';
    html += '    <div class="sipoc-col-box"><span class="sipoc-col-letter">I &mdash; Entradas</span><p>' + escapeHtml(active.inputs) + '</p></div>';
    html += '    <div class="sipoc-col-box col-process"><span class="sipoc-col-letter">P &mdash; Processo Atual (AS-IS)</span><p><strong>' + escapeHtml(active.processAsIs) + '</strong></p></div>';
    html += '    <div class="sipoc-col-box"><span class="sipoc-col-letter">O &mdash; Saídas</span><p>' + escapeHtml(active.outputs) + '</p></div>';
    html += '    <div class="sipoc-col-box"><span class="sipoc-col-letter">C &mdash; Clientes</span><p>' + escapeHtml(active.customers) + '</p></div>';
    html += '  </div>';

    html += '  <div class="sipoc-pain-banner">';
    html += '    <strong>Dor / Tempo Medido nesta Etapa (Diagnóstico AS-IS):</strong> ' + escapeHtml(active.painTime);
    html += '  </div>';

    if (showAi) {
      html += '  <div class="sipoc-ai-layer-box">';
      html += '    <h5><span class="exec-badge exec-badge-info">Camada Proposta</span> Onde a IA Entra nesta Etapa &amp; Regra de Decisão Humana</h5>';
      html += '    <p>' + escapeHtml(active.aiLayer) + '</p>';
      html += '    <p style="margin:0; color: var(--brand-gold); font-weight:700;">Quem decide (Human-in-the-Loop): ' + escapeHtml(active.humanDecision) + '</p>';
      html += '  </div>';
    }

    html += '</div>';
    detailEl.innerHTML = html;

    const btnPrev = document.getElementById('btn-sipoc-prev');
    const btnNext = document.getElementById('btn-sipoc-next');
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        if (currentSipocStep > 1) {
          currentSipocStep--;
          renderSipocSection();
        }
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        if (currentSipocStep < 6) {
          currentSipocStep++;
          renderSipocSection();
        }
      });
    }
  }

  function syncSipocModeButtons() {
    const btns = document.querySelectorAll('.btn-sipoc-mode');
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-sipoc-mode') === currentSipocMode ? 'true' : 'false');
    });
  }

  /**
   * Renderiza o Diagrama de Ishikawa (Espinha de Peixe 6M) em SVG interativo + Cards 6M sincronizados
   */
  function renderIshikawaSection() {
    const svgContainer = document.getElementById('ishikawa-svg-container');
    const cardsContainer = document.getElementById('ishikawa-cards-container');
    const db = window.TARANIS_DB;
    if (!svgContainer || !cardsContainer || !db || !db.ishikawa6M) return;

    const data = db.ishikawa6M;
    const cats = data.categories;

    // 1. Constrói o Diagrama Espinha de Peixe em SVG (920 x 400)
    const w = 920;
    const h = 390;
    const spineY = 195;
    const spineStartX = 40;
    const spineEndX = 710;

    let svg = '<svg class="exec-svg" style="max-height:390px;" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-labelledby="ishikawa-svg-title ishikawa-svg-desc">';
    svg += '<title id="ishikawa-svg-title">Diagrama de Ishikawa (6M) — Efeito: Ciclo da proposta ao despacho superior a 5 dias úteis</title>';
    svg += '<desc id="ishikawa-svg-desc">Diagrama espinha de peixe com seis categorias (Método, Máquina, Mão de obra, Material, Medição e Meio ambiente) convergindo para o efeito central de ciclo superior a 5 dias úteis contra meta de 24 horas úteis.</desc>';

    // Espinha Central Horizontal
    svg += '<line x1="' + spineStartX + '" y1="' + spineY + '" x2="' + spineEndX + '" y2="' + spineY + '" stroke="#D4A72E" stroke-width="5" />';
    svg += '<polygon points="' + spineEndX + ',' + (spineY - 10) + ' ' + (spineEndX + 18) + ',' + spineY + ' ' + spineEndX + ',' + (spineY + 10) + '" fill="#D4A72E" />';

    // Caixa do Efeito (Cabeça do Peixe à direita)
    svg += '<rect x="730" y="135" width="178" height="120" rx="10" fill="#132742" stroke="#D4A72E" stroke-width="3" />';
    svg += '<text x="819" y="164" text-anchor="middle" font-size="11" font-weight="800" fill="#D4A72E">EFEITO CENTRAL</text>';
    svg += '<text x="819" y="186" text-anchor="middle" font-size="12.5" font-weight="800" fill="#FFFFFF">Ciclo Proposta</text>';
    svg += '<text x="819" y="204" text-anchor="middle" font-size="12.5" font-weight="800" fill="#FFFFFF">&rarr; Despacho</text>';
    svg += '<text x="819" y="225" text-anchor="middle" font-size="13" font-weight="800" fill="#FDA4AF">&gt; 5 dias úteis</text>';
    svg += '<text x="819" y="243" text-anchor="middle" font-size="10.5" font-weight="600" fill="#7DD3FC">(Meta: 24h úteis)</text>';

    // Coordenadas das 6 Espinhas (3 superiores, 3 inferiores)
    const branchCoords = [
      { id: 'metodo',        boxX: 30,  boxY: 16,  tipX: 140, tipY: 64,  jointX: 210, isTop: true },
      { id: 'maquina',       boxX: 255, boxY: 16,  tipX: 365, tipY: 64,  jointX: 435, isTop: true },
      { id: 'mao-de-obra',   boxX: 480, boxY: 16,  tipX: 590, tipY: 64,  jointX: 660, isTop: true },
      { id: 'material',      boxX: 30,  boxY: 326, tipX: 140, tipY: 326, jointX: 210, isTop: false },
      { id: 'medicao',       boxX: 255, boxY: 326, tipX: 365, tipY: 326, jointX: 435, isTop: false },
      { id: 'meio-ambiente', boxX: 480, boxY: 326, tipX: 590, tipY: 326, jointX: 660, isTop: false }
    ];

    function itemMatchesFilter(item) {
      if (currentIshikawaFilter === 'R') return item.type === 'R';
      if (currentIshikawaFilter === 'top3') return Boolean(item.topRank);
      if (currentIshikawaFilter === 'S') return item.type === 'S';
      return true;
    }

    branchCoords.forEach(function (b) {
      const cat = cats.find(function (c) { return c.id === b.id; });
      if (!cat) return;

      const matchingItems = cat.items.filter(itemMatchesFilter);
      const isCatSelected = selectedIshikawaCategory === cat.id;
      const isActiveBranch = (selectedIshikawaCategory ? isCatSelected : matchingItems.length > 0);
      const branchOpacity = isActiveBranch ? '1' : '0.28';
      const strokeColor = isCatSelected ? '#D4A72E' : (matchingItems.some(function (it) { return it.topRank; }) ? '#D4A72E' : '#38BDF8');

      svg += '<g class="svg-ishikawa-branch" data-cat-id="' + cat.id + '" style="cursor:pointer;" opacity="' + branchOpacity + '">';
      // Linha diagonal da espinha
      svg += '<line x1="' + b.tipX + '" y1="' + b.tipY + '" x2="' + b.jointX + '" y2="' + spineY + '" stroke="' + strokeColor + '" stroke-width="3" />';

      // Caixa do M (Cabeçalho da categoria)
      svg += '<rect x="' + b.boxX + '" y="' + b.boxY + '" width="205" height="44" rx="7" fill="' + (isCatSelected ? '#D4A72E' : '#0F5C6E') + '" stroke="#D4A72E" stroke-width="2" />';
      svg += '<text x="' + (b.boxX + 102) + '" y="' + (b.boxY + 27) + '" text-anchor="middle" font-size="12.5" font-weight="800" fill="' + (isCatSelected ? '#0E1E33' : '#FFFFFF') + '">' + escapeHtml(cat.name) + '</text>';

      // Rótulos resumidos nas espinhas secundárias (até 3 por ramo no SVG para leitura limpa)
      cat.items.slice(0, 3).forEach(function (item, idx) {
        const ratio = (idx + 1) / 3.6;
        const lineY = b.isTop
          ? b.tipY + ratio * (spineY - b.tipY - 12)
          : b.tipY - ratio * (b.tipY - spineY - 12);
        const lineX = b.tipX + ratio * (b.jointX - b.tipX);
        const itemActive = itemMatchesFilter(item);
        const tagColor = item.type === 'R' ? '#FDA4AF' : (item.type === 'C' ? '#FDE047' : '#9FB0C4');
        const shortTxt = item.text.length > 33 ? item.text.slice(0, 32) + '…' : item.text;

        svg += '<line x1="' + (lineX - 115) + '" y1="' + lineY + '" x2="' + lineX + '" y2="' + lineY + '" stroke="currentColor" stroke-opacity="' + (itemActive ? '0.45' : '0.15') + '" stroke-width="1.5" />';
        svg += '<text x="' + (lineX - 118) + '" y="' + (lineY - 4) + '" font-size="10" font-weight="' + (item.type === 'R' ? '700' : '500') + '" fill="' + tagColor + '" opacity="' + (itemActive ? '1' : '0.3') + '">[' + item.type + '] ' + escapeHtml(shortTxt) + '</text>';
      });

      svg += '</g>';
    });

    svg += '</svg>';
    svgContainer.innerHTML = svg;

    svgContainer.querySelectorAll('.svg-ishikawa-branch').forEach(function (g) {
      g.addEventListener('click', function () {
        const clickedId = g.getAttribute('data-cat-id');
        selectedIshikawaCategory = (selectedIshikawaCategory === clickedId) ? null : clickedId;
        renderIshikawaSection();
      });
    });

    // 2. Renderiza os 6 Cards Detalhados (6M) sincronizados com o filtro
    cardsContainer.innerHTML = cats
      .map(function (cat) {
        const isSelected = selectedIshikawaCategory === cat.id;
        const itemsHtml = cat.items
          .map(function (item) {
            const visible = itemMatchesFilter(item);
            const rankBadge = item.topRank
              ? ' <span class="exec-badge exec-badge-warn" style="margin-left:4px;">' + (item.topRank === 'SLA' ? 'Sustentação (SLA)' : 'Top ' + item.topRank) + '</span>'
              : '';
            return (
              '<li class="ishikawa-cause-item" style="opacity:' + (visible ? '1' : '0.32') + ';">' +
              '  <span class="cause-type-tag tag-type-' + item.type + '" title="' + (item.type === 'R' ? 'Causa Raiz' : (item.type === 'C' ? 'Causa Contribuinte' : 'Sintoma / Efeito')) + '">' + item.type + '</span>' +
              '  <span>' + escapeHtml(item.text) + rankBadge + '</span>' +
              '</li>'
            );
          })
          .join('');

        return (
          '<article class="ishikawa-m-card' + (isSelected ? ' m-card-active' : '') + '">' +
          '  <h4>' +
          '    <span>' + escapeHtml(cat.name) + '</span>' +
          '    <span class="exec-badge exec-badge-info">' + cat.items.length + ' itens</span>' +
          '  </h4>' +
          '  <ul class="ishikawa-cause-list">' + itemsHtml + '</ul>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderTop3AndFiveWhys() {
    const top3El = document.getElementById('ishikawa-top3-container');
    const whysEl = document.getElementById('ishikawa-5whys-container');
    const db = window.TARANIS_DB;
    if (!db || !db.ishikawa6M) return;

    if (top3El && db.ishikawa6M.top3CriticalCauses) {
      top3El.innerHTML = db.ishikawa6M.top3CriticalCauses
        .map(function (c, idx) {
          const badgeType = idx === 0 ? 'exec-badge-alert' : (idx === 1 ? 'exec-badge-warn' : 'exec-badge-info');
          return (
            '<article class="top-cause-card">' +
            '  <div>' +
            '    <span class="exec-badge ' + badgeType + '">' + escapeHtml(c.rank) + '</span>' +
            '    <h4>' + escapeHtml(c.title) + '</h4>' +
            '    <p class="top-cause-meta" style="margin-top:0.35rem;"><strong>Categoria 6M:</strong> ' + escapeHtml(c.origin) + '</p>' +
            '    <p class="top-cause-meta" style="margin-top:0.35rem;"><strong>Efeito medido:</strong> ' + escapeHtml(c.measuredEffect) + '</p>' +
            '    <p class="top-cause-meta" style="margin-top:0.35rem;"><strong>Exposição associada:</strong> ' + escapeHtml(c.estimatedImpact) + '</p>' +
            '  </div>' +
            '  <div class="quarter-insight-box">' +
            '    <strong>Direcionamento:</strong> ' + escapeHtml(c.whyStartHere) +
            '  </div>' +
            '</article>'
          );
        })
        .join('');
    }

    if (whysEl && db.ishikawa6M.fiveWhys) {
      whysEl.innerHTML = db.ishikawa6M.fiveWhys
        .map(function (w) {
          return (
            '<div class="why-chain-item">' +
            '  <strong>' + escapeHtml(w.problem) + '</strong>' +
            '  <p>' + escapeHtml(w.chain) + '</p>' +
            '</div>'
          );
        })
        .join('');
    }
  }

  function bindPart3Controls() {
    const sipocModeBtns = document.querySelectorAll('.btn-sipoc-mode');
    sipocModeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentSipocMode = btn.getAttribute('data-sipoc-mode') || 'as-is-plus-ia';
        syncSipocModeButtons();
        renderSipocSection();
      });
    });

    const ishikawaFilterBtns = document.querySelectorAll('.btn-ishikawa-filter');
    ishikawaFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentIshikawaFilter = btn.getAttribute('data-ishikawa-filter') || 'all';
        selectedIshikawaCategory = null;
        ishikawaFilterBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderIshikawaSection();
      });
    });
  }


  /* ========================================================================
     PARTE 4: SOLUÇÕES COM IA, SIMULADOR HITL E MATRIZ ESFORÇO x IMPACTO
     ======================================================================== */
  let currentUcViewMode = 'cards'; // 'cards' ou 'canvas'
  let currentHitlScenarioId = 'scen-limpo';
  let selectedMatrixUcId = 'uc-credito';

  function renderUseCasesSection() {
    const container = document.getElementById('use-cases-main-container');
    const db = window.TARANIS_DB;
    if (!container || !db || !db.aiUseCases) return;

    const cases = db.aiUseCases;

    if (currentUcViewMode === 'canvas') {
      let tbl = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Ficha comparativa AI Canvas dos 3 casos de uso">';
      tbl += '<thead><tr>';
      tbl += '<th scope="col">Dimensão do AI Canvas</th>';
      cases.forEach(function (uc) {
        tbl += '<th scope="col">' + escapeHtml(uc.title) + '<br/><span class="exec-badge ' + uc.badgeClass + '" style="margin-top:4px;">' + escapeHtml(uc.wave) + '</span></th>';
      });
      tbl += '</tr></thead><tbody>';

      const rowsSpec = [
        { label: 'Dono do Processo', key: 'owner' },
        { label: 'Dor Atual (AS-IS)', key: 'currentPain' },
        { label: 'Funcionamento da Solução', key: 'howItWorks' },
        { label: 'Classificação por Tipo de IA', key: 'aiType' },
        { label: 'Justificativa Técnica da IA', key: 'aiTypeJustification' },
        { label: 'Quando o Humano Decide (HITL)', key: 'humanWhen' },
        { label: 'SLA e Regra Operacional', key: 'slaRule' },
        { label: 'Exposição LGPD (Dados Pessoais)', key: 'lgpdRisk' },
        { label: 'Risco Principal e Mitigação', key: 'mainRisk' },
        { label: 'Benefício Estimado (Hipótese)', key: 'estimatedBenefit' },
        { label: 'Meta de Adoção', key: 'adoptionTarget' }
      ];

      rowsSpec.forEach(function (spec) {
        const isHighlight = spec.key === 'humanWhen' || spec.key === 'estimatedBenefit';
        tbl += '<tr class="' + (isHighlight ? 'row-subtotal' : '') + '">';
        tbl += '<td><strong>' + escapeHtml(spec.label) + '</strong></td>';
        cases.forEach(function (uc) {
          tbl += '<td>' + escapeHtml(uc[spec.key]) + '</td>';
        });
        tbl += '</tr>';
      });

      tbl += '</tbody></table></div>';
      container.innerHTML = tbl;
      return;
    }

    // Visão padrão em 3 Cards Executivos
    container.innerHTML = '<div class="use-cases-grid">' + cases
      .map(function (uc) {
        const isPri1 = uc.order === 1;
        return (
          '<article class="use-case-card' + (isPri1 ? ' uc-priority-1' : '') + '">' +
          '  <div>' +
          '    <div class="use-case-header">' +
          '      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">' +
          '        <span class="exec-badge ' + uc.badgeClass + '">' + escapeHtml(uc.wave) + '</span>' +
          '        <span class="use-case-owner">Dono: ' + escapeHtml(uc.owner) + '</span>' +
          '      </div>' +
          '      <h4>' + escapeHtml(uc.title) + '</h4>' +
          '    </div>' +
          '    <div class="use-case-block" style="margin-top:0.65rem;">' +
          '      <strong>Problema Atual que Endereça</strong>' +
          '      <p>' + escapeHtml(uc.currentPain) + '</p>' +
          '    </div>' +
          '    <div class="use-case-block" style="margin-top:0.6rem;">' +
          '      <strong>Como a IA Atua no Processo</strong>' +
          '      <p>' + escapeHtml(uc.howItWorks) + '</p>' +
          '    </div>' +
          '    <div class="use-case-block" style="margin-top:0.6rem;">' +
          '      <strong>Tipo de IA &amp; Justificativa Executiva</strong>' +
          '      <p><em>' + escapeHtml(uc.aiType) + '</em> &mdash; ' + escapeHtml(uc.aiTypeJustification) + '</p>' +
          '    </div>' +
          '    <div class="use-case-block" style="margin-top:0.6rem; border-left: 3px solid var(--brand-gold);">' +
          '      <strong>Gatilho de Decisão Humana (Human-in-the-Loop)</strong>' +
          '      <p>' + escapeHtml(uc.humanWhen) + '</p>' +
          '    </div>' +
          '  </div>' +
          '  <div class="use-case-footer-metrics">' +
          '    <p><strong>Benefício estimado:</strong> ' + escapeHtml(uc.estimatedBenefit) + '</p>' +
          '    <p><strong>Meta de adoção:</strong> ' + escapeHtml(uc.adoptionTarget) + '</p>' +
          '  </div>' +
          '</article>'
        );
      })
      .join('') + '</div>';
  }

  function renderHitlSimulator() {
    const stageEl = document.getElementById('hitl-simulator-stage-container');
    const db = window.TARANIS_DB;
    if (!stageEl || !db || !db.hitlDecisionScenarios) return;

    const scen = db.hitlDecisionScenarios.find(function (s) { return s.id === currentHitlScenarioId; }) || db.hitlDecisionScenarios[0];

    let html = '<div class="hitl-simulator-stage">';
    html += '  <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.75rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-subtle);">';
    html += '    <div>';
    html += '      <span class="page-eyebrow">Simulação de Regra Operacional</span>';
    html += '      <h4 style="margin:0; font-size:1.05rem; color:var(--text-primary);">' + escapeHtml(scen.label) + '</h4>';
    html += '    </div>';
    html += '    <span class="exec-badge ' + scen.outcomeClass + '">' + escapeHtml(scen.outcomeBadge) + '</span>';
    html += '  </div>';

    html += '  <div class="hitl-flow-steps">';
    html += '    <div class="hitl-step-box"><span class="hitl-step-label">1. Pedido Recebido</span><p>' + escapeHtml(scen.inputSummary) + '</p></div>';
    html += '    <div class="hitl-step-box"><span class="hitl-step-label">2. Checagem de Alçada e Regras</span><p>' + escapeHtml(scen.ruleEvaluation) + '</p></div>';
    html += '    <div class="hitl-step-box"><span class="hitl-step-label">3. Comportamento da IA</span><p>' + escapeHtml(scen.systemAction) + '</p></div>';
    html += '    <div class="hitl-step-box step-decision-human"><span class="hitl-step-label">4. Quem Toma a Decisão</span><p><strong>' + escapeHtml(scen.whoDecides) + '</strong></p></div>';
    html += '    <div class="hitl-step-box"><span class="hitl-step-label">5. Canal Corporativo e Registro</span><p>' + escapeHtml(scen.officialChannel) + '</p></div>';
    html += '  </div>';
    html += '</div>';

    stageEl.innerHTML = html;
  }

  /**
   * Renderiza a Matriz Esforço x Impacto (1 a 5) em SVG Interativo + Card Lateral Sincronizado
   */
  function renderEffortImpactMatrix() {
    const svgContainer = document.getElementById('matrix-effort-impact-svg-container');
    const detailContainer = document.getElementById('matrix-selected-uc-detail');
    const db = window.TARANIS_DB;
    if (!svgContainer || !detailContainer || !db || !db.aiUseCases) return;

    const cases = db.aiUseCases;
    const activeUc = cases.find(function (u) { return u.id === selectedMatrixUcId; }) || cases[0];

    const w = 580;
    const h = 340;
    const padL = 62;
    const padR = 30;
    const padT = 28;
    const padB = 48;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const midX = padL + plotW / 2;
    const midY = padT + plotH / 2;

    // Escala de 0.5 a 5.5 nos eixos X (Esforço) e Y (Impacto)
    function mapX(effortVal) {
      return padL + ((effortVal - 0.5) / 5.0) * plotW;
    }
    function mapY(impactVal) {
      return padT + plotH - ((impactVal - 0.5) / 5.0) * plotH;
    }

    let svg = '<svg class="exec-svg" style="max-height:340px;" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-labelledby="matrix-svg-title matrix-svg-desc">';
    svg += '<title id="matrix-svg-title">Matriz Esforço versus Impacto das 3 Iniciativas de IA (Escala de 1 a 5)</title>';
    svg += '<desc id="matrix-svg-desc">Gráfico de quatro quadrantes posicionando 1. Crédito Assistido em Esforço 2 e Impacto 4 (Ganho Rápido), 2. Leitura de Propostas em Esforço 4 e Impacto 5 (Projeto Estratégico), e 3. Conciliação em Esforço 3 e Impacto 2 (Segunda Onda).</desc>';

    // 4 Quadrantes com contraste seguro e rótulos claros
    // Superior Esquerdo: Ganho Rápido (Esforço < 3, Impacto >= 3)
    svg += '<rect x="' + padL + '" y="' + padT + '" width="' + (plotW / 2) + '" height="' + (plotH / 2) + '" fill="rgba(16, 185, 129, 0.12)" stroke="currentColor" stroke-opacity="0.25" />';
    svg += '<text x="' + (padL + 12) + '" y="' + (padT + 20) + '" font-size="11.5" font-weight="800" fill="#6EE7B7">GANHO RÁPIDO (PRIORIDADE 1)</text>';

    // Superior Direito: Projeto Estratégico (Esforço >= 3, Impacto >= 3)
    svg += '<rect x="' + midX + '" y="' + padT + '" width="' + (plotW / 2) + '" height="' + (plotH / 2) + '" fill="rgba(212, 167, 46, 0.13)" stroke="currentColor" stroke-opacity="0.25" />';
    svg += '<text x="' + (w - padR - 12) + '" y="' + (padT + 20) + '" text-anchor="end" font-size="11.5" font-weight="800" fill="#D4A72E">PROJETO ESTRATÉGICO (ONDA 2)</text>';

    // Inferior Esquerdo: Preencher Lacunas
    svg += '<rect x="' + padL + '" y="' + midY + '" width="' + (plotW / 2) + '" height="' + (plotH / 2) + '" fill="rgba(107, 115, 128, 0.08)" stroke="currentColor" stroke-opacity="0.25" />';
    svg += '<text x="' + (padL + 12) + '" y="' + (h - padB - 10) + '" font-size="11" font-weight="700" fill="currentColor" opacity="0.55">Preencher Lacunas</text>';

    // Inferior Direito: Segunda Onda
    svg += '<rect x="' + midX + '" y="' + midY + '" width="' + (plotW / 2) + '" height="' + (plotH / 2) + '" fill="rgba(15, 92, 110, 0.22)" stroke="currentColor" stroke-opacity="0.25" />';
    svg += '<text x="' + (w - padR - 12) + '" y="' + (h - padB - 10) + '" text-anchor="end" font-size="11.5" font-weight="800" fill="#7DD3FC">SEGUNDA ONDA (APOIO)</text>';

    // Eixos e Marcas (1 a 5)
    [1, 2, 3, 4, 5].forEach(function (n) {
      const tx = mapX(n);
      const ty = mapY(n);
      svg += '<line x1="' + tx + '" y1="' + padT + '" x2="' + tx + '" y2="' + (h - padB) + '" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="3,3" />';
      svg += '<line x1="' + padL + '" y1="' + ty + '" x2="' + (w - padR) + '" y2="' + ty + '" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="3,3" />';
      svg += '<text x="' + tx + '" y="' + (h - padB + 18) + '" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" opacity="0.8">' + n + '</text>';
      svg += '<text x="' + (padL - 12) + '" y="' + (ty + 4) + '" text-anchor="end" font-size="11" font-weight="700" fill="currentColor" opacity="0.8">' + n + '</text>';
    });

    svg += '<text x="' + (padL + plotW / 2) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor">ESFORÇO DE IMPLANTAÇÃO (1 = Baixo, 5 = Alto)</text>';
    svg += '<text x="18" y="' + (padT + plotH / 2) + '" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" transform="rotate(-90 18 ' + (padT + plotH / 2) + ')">IMPACTO NO NEGÓCIO (1 a 5)</text>';

    // Bolhas Interativas das 3 Iniciativas
    const shortLabels = {
      'uc-credito': 'Crédito Assistido (Piloto)',
      'uc-propostas': 'Leitura de Propostas',
      'uc-conciliacao': 'Conciliação Assistida'
    };

    cases.forEach(function (uc) {
      const cx = mapX(uc.effort);
      const cy = mapY(uc.impact);
      const isSel = uc.id === selectedMatrixUcId;

      svg += '<g class="svg-matrix-point" data-uc-id="' + uc.id + '" style="cursor:pointer;">';
      if (isSel) {
        svg += '<circle cx="' + cx + '" cy="' + cy + '" r="28" fill="rgba(212, 167, 46, 0.25)" stroke="#D4A72E" stroke-width="1.5" stroke-dasharray="4,3" />';
      }
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (isSel ? '20' : '17') + '" fill="' + (isSel ? '#D4A72E' : '#0F5C6E') + '" stroke="#FFFFFF" stroke-width="2.5" />';
      svg += '<text x="' + cx + '" y="' + (cy + 5) + '" text-anchor="middle" font-size="14" font-weight="800" fill="' + (isSel ? '#0E1E33' : '#FFFFFF') + '">' + uc.order + '</text>';

      // Rótulo da bolha
      const labelY = cy + (isSel ? 38 : 33);
      svg += '<text x="' + cx + '" y="' + labelY + '" text-anchor="middle" font-size="11.5" font-weight="800" fill="' + (isSel ? '#D4A72E' : 'currentColor') + '">' + escapeHtml(shortLabels[uc.id] || uc.title) + '</text>';
      svg += '<text x="' + cx + '" y="' + (labelY + 14) + '" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor" opacity="0.8">(Impacto ' + uc.impact + ' | Esforço ' + uc.effort + ')</text>';
      svg += '</g>';
    });

    svg += '</svg>';
    svgContainer.innerHTML = svg;

    svgContainer.querySelectorAll('.svg-matrix-point').forEach(function (g) {
      g.addEventListener('click', function () {
        selectedMatrixUcId = g.getAttribute('data-uc-id') || 'uc-credito';
        syncMatrixPillButtons();
        renderEffortImpactMatrix();
      });
    });

    // Atualiza o Card Lateral de Detalhe da Matriz
    detailContainer.innerHTML =
      '<div>' +
      '  <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">' +
      '    <span class="exec-badge ' + activeUc.badgeClass + '">Ordem ' + activeUc.order + ' &mdash; ' + escapeHtml(activeUc.quadrant) + '</span>' +
      '    <strong style="font-size:0.84rem; color:var(--brand-gold);">Impacto ' + activeUc.impact + '/5 &middot; Esforço ' + activeUc.effort + '/5</strong>' +
      '  </div>' +
      '  <h4>' + escapeHtml(activeUc.title) + '</h4>' +
      '  <div class="quarter-stat-list" style="margin-top:0.75rem;">' +
      '    <div class="quarter-stat-row"><span>Onda de Implantação:</span><strong>' + escapeHtml(activeUc.wave) + '</strong></div>' +
      '    <div class="quarter-stat-row"><span>Área Responsável (Dono):</span><strong>' + escapeHtml(activeUc.owner) + '</strong></div>' +
      '    <div class="quarter-stat-row"><span>Benefício Anual (Hipótese):</span><strong>' + escapeHtml(activeUc.estimatedBenefit.split('+')[0]) + '</strong></div>' +
      '    <div class="quarter-stat-row"><span>Nível de Risco LGPD:</span><strong>' + escapeHtml(activeUc.lgpdRisk.split('(')[0]) + '</strong></div>' +
      '  </div>' +
      '</div>' +
      '<div class="quarter-insight-box">' +
      '  <strong>Por que esta posição na fila:</strong> ' +
      (activeUc.order === 1
        ? 'Ataca a maior espera medida (24 a 48h contra 4h) com regras simples e teto de R$ 15 mil que limitam o risco, gerando ganho rápido em 60 dias e medindo o SLA das etapas.'
        : (activeUc.order === 2
            ? 'Possui o maior benefício financeiro estimado (≈ R$ 753 mil/ano), mas exige ler PDFs despadronizados e integrar por arquivo ao ERP sem API. Reforça diretamente a qualidade dos dados do crédito.'
            : 'Tem impacto financeiro direto menor (≈ R$ 129 mil/ano) e exige integrar 3 planilhas e o ERP, mas reduz o fechamento de 7 para 2 dias úteis e alivia a sobrecarga da Controladoria.')) +
      '</div>';
  }

  function syncMatrixPillButtons() {
    const btns = document.querySelectorAll('.btn-matrix-uc-select');
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-uc-id') === selectedMatrixUcId ? 'true' : 'false');
    });
  }

  function bindPart4Controls() {
    const ucViewBtns = document.querySelectorAll('.btn-uc-view-mode');
    ucViewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentUcViewMode = btn.getAttribute('data-uc-view') || 'cards';
        ucViewBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderUseCasesSection();
      });
    });

    const hitlBtns = document.querySelectorAll('.btn-hitl-scenario');
    hitlBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentHitlScenarioId = btn.getAttribute('data-scen-id') || 'scen-limpo';
        hitlBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderHitlSimulator();
      });
    });

    const matrixBtns = document.querySelectorAll('.btn-matrix-uc-select');
    matrixBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedMatrixUcId = btn.getAttribute('data-uc-id') || 'uc-credito';
        syncMatrixPillButtons();
        renderEffortImpactMatrix();
      });
    });
  }


  /* ========================================================================
     PARTE 6: RENDERIZADORES DA PÁGINA 7 (PLANO DE AÇÃO, GOVERNANÇA E FASE 2)
     ======================================================================== */
  function renderActionPlanPage() {
    const db = window.TARANIS_DB;
    if (!db || !db.actionPlanAndGovernance) return;
    const gov = db.actionPlanAndGovernance;

    // 1. Decisões Pré-Implantação para a CEO
    const decisionsEl = document.getElementById('plan-decisions-container');
    if (decisionsEl && gov.preImplementationDecisions) {
      decisionsEl.innerHTML = '<div class="top-causes-grid">' + gov.preImplementationDecisions
        .map(function (d) {
          return (
            '<div class="top-cause-card">' +
            '  <div>' +
            '    <span class="exec-badge exec-badge-warn">' + escapeHtml(d.step) + '</span>' +
            '    <h4>' + escapeHtml(d.title) + '</h4>' +
            '    <p class="top-cause-meta" style="margin-top:0.45rem;">' + escapeHtml(d.detail) + '</p>' +
            '  </div>' +
            '</div>'
          );
        })
        .join('') + '</div>';
    }

    // 2. Política Corporativa de IA Responsável (Pode vs. Não Pode)
    const policyEl = document.getElementById('plan-policy-can-cannot-container');
    if (policyEl && gov.policyCanAndCannot) {
      const canItems = gov.policyCanAndCannot.canDo
        .map(function (item) {
          return '<li><span class="policy-icon-can" aria-hidden="true">&#10003;</span><span>' + escapeHtml(item) + '</span></li>';
        })
        .join('');
      const cannotItems = gov.policyCanAndCannot.cannotDo
        .map(function (item) {
          return '<li><span class="policy-icon-cannot" aria-hidden="true">&#10007;</span><span>' + escapeHtml(item) + '</span></li>';
        })
        .join('');

      policyEl.innerHTML =
        '<div class="policy-can-cannot-grid">' +
        '  <div class="policy-column-box policy-can">' +
        '    <h4><span>O Que a IA Pode Fazer</span><span class="exec-badge exec-badge-ok">Uso Autorizado</span></h4>' +
        '    <ul class="policy-rule-list">' + canItems + '</ul>' +
        '  </div>' +
        '  <div class="policy-column-box policy-cannot">' +
        '    <h4><span>O Que a IA Não Pode Fazer</span><span class="exec-badge exec-badge-alert">Vedação Estrita</span></h4>' +
        '    <ul class="policy-rule-list">' + cannotItems + '</ul>' +
        '  </div>' +
        '</div>';
    }

    // 3. Tabela de Riscos e Conformidade LGPD
    const risksEl = document.getElementById('plan-risks-lgpd-container');
    if (risksEl && gov.risksAndLgpd) {
      let tbl = '<div class="table-scroll-container"><table class="exec-data-table" aria-label="Matriz de mitigação de riscos e conformidade com a LGPD">';
      tbl += '<thead><tr><th scope="col">Risco Identificado (Viés, Operação e LGPD)</th><th scope="col">Mecanismo de Mitigação e Controle</th></tr></thead><tbody>';
      gov.risksAndLgpd.forEach(function (r) {
        tbl += '<tr><td><strong>' + escapeHtml(r.risk) + '</strong></td><td>' + escapeHtml(r.mitigation) + '</td></tr>';
      });
      tbl += '</tbody></table></div>';
      risksEl.innerHTML = tbl;
    }

    // 4. Cadência de Auditoria do Comitê de IA
    const auditEl = document.getElementById('plan-audit-cadence-container');
    if (auditEl && gov.auditCadence) {
      auditEl.innerHTML = '<div class="audit-cadence-grid">' + gov.auditCadence
        .map(function (a) {
          return (
            '<div class="audit-cadence-card">' +
            '  <strong>' + escapeHtml(a.frequency) + '</strong>' +
            '  <span class="audit-cadence-scope">' + escapeHtml(a.scope) + '</span>' +
            '  <p>' + escapeHtml(a.detail) + '</p>' +
            '</div>'
          );
        })
        .join('') + '</div>';
    }

    // 5. Plano de Gestão de Mudança (5 Pilares)
    const changeEl = document.getElementById('plan-change-pillars-container');
    if (changeEl && gov.changeManagementPillars) {
      changeEl.innerHTML = '<div class="audit-cadence-grid">' + gov.changeManagementPillars
        .map(function (p) {
          return (
            '<div class="audit-cadence-card" style="border-top-color: var(--brand-teal);">' +
            '  <strong>' + escapeHtml(p.pillar) + '</strong>' +
            '  <p style="margin-top:0.35rem;">' + escapeHtml(p.detail) + '</p>' +
            '</div>'
          );
        })
        .join('') + '</div>';
    }

    // 6. Limites Declarados e Roadmap da Fase 2
    const limitsEl = document.getElementById('plan-limits-list-container');
    if (limitsEl && gov.declaredLimits) {
      limitsEl.innerHTML = '<ul class="process-dist-list">' + gov.declaredLimits
        .map(function (lim) {
          return '<li style="margin-bottom:0.45rem;">' + escapeHtml(lim) + '</li>';
        })
        .join('') + '</ul>';
    }

    const phase2El = document.getElementById('plan-phase2-steps-container');
    if (phase2El && gov.phase2Steps) {
      phase2El.innerHTML = '<div class="phase2-steps-grid">' + gov.phase2Steps
        .map(function (st) {
          return (
            '<div class="phase2-step-card">' +
            '  <span class="exec-badge exec-badge-info">' + escapeHtml(st.order) + '</span>' +
            '  <strong>' + escapeHtml(st.title) + '</strong>' +
            '  <p>' + escapeHtml(st.detail) + '</p>' +
            '</div>'
          );
        })
        .join('') + '</div>';
    }

    // 7. Links de Documentos e Entregas da Consultoria (href="#")
    const linksEl = document.getElementById('plan-deliverables-links-container');
    if (linksEl && gov.referenceDeliverables) {
      linksEl.innerHTML = '<div class="deliverables-links-grid">' + gov.referenceDeliverables
        .map(function (doc) {
          return (
            '<a href="' + escapeHtml(doc.url) + '" class="deliverable-link-card">' +
            '  <div>' +
            '    <strong>' + escapeHtml(doc.title) + '</strong>' +
            '    <p style="margin-top:0.3rem;">' + escapeHtml(doc.desc) + '</p>' +
            '  </div>' +
            '  <span class="deliverable-link-cta">Acessar documento (URL configurável em db.js) &rarr;</span>' +
            '</a>'
          );
        })
        .join('') + '</div>';

      linksEl.querySelectorAll('.deliverable-link-card').forEach(function (link) {
        link.addEventListener('click', function (e) {
          if (link.getAttribute('href') === '#') {
            e.preventDefault();
          }
        });
      });
    }
  }

  function init() {
    renderActionPlanPage();
    renderUseCasesSection();
    renderHitlSimulator();
    renderEffortImpactMatrix();
    bindPart4Controls();
    renderSipocSection();
    renderIshikawaSection();
    renderTop3AndFiveWhys();
    bindPart3Controls();
    renderQuarterlyMarginSvg('ANUAL');
    updateQuarterSpotlight('ANUAL');
    renderProductLines();
    renderDreTable('all');
    renderGapDecomposition();
    renderDiagnosisTables();
    bindPart2Controls();
  }

  return {
    init,
    selectQuarterPeriod
  };
})();

window.ExecutiveCharts = ExecutiveCharts;
