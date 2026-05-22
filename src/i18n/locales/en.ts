const en = {
  nav: { home: "Home", about: "About" },
  hero: {
    title: "Don't know what to watch?",
    subtitle: "Tell us your mood — Claude picks 3 perfect movies for tonight.",
    badge: "Powered by Claude API",
  },
  tabs: { ai: "AI Advice", browse: "Search & Genres" },
  quiz: {
    loading: {
      title: "Finding your perfect pick...",
      subtitle: "Claude is scanning thousands of films to find three masterpieces matching your mood.",
    },
    step1: {
      title: "What's your mood today?",
      tired: { title: "Tired after work", desc: "Something deep, smart, but meditative." },
      laugh: { title: "Reset my brain", desc: "Something fun, light, or a great comedy." },
      date: { title: "Romantic evening", desc: "Perfect for watching with your partner." },
      thrill: { title: "Thrill me", desc: "Intense plots, thrillers, suspense, or horror." },
    },
    step2: {
      title: "How much time do you have?",
      short: "⏱️ Quick watch (under 90 min)",
      standard: "🎬 Standard runtime (~2 hours)",
      epic: "🏛️ Ready for an epic (2.5+ hours)",
    },
    step3: {
      title: "Preferred language?",
      ru: "Russian dub",
      en: "Original + Subtitles",
      any: "Doesn't matter",
    },
    step4: {
      title: "Any special wishes?",
      subtitle: 'Write anything: a favorite actor, atmosphere, or "no crude humor".',
      placeholder: "e.g. cyberpunk vibes, or Tom Hardy in the lead...",
      back: "← Back",
      submit: "🍿 Find my perfect movie",
    },
    back: "← Back",
  },
  results: {
    title: "Your perfect pick tonight:",
    reset: "Take quiz again",
    empty: "AI couldn't verify movies in the database. Try rephrasing your request.",
    meta: "{{year}} • {{runtime}} min",
  },
  browse: {
    search: "Search movies...",
    genre: { label: "Genre", all: "🍿 All genres" },
    sort: {
      label: "Sort by",
      popularity: "🔥 Most Popular",
      rating: "⭐ Top Rated",
      date: "📅 Latest Releases",
    },
    empty: {
      title: "Nothing found",
      subtitle: 'No movies found for "{{term}}". Try a different search.',
    },
    end: "You've seen it all",
  },
  trending: {
    label: "Trending Today",
    cta: "View Details",
  },
  features: {
    ai: { title: "AI picks in seconds", desc: "Answer 4 quick questions — Claude recommends 3 perfect films for your mood." },
    browse: { title: "10,000+ movies", desc: "Filter by genre, rating, or release date and scroll through the full TMDB catalogue." },
    lang: { title: "3 languages", desc: "Switch between English, Russian, and Romanian at any time." },
  },
  notFound: {
    title: "Page not found",
    subtitle: "Looks like this scene ended up on the cutting room floor.",
    cta: "Back to home",
  },
  footer: {
    built: "Built with Claude API & TMDB",
  },
  about: {
    title: "About LazyFilm",
    description:
      "LazyFilm is a full-stack pet project built to demonstrate modern web development with AI integration. Answer a short quiz about your mood and time — Claude API picks 3 perfect movies for tonight. You can also browse the full TMDB catalogue by genre, rating, or release date.",
    how: {
      title: "How it works",
      steps: [
        "You answer 4 quick questions about your mood, available time, language preference, and any special wishes.",
        "Answers are sent to a FastAPI backend, which calls the Claude API with a structured tool schema — guaranteeing valid JSON output.",
        "Claude recommends 3 movies by title. The frontend then queries TMDB for each film to fetch the poster, rating, and runtime.",
        "Results are displayed with Claude's personalised reasoning for each pick.",
      ],
    },
    stack: {
      title: "Tech Stack",
      frontend: "Frontend",
      backend: "Backend",
      ai: "AI",
      data: "Data & Infra",
    },
  },
} as const;

export default en;
