/* ==========================================================================
   DATE — dimensiuni, întrebări, profiluri, ocupații.
   Toate întrebările sunt scrise original pentru Menirea.
   Structura pe 6 dimensiuni vocaționale urmează modelul RIASEC (Holland),
   care este un cadru teoretic public. Nu sunt preluate itemi din niciun
   chestionar protejat prin drept de autor.
   ========================================================================== */

window.DIMENSIUNI = [
  { id: "P", nume: "Practic",        scurt: "mâini, unelte, teren",        desc: "Îți place să lucrezi cu obiecte reale, unelte, mașini sau în aer liber. Vrei să vezi un rezultat concret." },
  { id: "A", nume: "Analitic",       scurt: "date, cauze, probleme",       desc: "Îți place să înțelegi cum funcționează lucrurile, să cauți cauze și să lucrezi cu informație complexă." },
  { id: "C", nume: "Creativ",        scurt: "idei, formă, expresie",       desc: "Îți place să creezi ceva de la zero și să lucrezi fără instrucțiuni rigide." },
  { id: "S", nume: "Social",         scurt: "oameni, sprijin, învățare",   desc: "Îți place contactul direct cu oamenii, să ajuți, să explici, să însoțești pe cineva." },
  { id: "E", nume: "Antreprenorial", scurt: "inițiativă, convingere, risc",desc: "Îți place să conduci, să convingi, să pornești lucruri și să îți asumi riscuri." },
  { id: "O", nume: "Organizator",    scurt: "ordine, detaliu, proceduri",  desc: "Îți place structura, acuratețea și munca bine definită, făcută corect până la capăt." },
  { id: "I", nume: "Independență",   scurt: "cât de singur lucrezi",       desc: "Cât de mult preferi să îți conduci singur munca, față de a lucra într-o structură cu reguli clare." },
  { id: "T", nume: "Stabilitate",    scurt: "cât de previzibil vrei",      desc: "Cât de mult prețuiești predictibilitatea și rutina, față de varietate și schimbare." }
];

