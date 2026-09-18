/* ==========================================================================
   REZULTAT — scoruri, hartă, potriviri.
   Calculul se face integral în browser. Niciun apel de rețea.
   ========================================================================== */

(function () {
  "use strict";

  var CHEIE = "menirea:raspunsuri:v1";
  var app = document.getElementById("app");
  var cfg = window.MENIREA_CONFIG || {};
  var ORDINE = ["P", "A", "C", "S", "E", "O", "I", "T"];
  var VOC = ["P", "A", "C", "S", "E", "O"];   // dimensiunile folosite la potrivire

  /* ---------- 1. citire ---------- */
  var raspunsuri = null;
  try { raspunsuri = JSON.parse(localStorage.getItem(CHEIE) || "null"); } catch (e) {}

  if (!Array.isArray(raspunsuri) || raspunsuri.filter(function (v) { return v !== null; }).length < window.INTREBARI.length) {
    app.innerHTML =
      '<div class="empty-state">' +
        '<h2 style="margin-bottom:.8rem">Încă nu ai un rezultat</h2>' +
        '<p class="lead" style="margin:0 auto 1.6rem">Testul nu e terminat pe acest dispozitiv. Durează în jur de 10 minute.</p>' +
        '<a class="btn btn-primary" href="test.html">Începe testul →</a>' +
      '</div>';
    return;
  }

  /* ---------- 2. scoruri pe dimensiuni (0–100) ---------- */
  var sume = {}, nr = {};
  ORDINE.forEach(function (d) { sume[d] = 0; nr[d] = 0; });
  window.INTREBARI.forEach(function (q, k) { sume[q.d] += raspunsuri[k]; nr[q.d]++; });

  var scor = {};
  ORDINE.forEach(function (d) { scor[d] = Math.round((sume[d] / nr[d] - 1) / 4 * 100); });

  /* ---------- 3. numele profilului ---------- */
  var top = VOC.slice().sort(function (a, b) { return scor[b] - scor[a]; });
  var p1 = top[0], p2 = top[1];
  var profil = window.PROFILURI[p1 + p2] || window.PROFILURI[p2 + p1] ||
               { nume: "Profil mixt", text: "Preferințele tale sunt distribuite destul de egal — merită să explorezi mai multe direcții înainte să alegi." };

  /* ---------- 4. potriviri (corelație Pearson pe cele 6 dimensiuni) ---------- */
  var u = VOC.map(function (d) { return scor[d]; });

  function corelatie(a, b) {
    var n = a.length;
    var ma = a.reduce(function (s, v) { return s + v; }, 0) / n;
    var mb = b.reduce(function (s, v) { return s + v; }, 0) / n;
    var num = 0, da = 0, db = 0;
    for (var k = 0; k < n; k++) {
      var x = a[k] - ma, y = b[k] - mb;
      num += x * y; da += x * x; db += y * y;
    }
    if (da === 0 || db === 0) return 0;
    return num / Math.sqrt(da * db);
  }

  var potriviri = window.OCUPATII.map(function (o) {
    // forma profilului (corelație) 80% + nivelul intensității (distanță) 20%
    var forma = (corelatie(u, o.v) + 1) / 2;
    var dif = 0;
    for (var k = 0; k < u.length; k++) dif += Math.abs(u[k] - o.v[k]);
    var nivel = 1 - (dif / u.length) / 100;
    var sim = 0.8 * forma + 0.2 * nivel;
    // întindem intervalul util (0,50 – 1,00) peste 25–97, ca scorurile să spună ceva
    var s = Math.round(25 + (sim - 0.5) / 0.5 * 72);
    return { o: o, scor: Math.max(15, Math.min(97, s)) };
  }).sort(function (a, b) { return b.scor - a.scor; });

  /* ---------- 5. hartă SVG ---------- */
  var CX = 180, CY = 180, R = 128;

  function punct(k, val) {
    var ang = (-90 + k * 45) * Math.PI / 180;
    var r = R * (val / 100);
    return [CX + Math.cos(ang) * r, CY + Math.sin(ang) * r];
  }

  function poligon(f) {
    return ORDINE.map(function (d, k) {
      var p = punct(k, f(scor[d]));
      return p[0].toFixed(1) + "," + p[1].toFixed(1);
    }).join(" ");
  }

  function harta() {
    var s = '<svg viewBox="0 0 360 400" role="img" aria-label="Harta profilului tău pe opt dimensiuni">';
    [1, .75, .5, .25].forEach(function (f) {
      s += '<circle cx="180" cy="180" r="' + (R * f) + '" fill="none" stroke="#DDE4D7" stroke-width="1"/>';
    });
    ORDINE.forEach(function (d, k) {
      var p = punct(k, 100);
      s += '<line x1="180" y1="180" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" stroke="#CBD6C4" stroke-width="1"/>';
    });
    s += '<polygon id="forma" points="' + poligon(function () { return 0; }) + '" fill="#14584A" fill-opacity=".16" stroke="#14584A" stroke-width="2" stroke-linejoin="round"/>';
    ORDINE.forEach(function (d, k) {
      var p = punct(k, 100 * 1.19);
      var ang = -90 + k * 45;
      var anchor = (ang === -90 || ang === 90) ? "middle" : (Math.cos(ang * Math.PI / 180) > 0 ? "start" : "end");
      var dim = window.DIMENSIUNI.find(function (x) { return x.id === d; });
      s += '<text x="' + p[0].toFixed(0) + '" y="' + (p[1] + 4).toFixed(0) + '" text-anchor="' + anchor + '" ' +
           'font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1" fill="#58685F">' +
           dim.nume.toUpperCase() + '</text>';
    });
    s += '<circle cx="180" cy="180" r="3" fill="#B8860F"/></svg>';
    return s;
  }

  function animaHarta() {
    var el = document.getElementById("forma");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("points", poligon(function (v) { return v; })); return;
    }
    var t0 = null, D = 850;
    function pas(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / D);
      var e = 1 - Math.pow(1 - p, 3);
      el.setAttribute("points", poligon(function (v) { return v * e; }));
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }

  /* ---------- 6. randare ---------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  var axeHtml = ORDINE.map(function (d) {
    var dim = window.DIMENSIUNI.find(function (x) { return x.id === d; });
    return '<div class="axis">' +
      '<span class="axis-name">' + dim.nume + '</span>' +
      '<span class="axis-bar"><i style="width:' + scor[d] + '%"></i></span>' +
      '<span class="axis-val">' + scor[d] + '</span>' +
    '</div>';
  }).join("");

  function cardOcupatie(x) {
    return '<article class="job">' +
      '<div class="job-top"><h3>' + esc(x.o.n) + '</h3><span class="match">potrivire ' + x.scor + '%</span></div>' +
      '<dl>' +
        '<div><dt>Ce faci efectiv</dt><dd>' + esc(x.o.f) + '</dd></div>' +
        '<div><dt>Cum se intră în România</dt><dd>' + esc(x.o.i) + '</dd></div>' +
        '<div><dt>Ce nu se spune de obicei</dt><dd class="warn">' + esc(x.o.x) + '</dd></div>' +
      '</dl>' +
    '</article>';
  }

  var d1 = window.DIMENSIUNI.find(function (x) { return x.id === p1; });
  var d2 = window.DIMENSIUNI.find(function (x) { return x.id === p2; });
  var indep = scor.I, stab = scor.T;

  var textIndep = indep >= 60
    ? "Preferi să îți conduci singur munca. Rolurile cu supraveghere strânsă și proceduri fixe te vor obosi mai repede decât pe alții."
    : indep <= 40
      ? "Te simți bine într-o structură clară, cu reguli și cu cineva care coordonează. Nu e o slăbiciune — multe meserii esențiale cer exact asta."
      : "Ești undeva la mijloc: îți place autonomia, dar nu te deranjează un cadru clar.";

  var textStab = stab >= 60
    ? "Prețuiești predictibilitatea. Un venit sigur și un rol bine definit îți vor prinde mai bine decât un mediu care se schimbă des."
    : stab <= 40
      ? "Rutina te plictisește repede. Cauți varietate, chiar cu prețul unei anumite nesiguranțe."
      : "Suporți bine și schimbarea, și rutina, atâta timp cât nu sunt extreme.";

  var appHtml = '<div class="locked app-result-card"><div><p class="eyebrow">Continuă în aplicație</p><h3 style="font-family:var(--display);font-size:2rem;margin:0 0 .55rem">Păstrează profilul și revino la el.</h3><p style="margin:0;color:var(--muted)">Când aplicația este live, aici apar direct butoanele pentru magazinul tău.</p></div><div data-app-cta></div></div>';

  app.innerHTML =
    '<section style="padding-bottom:34px">' +
      '<div class="wrap">' +
        '<div class="result-head">' +
          '<p class="eyebrow" style="justify-content:center">Profilul tău</p>' +
          '<h1 class="profile-name">' + esc(profil.nume) + '</h1>' +
          '<p class="lead" style="margin:0 auto">' + esc(profil.text) + '</p>' +
        '</div>' +
        '<div class="result-plot">' + harta() + '</div>' +
        '<p class="hero-note" style="text-align:center;max-width:52ch;margin:0 auto">Pe primele șase axe, un scor mai mare înseamnă o preferință mai puternică. Pe ultimele două — independență și stabilitate — mai mult nu înseamnă mai bine, ci doar altfel.</p>' +
        '<div class="axes">' + axeHtml + '</div>' +
        '<div class="share-row">' +
          '<button class="btn btn-ghost btn-sm" id="save-img">Salvează ca imagine</button>' +
          '<button class="btn btn-ghost btn-sm" id="wipe">Șterge răspunsurile</button>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="divider"></div>' +

    '<section>' +
      '<div class="wrap">' +
        '<p class="eyebrow">Ce înseamnă</p>' +
        '<h2 style="margin-bottom:1.2rem;max-width:22ch">Accentul tău cade pe ' + esc(d1.nume.toLowerCase()) + ' și ' + esc(d2.nume.toLowerCase()) + '.</h2>' +
        '<p class="lead"><strong>' + esc(d1.nume) + ':</strong> ' + esc(d1.desc) + '</p>' +
        '<p class="lead"><strong>' + esc(d2.nume) + ':</strong> ' + esc(d2.desc) + '</p>' +
        '<div class="axes" style="margin-top:26px">' +
          '<div class="source"><b>INDEPENDENȚĂ · ' + indep + '</b><span>' + textIndep + '</span></div>' +
          '<div class="source"><b>STABILITATE · ' + stab + '</b><span>' + textStab + '</span></div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="divider"></div>' +

    '<section>' +
      '<div class="wrap">' +
        '<p class="eyebrow">Ocupații potrivite</p>' +
        '<h2 style="margin-bottom:.9rem;max-width:24ch">Cele mai apropiate trei de profilul tău</h2>' +
        '<p class="lead" style="margin-bottom:2rem">Procentul arată cât de aproape e profilul tău de tiparul tipic al ocupației — ca formă și ca intensitate. Nu prezice dacă vei avea succes acolo, nu ține cont de piața locală de muncă și nu e o notă.</p>' +
        potriviri.slice(0, 3).map(cardOcupatie).join("") +
        '<h3 style="margin:34px 0 14px">Urmează, în ordinea potrivirii</h3>' +
        '<div class="axes">' +
          potriviri.slice(3, 8).map(function (x) {
            return '<div class="axis"><span class="axis-name">' + esc(x.o.n) + '</span>' +
                   '<span class="axis-val" style="width:auto">' + x.scor + '%</span></div>';
          }).join("") +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="divider"></div>' +

    '<section>' +
      '<div class="wrap">' +
        '<p class="eyebrow">Ce faci mai departe</p>' +
        '<h2 style="margin-bottom:1.4rem;max-width:20ch">Trei lucruri care chiar ajută</h2>' +
        '<div class="steps">' +
          '<div class="step"><h3>Vorbește cu cineva din meserie</h3><p>O oră cu un om care face zilnic munca aia îți spune mai mult decât orice test. Întreabă-l cum arată o zi proastă, nu una bună.</p></div>' +
          '<div class="step"><h3>Verifică banii la sursă</h3><p>Nu îți dăm cifre de salariu pentru că nu le putem garanta. Uită-te la datele Institutului Național de Statistică și la anunțurile actuale de angajare pentru orașul tău.</p></div>' +
          '<div class="step"><h3>Încearcă înainte să te înscrii</h3><p>Voluntariat, o zi de umbrire, un curs scurt. E mult mai ieftin să afli acum că nu ți se potrivește, decât după trei ani de școală.</p></div>' +
        '</div>' +
        '<div style="margin-top:26px">' + appHtml + '</div>' +
      '</div>' +
    '</section>';

  animaHarta();
  var resultAppCta = document.querySelector("[data-app-cta]");
  if (resultAppCta) {
    var htmlCta = "";
    if (cfg.APP_LIVE && (cfg.APP_STORE_URL || cfg.PLAY_STORE_URL)) {
      htmlCta += '<div class="app-cta">';
      if (cfg.APP_STORE_URL) htmlCta += '<a class="app-store-btn" href="' + cfg.APP_STORE_URL + '" target="_blank" rel="noopener">App Store</a>';
      if (cfg.PLAY_STORE_URL) htmlCta += '<a class="app-store-btn" href="' + cfg.PLAY_STORE_URL + '" target="_blank" rel="noopener">Google Play</a>';
      htmlCta += '</div>';
    } else {
      htmlCta = '<div class="app-cta"><span class="btn btn-ghost btn-sm">În curând</span></div>';
    }
    resultAppCta.innerHTML = htmlCta;
  }

  /* ---------- 7. acțiuni ---------- */
  document.getElementById("wipe").onclick = function () {
    if (!confirm("Ștergem răspunsurile de pe acest dispozitiv? Rezultatul nu mai poate fi recuperat.")) return;
    try { localStorage.removeItem(CHEIE); } catch (e) {}
    location.href = "index.html";
  };

  document.getElementById("save-img").onclick = function () {
    var c = document.getElementById("share-canvas"), g = c.getContext("2d");
    var W = c.width, H = c.height;

    g.fillStyle = "#EDF0E7"; g.fillRect(0, 0, W, H);

    var cx = W / 2, cy = 640, rad = 330;
    g.strokeStyle = "#D5DECD"; g.lineWidth = 2;
    [1, .75, .5, .25].forEach(function (f) {
      g.beginPath(); g.arc(cx, cy, rad * f, 0, Math.PI * 2); g.stroke();
    });
    ORDINE.forEach(function (d, k) {
      var a = (-90 + k * 45) * Math.PI / 180;
      g.beginPath(); g.moveTo(cx, cy);
      g.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad); g.stroke();
    });

    g.beginPath();
    ORDINE.forEach(function (d, k) {
      var a = (-90 + k * 45) * Math.PI / 180, r = rad * scor[d] / 100;
      var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      k ? g.lineTo(x, y) : g.moveTo(x, y);
    });
    g.closePath();
    g.fillStyle = "rgba(20,88,74,.18)"; g.fill();
    g.strokeStyle = "#14584A"; g.lineWidth = 5; g.stroke();

    g.fillStyle = "#58685F"; g.font = "500 26px 'IBM Plex Mono', monospace"; g.textAlign = "center";
    ORDINE.forEach(function (d, k) {
      var a = (-90 + k * 45) * Math.PI / 180, r = rad * 1.17;
      var dim = window.DIMENSIUNI.find(function (x) { return x.id === d; });
      g.fillText(dim.nume.toUpperCase(), cx + Math.cos(a) * r, cy + Math.sin(a) * r + 9);
    });

    g.fillStyle = "#B8860F"; g.font = "500 30px 'IBM Plex Mono', monospace";
    g.fillText("PROFILUL MEU", cx, 160);
    g.fillStyle = "#14231D"; g.font = "700 76px Literata, Georgia, serif";
    g.fillText(profil.nume, cx, 250);
    g.fillStyle = "#58685F"; g.font = "400 34px 'IBM Plex Sans', sans-serif";
    g.fillText("Accent pe " + d1.nume.toLowerCase() + " și " + d2.nume.toLowerCase(), cx, 310);

    g.fillStyle = "#14584A"; g.font = "600 40px Literata, Georgia, serif";
    g.fillText("menirea.ro", cx, 1160);
    g.fillStyle = "#58685F"; g.font = "400 27px 'IBM Plex Sans', sans-serif";
    g.fillText("Test gratuit de orientare în carieră · 10 minute", cx, 1215);

    var a = document.createElement("a");
    a.download = "menirea-profil.png";
    a.href = c.toDataURL("image/png");
    a.click();
  };
})();
