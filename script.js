// ============================================================
// TextbookAI — Frontend interactions only (no backend / no AI)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Navigation (sidebar + bottom nav sync) ---------------- */
  const sidebarItems = document.querySelectorAll('.nav__item[data-page]');
  const bottomItems = document.querySelectorAll('.bottom-nav__item[data-page]');

  function setActivePage(page) {
    sidebarItems.forEach(item => {
      item.classList.toggle('is-active', item.dataset.page === page);
    });
    bottomItems.forEach(item => {
      item.classList.toggle('is-active', item.dataset.page === page);
    });
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      setActivePage(item.dataset.page);
    });
  });

  bottomItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      setActivePage(item.dataset.page);
    });
  });

  /* ---------------- Modal (Add Material) ---------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const openTriggers = [
    document.getElementById('addMaterialSidebarBtn'),
    document.getElementById('addMaterialFab')
  ].filter(Boolean);

  function openModal() {
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ---------------- Dropzone drag states (UI only) ---------------- */
  const dropzone = document.getElementById('dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove('is-dragover');
      });
    });
  }

  /* ---------------- Mastery Map node selection ---------------- */
  const mapNodes = document.querySelectorAll('.map-node');
  const mapHint = document.getElementById('mapHint');

  const stateLabel = {
    mastered: 'Mastered',
    weak: 'Weak — needs repair',
    neutral: 'In progress'
  };

  mapNodes.forEach(node => {
    const activate = () => {
      mapNodes.forEach(n => n.classList.remove('is-selected'));
      node.classList.add('is-selected');

      const name = node.dataset.name || 'Concept';
      const pct = node.dataset.pct ? `${node.dataset.pct}% mastery` : '';
      const state = stateLabel[node.dataset.state] || '';

      mapHint.textContent = pct
        ? `${name} — ${pct} · ${state}`
        : `${name} — ${state}`;
    };

    node.addEventListener('click', activate);
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  /* ---------------- Hero "Start Session" micro-interaction ---------------- */
  const startBtn = document.querySelector('.btn--hero');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.style.transform = 'scale(0.97)';
      setTimeout(() => { startBtn.style.transform = ''; }, 140);
    });
  }

});