/* Fiecare întrebare: t = text, d = dimensiune, r = inversată (opțional) */
window.INTREBARI = [
  { t: "Îmi place să repar cu mâinile mele lucruri stricate.", d: "P" },
  { t: "Aș prefera o zi de muncă în aer liber decât una la birou.", d: "P" },
  { t: "Mă simt bine când folosesc unelte sau echipamente.", d: "P" },
  { t: "Vreau să văd un rezultat pe care îl pot atinge la finalul zilei.", d: "P" },
  { t: "Mă atrage ideea de a lucra cu mașini, motoare sau instalații.", d: "P" },
  { t: "Prefer să demontez ceva ca să înțeleg, decât să citesc manualul.", d: "P" },
  { t: "Efortul fizic la muncă nu mă deranjează.", d: "P" },
  { t: "M-aș descurca bine într-un atelier sau pe un șantier.", d: "P" },

  { t: "Caut cauza reală a unei probleme, nu doar o rezolvare rapidă.", d: "A" },
  { t: "Mă captivează cifrele, graficele și tiparele din date.", d: "A" },
  { t: "Îmi place să citesc despre cum funcționează lucrurile.", d: "A" },
  { t: "Prefer o problemă grea și interesantă unei sarcini ușoare.", d: "A" },
  { t: "Verific informația din mai multe surse înainte să trag o concluzie.", d: "A" },
  { t: "Mi-ar plăcea o muncă în care testez idei și văd dacă stau în picioare.", d: "A" },
  { t: "Învăț lucruri complicate chiar dacă îmi ia mult timp.", d: "A" },
  { t: "Când ceva nu are logică, nu mă las până nu înțeleg.", d: "A" },

  { t: "Îmi vin des idei pe care aș vrea să le pun în practică.", d: "C" },
  { t: "Îmi place să fac ceva de la zero: text, imagine, muzică, obiect.", d: "C" },
  { t: "Mă deranjează regulile care îmi limitează felul de a lucra.", d: "C" },
  { t: "Observ detalii de formă și culoare pe care alții nu le văd.", d: "C" },
  { t: "Aș prefera un proiect fără instrucțiuni clare, dar cu libertate.", d: "C" },
  { t: "Îmi place să spun lucrurile într-un fel care prinde la oameni.", d: "C" },
  { t: "Mă exprim mai bine prin ce fac decât prin ce spun.", d: "C" },
  { t: "Vreau ca munca mea să se vadă că e făcută de mine, nu de oricine.", d: "C" },

  { t: "Oamenii vin la mine când au nevoie de un sfat.", d: "S" },
  { t: "Îmi face plăcere să explic cuiva ceva până înțelege.", d: "S" },
  { t: "Observ repede când cineva din jur nu se simte bine.", d: "S" },
  { t: "Aș alege o muncă în care ajut oameni concret, chiar dacă e obositoare.", d: "S" },
  { t: "Îmi place să lucrez cu oameni față în față.", d: "S" },
  { t: "Am răbdare cu cineva care învață mai greu.", d: "S" },
  { t: "Mă simt împlinit când cineva reușește cu ajutorul meu.", d: "S" },
  { t: "Prefer să rezolv un conflict prin discuție decât să îl las să treacă.", d: "S" },

  { t: "Îmi place să conving oamenii de o idee în care cred.", d: "E" },
  { t: "Aș vrea să conduc un proiect, nu doar să fac parte din el.", d: "E" },
  { t: "Riscul calculat nu mă sperie.", d: "E" },
  { t: "Îmi place să negociez.", d: "E" },
  { t: "Mi-ar plăcea să pornesc ceva al meu.", d: "E" },
  { t: "Iau decizii repede, chiar și cu informație incompletă.", d: "E" },
  { t: "Îmi place competiția.", d: "E" },

  { t: "Îmi place când lucrurile au o procedură clară.", d: "O" },
  { t: "Fac liste și le urmez.", d: "O" },
  { t: "Observ imediat o greșeală într-un tabel sau document.", d: "O" },
  { t: "Mă simt bine când totul e la locul lui.", d: "O" },
  { t: "Prefer termene clare și așteptări explicite.", d: "O" },
  { t: "Am răbdare cu munca de detaliu, chiar dacă e repetitivă.", d: "O" },
  { t: "Îmi place să pun ordine într-un morman de informații.", d: "O" },

  { t: "Lucrez cel mai bine când nu mă supraveghează nimeni.", d: "I" },
  { t: "Prefer să îmi organizez singur programul.", d: "I" },
  { t: "Vreau să iau singur deciziile despre munca mea.", d: "I" },
  { t: "Mă simt limitat într-o ierarhie strictă.", d: "I" },
  { t: "Aș prefera să lucrez pe cont propriu decât ca angajat.", d: "I" },
  { t: "Nu am nevoie de cineva care să îmi spună ce urmează.", d: "I" },
  { t: "Prefer să răspund singur pentru rezultatul meu.", d: "I" },

  { t: "Prefer un venit sigur unuia mai mare, dar imprevizibil.", d: "T" },
  { t: "Îmi place să știu dinainte cum arată ziua de mâine la muncă.", d: "T" },
  { t: "Schimbările dese la muncă mă obosesc.", d: "T" },
  { t: "Aș alege un loc de muncă stabil în locul unuia mai palpitant.", d: "T" },
  { t: "Rutina mă liniștește.", d: "T" },
  { t: "Termenele foarte strânse mă stresează.", d: "T" },
  { t: "Prefer un rol bine definit unuia care se schimbă des.", d: "T" }
];

window.SCALA = [
  { v: 1, e: "🚫", t: "Deloc" },
  { v: 2, e: "🙁", t: "Puțin" },
  { v: 3, e: "😐", t: "Așa și așa" },
  { v: 4, e: "🙂", t: "Mult" },
  { v: 5, e: "🔥", t: "Total" }
];

