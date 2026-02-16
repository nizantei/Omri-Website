/* ============================================
   ACCESSIBILITY WIDGET
   Handles all a11y features: font size,
   contrast, grayscale, reading mask, etc.
   ============================================ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────
  const state = {
    fontSize: 0,           // Steps: -2 to +5
    lineHeight: false,
    readableFont: false,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    readingMask: false,
    hideImages: false,
    pauseAnimations: false,
    focusOutline: false,
  };

  const STORAGE_KEY = 'a11y-settings';

  // ── Initialize ─────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyAll();
    setupToggle();
    setupOptions();
    setupReadingMask();
  });

  // ── Panel Toggle ───────────────────────────
  function setupToggle() {
    const toggle = document.getElementById('a11yToggle');
    const panel = document.getElementById('a11yPanel');
    const close = document.getElementById('a11yClose');

    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('active');
      panel.setAttribute('aria-hidden', !isOpen);
      if (isOpen) {
        panel.querySelector('.a11y-option')?.focus();
      }
    });

    if (close) {
      close.addEventListener('click', () => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        toggle.focus();
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.a11y-widget')) {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });
  }

  // ── Option Buttons ─────────────────────────
  function setupOptions() {
    document.querySelectorAll('.a11y-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        handleAction(action, btn);
      });
    });
  }

  function handleAction(action, btn) {
    switch (action) {
      case 'increaseFontSize':
        if (state.fontSize < 5) {
          state.fontSize++;
          applyFontSize();
        }
        break;

      case 'decreaseFontSize':
        if (state.fontSize > -2) {
          state.fontSize--;
          applyFontSize();
        }
        break;

      case 'increaseLineHeight':
        state.lineHeight = !state.lineHeight;
        toggleActive(btn, state.lineHeight);
        applyLineHeight();
        break;

      case 'readableFont':
        state.readableFont = !state.readableFont;
        toggleActive(btn, state.readableFont);
        document.body.classList.toggle('a11y-readable-font', state.readableFont);
        break;

      case 'highContrast':
        state.highContrast = !state.highContrast;
        toggleActive(btn, state.highContrast);
        document.body.classList.toggle('a11y-high-contrast', state.highContrast);
        break;

      case 'grayscale':
        state.grayscale = !state.grayscale;
        toggleActive(btn, state.grayscale);
        document.body.classList.toggle('a11y-grayscale', state.grayscale);
        break;

      case 'highlightLinks':
        state.highlightLinks = !state.highlightLinks;
        toggleActive(btn, state.highlightLinks);
        document.body.classList.toggle('a11y-highlight-links', state.highlightLinks);
        break;

      case 'readingMask':
        state.readingMask = !state.readingMask;
        toggleActive(btn, state.readingMask);
        applyReadingMask();
        break;

      case 'hideImages':
        state.hideImages = !state.hideImages;
        toggleActive(btn, state.hideImages);
        document.body.classList.toggle('a11y-hide-images', state.hideImages);
        break;

      case 'pauseAnimations':
        state.pauseAnimations = !state.pauseAnimations;
        toggleActive(btn, state.pauseAnimations);
        document.body.classList.toggle('a11y-pause-animations', state.pauseAnimations);
        break;

      case 'focusOutline':
        state.focusOutline = !state.focusOutline;
        toggleActive(btn, state.focusOutline);
        document.body.classList.toggle('a11y-focus-outline', state.focusOutline);
        break;

      case 'resetAll':
        resetAll();
        break;
    }

    saveState();
  }

  function toggleActive(btn, isActive) {
    btn.classList.toggle('active', isActive);
  }

  // ── Font Size ──────────────────────────────
  function applyFontSize() {
    const base = 16 + (state.fontSize * 2); // 2px per step
    document.documentElement.style.fontSize = base + 'px';

    // Update button states
    updateFontSizeButtons();
  }

  function updateFontSizeButtons() {
    const increaseBtn = document.querySelector('[data-action="increaseFontSize"]');
    const decreaseBtn = document.querySelector('[data-action="decreaseFontSize"]');
    if (increaseBtn) toggleActive(increaseBtn, state.fontSize > 0);
    if (decreaseBtn) toggleActive(decreaseBtn, state.fontSize < 0);
  }

  // ── Line Height ────────────────────────────
  function applyLineHeight() {
    if (state.lineHeight) {
      document.body.style.lineHeight = '2.2';
    } else {
      document.body.style.lineHeight = '';
    }
  }

  // ── Reading Mask ───────────────────────────
  function setupReadingMask() {
    document.addEventListener('mousemove', updateMaskPosition);
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      updateMaskPosition({ clientY: touch.clientY });
    }, { passive: true });
  }

  function updateMaskPosition(e) {
    if (!state.readingMask) return;

    const mask = document.getElementById('readingMask');
    if (!mask) return;

    const maskTop = mask.querySelector('.reading-mask-top');
    const maskBottom = mask.querySelector('.reading-mask-bottom');
    const windowHeight = window.innerHeight;
    const stripHeight = 120; // visible reading strip height

    const y = e.clientY;
    const topHeight = Math.max(0, y - stripHeight / 2);
    const bottomTop = Math.min(windowHeight, y + stripHeight / 2);

    maskTop.style.height = topHeight + 'px';
    maskBottom.style.top = bottomTop + 'px';
    maskBottom.style.height = (windowHeight - bottomTop) + 'px';
  }

  function applyReadingMask() {
    const mask = document.getElementById('readingMask');
    if (mask) {
      mask.classList.toggle('active', state.readingMask);
    }
  }

  // ── Reset All ──────────────────────────────
  function resetAll() {
    state.fontSize = 0;
    state.lineHeight = false;
    state.readableFont = false;
    state.highContrast = false;
    state.grayscale = false;
    state.highlightLinks = false;
    state.readingMask = false;
    state.hideImages = false;
    state.pauseAnimations = false;
    state.focusOutline = false;

    applyAll();

    // Remove all active states from buttons
    document.querySelectorAll('.a11y-option').forEach(btn => {
      btn.classList.remove('active');
    });

    saveState();
  }

  function applyAll() {
    applyFontSize();
    applyLineHeight();
    applyReadingMask();

    document.body.classList.toggle('a11y-readable-font', state.readableFont);
    document.body.classList.toggle('a11y-high-contrast', state.highContrast);
    document.body.classList.toggle('a11y-grayscale', state.grayscale);
    document.body.classList.toggle('a11y-highlight-links', state.highlightLinks);
    document.body.classList.toggle('a11y-hide-images', state.hideImages);
    document.body.classList.toggle('a11y-pause-animations', state.pauseAnimations);
    document.body.classList.toggle('a11y-focus-outline', state.focusOutline);

    // Sync button active states
    syncButtonStates();
  }

  function syncButtonStates() {
    const mapping = {
      increaseLineHeight: state.lineHeight,
      readableFont: state.readableFont,
      highContrast: state.highContrast,
      grayscale: state.grayscale,
      highlightLinks: state.highlightLinks,
      readingMask: state.readingMask,
      hideImages: state.hideImages,
      pauseAnimations: state.pauseAnimations,
      focusOutline: state.focusOutline,
    };

    Object.entries(mapping).forEach(([action, isActive]) => {
      const btn = document.querySelector(`[data-action="${action}"]`);
      if (btn) toggleActive(btn, isActive);
    });

    updateFontSizeButtons();
  }

  // ── Persist State ──────────────────────────
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage not available
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
      }
    } catch (e) {
      // localStorage not available
    }
  }

})();
