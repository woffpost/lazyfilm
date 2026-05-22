const ro = {
  nav: { home: "Acasă", about: "Despre" },
  hero: {
    title: "Nu știi ce să urmărești?",
    subtitle: "Spune-ne starea ta — Claude alege 3 filme perfecte pentru diseară.",
    badge: "Powered by Claude AI",
  },
  tabs: { ai: "Sfat AI", browse: "Căutare & Genuri" },
  quiz: {
    loading: {
      title: "Căutăm filmul perfect...",
      subtitle: "Claude analizează mii de filme pentru a găsi trei capodopere potrivite stării tale.",
    },
    step1: {
      title: "Care e starea ta azi?",
      tired: { title: "Obosit după muncă", desc: "Ceva profund, inteligent, dar meditativ." },
      laugh: { title: "Reset mental", desc: "Ceva amuzant, ușor sau o comedie grozavă." },
      date: { title: "Seară romantică", desc: "Perfect pentru vizionat cu partenerul." },
      thrill: { title: "Adrenalină pură", desc: "Subiecte intense, thrillere, suspans sau horror." },
    },
    step2: {
      title: "Cât timp ai la dispoziție?",
      short: "⏱️ Film scurt (sub 90 min)",
      standard: "🎬 Durată standard (~2 ore)",
      epic: "🏛️ Gata pentru un epic (2.5+ ore)",
    },
    step3: {
      title: "Limba preferată?",
      ru: "Dublaj în rusă",
      en: "Original + Subtitrare",
      any: "Nu contează",
    },
    step4: {
      title: "Dorințe speciale?",
      subtitle: 'Scrie orice: actor preferat, atmosferă, sau "fără umor vulgar".',
      placeholder: "Ex: vibe cyberpunk, sau Tom Hardy în rol principal...",
      back: "← Înapoi",
      submit: "🍿 Găsește filmul perfect",
    },
    back: "← Înapoi",
  },
  results: {
    title: "Alegerea ta perfectă pentru diseară:",
    reset: "Ia chestionarul din nou",
    empty: "AI nu a putut verifica filmele în baza de date. Încearcă să reformulezi cererea.",
    meta: "{{year}} • {{runtime}} min",
  },
  browse: {
    search: "Caută filme...",
    genre: { label: "Gen", all: "🍿 Toate genurile" },
    sort: {
      label: "Sortare",
      popularity: "🔥 Cele mai populare",
      rating: "⭐ Top Rated",
      date: "📅 Cele mai recente",
    },
    empty: {
      title: "Nimic găsit",
      subtitle: 'Nu s-a găsit niciun film pentru "{{term}}". Încearcă altă formulare.',
    },
    end: "Ai văzut tot",
  },
  trending: {
    label: "Trending azi",
    cta: "Vezi detalii",
  },
  features: {
    ai: { title: "AI alege în secunde", desc: "Răspunzi la 4 întrebări — Claude recomandă 3 filme perfecte pentru starea ta." },
    browse: { title: "10.000+ filme", desc: "Filtrează după gen, rating sau dată de lansare și explorează catalogul complet TMDB." },
    lang: { title: "3 limbi", desc: "Comută oricând între engleză, rusă și română." },
  },
  notFound: {
    title: "Pagina nu a fost găsită",
    subtitle: "Se pare că această scenă a fost tăiată la montaj.",
    cta: "Înapoi acasă",
  },
  footer: {
    built: "Construit cu Claude API & TMDB",
  },
  about: {
    title: "Despre proiect",
    description:
      "LazyFilm este un proiect full-stack creat pentru a demonstra dezvoltarea web modernă cu integrare AI. Răspunzi la un scurt chestionar despre starea ta și timp — Claude API alege 3 filme perfecte pentru diseară. Poți explora și catalogul complet TMDB după gen, rating sau dată de lansare.",
    how: {
      title: "Cum funcționează",
      steps: [
        "Răspunzi la 4 întrebări rapide: stare, timp disponibil, limbă preferată și dorințe speciale.",
        "Răspunsurile sunt trimise la un backend FastAPI, care apelează Claude API cu o schemă JSON structurată prin tool_use — garantând un output valid.",
        "Claude recomandă 3 filme după titlu. Frontend-ul interogă TMDB pentru fiecare film, obținând poster, rating și durată.",
        "Rezultatele sunt afișate cu raționamentul personalizat al lui Claude pentru fiecare alegere.",
      ],
    },
    stack: {
      title: "Stack tehnologic",
      frontend: "Frontend",
      backend: "Backend",
      ai: "AI",
      data: "Date & Infra",
    },
  },
} as const;

export default ro;