/* Numele profilului = combinația primelor două dimensiuni vocaționale */
window.PROFILURI = {
  "AP": { nume: "Meșterul analitic",       text: "Vrei să înțelegi cum funcționează un lucru și apoi să pui mâna pe el. Nu te mulțumești nici cu teoria singură, nici cu rutina fără explicație." },
  "CP": { nume: "Constructorul creativ",   text: "Ai idei și vrei să le vezi luând formă în material real. Munca ta se vede și poartă amprenta ta." },
  "PS": { nume: "Ajutorul de teren",       text: "Vrei să faci ceva concret pentru oameni, cu mâinile tale, acolo unde e nevoie. Nu de la distanță." },
  "EP": { nume: "Practicianul cu inițiativă", text: "Știi să faci treaba și vrei să o conduci. Te vezi mai degrabă stăpân pe propria muncă decât executant." },
  "OP": { nume: "Meșterul metodic",         text: "Lucrezi cu lucruri reale, dar după reguli clare. Precizia contează pentru tine la fel de mult ca rezultatul." },
  "AC": { nume: "Exploratorul de idei",     text: "Te interesează atât cum stau lucrurile, cât și cum ar putea sta altfel. Ai nevoie de spațiu de gândire, nu de fișe de post rigide." },
  "AS": { nume: "Îndrumătorul analitic",    text: "Înțelegi lucruri complicate și îți place să le faci limpezi pentru altcineva. Combinația asta e rară." },
  "AE": { nume: "Strategul",                text: "Aduni informația, o cântărești și apoi decizi. Îți place să conduci pe baza a ceva solid, nu din instinct." },
  "AO": { nume: "Analistul riguros",        text: "Ai răbdare cu detaliul și minte pentru tipare. Ești omul care găsește greșeala pe care ceilalți au trecut-o cu vederea." },
  "CS": { nume: "Comunicatorul creativ",    text: "Îți place să creezi, dar creația ta are sens abia când ajunge la cineva. Lucrezi pentru un public, nu pentru sertar." },
  "CE": { nume: "Inițiatorul creativ",      text: "Ai idei și energia să le duci în lume. Nu aștepți să îți dea cineva voie." },
  "CO": { nume: "Meșteșugarul de precizie", text: "Creativ, dar disciplinat. Îți place forma bine făcută, nu doar ideea bună." },
  "ES": { nume: "Coordonatorul de oameni",  text: "Îți vine natural să duci un grup într-o direcție. Oamenii te urmează pentru că îi asculți, nu doar pentru că vorbești." },
  "OS": { nume: "Sprijinul de încredere",   text: "Ești omul pe care se bazează ceilalți: prezent, atent, consecvent. Nu spectaculos — de neînlocuit." },
  "EO": { nume: "Organizatorul cu inițiativă", text: "Vezi ce trebuie făcut, faci planul și îl duci la capăt. Ești bun acolo unde e haos și trebuie ordine." }
};

/* --------------------------------------------------------------------------
   OCUPAȚII
   v = [Practic, Analitic, Creativ, Social, Antreprenorial, Organizator]
   Profilurile sunt estimări bazate pe conținutul tipic al ocupației
   (descrieri ESCO / O*NET / COR). Nu sunt măsurători pe angajați români.
   Nu conțin salarii — nu putem garanta cifre actuale, deci nu le afirmăm.
   -------------------------------------------------------------------------- */
