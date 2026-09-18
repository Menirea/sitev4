/* ==========================================================================
   TEST — logica chestionarului.
   Tot ce se întâmplă aici se întâmplă în browserul utilizatorului.
   Nu există niciun apel de rețea. Nu modifica asta fără să schimbi și
   textele despre confidențialitate din index.html și confidentialitate.html.
   ========================================================================== */

(function () {
  "use strict";

  var CHEIE = "menirea:raspunsuri:v1";
  var TOTAL = window.INTREBARI.length;
  var MILESTONES = { 15: "Primul sfert e gata.", 30: "Ești exact la jumătate.", 45: "Au mai rămas 15." };

  var stage = document.getElementById("stage");
  var bar = document.getElementById("bar");
  var barFill = document.getElementById("bar-fill");
  var counter = document.getElementById("counter");
  var foot = document.getElementById("foot");
  var backBtn = document.getElementById("back");

  var raspunsuri = incarca();
  var i = 0;
  var ecran = "intro";

  function incarca() {
    try {
      var raw = localStorage.getItem(CHEIE);
      if (!raw) return new Array(TOTAL).fill(null);
      var a = JSON.parse(raw);
      if (Array.isArray(a) && a.length === TOTAL) return a;
    } catch (e) {}
    return new Array(TOTAL).fill(null);
  }

  function salveaza() {
    try { localStorage.setItem(CHEIE, JSON.stringify(raspunsuri)); } catch (e) {}
  }

  function primaFaraRaspuns() {
    for (var k = 0; k < TOTAL; k++) if (raspunsuri[k] === null) return k;
    return TOTAL;
  }

  function numarRaspunse() {
    return raspunsuri.filter(function (v) { return v !== null; }).length;
  }

  function numeDim(id) {
    var d = window.DIMENSIUNI.find(function (x) { return x.id === id; });
    return d ? d.nume : "";
  }

  /* ---------- ecrane ---------- */

  function intro() {
    ecran = "intro";
    bar.hidden = true; foot.hidden = true;
    var reluare = numarRaspunse() > 0 && numarRaspunse() < TOTAL;

    stage.innerHTML =
      '<div class="quiz-card fade" style="text-align:center">' +
        '<p class="eyebrow" style="justify-content:center">' + TOTAL + ' întrebări · ~10 minute</p>' +
        '<h1 style="margin-bottom:1rem">Hai să vedem cum lucrezi.</h1>' +
        '<p class="lead" style="margin:0 auto 2rem">Nu te întrebăm ce vrei să devii. Te întrebăm cum preferi să lucrezi. Răspunde intuitiv, fără să cauți răspunsul perfect.</p>' +
        '<button class="btn btn-primary" id="go">' + (reluare ? "Continuă de unde ai rămas →" : "Începe →") + '</button>' +
        (reluare ? '<p style="margin-top:1rem"><button class="btn btn-ghost btn-sm" id="reset">Ia-o de la capăt</button></p>' : '') +
        '<p class="hero-note" style="margin-top:1.8rem">Răspunsurile rămân în browserul acestui dispozitiv.<br>Nu îți cerem cont și nu îți cerem emailul.</p>' +
      '</div>';

    document.getElementById("go").onclick = function () {
      i = reluare ? primaFaraRaspuns() : 0;
      intrebare();
    };
    var r = document.getElementById("reset");
    if (r) r.onclick = function () {
      raspunsuri = new Array(TOTAL).fill(null); salveaza(); i = 0; intro();
    };
  }

  function intrebare() {
    ecran = "intrebare";
    bar.hidden = false; foot.hidden = false;
    backBtn.disabled = i === 0;

    var q = window.INTREBARI[i];
    barFill.style.width = (i / TOTAL * 100) + "%";
    counter.textContent = (i + 1) + " / " + TOTAL;

    var html =
      '<div class="quiz-card fade">' +
        '<p class="q-dim">' + numeDim(q.d) + '</p>' +
        '<h1 class="q-text">' + q.t + '</h1>' +
        '<div class="scale" role="group" aria-label="Cât de mult te descrie">';

    window.SCALA.forEach(function (s) {
      var ales = raspunsuri[i] === s.v;
      html +=
        '<button class="opt" type="button" data-v="' + s.v + '" aria-pressed="' + ales + '">' +
          '<span class="opt-emo" aria-hidden="true">' + s.e + '</span>' +
          '<span class="opt-txt">' + s.t + '</span>' +
          '<span class="opt-key" aria-hidden="true">' + s.v + '</span>' +
        '</button>';
    });

    html += '</div></div>';
    stage.innerHTML = html;

    stage.querySelectorAll(".opt").forEach(function (b) {
      b.onclick = function () { raspunde(parseInt(b.dataset.v, 10), b); };
    });
  }

  function raspunde(v, btn) {
    raspunsuri[i] = v;
    salveaza();
    if (btn) {
      stage.querySelectorAll(".opt").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
    }
    var pauza = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 190;
    setTimeout(inainte, pauza);
  }

  function inainte() {
    var urm = i + 1;
    if (MILESTONES[urm] && urm < TOTAL) { i = urm; return milestone(urm); }
    if (urm >= TOTAL) return final();
    i = urm; intrebare();
  }

  function milestone(n) {
    ecran = "milestone";
    foot.hidden = true;
    barFill.style.width = (n / TOTAL * 100) + "%";
    counter.textContent = n + " / " + TOTAL;

    stage.innerHTML =
      '<div class="milestone fade">' +
        '<p class="eyebrow" style="justify-content:center">' + n + " din " + TOTAL + '</p>' +
        '<h2>' + MILESTONES[n] + '</h2>' +
        '<p>Nu trebuie să găsești răspunsul perfect. Alege varianta care te descrie cel mai mult.</p>' +
        '<button class="btn btn-primary" id="cont">Continuă →</button>' +
      '</div>';
    document.getElementById("cont").onclick = intrebare;
  }

  function final() {
    ecran = "final";
    foot.hidden = true;
    barFill.style.width = "100%";
    counter.textContent = TOTAL + " / " + TOTAL;

    stage.innerHTML =
      '<div class="milestone fade">' +
        '<p class="eyebrow" style="justify-content:center">Gata</p>' +
        '<h2>Ai răspuns la toate cele ' + TOTAL + '.</h2>' +
        '<p>Profilul se calculează aici, pe dispozitivul tău. Durează o clipă.</p>' +
        '<button class="btn btn-primary" id="vezi">Vezi rezultatul →</button>' +
      '</div>';
    document.getElementById("vezi").onclick = function () { location.href = "rezultat.html"; };
  }

  /* ---------- navigare ---------- */

  backBtn.onclick = function () {
    if (ecran !== "intrebare") { return intrebare(); }
    if (i > 0) { i--; intrebare(); }
  };

  document.addEventListener("keydown", function (e) {
    if (ecran !== "intrebare") {
      if (e.key === "Enter") {
        var b = document.getElementById("go") || document.getElementById("cont") || document.getElementById("vezi");
        if (b) { e.preventDefault(); b.click(); }
      }
      return;
    }
    if (e.key >= "1" && e.key <= "5") {
      e.preventDefault();
      var t = stage.querySelector('.opt[data-v="' + e.key + '"]');
      raspunde(parseInt(e.key, 10), t);
    } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
      e.preventDefault(); backBtn.click();
    }
  });

  /* pornire */
  if (numarRaspunse() === TOTAL) { location.href = "rezultat.html"; } else { intro(); }
})();
