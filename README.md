# Menirea — site + test

Site static, fără backend, fără build. Îl deschizi, îl editezi, îl urci. Atât.

---

## 1. Ce conține

```
index.html                 pagina principală
test.html                  chestionarul (60 de întrebări)
rezultat.html              profilul + ocupațiile potrivite
confidentialitate.html     politica de confidențialitate
termeni.html               termenii de utilizare
assets/
  config.js                ← SINGURUL fișier obligatoriu de editat
  data.js                  întrebări, dimensiuni, ocupații, nume de profil
  style.css                tot designul
  site.js                  aplică valorile din config în pagini
  test.js                  logica testului
  rezultat.js              scoruri, hartă, potriviri, imagine de partajat
```

## 2. Ce trebuie să faci înainte de lansare

Deschide `assets/config.js` și completează:

- `OPERATOR_NUME`, `OPERATOR_CUI`, `OPERATOR_ADRESA` — obligatoriu prin Legea 365/2002
- `CONTACT_EMAIL`
- `APP_LIVE` — lasă `false` până când aplicația chiar există în magazine
- `APP_STORE_URL` / `PLAY_STORE_URL` — completează-le abia când sunt reale

Apoi dă `confidentialitate.html` și `termeni.html` unui avocat. Sunt scrise ca să descrie exact ce face site-ul, dar validarea juridică nu e opțională.

## 3. Cum îl vezi local

```bash
cd menirea
python3 -m http.server 8000
```

Deschide `http://localhost:8000`.

(Nu îl deschide direct cu dublu-click pe fișier — unele browsere blochează `localStorage` pe `file://`.)

## 4. Cum îl publici

**Cel mai simplu — Netlify:** intri pe netlify.com, tragi folderul `menirea` în zona „Deploy”. Site-ul e live în ~20 de secunde. Apoi Domain settings → Add custom domain → `menirea.ro`, și pui la registrar nameserverele pe care ți le dă Netlify.

**Alternativ — Cloudflare Pages sau Vercel:** același principiu, cu folderul ca root, fără build command.

**Alternativ — găzduire clasică:** urci conținutul folderului prin FTP în `public_html`. Merge oriunde, nu are nevoie de PHP, bază de date sau Node.

## 5. Cum îl modifici

**Alt text?** Direct în fișierele `.html`.

**Alte întrebări?** În `assets/data.js`, lista `INTREBARI`. Fiecare are `t` (textul) și `d` (dimensiunea: P, A, C, S, E, O, I, T). Poți adăuga sau scoate — codul se adaptează automat la numărul de întrebări. Dacă schimbi numărul, actualizează textele care spun „60” în `index.html`.

**Alte ocupații?** În `assets/data.js`, lista `OCUPATII`:
- `n` numele
- `v` profilul pe 6 dimensiuni `[Practic, Analitic, Creativ, Social, Antreprenorial, Organizator]`, valori 0–100
- `f` ce faci efectiv într-o zi
- `i` cum se intră în profesie în România
- `x` ce nu se spune de obicei

**Alte culori?** Toate sunt în `:root`, la începutul lui `assets/style.css`.

## 6. Fonturile

Se încarcă de la Google Fonts (Literata, IBM Plex Sans, IBM Plex Mono). Asta înseamnă o cerere către serverele Google, menționată în politica de confidențialitate.

Dacă vrei zero dependențe externe: descarcă fonturile de pe fonts.google.com, pune fișierele `.woff2` în `assets/fonts/`, înlocuiește linia `@import` din `style.css` cu reguli `@font-face` locale și șterge paragraful despre Google Fonts din `confidentialitate.html`.

## 7. Dacă adaugi analytics

Momentan site-ul nu face niciun apel de rețea în afară de fonturi, iar textele spun exact asta. Dacă adaugi Google Analytics, Meta Pixel, Hotjar sau orice altceva:

1. `confidentialitate.html` devine fals și trebuie rescris
2. îți trebuie o casetă de consimțământ pentru cookie-uri, cu opțiune reală de refuz
3. trebuie să scoți din `index.html` afirmațiile „fără cookie-uri de urmărire” și „nu ajung pe niciun server”

Microsoft Clarity și Plausible sunt alternative mai puțin intruzive, dar regula rămâne: dacă schimbi comportamentul, schimbi și textul.

## 8. Ce nu are site-ul, intenționat

- **Testimoniale.** Nu poți publica recenzii inventate — e practică comercială înșelătoare (Legea 363/2007) și, dacă apar poze de oameni, e și problemă de imagine și de date personale. Adaugă o secțiune de testimoniale abia când ai oameni reali care își dau acordul scris.
- **Contor de utilizatori.** „Peste 10.000 de oameni” la lansare e o minciună verificabilă. Câmpul `NUMAR_UTILIZATORI` există în config, dar site-ul nu afișează nimic până nu pui o cifră reală.
- **Ecran de încărcare artificial.** Calculul chiar durează câteva milisecunde. Animația hărții care se desenează, pe pagina de rezultat, e un efect vizual asumat, nu o simulare de „analiză complexă”.
- **Salarii.** Nu putem garanta cifre actuale pe ocupație, regiune și experiență, deci nu le afirmăm. Trimitem la INS și la anunțurile reale.
- **Exit-intent popup.** Deranjează mai mult decât convertește pe un public care oricum vine să facă un test gratuit.

## 9. De verificat înainte să dai drumul

- [ ] `config.js` completat cu datele reale ale firmei
- [ ] `confidentialitate.html` și `termeni.html` validate juridic
- [ ] Testul parcurs integral pe telefon, nu doar pe desktop
- [ ] Butonul „Salvează ca imagine” testat pe iOS și Android
- [ ] Butonul „Șterge răspunsurile” testat
- [ ] Verificat cu tastatura: Tab prin pagină, tastele 1–5 în test
- [ ] Descrierile ocupațiilor recitite de cineva care lucrează în domeniu
- [ ] HTTPS activ pe domeniu


## 10. Direcția vizuală v2

Landingul pune testul în centru, cu un radar propriu, un bloc dedicat aplicației și micro-interacțiuni discrete. Pagina de marketing nu afișează CUI-ul sau adresa operatorului. Datele legale rămân în paginile de confidențialitate și termeni.

Butoanele App Store și Google Play apar automat numai când `APP_LIVE` este `true` și ai completat URL-urile reale în `assets/config.js`. Nu pune linkuri fictive.