window.OCUPATII = [
  { n: "Electrician", v: [95,45,20,25,20,50],
    f: "Montezi, verifici și repari instalații electrice în clădiri sau în industrie. Lucrezi pe teren, cu schemă și cu multimetru în mână.",
    i: "Școală profesională sau curs de calificare autorizat ANC. Pentru lucrări la instalații racordate la rețea îți trebuie autorizare ANRE.",
    x: "E o meserie căutată, dar responsabilitatea e reală: o greșeală poate însemna incendiu sau electrocutare. Primii ani înveți pe lângă cineva, nu singur." },

  { n: "Instalator instalații sanitare și termice", v: [95,35,15,30,25,45],
    f: "Montezi și repari conducte, centrale, calorifere, instalații sanitare. Mult lucru în case și blocuri, cu program neregulat.",
    i: "Curs de calificare autorizat ANC. Pentru instalații de gaze e nevoie de autorizare ANRE.",
    x: "Cererea e mare și poți lucra pe cont propriu devreme. În schimb e muncă fizică, murdară, și mulți clienți te sună seara și în weekend." },

  { n: "Mecanic auto", v: [95,50,20,25,20,45],
    f: "Diagnostichezi și repari autovehicule. Azi înseamnă la fel de mult tester electronic ca și cheie tubulară.",
    i: "Liceu tehnologic sau școală profesională de profil, apoi practică în service. Există și cursuri de calificare autorizate ANC.",
    x: "Mașinile moderne sunt tot mai închise: multe operații cer aparatură scumpă și acces la softul producătorului. Fără învățare continuă rămâi la lucrări simple." },

  { n: "Sudor", v: [95,30,20,15,15,40],
    f: "Îmbini piese metalice prin sudură, după procedură și cu verificare a calității îmbinării.",
    i: "Curs de calificare autorizat ANC, plus autorizare pe procedeu de sudare pentru lucrări industriale.",
    x: "Se plătește bine, mai ales cu autorizări. E însă expunere la fum, zgomot și poziții incomode — sănătatea se protejează activ, nu opțional." },

  { n: "Dezvoltator software", v: [40,95,55,25,30,60],
    f: "Scrii, testezi și întreții cod. O bună parte din timp e citit cod scris de alții și înțeles de ce nu merge.",
    i: "Facultate de profil, sau parcurs autodidact/bootcamp cu portofoliu real. Angajatorii se uită la ce ai construit.",
    x: "Piața de junior s-a strâns mult față de acum câțiva ani. Intrarea e mai grea decât se spune, iar învățarea nu se oprește niciodată." },

  { n: "Analist de date", v: [20,95,35,25,30,80],
    f: "Aduni, cureți și interpretezi date, apoi le explici celor care iau decizii. Mult SQL, tabele și grafice.",
    i: "Facultate cu componentă cantitativă (economie, matematică, IT) sau certificări plus proiecte proprii.",
    x: "Cam 70% din muncă e curățarea datelor, nu analiza spectaculoasă. Și trebuie să știi să vorbești cu oameni care nu înțeleg cifrele." },

  { n: "Specialist securitate cibernetică", v: [35,95,40,30,35,75],
    f: "Monitorizezi, investighezi și previi incidente de securitate informatică. Analiză, documentare, răspuns la alerte.",
    i: "Facultate de profil sau parcurs tehnic solid, plus certificări recunoscute. De obicei se intră după experiență în IT sau rețele.",
    x: "Nu e ca în filme. E multă analiză de loguri, ture și rapoarte. Se cere disciplină de documentare, nu doar curiozitate tehnică." },

  { n: "Inginer constructor", v: [70,80,35,35,45,75],
    f: "Proiectezi sau coordonezi execuția construcțiilor: calcule, planuri, verificări pe șantier.",
    i: "Facultate de construcții. Pentru anumite atribuții e nevoie de atestare profesională.",
    x: "Răspunderea e pe termen lung și e legală, nu doar profesională. Șantierul înseamnă presiune de termen și negociere permanentă." },

  { n: "Contabil", v: [15,65,10,25,25,95],
    f: "Înregistrezi operațiuni economice, întocmești situații financiare și declarații, urmărești termene legale.",
    i: "Facultate economică sau studii de specialitate. Pentru titlul de expert contabil / contabil autorizat, examen și membru CECCAR.",
    x: "Legislația fiscală se schimbă des, deci înveți continuu. Iar în perioadele de raportare programul nu e negociabil." },

  { n: "Asistent medical generalist", v: [55,55,20,95,25,70],
    f: "Îngrijești pacienți, administrezi tratamente, monitorizezi starea și ții evidența. Lucrezi în echipă, în ture.",
    i: "Școală postliceală sanitară sau facultate de asistență medicală, apoi autorizare de liberă practică prin OAMGMAMR.",
    x: "Îți trebuie rezistență emoțională, nu doar bunăvoință. Turele de noapte și contactul cu suferința sunt parte din meserie, nu excepție." },

  { n: "Kinetoterapeut", v: [65,55,25,90,30,55],
    f: "Evaluezi și recuperezi funcția motorie: exerciții, terapie manuală, program pe termen lung cu fiecare pacient.",
    i: "Facultate de kinetoterapie (licență), apoi înregistrare profesională conform reglementărilor în vigoare.",
    x: "E muncă fizică serioasă — stai în picioare și lucrezi cu corpul altcuiva toată ziua. Progresul pacientului e lent, deci ai nevoie de răbdare." },

  { n: "Psiholog", v: [10,75,50,95,30,50],
    f: "Evaluezi și asiști psihologic oameni, în clinic, școlar, organizațional sau alte specializări.",
    i: "Licență în psihologie, de regulă master de specializare, apoi atestat de liberă practică de la Colegiul Psihologilor din România.",
    x: "Drumul până la practică independentă e lung și costă: supervizare, formare, taxe. Iar munca de ascultat suferință zilnic cere propria ta igienă psihică." },

  { n: "Profesor", v: [20,65,55,95,40,60],
    f: "Predai, evaluezi și însoțești elevii. Pe lângă ore, ai pregătire, documente și relația cu părinții.",
    i: "Facultate de specialitate plus modulul psihopedagogic, apoi examen de titularizare pentru post definitiv.",
    x: "Timpul la clasă e doar o parte. Managementul clasei și birocrația consumă enorm, iar rezultatul muncii tale se vede peste ani, nu azi." },

  { n: "Educator / învățător", v: [30,45,60,95,35,60],
    f: "Lucrezi cu copii mici: activități, dezvoltare emoțională și socială, primele deprinderi de învățare.",
    i: "Liceu pedagogic sau facultate de Pedagogia Învățământului Primar și Preșcolar, apoi concurs pentru post.",
    x: "Energia cerută zilnic e mai mare decât își imaginează majoritatea. Iar relația cu părinții e o a doua meserie în sine." },

  { n: "Asistent social", v: [20,50,30,95,35,60],
    f: "Evaluezi situații sociale dificile și construiești planuri de intervenție pentru persoane vulnerabile.",
    i: "Licență în asistență socială, apoi înscriere în Colegiul Național al Asistenților Sociali din România.",
    x: "Vezi zilnic situații pe care nu le poți repara complet. Numărul de cazuri per asistent e adesea mare, iar uzura emoțională e reală." },

  { n: "Designer grafic", v: [25,40,95,30,40,40],
    f: "Creezi identitate vizuală, materiale și interfețe. Mult lucru la brief și multe revizuiri.",
    i: "Facultate de arte / design sau parcurs autodidact cu portofoliu puternic. Portofoliul cântărește mai mult decât diploma.",
    x: "Clientul schimbă des cerințele, iar munca ta e judecată subiectiv. Primii ani sunt aproape întotdeauna prost plătiți." },

  { n: "Arhitect", v: [50,75,90,40,45,60],
    f: "Proiectezi clădiri și spații: concept, planuri, autorizații, urmărire de execuție.",
    i: "Facultate de arhitectură (studii lungi), apoi stagiu și înscriere în Ordinul Arhitecților din România pentru drept de semnătură.",
    x: "Drumul până la dreptul de semnătură e lung. Iar o mare parte din meserie e reglementare, avize și negociere cu bugetul, nu desen." },

  { n: "Copywriter / creator de conținut", v: [10,55,90,45,50,40],
    f: "Scrii texte care trebuie să facă ceva: să explice, să convingă, să vândă. Adaptezi tonul la public.",
    i: "Nu există o rută obligatorie. Contează portofoliul, exemplele publicate și înțelegerea publicului.",
    x: "Piața s-a schimbat mult odată cu instrumentele automate de scriere. Se caută tot mai mult cei care aduc gândire și context, nu volum de text." },

  { n: "Fotograf / videograf", v: [50,35,95,45,55,35],
    f: "Filmezi sau fotografiezi, apoi montezi și livrezi. Jumătate din meserie e la calculator, nu pe teren.",
    i: "Fără rută obligatorie. Se învață prin practică, asistență pe platou și portofoliu.",
    x: "Ești în practică antreprenor: îți cauți singur clienți, negociezi și facturezi. Veniturile sunt sezoniere și inegale." },

  { n: "Bucătar", v: [80,35,75,40,40,55],
    f: "Pregătești preparate la standard constant, sub presiune de timp, în echipă.",
    i: "Școală profesională de profil sau curs de calificare autorizat ANC, apoi ani de bucătărie.",
    x: "Se lucrează când ceilalți se relaxează: seri, weekenduri, sărbători. Ritmul din bucătărie e mult mai dur decât arată la televizor." },

  { n: "Agent de vânzări", v: [25,35,40,65,95,40],
    f: "Găsești clienți, prezinți, negociezi și închizi vânzări. Ai țintă și ești măsurat pe rezultat.",
    i: "Se intră adesea fără studii de specialitate. Contează comunicarea, tenacitatea și cunoașterea produsului.",
    x: "Refuzul e parte din zi, în mod repetat. Venitul depinde de rezultat, deci lunile slabe se simt direct în buzunar." },

  { n: "Manager de proiect", v: [25,65,40,65,85,85],
    f: "Planifici, coordonezi și livrezi proiecte: buget, termene, oameni, riscuri.",
    i: "Se ajunge de obicei din interiorul unui domeniu, după câțiva ani de experiență. Certificările ajută, dar nu înlocuiesc experiența.",
    x: "Ai responsabilitate mare, dar deseori autoritate mică. Cea mai grea parte nu e planul — sunt oamenii care nu îți raportează ierarhic." },

  { n: "Antreprenor / administrator afacere mică", v: [40,50,60,55,95,50],
    f: "Construiești și conduci o afacere: clienți, oameni, bani, tot ce nu face altcineva.",
    i: "Nu există rută formală. Se începe de obicei cu o meserie stăpânită bine plus primii clienți.",
    x: "Primii ani înseamnă venit incert și program fără limită. Majoritatea afacerilor noi nu supraviețuiesc — merită pornit cu rezervă financiară." },

  { n: "Specialist resurse umane", v: [10,55,35,85,55,75],
    f: "Recrutezi, administrezi contracte, sprijini managerii și oamenii pe tot parcursul angajării.",
    i: "Facultate (psihologie, economie, drept, sociologie) sau curs de inspector resurse umane autorizat ANC.",
    x: "Ești între angajat și angajator și nu poți mulțumi pe amândoi. O bună parte din muncă e legislație și documente, nu conversații." },

  { n: "Coordonator logistică / transporturi", v: [45,60,15,40,50,90],
    f: "Planifici trasee, stocuri și livrări, rezolvi blocaje în timp real.",
    i: "Studii economice sau tehnice; pentru anumite funcții e nevoie de atestat de manager de transport.",
    x: "Lucrezi cu întârzieri, vamă și oameni obosiți. Când merge bine, nu observă nimeni; când nu, ești tu de vină." },

  { n: "Funcționar public", v: [15,45,10,45,25,95],
    f: "Aplici proceduri administrative, întocmești și verifici documente, lucrezi cu publicul sau cu dosare.",
    i: "Studii cerute prin fișa postului, apoi concurs de recrutare organizat conform Codului administrativ.",
    x: "Stabilitatea e reală, dar și ritmul de schimbare e lent. Ai foarte puțină libertate de a face lucrurile altfel decât spune procedura." },

  { n: "Agricultor / horticultor", v: [95,45,25,25,45,50],
    f: "Cultivi și îngrijești plante sau animale, planifici sezonul, întreții utilaje.",
    i: "Liceu tehnologic sau curs de calificare; pentru fonduri europene sunt cerute forme de pregătire specifice.",
    x: "Depinzi de vreme și de prețul pieței, adică de lucruri pe care nu le controlezi. Nu există weekend garantat în sezon." },

  { n: "Polițist / lucrător în ordine publică", v: [75,55,20,65,50,75],
    f: "Intervii, constați, documentezi și previi. Mult teren, mult contact cu publicul și multă redactare de acte.",
    i: "Școli de agenți de poliție sau Academia de Poliție, prin concurs de admitere.",
    x: "Ture, risc real și expunere la conflict. Partea de birou și documentare e mult mai mare decât se vede din afară." }
];
