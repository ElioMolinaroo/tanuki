// =============================================================================
// Navigation - Tanuki Theme (タヌキ)
// Sidebar, keyboard navigation, ToC overlay, and mobile menu
// =============================================================================

(function() {
  'use strict';

  const STORAGE_KEY_SIDEBAR = 'tanuki-sidebar-collapsed';

  // =============================================================================
  // Sidebar (Docs Mode - Collapsible)
  // =============================================================================

  function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const headerToggleBtn = document.querySelector('.header .sidebar-toggle');
    const closeBtn = document.querySelector('.sidebar__close');

    if (!sidebar) return;

    // Check if we're on desktop
    const isDesktop = () => window.innerWidth >= 1024;

    // Restore collapsed state from localStorage (desktop only)
    function restoreCollapsedState() {
      if (isDesktop()) {
        const isCollapsed = localStorage.getItem(STORAGE_KEY_SIDEBAR) === 'true';
        if (isCollapsed) {
          sidebar.classList.add('collapsed');
          headerToggleBtn?.setAttribute('aria-expanded', 'false');
        }
      }
    }

    // Toggle collapsed state (desktop)
    function toggleCollapsed() {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      headerToggleBtn?.setAttribute('aria-expanded', !isCollapsed);
      try {
        localStorage.setItem(STORAGE_KEY_SIDEBAR, isCollapsed);
      } catch (e) {}
    }

    // Open mobile sidebar
    function openSidebar() {
      sidebar.classList.add('open');
      sidebar.classList.remove('collapsed');
      overlay?.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    // Close mobile sidebar
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay?.classList.remove('visible');
      document.body.style.overflow = '';
    }

    // Header toggle button behavior
    headerToggleBtn?.addEventListener('click', () => {
      if (isDesktop()) {
        // Desktop: toggle collapsed state
        toggleCollapsed();
      } else {
        // Mobile: open/close sidebar
        if (sidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      }
    });

    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Restore state on load
    restoreCollapsedState();

    // Handle resize
    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        // On mobile, ensure sidebar is not collapsed
        sidebar.classList.remove('collapsed');
      } else {
        // On desktop, restore collapsed state
        restoreCollapsedState();
      }
    });
  }

  // =============================================================================
  // ToC Overlay (Book Mode)
  // =============================================================================

  function initTocOverlay() {
    const overlay = document.getElementById('toc-overlay');
    const openBtn = document.querySelector('.toc-toggle');
    const closeBtn = document.querySelector('.toc-overlay__close');
    const backdrop = document.querySelector('.toc-overlay__backdrop');

    if (!overlay) return;

    function openOverlay() {
      overlay.setAttribute('aria-hidden', 'false');
      openBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus first link
      setTimeout(() => {
        overlay.querySelector('.toc-overlay__link')?.focus();
      }, 100);
    }

    function closeOverlay() {
      overlay.setAttribute('aria-hidden', 'true');
      openBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      openBtn?.focus();
    }

    openBtn?.addEventListener('click', openOverlay);
    closeBtn?.addEventListener('click', closeOverlay);
    backdrop?.addEventListener('click', closeOverlay);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') {
        closeOverlay();
      }
    });

    // Close when clicking a link
    overlay.querySelectorAll('.toc-overlay__link').forEach(link => {
      link.addEventListener('click', () => {
        closeOverlay();
      });
    });
  }

  // =============================================================================
  // TOC Collapsible Sections
  // =============================================================================

  function initTocCollapse() {
    document.querySelectorAll('.toc__toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);

        const content = toggle.closest('.toc__item').querySelector('.toc__collapsible');
        if (content) {
          content.classList.toggle('open', !expanded);
        }
      });
    });
  }

  // =============================================================================
  // Keyboard Navigation (Arrow keys for prev/next)
  // =============================================================================

  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing
      if (e.target.matches('input, textarea, select, [contenteditable]')) {
        return;
      }

      // Left arrow = previous
      if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const prevLink = document.querySelector('.nav-button--prev:not(.disabled)');
        if (prevLink) {
          prevLink.click();
        }
      }

      // Right arrow = next
      if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const nextLink = document.querySelector('.nav-button--next:not(.disabled)');
        if (nextLink) {
          nextLink.click();
        }
      }
    });
  }

  // =============================================================================
  // Version Picker
  // =============================================================================

  function initVersionPicker() {
    const picker = document.querySelector('.version-picker');
    if (!picker) return;

    const button = picker.querySelector('.version-picker__button');
    const dropdown = picker.querySelector('.version-picker__dropdown');

    function toggleDropdown(open) {
      const isOpen = open ?? !dropdown.classList.contains('open');
      dropdown.classList.toggle('open', isOpen);
      button.setAttribute('aria-expanded', isOpen);
    }

    button?.addEventListener('click', () => toggleDropdown());

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!picker.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleDropdown(false);
      }
    });
  }

  // =============================================================================
  // Mobile Menu
  // =============================================================================

  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // =============================================================================
  // Scroll to Top
  // =============================================================================

  function initScrollToTop() {
    const btn = document.querySelector('.scroll-to-top');
    if (!btn) return;

    function updateVisibility() {
      btn.classList.toggle('visible', window.scrollY > 300);
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =============================================================================
  // Active TOC Highlight
  // =============================================================================

  function initActiveTocHighlight() {
    const tocLinks = document.querySelectorAll('.toc__link');
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]');

    if (!tocLinks.length || !headings.length) return;

    function updateActiveLink() {
      const scrollTop = window.scrollY + 100;
      let activeId = '';

      headings.forEach(heading => {
        if (heading.offsetTop <= scrollTop) {
          activeId = heading.id;
        }
      });

      tocLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === `#${activeId}`;
        link.classList.toggle('active', isActive);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  // =============================================================================
  // Initialize
  // =============================================================================

  function init() {
    initSidebar();
    initTocOverlay();
    initTocCollapse();
    initKeyboardNav();
    initVersionPicker();
    initMobileMenu();
    initScrollToTop();
    initActiveTocHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
