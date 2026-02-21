/* ============================================
   CITY AUTOCOMPLETE
   Fetches Israeli cities from data.gov.il
   and provides search-as-you-type dropdown.
   ============================================ */

(function () {
  'use strict';

  var cities = [];
  var loaded = false;

  // Fetch cities from Israel government open data API
  function fetchCities() {
    var url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37&limit=1500';

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success && data.result && data.result.records) {
          cities = data.result.records
            .map(function (r) {
              return {
                he: (r['\u05E9\u05DD_\u05D9\u05E9\u05D5\u05D1'] || '').trim(),
                en: (r['\u05E9\u05DD_\u05D9\u05E9\u05D5\u05D1_\u05DC\u05D5\u05E2\u05D6\u05D9'] || '').trim()
              };
            })
            .filter(function (c) { return c.he.length > 0; })
            .sort(function (a, b) { return a.he.localeCompare(b.he, 'he'); });
          loaded = true;
        }
      })
      .catch(function () {
        // API unavailable — autocomplete will just not show suggestions
      });
  }

  // Initialize all city inputs on page
  function initCityAutocomplete() {
    document.querySelectorAll('.city-autocomplete-input').forEach(setupInput);
  }

  function setupInput(input) {
    var wrapper = input.closest('.city-autocomplete-wrapper');
    if (!wrapper) return;

    var dropdown = wrapper.querySelector('.city-dropdown');
    if (!dropdown) return;

    var activeIndex = -1;

    input.addEventListener('input', function () {
      var query = input.value.trim();
      if (!query || !loaded) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        return;
      }

      var lang = document.documentElement.getAttribute('lang') || 'he';
      var matches = cities.filter(function (c) {
        var name = lang === 'he' ? c.he : (c.en || c.he);
        return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }).slice(0, 8);

      if (matches.length === 0) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        return;
      }

      activeIndex = -1;
      dropdown.innerHTML = matches.map(function (c, i) {
        var name = lang === 'he' ? c.he : (c.en || c.he);
        return '<div class="city-option" data-index="' + i + '" data-value="' + name + '">' + name + '</div>';
      }).join('');
      dropdown.classList.add('open');
    });

    // Click on option
    dropdown.addEventListener('mousedown', function (e) {
      var option = e.target.closest('.city-option');
      if (option) {
        input.value = option.getAttribute('data-value');
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      var options = dropdown.querySelectorAll('.city-option');
      if (!options.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, options.length - 1);
        updateActive(options, activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActive(options, activeIndex);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        input.value = options[activeIndex].getAttribute('data-value');
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        activeIndex = -1;
      } else if (e.key === 'Escape') {
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        activeIndex = -1;
      }
    });

    // Close on blur
    input.addEventListener('blur', function () {
      setTimeout(function () {
        dropdown.classList.remove('open');
      }, 150);
    });

    // Reopen on focus if has value
    input.addEventListener('focus', function () {
      if (input.value.trim() && loaded) {
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  function updateActive(options, index) {
    options.forEach(function (opt, i) {
      opt.classList.toggle('active', i === index);
    });
    if (options[index]) {
      options[index].scrollIntoView({ block: 'nearest' });
    }
  }

  // Start
  document.addEventListener('DOMContentLoaded', function () {
    fetchCities();
    initCityAutocomplete();
  });

  // Re-init after language switch (in case forms are rebuilt)
  window.initCityAutocomplete = initCityAutocomplete;

})();
