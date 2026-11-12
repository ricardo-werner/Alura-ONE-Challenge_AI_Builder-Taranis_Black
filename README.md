# Painel Executivo Interativo — Taranis Black (Finanças e Operações)

Aplicação web executiva desenvolvida em **HTML5 Semântico, CSS3 Modular e JavaScript Puro (Vanilla JS)** para apresentação do diagnóstico estratégico e das recomendações de Inteligência Artificial à CEO da **Taranis Black** (Challenge ONE G11 — AI for Business, Alura).

## 1. Estrutura de Diretórios do Projeto

```text
taranis-black-painel/
├── assets/
│   ├── icons/                   # Ícones SVG (LinkedIn, GitHub)
│   ├── images/                  # Logotipo_TARANIS-dark.png, Logotipo_TARANISlight.png e RicWerner-LogoNight.png
│   └── fonts/
├── css/
│   ├── base/
│   │   ├── reset.css            # Reset moderno, scroll-padding-top (WCAG 2.4.11) e prefers-reduced-motion
│   │   └── variables.css        # Tokens da paleta institucional (Modo Escuro e Modo Claro)
│   ├── components/
│   │   ├── layout.css           # Layout semântico Header + Aside + Main + Footer
│   │   ├── button.css           # Botões, Segmented Toggle e alvos mínimos de 44x44px (WCAG 2.5.5 AAA)
│   │   ├── card.css             # Cards executivos, KPIs interativos e memorando à CEO
│   │   └── charts.css           # Gráficos SVG, SIPOC, Ishikawa, Matriz, Simulador e Governança
│   └── style.css                # Folha de estilo principal (@import dos módulos)
├── js/
│   ├── modules/
│   │   ├── db.js                # Banco de dados central (3 JSONs da planilha Excel + modelo analítico)
│   │   ├── menu.js              # Controle de navegação das 7 páginas, teclado, tema e tela cheia
│   │   ├── charts.js            # Renderização de gráficos SVG, tabelas, SIPOC, Ishikawa, Matriz e Plano
│   │   └── simulator.js         # Comparador (Atual vs. Futuro previsto), Simulador e Cenários T5
│   └── main.js                  # Inicialização geral da aplicação
├── .gitignore
├── index.html                   # Arquivo principal da aplicação
└── README.md                    # Documentação técnica
```

## 2. Como Executar Localmente

Como os dados das três abas da planilha e do relatório estão estruturados no módulo `js/modules/db.js`, a aplicação funciona tanto abrindo o arquivo `index.html` diretamente no navegador quanto utilizando uma extensão como o **Live Server** no VS Code.

## 3. Destaques de Acessibilidade Digital (WCAG 2.2)

- **Garantia de Foco Visível e Não Oculto (WCAG 2.2 — 2.4.11 / 2.4.13):** indicador de foco de `3px` em dourado (`#D4A72E`) e aplicação de `scroll-padding-top` no elemento `<html>` para impedir que elementos focados via teclado fiquem encobertos pelo cabeçalho fixo.
- **Dimensionamento de Alvos Acima da Média (WCAG 2.2 — 2.5.8 AA / 2.5.5 AAA):** adoção de área mínima de `44×44 px` para botões, abas e controles interativos, superando o piso de `24×24 px` do nível AA.
- **Independência de Cor com Codificação Múltipla (WCAG 1.4.1):** gráficos complexos (DRE, Ishikawa, Matriz e Cenários T5) utilizam contraste seguro para Tritanopia, Protanopia e Deuteranopia, combinando estilos de traço (contínuo/tracejado), marcadores geométricos e rótulos diretos.
- **Semântica Nativa e Conforto Cognitivo:** estrutura HTML5 pura (`<header>`, `<aside>`, `<main>`, `<footer aria-label="Rodapé">`), gerenciamento de `aria-expanded="true/false"` nos blocos expansíveis, alinhamento numérico `tabular-nums` e suporte a `prefers-reduced-motion`.

## 4. Alternância Automática de Logotipo (Modo Escuro / Modo Claro)

O elemento `<img id="taranis-header-logo">` no cabeçalho possui os atributos `data-logo-dark="./assets/images/Logotipo TARANIS Black-dark.png"` e `data-logo-light="./assets/images/Logotipo TARANIS Black-light.png"`. Ao acionar o botão **Modo Escuro / Modo Claro**, a função `updateBrandLogo(theme)` em `js/modules/menu.js` alterna automaticamente a imagem exibida de acordo com o tema ativo.
