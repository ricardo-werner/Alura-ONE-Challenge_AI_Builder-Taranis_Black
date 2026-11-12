/* ==========================================================================
  MÓDULO DE NAVEGAÇÃO E LAYOUT (/js/modules/menu.js)
  Responsável pelo menu lateral <aside>, teclado, tema e tela cheia
   ========================================================================== */

const MenuController = (function () {
  let currentOrder = 1;
  const totalPages = 7;

  function announce(msg) {
    const live = document.getElementById('sr-live-announcer');
    if (live) live.textContent = msg;
  }

  function updateHeaderOffset() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const h = header.offsetHeight + 12;
    document.documentElement.style.setProperty('--sticky-header-height', h + 'px');
  }

  function activatePage(pageId, moveFocusToTab = false) {
    const tabs = document.querySelectorAll('.aside-tab-btn');
    const panels = document.querySelectorAll('.page-panel');
    const btnHome = document.getElementById('btn-return-exec');

    let selectedMeta = null;
    if (window.TARANIS_DB && window.TARANIS_DB.navigationPages) {
      selectedMeta = window.TARANIS_DB.navigationPages.find((p) => p.id === pageId);
    }

    tabs.forEach((tab) => {
      const target = tab.getAttribute('data-target');
      const isSelected = target === pageId;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      if (isSelected && moveFocusToTab) {
        tab.focus();
      }
    });

    panels.forEach((panel) => {
      const isMatch = panel.id === 'panel-' + pageId;
      if (isMatch) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', 'hidden');
      }
    });

    if (selectedMeta) {
      currentOrder = selectedMeta.order;
      announce('Página selecionada: ' + selectedMeta.order + ' de 7 — ' + selectedMeta.label);
    }

    if (btnHome) {
      btnHome.disabled = pageId === 'visao-executiva';
    }

    updateSequentialControls();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateSequentialControls() {
    const label = document.getElementById('seq-status-label');
    const btnPrev = document.getElementById('btn-seq-prev');
    const btnNext = document.getElementById('btn-seq-next');
    const pages = (window.TARANIS_DB && window.TARANIS_DB.navigationPages) || [];
    const currentMeta = pages.find((p) => p.order === currentOrder);

    if (label && currentMeta) {
      label.textContent = 'Página ' + currentMeta.order + ' de ' + totalPages + ' — ' + currentMeta.label;
    }

    if (btnPrev) {
      btnPrev.disabled = currentOrder <= 1;
      btnPrev.onclick = function () {
        if (currentOrder > 1) {
          const prev = pages.find((p) => p.order === currentOrder - 1);
          if (prev) activatePage(prev.id, false);
        }
      };
    }

    if (btnNext) {
      btnNext.disabled = currentOrder >= totalPages;
      btnNext.onclick = function () {
        if (currentOrder < totalPages) {
          const next = pages.find((p) => p.order === currentOrder + 1);
          if (next) activatePage(next.id, false);
        }
      };
    }
  }

  function bindAsideKeyboard() {
    const tablist = document.querySelector('.aside-nav-list');
    if (!tablist) return;

    tablist.addEventListener('keydown', function (e) {
      const tabs = Array.from(tablist.querySelectorAll('.aside-tab-btn'));
      const idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;

      let nextIdx = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextIdx = (idx + 1) % tabs.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        nextIdx = (idx - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabs.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        const targetId = tabs[nextIdx].getAttribute('data-target');
        activatePage(targetId, true);
      }
    });
  }

  /**
   * Alterna dinamicamente o logotipo da Taranis Black entre os temas escuro e claro
   */
  function updateBrandLogo(theme) {
    const logoImg = document.getElementById('taranis-header-logo');
    if (!logoImg) return;
    const darkSrc = logoImg.getAttribute('data-logo-dark') || './assets/images/Logotipo TARANIS Black-dark.png';
    const lightSrc = logoImg.getAttribute('data-logo-light') || './assets/images/Logotipo TARANIS Black-light.png';
    logoImg.setAttribute('src', theme === 'light' ? lightSrc : darkSrc);
  }

  function applyTheme(theme, announceChange = false) {
    const targetTheme = theme === 'light' ? 'light' : 'dark';
    const isLight = targetTheme === 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);

    const btnTheme = document.getElementById('btn-theme-toggle');
    const txtTheme = document.getElementById('theme-btn-text');
    if (btnTheme) {
      btnTheme.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    }
    if (txtTheme) {
      txtTheme.textContent = isLight ? 'Modo Claro' : 'Modo Escuro';
    }

    updateBrandLogo(targetTheme);

    if (announceChange) {
      announce('Tema alterado para ' + (isLight ? 'Modo Claro' : 'Modo Escuro'));
    }
  }

  function bindThemeToggle() {
    const btnTheme = document.getElementById('btn-theme-toggle');
    if (!btnTheme) return;

    // Restaura tema salvo se existir e sincroniza o logo inicial
    let initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    try {
      const saved = localStorage.getItem('taranis_exec_theme');
      if (saved === 'light' || saved === 'dark') {
        initialTheme = saved;
      }
    } catch (err) {}
    applyTheme(initialTheme, false);

    btnTheme.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      try {
        localStorage.setItem('taranis_exec_theme', next);
      } catch (err) {}
    });
  }

  function bindFullscreen() {
    const btnFs = document.getElementById('btn-fullscreen-toggle');
    if (!btnFs) return;

    btnFs.addEventListener('click', function () {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(function () {});
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
  }

  function init() {
    updateHeaderOffset();
    window.addEventListener('resize', updateHeaderOffset);

    const tabs = document.querySelectorAll('.aside-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        activatePage(tab.getAttribute('data-target'), false);
      });
    });

    const btnHome = document.getElementById('btn-return-exec');
    if (btnHome) {
      btnHome.addEventListener('click', function () {
        activatePage('visao-executiva', true);
      });
    }

    const jumpButtons = document.querySelectorAll('[data-jump-page]');
    jumpButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-jump-page');
        if (target) activatePage(target, false);
      });
    });

    bindAsideKeyboard();
    bindThemeToggle();
    bindFullscreen();
    activatePage('visao-executiva', false);
  }

  return {
    init,
    activatePage
  };
})();

window.MenuController = MenuController;
