(function () {
  "use strict";
  var c = window.MENIREA_CONFIG || {};
  var year = new Date().getFullYear();
  document.querySelectorAll("#an, #an2, #an3").forEach(function (e) { e.textContent = year; });

  document.querySelectorAll("#mailto, .js-mailto").forEach(function (a) {
    if (!c.CONTACT_EMAIL) return;
    a.href = "mailto:" + c.CONTACT_EMAIL;
    if (a.dataset.showEmail === "1") a.textContent = c.CONTACT_EMAIL;
  });

  document.querySelectorAll("[data-op-nume]").forEach(function (e) { e.textContent = c.OPERATOR_NUME || ""; });
  document.querySelectorAll("[data-op-cui]").forEach(function (e) { e.textContent = c.OPERATOR_CUI || ""; });
  document.querySelectorAll("[data-op-adresa]").forEach(function (e) { e.textContent = c.OPERATOR_ADRESA || ""; });

  document.querySelectorAll("[data-app-cta]").forEach(function (root) {
    if (c.APP_LIVE && (c.APP_STORE_URL || c.PLAY_STORE_URL)) {
      var html = '<div class="app-cta">';
      if (c.APP_STORE_URL) html += '<a class="app-store-btn" href="' + c.APP_STORE_URL + '" target="_blank" rel="noopener" aria-label="Descarcă din App Store"><span><small>Descarcă din</small><strong>App Store</strong></span></a>';
      if (c.PLAY_STORE_URL) html += '<a class="app-store-btn" href="' + c.PLAY_STORE_URL + '" target="_blank" rel="noopener" aria-label="Descarcă din Google Play"><span><small>Disponibil pe</small><strong>Google Play</strong></span></a>';
      html += '</div><p class="app-cta-note">Rezultatul tău poate rămâne pe site și fără aplicație.</p>';
      root.innerHTML = html;
    } else {
      root.innerHTML = '<div class="app-cta"><span class="btn btn-ghost btn-sm" aria-label="Aplicația este în pregătire">Aplicația este în pregătire</span></div><p class="app-cta-note">Când versiunile pentru iPhone și Android sunt live, aici apar direct butoanele de descărcare.</p>';
    }
  });
})();
