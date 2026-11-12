/* ==========================================================================
  BANCO DE DADOS CENTRAL (/js/modules/db.js) — TARANIS BLACK
  Contém os 3 arquivos JSON extraídos da planilha + modelo executivo completo
   ========================================================================== */

const TARANIS_DB = {
  "company": {
    "name": "Taranis Black",
    "segment": "Ergonomia Corporativa (Cadeiras ErgoPro, Mesas Elétricas SmartDesk e Cabines Acústicas Silence)",
    "employees": 280,
    "annualGrowth": "35% ao ano (média dos últimos 3 anos)",
    "revenueBudget": "R$ 48,6 mi",
    "revenueActual": "R$ 48,5 mi",
    "ebitdaBudget": "R$ 9,8 mi",
    "ebitdaActual": "R$ 5,8 mi",
    "ebitdaGap": "R$ 4,08 mi",
    "ebitdaDropPct": "-41%"
  },
  "executiveKpis": [
    {
      "id": "kpi-receita",
      "label": "Receita Bruta Anual",
      "value": "R$ 48,5 mi",
      "comparison": "Orçado: R$ 48,6 mi (-0,2%)",
      "badgeText": "No Orçamento",
      "badgeType": "ok",
      "dataCategory": "Dado Real (DRE)",
      "detailTitle": "Faturamento Estável e Crescimento Comercial (+35% a.a.)",
      "detailText": "A Taranis Black atingiu na prática a meta anual de faturamento (R$ 48,50 mi realizados contra R$ 48,60 mi orçados), sustentada pelo canal B2B corporativo (R$ 33,6 mi, ~70%) e pelo canal D2C/e-commerce (R$ 14,9 mi, ~30%). Isso comprova que a queda de resultado não decorre de falta de vendas, mas de perdas internas após a entrada do pedido.",
      "detailMetrics": [
        {
          "label": "Canal B2B Corporativo (70%)",
          "value": "R$ 33,60 mi (Orçado: R$ 34,00 mi)"
        },
        {
          "label": "Canal D2C / E-commerce (30%)",
          "value": "R$ 14,90 mi (Orçado: R$ 14,60 mi)"
        },
        {
          "label": "Volume Médio B2B",
          "value": "180 a 220 pedidos faturados/mês"
        }
      ]
    },
    {
      "id": "kpi-ebitda",
      "label": "EBITDA Realizado",
      "value": "R$ 5,8 mi",
      "comparison": "Orçado: R$ 9,8 mi (-41%)",
      "badgeText": "Desvio Crítico",
      "badgeType": "alert",
      "dataCategory": "Dado Real (DRE)",
      "detailTitle": "Compressão Severa da Rentabilidade Operacional (-41,4%)",
      "detailText": "O EBITDA fechou o ano em R$ 5,77 mi frente aos R$ 9,85 mi projetados no orçamento. A margem EBITDA deteriorou-se continuamente ao longo dos quatro trimestres à medida que o volume cresceu sobre processos manuais: caiu de 16,4% no T1 para 15,6% no T2, 9,2% no T3 e chegou a 7,5% no T4 (contra ~20% orçados).",
      "detailMetrics": [
        {
          "label": "Margem EBITDA T1 → T2",
          "value": "16,4% → 15,6% (Orçado: 19,7%)"
        },
        {
          "label": "Margem EBITDA T3 → T4",
          "value": "9,2% → 7,5% (Orçado: 20,5% e 20,9%)"
        },
        {
          "label": "Lucro Líquido do Exercício",
          "value": "R$ 3,11 mi vs. R$ 5,97 mi orçados (-47,9%)"
        }
      ]
    },
    {
      "id": "kpi-gap",
      "label": "Gap de EBITDA no Ano",
      "value": "R$ 4,08 mi",
      "comparison": "R$ 3,48 mi (85%) em 5 linhas",
      "badgeText": "Vazamento Operacional",
      "badgeType": "warn",
      "dataCategory": "Dado Real (DRE)",
      "detailTitle": "Onde Estão Concentrados 85% do Desvio (R$ 3,48 mi)",
      "detailText": "Das rubricas do DRE, cinco linhas operacionais e administrativas respondem por R$ 3,48 mi dos R$ 4,08 mi de diferença entre o EBITDA orçado e o realizado: Fretes e logística (+R$ 1,36 mi acima do orçado), Cancelamentos e devoluções (+R$ 0,68 mi), PDD / inadimplência (+R$ 0,67 mi), Reentregas e multas (+R$ 0,52 mi) e Sistemas legados (+R$ 0,26 mi).",
      "detailMetrics": [
        {
          "label": "1º Fretes + 2º Cancelamentos",
          "value": "R$ 1,36 mi + R$ 0,68 mi de estouro"
        },
        {
          "label": "3º PDD + 4º Reentregas/Multas",
          "value": "R$ 0,67 mi + R$ 0,52 mi de estouro"
        },
        {
          "label": "5º Sistemas Legados + CMV",
          "value": "R$ 0,26 mi + R$ 0,51 mi de estouro"
        }
      ]
    },
    {
      "id": "kpi-potencial",
      "label": "Potencial das 3 Iniciativas",
      "value": "≈ R$ 1,0 mi/ano",
      "comparison": "Endereça ~25% do gap anual",
      "badgeText": "Hipótese a Validar",
      "badgeType": "info",
      "dataCategory": "Estimativa da Consultoria",
      "detailTitle": "Impacto Estimado e Ponto de Equilíbrio (Hipóteses a Validar)",
      "detailText": "As três iniciativas propostas (Crédito Assistido no piloto, seguidas por Leitura Inteligente de Propostas e Conciliação Assistida na Onda 2) têm benefício combinado estimado em ≈ R$ 1,0 mi/ano, potencial para endereçar cerca de 25% do gap anual de EBITDA (e ~26% dos R$ 3,9 mi de exposição mapeada). Como o custo de implantação não consta no levantamento, o conjunto se paga se custar menos de R$ 1,0 mi/ano.",
      "detailMetrics": [
        {
          "label": "Piloto: Crédito Assistido (P1)",
          "value": "≈ R$ 119 mil/ano de margem + 90 a 110 h/mês"
        },
        {
          "label": "Onda 2: Leitura de Propostas",
          "value": "≈ R$ 753 mil/ano (fretes e divergências NF-e)"
        },
        {
          "label": "Onda 2: Conciliação Assistida",
          "value": "≈ R$ 129 mil/ano (fechamento de 7 para 2 dias)"
        }
      ]
    }
  ],
  "quarterlyAnalysis": {
    "ANUAL": {
      "title": "Consolidado Anual (T1 a T4)",
      "receitaOrcada": "R$ 48,60 mi",
      "receitaRealizada": "R$ 48,50 mi (-0,2%)",
      "ebitdaOrcado": "R$ 9,85 mi (20,3%)",
      "ebitdaRealizado": "R$ 5,77 mi (11,9%)",
      "gapEbitda": "-R$ 4,08 mi (-41,4%)",
      "lucroLiquido": "R$ 3,11 mi vs. R$ 5,97 mi (-47,9%)",
      "insight": "O faturamento anual atingiu 99,8% da meta, mas o estouro progressivo em fretes, cancelamentos, PDD e reentregas consumiu R$ 4,08 mi do EBITDA."
    },
    "T1": {
      "title": "1º Trimestre (T1) — Início do Desvio Logístico",
      "receitaOrcada": "R$ 10,70 mi",
      "receitaRealizada": "R$ 10,85 mi (+1,4%)",
      "ebitdaOrcado": "R$ 2,11 mi (19,7%)",
      "ebitdaRealizado": "R$ 1,78 mi (16,4%)",
      "gapEbitda": "-R$ 330,5 mil (-15,7%)",
      "lucroLiquido": "R$ 1,04 mi vs. R$ 1,27 mi (-18,7%)",
      "insight": "No T1, as vendas B2B superaram a meta (+3,3%), mas fretes (+30,8%), cancelamentos (+62,5%) e reentregas (+144,4%) já abriram os primeiros sinais de pressão operacional."
    },
    "T2": {
      "title": "2º Trimestre (T2) — Crescimento de Vendas com Margem Pressionada",
      "receitaOrcada": "R$ 11,40 mi",
      "receitaRealizada": "R$ 11,75 mi (+3,1%)",
      "ebitdaOrcado": "R$ 2,25 mi (19,7%)",
      "ebitdaRealizado": "R$ 1,83 mi (15,6%)",
      "gapEbitda": "-R$ 414,5 mil (-18,4%)",
      "lucroLiquido": "R$ 1,05 mi vs. R$ 1,36 mi (-22,6%)",
      "insight": "Melhor trimestre comercial (+3,1% acima do orçado), porém a fila manual de aprovação e faturamento fez a PDD dobrar (+109,5%) e reentregas subirem +190%."
    },
    "T3": {
      "title": "3º Trimestre (T3) — Ponto de Inflexão Crítica na Operação",
      "receitaOrcada": "R$ 12,70 mi",
      "receitaRealizada": "R$ 12,50 mi (-1,6%)",
      "ebitdaOrcado": "R$ 2,60 mi (20,5%)",
      "ebitdaRealizado": "R$ 1,16 mi (9,2%)",
      "gapEbitda": "-R$ 1,45 mi (-55,6%)",
      "lucroLiquido": "R$ 570,9 mil vs. R$ 1,58 mi (-63,8%)",
      "insight": "A retenção de 48h na homologação de crédito começa a travar o faturamento B2B (-3,4%), derrubando a margem EBITDA pela metade (de 15,6% para 9,2%)."
    },
    "T4": {
      "title": "4º Trimestre (T4) — Pico de Volume e Estrangulamento de Margem",
      "receitaOrcada": "R$ 13,80 mi",
      "receitaRealizada": "R$ 13,40 mi (-2,9%)",
      "ebitdaOrcado": "R$ 2,89 mi (20,9%)",
      "ebitdaRealizado": "R$ 1,00 mi (7,5%)",
      "gapEbitda": "-R$ 1,89 mi (-65,3%)",
      "lucroLiquido": "R$ 450,1 mil vs. R$ 1,75 mi (-74,4%)",
      "insight": "No pico de demanda do ano, o canal B2B ficou 5,7% abaixo do orçado por pedidos represados, e o EBITDA perdeu R$ 1,89 mi em um único trimestre (margem de 7,5%)."
    }
  },
  "quarterlyMarginChart": [
    {
      "q": "T1",
      "orcado": 19.7,
      "realizado": 16.4,
      "ebitdaOrc": "R$ 2,11 mi",
      "ebitdaReal": "R$ 1,78 mi"
    },
    {
      "q": "T2",
      "orcado": 19.7,
      "realizado": 15.6,
      "ebitdaOrc": "R$ 2,25 mi",
      "ebitdaReal": "R$ 1,83 mi"
    },
    {
      "q": "T3",
      "orcado": 20.5,
      "realizado": 9.2,
      "ebitdaOrc": "R$ 2,60 mi",
      "ebitdaReal": "R$ 1,16 mi"
    },
    {
      "q": "T4",
      "orcado": 20.9,
      "realizado": 7.5,
      "ebitdaOrc": "R$ 2,89 mi",
      "ebitdaReal": "R$ 1,00 mi"
    }
  ],
  "gapDecomposition": [
    {
      "rank": 1,
      "name": "Fretes e logística de entrega CD",
      "orcado": "R$ 2,38 mi",
      "realizado": "R$ 3,74 mi",
      "estouroVal": 1.36,
      "estouroLabel": "R$ 1,36 mi",
      "shareOfGap": "33,3%",
      "varOrcado": "+57,1%",
      "isCritical5": true,
      "causeSummary": "Fretes expressos de emergência para compensar atrasos de aprovação e erros de CIF/FOB na ordem ao CD."
    },
    {
      "rank": 2,
      "name": "Cancelamentos e devoluções por atraso",
      "orcado": "R$ 0,56 mi",
      "realizado": "R$ 1,24 mi",
      "estouroVal": 0.68,
      "estouroLabel": "R$ 0,68 mi",
      "shareOfGap": "16,6%",
      "varOrcado": "+120,5%",
      "isCritical5": true,
      "causeSummary": "Desistência de clientes B2B pela espera de 24 a 48h na aprovação de crédito e ciclo > 5 dias úteis."
    },
    {
      "rank": 3,
      "name": "Provisão para devedores duvidosos (PDD)",
      "orcado": "R$ 0,44 mi",
      "realizado": "R$ 1,11 mi",
      "estouroVal": 0.67,
      "estouroLabel": "R$ 0,67 mi",
      "shareOfGap": "16,4%",
      "varOrcado": "+152,3%",
      "isCritical5": true,
      "causeSummary": "Inadimplência B2B acima de 90 dias subiu de 1,2% para 3,4% da receita; régua de cobrança manual por e-mail."
    },
    {
      "rank": 4,
      "name": "Reentregas e multas por divergência",
      "orcado": "R$ 0,21 mi",
      "realizado": "R$ 0,73 mi",
      "estouroVal": 0.52,
      "estouroLabel": "R$ 0,52 mi",
      "shareOfGap": "12,6%",
      "varOrcado": "+245,2%",
      "isCritical5": true,
      "causeSummary": "Erros de digitação manual de código de produto, inscrição estadual e modalidade CIF/FOB no ERP."
    },
    {
      "rank": 5,
      "name": "Administrativas e sistemas legados",
      "orcado": "R$ 1,76 mi",
      "realizado": "R$ 2,02 mi",
      "estouroVal": 0.26,
      "estouroLabel": "R$ 0,26 mi",
      "shareOfGap": "6,4%",
      "varOrcado": "+14,8%",
      "isCritical5": true,
      "causeSummary": "Horas extras no fechamento contábil de 7 dias úteis, retrabalho administrativo e manutenção de sistemas sem API."
    },
    {
      "rank": 6,
      "name": "CMV acima do orçado (Matéria-prima e Mão de obra)",
      "orcado": "R$ 20,08 mi",
      "realizado": "R$ 20,59 mi",
      "estouroVal": 0.51,
      "estouroLabel": "R$ 0,51 mi",
      "shareOfGap": "12,5%",
      "varOrcado": "+2,5%",
      "isCritical5": false,
      "causeSummary": "Variação nos custos industriais de alumínio, mesh e montagem direta fabril."
    },
    {
      "rank": 7,
      "name": "Demais variações líquidas (Receita, Impostos e Comercial)",
      "orcado": "—",
      "realizado": "—",
      "estouroVal": 0.09,
      "estouroLabel": "R$ 0,09 mi",
      "shareOfGap": "2,2%",
      "varOrcado": "Estável",
      "isCritical5": false,
      "causeSummary": "Efeito líquido da variação de -R$ 100 mil na receita bruta compensada por menor provisão de impostos sobre vendas."
    }
  ],
  "costAnomaliesEvolution": [
    {
      "rubrica": "Fretes e logística de entrega",
      "orcadoPctRec": "4,9%",
      "t1PctRec": "6,3% (+31%)",
      "t4PctRec": "9,1% (+79%)",
      "status": "Anomalia Crítica"
    },
    {
      "rubrica": "Cancelamentos e devoluções",
      "orcadoPctRec": "1,1% a 1,2%",
      "t1PctRec": "1,8% (+62%)",
      "t4PctRec": "3,1% (+162%)",
      "status": "Anomalia Crítica"
    },
    {
      "rubrica": "PDD (Inadimplência B2B)",
      "orcadoPctRec": "0,9%",
      "t1PctRec": "1,5% (+68%)",
      "t4PctRec": "2,9% (+212%)",
      "status": "Anomalia Crítica"
    },
    {
      "rubrica": "Reentregas e multas por divergência",
      "orcadoPctRec": "0,4%",
      "t1PctRec": "1,0% (+144%)",
      "t4PctRec": "1,9% (+333%)",
      "status": "Anomalia Crítica"
    },
    {
      "rubrica": "Administrativas e sistemas legados",
      "orcadoPctRec": "3,8% → 3,5%",
      "t1PctRec": "4,0% (+5%)",
      "t4PctRec": "4,4% (+23%)",
      "status": "Anomalia Crítica"
    },
    {
      "rubrica": "Comercial, Marketing e Impostos",
      "orcadoPctRec": "Dentro da meta",
      "t1PctRec": "Estável",
      "t4PctRec": "Estável (0% a 1,2%)",
      "status": "Sob Controle"
    }
  ],
  "processDistinction": {
    "orderApproval": {
      "title": "Fluxo de Aprovação de Pedidos até a Expedição",
      "nature": "Processo Comercial, Crédito e Operacional (Linha de Frente)",
      "systems": "Proposta em PDF por e-mail, consulta ao Serasa, ERP legado, planilha de limites e e-mail do Gerente.",
      "metricLabel": "Ciclo superior a 5 dias úteis (Duração)",
      "targetLabel": "Meta: máximo de 24 horas úteis",
      "subMetrics": [
        "Homologação de crédito: 24 a 48h úteis (Meta: 4h)",
        "Triagem manual: 40 minutos por pedido (180 a 220 pedidos/mês)",
        "Divergência em boletos/NF-e: 6,8% emitidos com erro (Meta: < 0,5%)"
      ],
      "roleInProject": "Objeto central do mapeamento SIPOC, do Diagrama de Ishikawa e do Piloto Prioritário (Caso 1) e Onda 2 (Caso 2)."
    },
    "financialReconciliation": {
      "title": "Conciliação Financeira e Fechamento Mensal",
      "nature": "Processo Contábil e de Controladoria (Back-office)",
      "systems": "Cruzamento manual de dados entre 3 planilhas Excel locais e o módulo contábil do ERP legado.",
      "metricLabel": "Fechamento em 7 dias úteis (5 dias de atraso)",
      "targetLabel": "Meta: 2 dias úteis",
      "subMetrics": [
        "Atraso mensal: +5 dias úteis além do benchmark",
        "Custo estimado: R$ 180 mil/ano em horas extras e auditorias",
        "Consequência: Diretoria só enxerga desvios de margem no fim do mês"
      ],
      "roleInProject": "Processo distinto do fluxo de aprovação de pedidos; endereçado na Onda 2 pelo Caso 3 (Conciliação Assistida)."
    }
  },
  "dataInconsistenciesAudit": [
    {
      "code": "Ponto 1",
      "topic": "Divergência entre bases de Receita Bruta (Aba 1 vs. Aba 2)",
      "detail": "O DRE (Aba 1) registra R$ 48,6 mi orçados e R$ 48,5 mi realizados, enquanto a abertura por Linha de Produto (Aba 2) soma R$ 48,0 mi orçados e R$ 47,4 mi realizados (diferença de R$ 1,1 mi).",
      "decision": "Adotado o DRE (Aba 1) como fonte oficial de verdade para todos os indicadores financeiros."
    },
    {
      "code": "Ponto 2",
      "topic": "Margem Bruta consolidada na Aba 2 (43,8%) vs. DRE (38,0%)",
      "detail": "A linha Total da Aba 2 informa 43,8% de margem bruta (cuja média ponderada pelas 4 linhas seria 45,0%), enquanto no DRE o Lucro Bruto (R$ 18,43 mi) representa 38,0% da Receita Bruta e 47,2% da Receita Líquida.",
      "decision": "Nos cálculos de benefício sobre pedidos cancelados, utilizamos de forma conservadora a margem bruta de 38,0% do DRE."
    },
    {
      "code": "Ponto 3",
      "topic": "Sobreposição nos R$ 3,89 milhões da Aba 3 (Gargalos)",
      "detail": "A Aba 3 lista R$ 1,25 mi em pedidos cancelados (que é receita bruta e supera o próprio estouro de R$ 0,68 mi da linha no DRE) e R$ 1,11 mi em PDD (que é o total provisionado no ano, não apenas o desvio de R$ 0,67 mi).",
      "decision": "Os R$ 3,89 mi são apresentados como exposição bruta mapeada com sobreposições, nunca como economia líquida direta."
    },
    {
      "code": "Ponto 4",
      "topic": "Lacuna de medição por etapa no ciclo > 5 dias úteis",
      "detail": "A espera de 24 a 48h úteis pelo Gerente Financeiro explica de 1 a 2 dias úteis do ciclo, mas o levantamento atual não decompõe onde estão os demais dias até a expedição.",
      "decision": "O piloto de crédito incluirá a medição de SLA por etapa para localizar o restante do atraso."
    }
  ],
  "navigationPages": [
    {
      "id": "visao-executiva",
      "order": 1,
      "label": "Visão Executiva",
      "subtitle": "Resumo do diagnóstico e principais conclusões"
    },
    {
      "id": "indicadores",
      "order": 2,
      "label": "Indicadores",
      "subtitle": "Dados financeiros e operacionais atuais"
    },
    {
      "id": "diagnostico",
      "order": 3,
      "label": "Diagnóstico",
      "subtitle": "Gargalos, causas e impactos identificados"
    },
    {
      "id": "sipoc-ishikawa",
      "order": 4,
      "label": "SIPOC e Ishikawa",
      "subtitle": "Análise dos processos e causas dos problemas"
    },
    {
      "id": "solucoes-ia",
      "order": 5,
      "label": "Soluções com IA",
      "subtitle": "Recomendações e aplicações propostas"
    },
    {
      "id": "comparativos",
      "order": 6,
      "label": "Comparativos",
      "subtitle": "Estado Atual x Projeção da Consultoria"
    },
    {
      "id": "plano-acao",
      "order": 7,
      "label": "Plano de Ação",
      "subtitle": "Prioridades, etapas e próximos passos"
    }
  ],
  "sheets": {
    "dre_orcado_vs_realizado": [
      {
        "Estrutura Contábil / Conta de Resultado": "1. RECEITA BRUTA DE VENDAS",
        "T1 Orçado (R$)": "",
        "T1 Realizado (R$)": "",
        "Var T1 (%)": "",
        "T2 Orçado (R$)": "",
        "T2 Realizado (R$)": "",
        "Var T2 (%)": "",
        "T3 Orçado (R$)": "",
        "T3 Realizado (R$)": "",
        "Var T3 (%)": "",
        "T4 Orçado (R$)": "",
        "T4 Realizado (R$)": "",
        "Var T4 (%)": "",
        "TOTAL ANUAL ORÇADO": "",
        "TOTAL ANUAL REALIZADO": "",
        "VAR ANUAL (%)": ""
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Receita Canal B2B Corporativo (70%)",
        "T1 Orçado (R$)": "R$ 7.500.000",
        "T1 Realizado (R$)": "R$ 7.750.000",
        "Var T1 (%)": "3,3%",
        "T2 Orçado (R$)": "R$ 8.000.000",
        "T2 Realizado (R$)": "R$ 8.200.000",
        "Var T2 (%)": "2,5%",
        "T3 Orçado (R$)": "R$ 8.900.000",
        "T3 Realizado (R$)": "R$ 8.600.000",
        "Var T3 (%)": "-3,4%",
        "T4 Orçado (R$)": "R$ 9.600.000",
        "T4 Realizado (R$)": "R$ 9.050.000",
        "Var T4 (%)": "-5,7%",
        "TOTAL ANUAL ORÇADO": "R$ 34.000.000",
        "TOTAL ANUAL REALIZADO": "R$ 33.600.000",
        "VAR ANUAL (%)": "-1,2%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Receita Canal D2C / E-commerce (30%)",
        "T1 Orçado (R$)": "R$ 3.200.000",
        "T1 Realizado (R$)": "R$ 3.100.000",
        "Var T1 (%)": "-3,1%",
        "T2 Orçado (R$)": "R$ 3.400.000",
        "T2 Realizado (R$)": "R$ 3.550.000",
        "Var T2 (%)": "4,4%",
        "T3 Orçado (R$)": "R$ 3.800.000",
        "T3 Realizado (R$)": "R$ 3.900.000",
        "Var T3 (%)": "2,6%",
        "T4 Orçado (R$)": "R$ 4.200.000",
        "T4 Realizado (R$)": "R$ 4.350.000",
        "Var T4 (%)": "3,6%",
        "TOTAL ANUAL ORÇADO": "R$ 14.600.000",
        "TOTAL ANUAL REALIZADO": "R$ 14.900.000",
        "VAR ANUAL (%)": "2,1%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "TOTAL RECEITA BRUTA",
        "T1 Orçado (R$)": "R$ 10.700.000",
        "T1 Realizado (R$)": "R$ 10.850.000",
        "Var T1 (%)": "1,4%",
        "T2 Orçado (R$)": "R$ 11.400.000",
        "T2 Realizado (R$)": "R$ 11.750.000",
        "Var T2 (%)": "3,1%",
        "T3 Orçado (R$)": "R$ 12.700.000",
        "T3 Realizado (R$)": "R$ 12.500.000",
        "Var T3 (%)": "-1,6%",
        "T4 Orçado (R$)": "R$ 13.800.000",
        "T4 Realizado (R$)": "R$ 13.400.000",
        "Var T4 (%)": "-2,9%",
        "TOTAL ANUAL ORÇADO": "R$ 48.600.000",
        "TOTAL ANUAL REALIZADO": "R$ 48.500.000",
        "VAR ANUAL (%)": "-0,2%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "2. DEDUÇÕES E IMPOSTOS SOBRE VENDAS",
        "T1 Orçado (R$)": "",
        "T1 Realizado (R$)": "",
        "Var T1 (%)": "",
        "T2 Orçado (R$)": "",
        "T2 Realizado (R$)": "",
        "Var T2 (%)": "",
        "T3 Orçado (R$)": "",
        "T3 Realizado (R$)": "",
        "Var T3 (%)": "",
        "T4 Orçado (R$)": "",
        "T4 Realizado (R$)": "",
        "Var T4 (%)": "",
        "TOTAL ANUAL ORÇADO": "",
        "TOTAL ANUAL REALIZADO": "",
        "VAR ANUAL (%)": ""
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Impostos Incidentes (ICMS, PIS, COFINS)",
        "T1 Orçado (R$)": "-R$ 1.819.000",
        "T1 Realizado (R$)": "-R$ 1.844.500",
        "Var T1 (%)": "-1,4%",
        "T2 Orçado (R$)": "-R$ 1.938.000",
        "T2 Realizado (R$)": "-R$ 1.997.500",
        "Var T2 (%)": "-3,1%",
        "T3 Orçado (R$)": "-R$ 2.159.000",
        "T3 Realizado (R$)": "-R$ 2.125.000",
        "Var T3 (%)": "1,6%",
        "T4 Orçado (R$)": "-R$ 2.346.000",
        "T4 Realizado (R$)": "-R$ 2.278.000",
        "Var T4 (%)": "2,9%",
        "TOTAL ANUAL ORÇADO": "-R$ 8.262.000",
        "TOTAL ANUAL REALIZADO": "-R$ 8.245.000",
        "VAR ANUAL (%)": "0,2%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Cancelamentos e Devoluções por Atraso Logístico",
        "T1 Orçado (R$)": "-R$ 120.000",
        "T1 Realizado (R$)": "-R$ 195.000",
        "Var T1 (%)": "-62,5%",
        "T2 Orçado (R$)": "-R$ 130.000",
        "T2 Realizado (R$)": "-R$ 240.000",
        "Var T2 (%)": "-84,6%",
        "T3 Orçado (R$)": "-R$ 150.000",
        "T3 Realizado (R$)": "-R$ 380.000",
        "Var T3 (%)": "-153,3%",
        "T4 Orçado (R$)": "-R$ 160.000",
        "T4 Realizado (R$)": "-R$ 420.000",
        "Var T4 (%)": "-162,5%",
        "TOTAL ANUAL ORÇADO": "-R$ 560.000",
        "TOTAL ANUAL REALIZADO": "-R$ 1.235.000",
        "VAR ANUAL (%)": "-120,5%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "RECEITA LÍQUIDA OPERACIONAL",
        "T1 Orçado (R$)": "R$ 8.761.000",
        "T1 Realizado (R$)": "R$ 8.810.500",
        "Var T1 (%)": "0,6%",
        "T2 Orçado (R$)": "R$ 9.332.000",
        "T2 Realizado (R$)": "R$ 9.512.500",
        "Var T2 (%)": "1,9%",
        "T3 Orçado (R$)": "R$ 10.391.000",
        "T3 Realizado (R$)": "R$ 9.995.000",
        "Var T3 (%)": "-3,8%",
        "T4 Orçado (R$)": "R$ 11.294.000",
        "T4 Realizado (R$)": "R$ 10.702.000",
        "Var T4 (%)": "-5,2%",
        "TOTAL ANUAL ORÇADO": "R$ 39.778.000",
        "TOTAL ANUAL REALIZADO": "R$ 39.020.000",
        "VAR ANUAL (%)": "-1,9%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "3. CUSTO DAS MERCADORIAS VENDIDAS (CMV)",
        "T1 Orçado (R$)": "",
        "T1 Realizado (R$)": "",
        "Var T1 (%)": "",
        "T2 Orçado (R$)": "",
        "T2 Realizado (R$)": "",
        "Var T2 (%)": "",
        "T3 Orçado (R$)": "",
        "T3 Realizado (R$)": "",
        "Var T3 (%)": "",
        "T4 Orçado (R$)": "",
        "T4 Realizado (R$)": "",
        "Var T4 (%)": "",
        "TOTAL ANUAL ORÇADO": "",
        "TOTAL ANUAL REALIZADO": "",
        "VAR ANUAL (%)": ""
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Matéria-prima, Mesh e Componentes de Alumínio",
        "T1 Orçado (R$)": "-R$ 3.600.000",
        "T1 Realizado (R$)": "-R$ 3.650.000",
        "Var T1 (%)": "-1,4%",
        "T2 Orçado (R$)": "-R$ 3.850.000",
        "T2 Realizado (R$)": "-R$ 3.920.000",
        "Var T2 (%)": "-1,8%",
        "T3 Orçado (R$)": "-R$ 4.250.000",
        "T3 Realizado (R$)": "-R$ 4.380.000",
        "Var T3 (%)": "-3,1%",
        "T4 Orçado (R$)": "-R$ 4.600.000",
        "T4 Realizado (R$)": "-R$ 4.750.000",
        "Var T4 (%)": "-3,3%",
        "TOTAL ANUAL ORÇADO": "-R$ 16.300.000",
        "TOTAL ANUAL REALIZADO": "-R$ 16.700.000",
        "VAR ANUAL (%)": "-2,5%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Mão de Obra Fabril e Montagem Direta",
        "T1 Orçado (R$)": "-R$ 850.000",
        "T1 Realizado (R$)": "-R$ 870.000",
        "Var T1 (%)": "-2,4%",
        "T2 Orçado (R$)": "-R$ 900.000",
        "T2 Realizado (R$)": "-R$ 920.000",
        "Var T2 (%)": "-2,2%",
        "T3 Orçado (R$)": "-R$ 980.000",
        "T3 Realizado (R$)": "-R$ 1.020.000",
        "Var T3 (%)": "-4,1%",
        "T4 Orçado (R$)": "-R$ 1.050.000",
        "T4 Realizado (R$)": "-R$ 1.080.000",
        "Var T4 (%)": "-2,9%",
        "TOTAL ANUAL ORÇADO": "-R$ 3.780.000",
        "TOTAL ANUAL REALIZADO": "-R$ 3.890.000",
        "VAR ANUAL (%)": "-2,9%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "LUCRO BRUTO OPERACIONAL",
        "T1 Orçado (R$)": "R$ 4.311.000",
        "T1 Realizado (R$)": "R$ 4.290.500",
        "Var T1 (%)": "-0,5%",
        "T2 Orçado (R$)": "R$ 4.582.000",
        "T2 Realizado (R$)": "R$ 4.672.500",
        "Var T2 (%)": "2,0%",
        "T3 Orçado (R$)": "R$ 5.161.000",
        "T3 Realizado (R$)": "R$ 4.595.000",
        "Var T3 (%)": "-11,0%",
        "T4 Orçado (R$)": "R$ 5.644.000",
        "T4 Realizado (R$)": "R$ 4.872.000",
        "Var T4 (%)": "-13,7%",
        "TOTAL ANUAL ORÇADO": "R$ 19.698.000",
        "TOTAL ANUAL REALIZADO": "R$ 18.430.000",
        "VAR ANUAL (%)": "-6,4%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "4. DESPESAS OPERACIONAIS & ADMINISTRATIVAS (OPEX)",
        "T1 Orçado (R$)": "",
        "T1 Realizado (R$)": "",
        "Var T1 (%)": "",
        "T2 Orçado (R$)": "",
        "T2 Realizado (R$)": "",
        "Var T2 (%)": "",
        "T3 Orçado (R$)": "",
        "T3 Realizado (R$)": "",
        "Var T3 (%)": "",
        "T4 Orçado (R$)": "",
        "T4 Realizado (R$)": "",
        "Var T4 (%)": "",
        "TOTAL ANUAL ORÇADO": "",
        "TOTAL ANUAL REALIZADO": "",
        "VAR ANUAL (%)": ""
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Despesas Comerciais e Vendas (Comissões e SDRs)",
        "T1 Orçado (R$)": "-R$ 680.000",
        "T1 Realizado (R$)": "-R$ 690.000",
        "Var T1 (%)": "-1,5%",
        "T2 Orçado (R$)": "-R$ 720.000",
        "T2 Realizado (R$)": "-R$ 735.000",
        "Var T2 (%)": "-2,1%",
        "T3 Orçado (R$)": "-R$ 800.000",
        "T3 Realizado (R$)": "-R$ 790.000",
        "Var T3 (%)": "1,3%",
        "T4 Orçado (R$)": "-R$ 860.000",
        "T4 Realizado (R$)": "-R$ 850.000",
        "Var T4 (%)": "1,2%",
        "TOTAL ANUAL ORÇADO": "-R$ 3.060.000",
        "TOTAL ANUAL REALIZADO": "-R$ 3.065.000",
        "VAR ANUAL (%)": "-0,2%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Despesas com Fretes e Logística de Entrega CD",
        "T1 Orçado (R$)": "-R$ 520.000",
        "T1 Realizado (R$)": "-R$ 680.000",
        "Var T1 (%)": "-30,8%",
        "T2 Orçado (R$)": "-R$ 560.000",
        "T2 Realizado (R$)": "-R$ 790.000",
        "Var T2 (%)": "-41,1%",
        "T3 Orçado (R$)": "-R$ 620.000",
        "T3 Realizado (R$)": "-R$ 1.050.000",
        "Var T3 (%)": "-69,4%",
        "T4 Orçado (R$)": "-R$ 680.000",
        "T4 Realizado (R$)": "-R$ 1.220.000",
        "Var T4 (%)": "-79,4%",
        "TOTAL ANUAL ORÇADO": "-R$ 2.380.000",
        "TOTAL ANUAL REALIZADO": "-R$ 3.740.000",
        "VAR ANUAL (%)": "-57,1%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Reentregas e Multas por Divergência de Pedido",
        "T1 Orçado (R$)": "-R$ 45.000",
        "T1 Realizado (R$)": "-R$ 110.000",
        "Var T1 (%)": "-144,4%",
        "T2 Orçado (R$)": "-R$ 50.000",
        "T2 Realizado (R$)": "-R$ 145.000",
        "Var T2 (%)": "-190,0%",
        "T3 Orçado (R$)": "-R$ 55.000",
        "T3 Realizado (R$)": "-R$ 210.000",
        "Var T3 (%)": "-281,8%",
        "T4 Orçado (R$)": "-R$ 60.000",
        "T4 Realizado (R$)": "-R$ 260.000",
        "Var T4 (%)": "-333,3%",
        "TOTAL ANUAL ORÇADO": "-R$ 210.000",
        "TOTAL ANUAL REALIZADO": "-R$ 725.000",
        "VAR ANUAL (%)": "-245,2%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Despesas Administrativas e Sistemas Legados",
        "T1 Orçado (R$)": "-R$ 410.000",
        "T1 Realizado (R$)": "-R$ 430.000",
        "Var T1 (%)": "-4,9%",
        "T2 Orçado (R$)": "-R$ 420.000",
        "T2 Realizado (R$)": "-R$ 460.000",
        "Var T2 (%)": "-9,5%",
        "T3 Orçado (R$)": "-R$ 450.000",
        "T3 Realizado (R$)": "-R$ 540.000",
        "Var T3 (%)": "-20,0%",
        "T4 Orçado (R$)": "-R$ 480.000",
        "T4 Realizado (R$)": "-R$ 590.000",
        "Var T4 (%)": "-22,9%",
        "TOTAL ANUAL ORÇADO": "-R$ 1.760.000",
        "TOTAL ANUAL REALIZADO": "-R$ 2.020.000",
        "VAR ANUAL (%)": "-14,8%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Provisão para Devedores Duvidosos (Inadimplência B2B)",
        "T1 Orçado (R$)": "-R$ 95.000",
        "T1 Realizado (R$)": "-R$ 160.000",
        "Var T1 (%)": "-68,4%",
        "T2 Orçado (R$)": "-R$ 105.000",
        "T2 Realizado (R$)": "-R$ 220.000",
        "Var T2 (%)": "-109,5%",
        "T3 Orçado (R$)": "-R$ 115.000",
        "T3 Realizado (R$)": "-R$ 340.000",
        "Var T3 (%)": "-195,7%",
        "T4 Orçado (R$)": "-R$ 125.000",
        "T4 Realizado (R$)": "-R$ 390.000",
        "Var T4 (%)": "-212,0%",
        "TOTAL ANUAL ORÇADO": "-R$ 440.000",
        "TOTAL ANUAL REALIZADO": "-R$ 1.110.000",
        "VAR ANUAL (%)": "-152,3%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Marketing Institucional e Geração de Demanda",
        "T1 Orçado (R$)": "-R$ 450.000",
        "T1 Realizado (R$)": "-R$ 440.000",
        "Var T1 (%)": "2,2%",
        "T2 Orçado (R$)": "-R$ 480.000",
        "T2 Realizado (R$)": "-R$ 490.000",
        "Var T2 (%)": "-2,1%",
        "T3 Orçado (R$)": "-R$ 520.000",
        "T3 Realizado (R$)": "-R$ 510.000",
        "Var T3 (%)": "1,9%",
        "T4 Orçado (R$)": "-R$ 550.000",
        "T4 Realizado (R$)": "-R$ 560.000",
        "Var T4 (%)": "-1,8%",
        "TOTAL ANUAL ORÇADO": "-R$ 2.000.000",
        "TOTAL ANUAL REALIZADO": "-R$ 2.000.000",
        "VAR ANUAL (%)": "0,0%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "EBITDA (RESULTADO OPERACIONAL ANTES DE JUROS/IMP.)",
        "T1 Orçado (R$)": "R$ 2.111.000",
        "T1 Realizado (R$)": "R$ 1.780.500",
        "Var T1 (%)": "-15,7%",
        "T2 Orçado (R$)": "R$ 2.247.000",
        "T2 Realizado (R$)": "R$ 1.832.500",
        "Var T2 (%)": "-18,4%",
        "T3 Orçado (R$)": "R$ 2.601.000",
        "T3 Realizado (R$)": "R$ 1.155.000",
        "Var T3 (%)": "-55,6%",
        "T4 Orçado (R$)": "R$ 2.889.000",
        "T4 Realizado (R$)": "R$ 1.002.000",
        "Var T4 (%)": "-65,3%",
        "TOTAL ANUAL ORÇADO": "R$ 9.848.000",
        "TOTAL ANUAL REALIZADO": "R$ 5.770.000",
        "VAR ANUAL (%)": "-41,4%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   Despesas Financeiras Líquidas e Juros",
        "T1 Orçado (R$)": "-R$ 180.000",
        "T1 Realizado (R$)": "-R$ 210.000",
        "Var T1 (%)": "-16,7%",
        "T2 Orçado (R$)": "-R$ 190.000",
        "T2 Realizado (R$)": "-R$ 240.000",
        "Var T2 (%)": "-26,3%",
        "T3 Orçado (R$)": "-R$ 210.000",
        "T3 Realizado (R$)": "-R$ 290.000",
        "Var T3 (%)": "-38,1%",
        "T4 Orçado (R$)": "-R$ 230.000",
        "T4 Realizado (R$)": "-R$ 320.000",
        "Var T4 (%)": "-39,1%",
        "TOTAL ANUAL ORÇADO": "-R$ 810.000",
        "TOTAL ANUAL REALIZADO": "-R$ 1.060.000",
        "VAR ANUAL (%)": "-30,9%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "   IRPJ e CSLL Provisionados",
        "T1 Orçado (R$)": "-R$ 656.540",
        "T1 Realizado (R$)": "-R$ 533.970",
        "Var T1 (%)": "18,7%",
        "T2 Orçado (R$)": "-R$ 699.380",
        "T2 Realizado (R$)": "-R$ 541.450",
        "Var T2 (%)": "22,6%",
        "T3 Orçado (R$)": "-R$ 812.940",
        "T3 Realizado (R$)": "-R$ 294.100",
        "Var T3 (%)": "63,8%",
        "T4 Orçado (R$)": "-R$ 904.060",
        "T4 Realizado (R$)": "-R$ 231.880",
        "Var T4 (%)": "74,4%",
        "TOTAL ANUAL ORÇADO": "-R$ 3.072.920",
        "TOTAL ANUAL REALIZADO": "-R$ 1.601.400",
        "VAR ANUAL (%)": "47,9%"
      },
      {
        "Estrutura Contábil / Conta de Resultado": "LUCRO LÍQUIDO DO EXERCÍCIO",
        "T1 Orçado (R$)": "R$ 1.274.460",
        "T1 Realizado (R$)": "R$ 1.036.530",
        "Var T1 (%)": "-18,7%",
        "T2 Orçado (R$)": "R$ 1.357.620",
        "T2 Realizado (R$)": "R$ 1.051.050",
        "Var T2 (%)": "-22,6%",
        "T3 Orçado (R$)": "R$ 1.578.060",
        "T3 Realizado (R$)": "R$ 570.900",
        "Var T3 (%)": "-63,8%",
        "T4 Orçado (R$)": "R$ 1.754.940",
        "T4 Realizado (R$)": "R$ 450.120",
        "Var T4 (%)": "-74,4%",
        "TOTAL ANUAL ORÇADO": "R$ 5.965.080",
        "TOTAL ANUAL REALIZADO": "R$ 3.108.600",
        "VAR ANUAL (%)": "-47,9%"
      }
    ],
    "receita_por_produto": [
      {
        "Linha de Produto": "Taranis ErgoPro (Cadeiras Corporativas)",
        "Participação (%)": "48.5%",
        "Orçado Anual (R$)": "R$ 23.500.000",
        "Realizado Anual (R$)": "R$ 23.850.000",
        "Variação (R$)": "R$ 350.000",
        "Variação (%)": "1,5%",
        "Margem Bruta Média": "44.2%",
        "Gargalo Principal Observado": "Vendas aquecidas, mas margem comprimida por fretes de emergência e devoluções"
      },
      {
        "Linha de Produto": "Taranis SmartDesk (Mesas Elevatórias)",
        "Participação (%)": "27.5%",
        "Orçado Anual (R$)": "R$ 13.200.000",
        "Realizado Anual (R$)": "R$ 12.650.000",
        "Variação (R$)": "-R$ 550.000",
        "Variação (%)": "-4,2%",
        "Margem Bruta Média": "38.5%",
        "Gargalo Principal Observado": "Atrasos na homologação de crédito travam faturamento de pedidos B2B em 48h"
      },
      {
        "Linha de Produto": "Taranis Silence (Cabines Acústicas)",
        "Participação (%)": "18.0%",
        "Orçado Anual (R$)": "R$ 8.600.000",
        "Realizado Anual (R$)": "R$ 8.100.000",
        "Variação (R$)": "-R$ 500.000",
        "Variação (%)": "-5,8%",
        "Margem Bruta Média": "52.0%",
        "Gargalo Principal Observado": "Ciclo longo de vendas (90 dias) e complexidade de logística com montagem técnica"
      },
      {
        "Linha de Produto": "Acessórios e Periféricos Ergonômicos",
        "Participação (%)": "6.0%",
        "Orçado Anual (R$)": "R$ 2.700.000",
        "Realizado Anual (R$)": "R$ 2.800.000",
        "Variação (R$)": "R$ 100.000",
        "Variação (%)": "3,7%",
        "Margem Bruta Média": "61.0%",
        "Gargalo Principal Observado": "Alto volume e tíquete baixo; conciliação de boletos manuais sobrecarrega time"
      },
      {
        "Linha de Produto": "TOTAL TARANIS BLACK",
        "Participação (%)": "100.0%",
        "Orçado Anual (R$)": "R$ 48.000.000",
        "Realizado Anual (R$)": "R$ 47.400.000",
        "Variação (R$)": "-R$ 600.000",
        "Variação (%)": "-1,3%",
        "Margem Bruta Média": "43.8%",
        "Gargalo Principal Observado": "Desvio negativo consolidado de R$ 600 mil devido a perdas operacionais e fretes"
      }
    ],
    "gargalos_operacionais": [
      {
        "Métrica Operacional / Financeira": "Tempo Médio de Fechamento Contábil Mensal",
        "Meta / Benchmark": "2 dias úteis",
        "Situação Atual (Real)": "7 dias úteis",
        "Desvio Crítico": "+5 dias de atraso",
        "Custo / Impacto Anual Estimado": "R$ 180.000 / ano em horas extras e auditorias",
        "Causa Raiz Identificada": "Conciliação manual de dados entre 3 planilhas do Excel e ERP legado desconectado"
      },
      {
        "Métrica Operacional / Financeira": "Tempo de Homologação de Crédito de Pedido B2B",
        "Meta / Benchmark": "Max. 4 horas",
        "Situação Atual (Real)": "48 horas",
        "Desvio Crítico": "+44 horas de retenção",
        "Custo / Impacto Anual Estimado": "R$ 1.250.000 / ano em pedidos cancelados por lentidão",
        "Causa Raiz Identificada": "Assistente consulta Serasa manualmente (40 min/pedido) e depende de e-mail de gerente"
      },
      {
        "Métrica Operacional / Financeira": "Reentregas e Fretes Expressos de Emergência",
        "Meta / Benchmark": "0.8% do faturamento",
        "Situação Atual (Real)": "2.8% do faturamento",
        "Desvio Crítico": "+2.0 p.p. acima do teto",
        "Custo / Impacto Anual Estimado": "R$ 960.000 / ano em fretes duplicados",
        "Causa Raiz Identificada": "Erro na transposição manual de dados da proposta para a ordem de expedição do CD"
      },
      {
        "Métrica Operacional / Financeira": "Divergência em Boletos Faturados Emitidos",
        "Meta / Benchmark": "< 0.5% das NF-e",
        "Situação Atual (Real)": "6.8% das NF-e emitidas",
        "Desvio Crítico": "+6.3 p.p. de retrabalho",
        "Custo / Impacto Anual Estimado": "R$ 390.000 / ano em custos de cancelamento e juros",
        "Causa Raiz Identificada": "Divergência entre tabela de preço do comercial e cadastro desatualizado no ERP"
      },
      {
        "Métrica Operacional / Financeira": "Inadimplência B2B Acima de 90 dias",
        "Meta / Benchmark": "1.2% da receita",
        "Situação Atual (Real)": "3.4% da receita",
        "Desvio Crítico": "+2.2 p.p. de risco",
        "Custo / Impacto Anual Estimado": "R$ 1.110.000 / ano em PDD / inadimplência",
        "Causa Raiz Identificada": "Cobrança não automatizada; régua de lembretes enviada manualmente por e-mail"
      }
    ]
  },
  "sipocSteps": [
    {
      "step": 1,
      "shortName": "Envio da Proposta",
      "title": "1. Envio da Proposta Comercial",
      "suppliers": "Consultores de vendas B2B e SDRs; cliente corporativo",
      "inputs": "Proposta assinada em PDF; dados cadastrais (CNPJ, IE, endereço); prazo 30/60/90; frete CIF/FOB",
      "processAsIs": "E-mail manual com o PDF enviado ao Financeiro, sem validação prévia de estoque, crédito ou CNPJ.",
      "outputs": "E-mail com o PDF na caixa de entrada do Financeiro (o pedido ainda não existe no ERP nesta etapa).",
      "customers": "Equipe do Financeiro (assistentes)",
      "painTime": "Sem padrão de layout; mais de 40 e-mails por dia em picos de fechamento.",
      "painBadge": "Alto Volume Manual",
      "aiLayer": "A IA lê o PDF e confere, em ordem: CNPJ, data, código e descrição da mercadoria, quantidade, preço unitário e total, prazo de pagamento e modalidade CIF/FOB contra a tabela de produtos. Se tudo confere, encaminha ao Financeiro o PDF validado com resumo estruturado; se houver dado faltante ou divergência cadastral, alerta imediatamente o vendedor.",
      "humanDecision": "Vendedor corrige dado faltante ou divergência cadastral junto ao vendedor interno antes de seguir."
    },
    {
      "step": 2,
      "shortName": "Triagem e Crédito",
      "title": "2. Triagem e Consulta de Crédito",
      "suppliers": "Serasa; ERP legado; planilha local de limites (Controle_Limites_2026.xlsx)",
      "inputs": "PDF da proposta; score, protestos e dívidas ativas; histórico de compras; limite de crédito",
      "processAsIs": "Assistente financeiro realiza triagem e consulta de crédito alternando manualmente entre três janelas (Serasa, ERP e planilha).",
      "outputs": "Dossiê e parecer de crédito; em caso de exceção, e-mail manual do Financeiro ao vendedor sobre CNPJ ou pendência.",
      "customers": "Equipe do Financeiro (Gerente, na etapa 3); vendedor (apenas na exceção)",
      "painTime": "40 minutos por pedido (120 a 147 h/mês em 180 a 220 pedidos); retorno manual de pendências.",
      "painBadge": "40 min / pedido",
      "aiLayer": "Consulta automatizada ao Serasa (via API, premissa) cruzada com o histórico no ERP e o limite do cliente (Caso 1). Em caso de pendência, dispara aviso automático ao vendedor por e-mail e WhatsApp Business corporativo (mensagem curta, sem dados sigilosos).",
      "humanDecision": "Financeiro resolve a pendência comercial/cadastral com o cliente; após ajuste, o PDF reentra validado na etapa 1."
    },
    {
      "step": 3,
      "shortName": "Solicitação de Aprovação",
      "title": "3. Solicitação de Aprovação",
      "suppliers": "Assistente financeiro",
      "inputs": "Dossiê resumido (empresa, valor do pedido, condição de pagamento, score)",
      "processAsIs": "Envio de solicitação individual por e-mail ao Gerente Financeiro: \"Podemos faturar?\".",
      "outputs": "Pedido de aprovação enviado à caixa do Gerente Financeiro.",
      "customers": "Gerente Financeiro",
      "painTime": "Ausência total de motor de regras ou alçada; até pedidos triviais de R$ 8 mil exigem o gerente.",
      "painBadge": "Sem Alçada / Regras",
      "aiLayer": "Motor de regras aplica critérios de alçada: pedidos sem divergência, de cliente com histórico e sem restrição no Serasa, dentro do limite e até o teto de R$ 15 mil (premissa) são aprovados por regra. Qualquer exceção gera alerta estruturado ao Coordenador Financeiro.",
      "humanDecision": "Em qualquer divergência, restrição, cliente sem histórico ou valor acima de R$ 15 mil, a IA NÃO decide: encaminha para decisão humana."
    },
    {
      "step": 4,
      "shortName": "Espera pela Decisão",
      "title": "4. Espera pela Decisão de Crédito",
      "suppliers": "Gerente Financeiro",
      "inputs": "Pedido de aprovação aguardando leitura na caixa de e-mail",
      "processAsIs": "Retenção do pedido enquanto o Gerente Financeiro está em reuniões ou viagens, sem substituto formal definido.",
      "outputs": "Autorização de faturamento a prazo por e-mail, ou recusa do pedido.",
      "customers": "Assistente financeiro; indiretamente consultor comercial e cliente comprador",
      "painTime": "24 a 48 horas úteis de espera (meta interna: 4h); cobranças informais por WhatsApp.",
      "painBadge": "Retenção: 24 a 48h úteis",
      "aiLayer": "Para as exceções encaminhadas ao humano, o Coordenador Financeiro (premissa de delegação) responde em até 4 horas úteis, com escalonamento automático ao Gerente se ultrapassar o prazo. A autorização segue exclusivamente por e-mail com os dados do pedido.",
      "humanDecision": "Coordenador Financeiro ou Gerente Financeiro analisa o resumo da exceção e autoriza ou recusa por e-mail."
    },
    {
      "step": 5,
      "shortName": "Faturamento (NF-e)",
      "title": "5. Faturamento e Emissão de Boletos",
      "suppliers": "Gerente (autorização); ERP legado; tabela de preços comercial",
      "inputs": "Autorização de faturamento; proposta em PDF; dados cadastrais; tabela de preços",
      "processAsIs": "Digitação manual do espelho da NF no ERP legado; emissão de NF-e e boletos faturados em 30/60/90 dias.",
      "outputs": "DANFE, arquivo XML e boletos bancários emitidos.",
      "customers": "Cliente comprador; Contabilidade",
      "painTime": "Erros de digitação em código de produto e Inscrição Estadual (IE); 6,8% de divergência em boletos (meta < 0,5%).",
      "painBadge": "6,8% de erro em NF-e",
      "aiLayer": "Na Onda 2 (Caso 2), os dados já conferidos na Etapa 1 alimentam o ERP por arquivo estruturado ou camada intermediária, eliminando a redigitação manual do PDF e reduzindo divergências de preço e cadastro.",
      "humanDecision": "Analista financeiro atua apenas nas exceções sinalizadas antes da emissão fiscal."
    },
    {
      "step": 6,
      "shortName": "Ordem ao CD",
      "title": "6. Transmissão da Ordem ao CD (Joinville)",
      "suppliers": "Assistente financeiro; Centro de Distribuição (CD) e transportadoras",
      "inputs": "NF-e emitida; modalidade de frete CIF/FOB; tabela de fretes homologados",
      "processAsIs": "Envio de e-mail manual ao CD de Joinville/SC e agendamento de embarque com transportadora.",
      "outputs": "Picking list de separação e minuta de embarque liberada.",
      "customers": "Equipe do CD de Joinville; transportadora homologada",
      "painTime": "Divergência de frete CIF/FOB trava o caminhão no pátio, gerando diárias de armazenagem e fretes de emergência.",
      "painBadge": "Trava de Embarque CD",
      "aiLayer": "A modalidade de frete CIF/FOB e os códigos de mercadoria já chegam validados desde a Etapa 1 contra a proposta e a tabela homologada, evitando bloqueio de embarque no CD.",
      "humanDecision": "Equipe financeira e logística intervêm apenas em alterações contratuais de última hora."
    }
  ],
  "ishikawa6M": {
    "effect": "Ciclo da proposta ao despacho > 5 dias úteis (Meta: 24h úteis)",
    "categories": [
      {
        "id": "metodo",
        "name": "Método",
        "position": "top-left",
        "items": [
          {
            "type": "R",
            "topRank": 1,
            "text": "Sem alçada nem regras de aprovação (todo valor exige o gerente, até R$ 8 mil)"
          },
          {
            "type": "R",
            "topRank": null,
            "text": "Sem procedimento operacional padrão documentado"
          },
          {
            "type": "C",
            "topRank": null,
            "text": "Regras de frete CIF/FOB não checadas antes do fechamento"
          },
          {
            "type": "C",
            "topRank": null,
            "text": "Fluxo decisório dependente de e-mail informal"
          }
        ]
      },
      {
        "id": "maquina",
        "name": "Máquina (Tecnologia)",
        "position": "top-mid",
        "items": [
          {
            "type": "R",
            "topRank": 3,
            "text": "ERP legado sem integração por API"
          },
          {
            "type": "R",
            "topRank": 3,
            "text": "3 planilhas locais não sincronizadas (crédito, preços e frete)"
          },
          {
            "type": "C",
            "topRank": null,
            "text": "Ausência de leitura automática das propostas em PDF"
          }
        ]
      },
      {
        "id": "mao-de-obra",
        "name": "Mão de obra (Pessoas)",
        "position": "top-right",
        "items": [
          {
            "type": "C",
            "topRank": 1,
            "text": "Gerente centraliza aprovações triviais e retém o fluxo em reuniões/viagens"
          },
          {
            "type": "S",
            "topRank": null,
            "text": "Equipe sobrecarregada com digitação e cópia manual entre telas"
          },
          {
            "type": "S",
            "topRank": null,
            "text": "Desmotivação e burnout nos períodos de fechamento mensal"
          }
        ]
      },
      {
        "id": "material",
        "name": "Material (Insumos/Dados)",
        "position": "bottom-left",
        "items": [
          {
            "type": "R",
            "topRank": 2,
            "text": "Propostas em PDF sem padrão e com campos incompletos"
          },
          {
            "type": "C",
            "topRank": 2,
            "text": "Códigos de produto da proposta divergem do cadastro no ERP"
          },
          {
            "type": "C",
            "topRank": null,
            "text": "Falta de comprovante de endereço atualizado (secundária)"
          }
        ]
      },
      {
        "id": "medicao",
        "name": "Medição (Controle)",
        "position": "bottom-mid",
        "items": [
          {
            "type": "R",
            "topRank": "SLA",
            "isSustaining": true,
            "text": "Sem SLA por etapa nem visão dos pedidos represados (Causa de Sustentação)"
          },
          {
            "type": "S",
            "topRank": null,
            "text": "Diretoria só descobre os atrasos e desvios no fim do mês"
          }
        ]
      },
      {
        "id": "meio-ambiente",
        "name": "Meio ambiente (Contexto)",
        "position": "bottom-right",
        "items": [
          {
            "type": "C",
            "topRank": null,
            "text": "Distância e atrito de comunicação entre Comercial (SP) e Expedição (Joinville/SC)"
          },
          {
            "type": "S",
            "topRank": null,
            "text": "Cultura operacional reativa de 'apagar incêndios'"
          }
        ]
      }
    ],
    "top3CriticalCauses": [
      {
        "rank": "Top 1 (Prioridade Imediata — Piloto)",
        "title": "Aprovação centralizada, sem alçada nem regras",
        "origin": "Método e Mão de obra",
        "measuredEffect": "Espera de 24 a 48h úteis por pedido (contra meta interna de 4h).",
        "estimatedImpact": "Exposição de R$ 1,25 mi/ano em pedidos cancelados (atribuição estimada na aba 3).",
        "whyStartHere": "É a maior fração medida do ciclo (1 a 2 dias úteis), tem o melhor índice Esforço × Impacto (esforço 2, impacto 4) e risco controlado por teto de R$ 15 mil e decisão humana nas exceções."
      },
      {
        "rank": "Top 2 (Segunda Onda — Projeto Estratégico)",
        "title": "Entrada manual sem validação (proposta despadronizada redigitada à mão)",
        "origin": "Material, Máquina e Método",
        "measuredEffect": "Erros de código de produto, Inscrição Estadual e CIF/FOB; 6,8% de divergência em boletos.",
        "estimatedImpact": "Exposição combinada de R$ 1,35 mi/ano (R$ 960 mil em fretes/reentregas + R$ 390 mil em boletos).",
        "whyStartHere": "Apresenta o maior impacto potencial (nota 5), mas exige esforço técnico superior (nota 4) para ler layouts variados de PDF e integrar ao ERP sem API."
      },
      {
        "rank": "Top 3 (Habilitador Tecnológico)",
        "title": "Sistemas desconectados (ERP sem API e 3 planilhas não sincronizadas)",
        "origin": "Máquina (Tecnologia)",
        "measuredEffect": "40 minutos de triagem manual por pedido (consumindo 120 a 147 horas/mês da equipe).",
        "estimatedImpact": "Habilita diretamente a resolução das causas 1 e 2 e da conciliação contábil.",
        "whyStartHere": "A integração mínima (API no Serasa e camada intermediária por arquivo no ERP) destrava tanto a aprovação de crédito quanto a leitura de propostas."
      },
      {
        "rank": "Causa de Sustentação (Governança Operacional)",
        "title": "Ausência de medição de SLA por etapa e de visibilidade da fila",
        "origin": "Medição (Controle)",
        "measuredEffect": "Os pedidos represados ficam invisíveis no dia a dia e só aparecem como perda no fechamento do mês.",
        "estimatedImpact": "Sustenta a persistência das Top 3 causas críticas ao longo dos trimestres.",
        "whyStartHere": "O piloto de crédito já nasce medindo o tempo por etapa e o SLA de 4h nas exceções, atacando a falta de visibilidade desde o primeiro dia."
      }
    ],
    "fiveWhys": [
      {
        "problem": "1. Por que o pedido espera de 24 a 48 horas úteis pela decisão de crédito?",
        "chain": "Porque todo pedido depende de resposta por e-mail do Gerente Financeiro → Porque não existe política de alçada nem motor de regras automáticas → Porque o processo cresceu 35% ao ano sem formalização e sem ferramenta para aprovar casos limpos."
      },
      {
        "problem": "2. Por que 6,8% dos boletos saem com divergência e ocorrem fretes de emergência?",
        "chain": "Porque o espelho da NF e a modalidade CIF/FOB são digitados à mão no ERP → Porque os dados vêm de um PDF fechado enviado por e-mail → Porque a proposta comercial não tem validação na origem nem conferência automática antes do faturamento."
      },
      {
        "problem": "3. Por que a triagem inicial consome 40 minutos de trabalho manual por pedido?",
        "chain": "Porque o assistente precisa consultar e copiar dados alternando entre três telas (Serasa, ERP e planilha Excel) → Porque o ERP legado não possui API e as três planilhas de controle são locais e não sincronizadas."
      },
      {
        "problem": "4. Por que a diretoria só descobre os atrasos e estouros de custo no fim do mês?",
        "chain": "Porque nenhuma etapa do fluxo possui medição de tempo (SLA) em tempo real → Porque o controle é feito por e-mails soltos e planilhas manuais que levam 7 dias úteis para serem conciliadas no fechamento."
      }
    ]
  },
  "aiUseCases": [
    {
      "id": "uc-credito",
      "order": 1,
      "wave": "Piloto (Prioridade 1 — 60 dias)",
      "badgeClass": "exec-badge-ok",
      "title": "1. Análise e Aprovação de Crédito Assistida",
      "owner": "Financeiro",
      "effort": 2,
      "impact": 4,
      "quadrant": "Ganho Rápido (Quick Win)",
      "currentPain": "Cada pedido consome 40 min de triagem manual (Serasa, ERP e planilha) e aguarda de 24 a 48h úteis pelo Gerente Financeiro, mesmo para pedidos de R$ 8 mil (meta: 4h; R$ 1,25 mi estimados em pedidos cancelados).",
      "howItWorks": "Consulta automatizada ao Serasa (via API, premissa), cruzando histórico de compras no ERP e limite de crédito. Pedidos sem divergência, de clientes com histórico e sem restrição, até R$ 15 mil (premissa) são aprovados automaticamente por regra. Qualquer exceção gera alerta com resumo do caso ao Coordenador Financeiro.",
      "aiType": "IA Tradicional (motor de regras determinísticas) + IA Generativa restrita ao resumo textual da exceção.",
      "aiTypeJustification": "A decisão de crédito precisa ser 100% explicável e auditável. Um modelo preditivo próprio só faz sentido em fase posterior, após acumular histórico estruturado de inadimplência.",
      "humanWhen": "Divergência cadastral/comercial, restrição no Serasa, cliente novo (sem histórico) ou pedido acima do teto de R$ 15 mil.",
      "slaRule": "Resposta humana em até 4 horas úteis nas exceções (Coordenador Financeiro), com escalonamento automático ao Gerente Financeiro.",
      "lgpdRisk": "Baixo (consulta sobre CNPJ; atenção restrita a dados de sócios, representantes e empresários individuais).",
      "mainRisk": "Viés contra clientes novos ou de menor porte (mitigado enviando todo cliente sem histórico para análise humana).",
      "estimatedBenefit": "≈ R$ 119 mil/ano de margem retida + 90 a 110 horas/mês de triagem economizadas (hipóteses a validar no piloto).",
      "adoptionTarget": "100% dos pedidos do piloto na triagem automática em 60 dias; ≥ 90% das exceções respondidas em até 4h úteis."
    },
    {
      "id": "uc-propostas",
      "order": 2,
      "wave": "Onda 2 (Projeto Estratégico — 90 dias)",
      "badgeClass": "exec-badge-warn",
      "title": "2. Leitura Inteligente de Propostas em PDF",
      "owner": "Comercial e Financeiro",
      "effort": 4,
      "impact": 5,
      "quadrant": "Projeto Estratégico",
      "currentPain": "Propostas chegam em PDF por e-mail sem validação prévia e são redigitadas manualmente no ERP, gerando 6,8% de divergência em boletos (R$ 390 mil/ano) e erros de código, IE e frete CIF/FOB (R$ 960 mil/ano em reentregas e fretes expressos).",
      "howItWorks": "A IA lê o PDF e confere, em ordem: CNPJ, data, código e descrição da mercadoria, quantidade, preço unitário e total, prazo de pagamento e modalidade CIF/FOB contra a tabela oficial de produtos. Se tudo confere, encaminha ao Financeiro o PDF validado e resumo estruturado.",
      "aiType": "IA Generativa (extração documental de PDFs variados) validada por Regras Tradicionais (conferência de tabela e cálculos).",
      "aiTypeJustification": "O layout das propostas em PDF varia entre vendedores; a IA generativa extrai os campos e a camada de regras garante consistência exata contra o catálogo e preços.",
      "humanWhen": "Dado faltante ou divergência cadastral/comercial vai ao vendedor (que atua com o vendedor interno); divergência de crédito vai ao Financeiro.",
      "slaRule": "Bloqueio preventivo na Etapa 1 antes do faturamento; alternativa estrutural considerada: formulário/CRM padronizado na origem (a leitura de PDF é a solução de transição).",
      "lgpdRisk": "Médio (contatos comerciais, e-mails, nomes de representantes e endereços de entrega constantes nas propostas).",
      "mainRisk": "Extração incorreta de campo do PDF (mitigada por validação cruzada por regras, nível mínimo de confiança e revisão humana nas exceções).",
      "estimatedBenefit": "≈ R$ 753 mil/ano em redução de fretes de emergência, reentregas e divergências de boletos (hipótese a validar; horas de redigitação a medir).",
      "adoptionTarget": "100% das propostas do piloto lidas pela IA em 90 dias; ≥ 90% processadas sem retrabalho de digitação."
    },
    {
      "id": "uc-conciliacao",
      "order": 3,
      "wave": "Onda 2 (Eficiência de Fechamento)",
      "badgeClass": "exec-badge-info",
      "title": "3. Conciliação Financeira Assistida",
      "owner": "Controladoria",
      "effort": 3,
      "impact": 2,
      "quadrant": "Segunda Onda (Impacto Direto Menor)",
      "currentPain": "O fechamento contábil mensal leva 7 dias úteis (meta: 2 dias — atraso de 5 dias), exigindo conciliação manual entre 3 planilhas Excel e o ERP legado (custo estimado de R$ 180 mil/ano em horas extras e auditorias, além de sobrecarga da equipe).",
      "howItWorks": "A IA cruza automaticamente os dados das três planilhas e das exportações do ERP, concilia os lançamentos que batem exatamente e marca cada divergência diretamente na linha para análise humana.",
      "aiType": "IA Tradicional (cruzamento determinístico de chaves e valores) + IA Preditiva (detecção de anomalias e padrões atípicos).",
      "aiTypeJustification": "Conciliar lançamentos iguais é determinístico; identificar desvios recorrentes ou lançamentos fora do padrão histórico se beneficia de aprendizado de máquina.",
      "humanWhen": "Qualquer divergência de valor, data, imposto ou lançamento sem correspondência entre as 3 planilhas e o ERP.",
      "slaRule": "Marcação automática na linha com motivo da divergência para decisão do analista da Controladoria antes do fechamento.",
      "lgpdRisk": "Baixo (dados predominantemente contábeis e agregados de pessoas jurídicas).",
      "mainRisk": "Divergência contábil não detectada por falha de regra (mitigada por reconciliação de saldos totais e auditoria por amostragem).",
      "estimatedBenefit": "≈ R$ 129 mil/ano pela redução proporcional do ciclo de fechamento de 7 para 2 dias úteis (hipótese a validar; horas extras a medir).",
      "adoptionTarget": "Fontes de dados conectadas e ≥ 90% das linhas conciliadas automaticamente no fechamento mensal."
    }
  ],
  "hitlDecisionScenarios": [
    {
      "id": "scen-limpo",
      "label": "Cenário 1: Pedido Limpo (Até R$ 15 mil)",
      "inputSummary": "Cliente B2B recorrente (com histórico no ERP), pedido de R$ 12.400, Serasa sem restrição, dentro do limite de crédito e PDF validado sem divergência.",
      "ruleEvaluation": "Cumpre 100% dos critérios de Caso Limpo (Histórico OK + Serasa OK + Limite OK + Valor ≤ R$ 15.000 + Dados do PDF conferem).",
      "systemAction": "Aprovação Automática por Regra (Tempo de triagem reduzido de 40 min para segundos).",
      "whoDecides": "Motor de Regras (sem fila de espera humana; decisão e dados utilizados ficam gravados na trilha de auditoria para amostragem mensal de 5%).",
      "officialChannel": "Autorização de faturamento enviada automaticamente por e-mail corporativo com os dados completos do pedido.",
      "outcomeBadge": "Aprovado por Regra (Meta: Imediato)",
      "outcomeClass": "exec-badge-ok"
    },
    {
      "id": "scen-teto",
      "label": "Cenário 2: Pedido Acima do Teto (> R$ 15 mil)",
      "inputSummary": "Cliente corporativo sem restrição no Serasa, porém solicitando pedido de R$ 22.000 (acima do teto de alçada automática de R$ 15 mil).",
      "ruleEvaluation": "Excede o limite de alçada automática da Fase 1 (Valor > R$ 15.000 — premissa conservadora próxima ao ticket médio de R$ 14 mil).",
      "systemAction": "A IA NÃO aprova nem reprova: consolida os dados do Serasa e do histórico em um resumo executivo e dispara alerta de exceção.",
      "whoDecides": "Coordenador Financeiro (prazo de resposta de até 4 horas úteis; caso ultrapasse 4h, escalona automaticamente ao Gerente Financeiro).",
      "officialChannel": "Dossiê e decisão formal trafegam exclusivamente por e-mail corporativo; WhatsApp Business envia apenas aviso curto da pendência na fila.",
      "outcomeBadge": "Decisão Humana em até 4h úteis",
      "outcomeClass": "exec-badge-warn"
    },
    {
      "id": "scen-restricao",
      "label": "Cenário 3: Cliente Novo ou Restrição no Serasa",
      "inputSummary": "Pedido de R$ 9.500 (abaixo do teto), mas de cliente em primeira compra (sem histórico no ERP) ou com apontamento ativo no Serasa.",
      "ruleEvaluation": "Regra de proteção contra inadimplência e contra viés automatizado: cliente sem histórico ou com restrição nunca é decidido por máquina.",
      "systemAction": "Bloqueio de aprovação automática e encaminhamento imediato da análise completa ao Financeiro.",
      "whoDecides": "Coordenador Financeiro / Analista Financeiro (avalia garantias, solicita ajuste de condição comercial ou contata o cliente). A IA é proibida de negar crédito sozinha.",
      "officialChannel": "Comunicação formal por e-mail; se houver pendência para o comercial, aviso curto via WhatsApp Business sem expor score ou dados de crédito.",
      "outcomeBadge": "Revisão Humana Obrigatória (Proteção PDD)",
      "outcomeClass": "exec-badge-alert"
    },
    {
      "id": "scen-pdf",
      "label": "Cenário 4: Proposta em PDF com Divergência (Preço / CIF-FOB)",
      "inputSummary": "Proposta enviada pelo vendedor apresenta código de produto divergente da tabela vigente, IE incompleta ou conflito na modalidade de frete CIF/FOB.",
      "ruleEvaluation": "Falha na validação de entrada (Etapa 1): risco direto de erro de boleto (6,8% atuais) ou de caminhão travado no CD de Joinville.",
      "systemAction": "Interrompe o envio ao faturamento e roteia o alerta conforme a natureza: dado faltante ou divergência cadastral/preço volta ao vendedor.",
      "whoDecides": "Vendedor responsável (atua em conjunto com o vendedor interno para corrigir a proposta junto ao cliente e reenviar o PDF na Etapa 1).",
      "officialChannel": "Detalhes dos campos divergentes enviados por e-mail ao vendedor; alerta rápido de pendência via WhatsApp Business corporativo.",
      "outcomeBadge": "Retorno ao Comercial Antes da NF-e",
      "outcomeClass": "exec-badge-info"
    }
  ],
  "scenarioComparisons": [
    {
      "id": "comp-fechamento",
      "metricTitle": "Fechamento financeiro (Conciliação mensal)",
      "currentValue": "7 dias úteis (5 dias de atraso)",
      "currentBadge": "Atraso identificado",
      "currentDesc": "Conciliação manual entre três planilhas Excel e ERP legado desconectado (custo estimado: R$ 180 mil/ano em horas extras e auditorias).",
      "futureValue": "Meta: 2 dias úteis (Horas: A medir)",
      "futureBadge": "Meta a validar",
      "futureDesc": "Cenário projetado após Conciliação Assistida (Caso 3 — Onda 2). Benefício estimado: ≈ R$ 129 mil/ano (hipótese de redução proporcional de 71% no ciclo)."
    },
    {
      "id": "comp-credito",
      "metricTitle": "Homologação de crédito de pedido B2B",
      "currentValue": "24 a 48h úteis (+44h retido)",
      "currentBadge": "Gargalo identificado",
      "currentDesc": "Sem motor de regras ou alçada; até pedidos de R$ 8 mil aguardam e-mail do Gerente Financeiro (exposição: R$ 1,25 mi/ano em pedidos cancelados).",
      "futureValue": "Até 4h úteis nas exceções",
      "futureBadge": "Meta a validar",
      "futureDesc": "Piloto de Crédito Assistido (Caso 1): pedidos limpos até R$ 15 mil aprovados por regra; exceções decididas pelo Coordenador em até 4h úteis (≈ R$ 119 mil/ano de margem, hipótese)."
    },
    {
      "id": "comp-triagem",
      "metricTitle": "Tempo de triagem manual por pedido",
      "currentValue": "40 minutos / pedido",
      "currentBadge": "Retrabalho manual",
      "currentDesc": "Assistente alterna manualmente entre três janelas (Serasa, ERP legado e planilha de limites) para 180 a 220 pedidos faturados/mês (120 a 147 h/mês).",
      "futureValue": "10 minutos nas exceções",
      "futureBadge": "Hipótese a validar",
      "futureDesc": "Redução estimada de 75% no tempo de triagem com consulta automatizada ao Serasa (API, premissa), liberando de 90 a 110 horas/mês da equipe financeira."
    },
    {
      "id": "comp-boletos",
      "metricTitle": "Divergência em boletos e fretes de emergência",
      "currentValue": "6,8% das NF-e (Fretes: 2,8%)",
      "currentBadge": "Desvio crítico",
      "currentDesc": "Redigitação manual do PDF no ERP gera erros de código, IE e CIF/FOB (exposição: R$ 390 mil/ano em boletos + R$ 960 mil/ano em fretes e reentregas).",
      "futureValue": "< 0,5% das NF-e (Fretes: 0,8%)",
      "futureBadge": "Meta a validar",
      "futureDesc": "Leitura Inteligente de Propostas (Caso 2 — Onda 2). Horas de redigitação: A medir · Benefício estimado: ≈ R$ 753 mil/ano (hipótese: 50% fretes + 70% boletos)."
    },
    {
      "id": "comp-ciclo",
      "metricTitle": "Ciclo total do pedido (Proposta → Expedição)",
      "currentValue": "> 5 dias úteis de duração",
      "currentBadge": "Acima da meta (24h)",
      "currentDesc": "Fluxo de 6 etapas sem medição de SLA intermediário nem visibilidade dos pedidos represados até a transmissão da ordem ao CD de Joinville.",
      "futureValue": "Meta: 24h úteis (Etapas: A medir)",
      "futureBadge": "A validar em campo",
      "futureDesc": "A espera de 24 a 48h no crédito explica 1 a 2 dias úteis; o piloto medirá o SLA de cada etapa em campo para decompor e atacar os dias restantes."
    },
    {
      "id": "comp-investimento",
      "metricTitle": "Investimento na solução e retorno (ROI)",
      "currentValue": "Não consta no levantamento",
      "currentBadge": "Dado ausente no kit",
      "currentDesc": "O levantamento disponibilizado não informa custos de licenciamento de IA, consumo de API do Serasa ou desenvolvimento de integração.",
      "futureValue": "A definir (Equilíbrio < R$ 1,0 mi/ano)",
      "futureBadge": "Ponto de equilíbrio",
      "futureDesc": "O piloto de crédito se paga se custar menos de ≈ R$ 119 mil/ano; o conjunto das 3 iniciativas se paga se o custo anual ficar abaixo de ≈ R$ 1,0 mi/ano."
    }
  ],
  "simulatorModel": {
    "defaults": {
      "cancelRecPct": 25,
      "triageRedPct": 75,
      "freightRedPct": 50,
      "boletoRedPct": 70,
      "closingTargetDays": 2
    },
    "bases": {
      "canceledOrdersExposure": 1250000,
      "dreGrossMargin": 0.38,
      "emergencyFreightExposure": 960000,
      "boletoErrorExposure": 390000,
      "closingDelayExposure": 180000,
      "currentClosingDays": 7,
      "annualEbitdaGap": 4078000,
      "t4QuarterlyGap": 1887000,
      "t5ProjectedRevenue": 14200000,
      "t5TrendBaseMarginPct": 3.9,
      "t5TrendBaseEbitda": 553800,
      "t5FlatBaseMarginPct": 7.5,
      "t5FlatBaseEbitda": 1065000
    }
  },
  "actionPlanAndGovernance": {
    "preImplementationDecisions": [
      {
        "step": "Decisão 1",
        "title": "Validar Custo e Ponto de Equilíbrio do Piloto",
        "detail": "Confirmar junto a TI e fornecedores que o investimento anual do Piloto de Crédito Assistido fica abaixo do ponto de equilíbrio estimado (≈ R$ 119 mil/ano de margem retida, além de 90 a 110 h/mês liberadas)."
      },
      {
        "step": "Decisão 2",
        "title": "Nomear Responsáveis e Instalar o Comitê de IA",
        "detail": "Formalizar o Coordenador Financeiro como responsável pelas exceções do piloto (com escalonamento ao Gerente Financeiro) e instituir o Comitê de IA sob coordenação da Controladoria."
      },
      {
        "step": "Decisão 3",
        "title": "Aprovar os Critérios Operacionais de Alçada (60 dias)",
        "detail": "Homologar as premissas do piloto: teto automático de R$ 15 mil, prazo máximo de 4h úteis para resposta humana nas exceções e definição estrita de caso limpo (sem divergência, cliente com histórico e Serasa sem restrição)."
      }
    ],
    "policyCanAndCannot": {
      "canDo": [
        "Aprovar por regra pedidos sem divergência, de clientes com histórico e sem restrição no Serasa, dentro do limite e até o teto de R$ 15 mil.",
        "Extrair dados das propostas em PDF e sugerir o pedido validado contra a tabela oficial de produtos.",
        "Sinalizar divergências linha a linha na conciliação entre as 3 planilhas e o ERP para análise humana.",
        "Resumir o dossiê de uma exceção de crédito para acelerar a análise do Coordenador ou Gerente Financeiro.",
        "Utilizar exclusivamente ferramentas homologadas pela empresa, registrando a regra e os dados usados em cada decisão.",
        "Utilizar canais corporativos aprovados (e-mail e WhatsApp Business da empresa), mantendo avisos de WhatsApp curtos e objetivos."
      ],
      "cannotDo": [
        "Decidir sozinha em qualquer caso de divergência, inconsistência ou dado faltante.",
        "Negar crédito de forma automática, sem revisão e decisão de um responsável humano.",
        "Aprovar pedidos acima do teto de R$ 15 mil, fora da alçada ou de clientes novos (sem histórico no ERP).",
        "Inserir dados de clientes, propostas ou crédito em ferramentas públicas de IA não homologadas pela Taranis Black.",
        "Enviar dados de crédito, score ou valores sigilosos por WhatsApp (a mensagem apenas avisa da pendência; detalhes ficam no e-mail).",
        "Utilizar a IA para avaliar ou monitorar o desempenho individual de colaboradores."
      ]
    },
    "risksAndLgpd": [
      {
        "risk": "Viés no crédito (penalizar clientes novos, pequenos ou de certas regiões)",
        "mitigation": "Regras transparentes e documentadas; cliente sem histórico nunca é negado pela máquina (vai sempre ao humano); revisão trimestral da taxa de aprovação por porte e região."
      },
      {
        "risk": "Viés de automação (humano aprovar o alerta sem analisar o caso)",
        "mitigation": "O alerta apresenta resumo estruturado destacando o motivo exato da exceção, acompanhado de auditoria mensal por amostragem."
      },
      {
        "risk": "Extração incorreta de campos em propostas PDF",
        "mitigation": "Validação cruzada por regras tradicionais (preço unitário × quantidade, CNPJ e CIF/FOB), limite mínimo de confiança e envio de qualquer divergência ao humano."
      },
      {
        "risk": "Dados pessoais (LGPD) de sócios, representantes e contatos nas propostas",
        "mitigation": "Embora a consulta ao Serasa seja por CNPJ, dados de pessoas naturais (sócios, empresários individuais e contatos) seguem mapeamento de finalidade, minimização e controle de acesso."
      },
      {
        "risk": "Decisão automatizada sem possibilidade de revisão ou envio a terceiros",
        "mitigation": "Canal formal de revisão humana a pedido do cliente titular e contrato com cláusulas de proteção de dados e prazo de retenção junto a fornecedores."
      }
    ],
    "auditCadence": [
      {
        "frequency": "Semanal",
        "scope": "Operação do Piloto",
        "detail": "Acompanhamento da fila de exceções, tempo médio de resposta humana (meta ≤ 4h úteis) e estabilidade das regras."
      },
      {
        "frequency": "Mensal",
        "scope": "Amostragem de Decisões Automáticas",
        "detail": "Revisão humana de 5% dos pedidos aprovados por regra (com mínimo de 30 pedidos/mês). Alternativa descartada: auditar 100%, o que anularia o ganho de tempo."
      },
      {
        "frequency": "Trimestral",
        "scope": "Auditoria de Viés e Alçada",
        "detail": "Análise das taxas de aprovação e inadimplência por porte e região, revisão do teto de R$ 15 mil e atualização das regras pelo Comitê de IA."
      },
      {
        "frequency": "Anual",
        "scope": "Revisão da Política e Proteção de Dados",
        "detail": "Revisão completa da Política Corporativa de IA Responsável e do relatório de impacto à proteção de dados (LGPD)."
      },
      {
        "frequency": "Extraordinária (Até 48h)",
        "scope": "Resposta a Incidentes",
        "detail": "Convocação imediata do Comitê de IA em até 48 horas após qualquer incidente técnico, vazamento ou desvio crítico de regra."
      }
    ],
    "changeManagementPillars": [
      {
        "pillar": "1. IA como alívio, não ameaça",
        "detail": "A equipe financeira sofre com sobrecarga de digitação e burnout nos fechamentos; a automação retira o trabalho mecânico repetitivo e mantém a análise das exceções com as pessoas."
      },
      {
        "pillar": "2. Liderança financeira no comando",
        "detail": "Para evitar percepção de perda de controle, o Gerente e o Coordenador Financeiro definem as regras de alçada e acompanham o painel, mantendo o escalonamento sob sua gestão."
      },
      {
        "pillar": "3. Alinhamento com o Comercial",
        "detail": "Vendedores e vendedores internos recebem treinamento curto e objetivo sobre os novos alertas de dados faltantes no PDF, com visibilidade clara dos prazos de liberação."
      },
      {
        "pillar": "4. Piloto com campeões por área",
        "detail": "Início controlado com grupo pequeno e um representante-chave (campeão) no Financeiro e no Comercial, expandindo somente após medir os resultados de 60 dias."
      },
      {
        "pillar": "5. Comunicação e feedback contínuo",
        "detail": "Canal permanente para relato de falsos alertas ou dúvidas operacionais, com revisão periódica dos indicadores de adoção."
      }
    ],
    "declaredLimits": [
      "Os dados financeiros e operacionais pertencem a um cenário empresarial simulado; todas as estimativas de ganho financeiro e de tempo são hipóteses a validar durante o piloto.",
      "Os cenários do 5º trimestre (T5) têm caráter estritamente ilustrativo, pois quatro trimestres de dados não sustentam previsão estatística.",
      "A espera de 24 a 48h no crédito explica de 1 a 2 dos mais de 5 dias úteis do ciclo do pedido; os dias restantes dependem de medição em campo por etapa.",
      "O risco de crédito (inadimplência / PDD de R$ 1,11 mi) não foi analisado em profundidade nesta Fase 1 por falta de histórico aberto por faixa de score, porte e região."
    ],
    "phase2Steps": [
      {
        "order": "Passo 1",
        "title": "Análise aprofundada do risco de crédito (PDD vs. Aprovações)",
        "detail": "Cruzar aprovações com a inadimplência efetiva por porte, região, score e faixa de valor para calibrar o teto de R$ 15 mil e medir o impacto da velocidade sobre o risco."
      },
      {
        "order": "Passo 2",
        "title": "Medição do tempo de ciclo por etapa (SLA ponta a ponta)",
        "detail": "Mapear em campo onde estão concentrados os demais dias úteis do ciclo proposta → despacho além da janela do crédito."
      },
      {
        "order": "Passo 3",
        "title": "Validação empírica dos benefícios com dados do piloto",
        "detail": "Substituir os percentuais hipotéticos (25% de cancelamentos e 75% de triagem) pelos indicadores reais medidos nos primeiros 60 dias."
      },
      {
        "order": "Passo 4",
        "title": "Abertura das frentes de Fretes e Cobrança",
        "detail": "Estruturar ações específicas para a maior linha do gap anual (fretes e logística: R$ 1,36 mi de estouro) e para a régua de cobrança preventiva (PDD: R$ 0,67 mi de estouro)."
      },
      {
        "order": "Passo 5",
        "title": "Implantação da Onda 2 (Leitura de Propostas e Conciliação)",
        "detail": "Implementar a validação automática de PDFs na entrada comercial e a conciliação assistida das 3 planilhas com o ERP legado."
      }
    ],
    "referenceDeliverables": [
      {
        "title": "Relatório Executivo Completo (Google Docs)",
        "desc": "Diagnóstico integral, AI Canvas, SIPOC, Ishikawa e análise do DRE.",
        "url": "#"
      },
      {
        "title": "Política Corporativa de IA Responsável (v1.0)",
        "desc": "Documento normativo de 11 seções com regras, níveis de autonomia, LGPD e auditoria.",
        "url": "#"
      },
      {
        "title": "Apresentação Executiva para a CEO",
        "desc": "Apresentação executiva de apoio à decisão sobre o piloto de crédito assistido.",
        "url": "#"
      },
      {
        "title": "Registro de Evidências e Decisões",
        "desc": "Memória completa de premissas rotuladas, alternativas consideradas e decisões tomadas.",
        "url": "#"
      },
      {
        "title": "Planilha de Premissas e Memória de Cálculo",
        "desc": "Modelo quantitativo editável de horas economizadas, benefícios e ponto de equilíbrio.",
        "url": "#"
      }
    ]
  }
};

const DBHelpers = {
  parseBRL: function (val) {
    if (typeof val === 'number') return val;
    if (!val || typeof val !== 'string') return 0;
    const cleaned = val
      .replace(/R\$\s?/gi, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/\s+/g, '')
      .trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  },

  parsePct: function (val) {
    if (typeof val === 'number') return val;
    if (!val || typeof val !== 'string') return 0;
    const cleaned = val.replace('%', '').replace(',', '.').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
};

window.TARANIS_DB = TARANIS_DB;
window.DBHelpers = DBHelpers;
