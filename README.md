# LazyFilm

> AI-powered movie recommendations + full catalogue browser.  
> Tell Claude your mood — get 3 perfect films for tonight.

**Backend repo:** [CineBrowseLite-BE](https://github.com/woffpost/CineBrowseLite-BE)

---

## What it does

1. **AI Advice** — answer a 4-step quiz (mood, time, language, custom wish). The app sends your answers to a FastAPI backend, which calls the **Claude API** using `tool_use` to get a structured JSON response with 3 movie recommendations. Each recommendation is then enriched with poster, rating, and runtime data from TMDB.
2. **Browse** — filter the full TMDB catalogue by genre, rating, or release date with infinite scroll.
3. **Multilingual** — the entire UI (including Claude's reasoning for each pick) adapts to English, Russian, or Romanian.

---

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Data fetching | TanStack Query v5 (infinite queries, mutations, stale-while-revalidate) |
| Routing | React Router v7 |
| i18n | i18next + react-i18next + browser language detection |
| SEO | react-helmet-async (dynamic `<title>`, Open Graph, `lang` attribute) |
| Backend | Python, FastAPI, Pydantic |
| AI | Anthropic Claude API (`claude-sonnet-4-6`), structured outputs via `tool_use` |
| Data | TMDB API |
| Deployment | Render (backend) |

---

## Architecture highlights

### Structured AI output
Claude is called with a forced tool schema — not a plain prompt. This guarantees a valid, typed JSON response every time with no parsing heuristics:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=[{"name": "recommend_movies", "input_schema": RecommendationList.model_json_schema()}],
    tool_choice={"type": "tool", "name": "recommend_movies"},
    messages=[{"role": "user", "content": user_prompt}]
)
data = response.content[0].input  # already a typed dict
```

### Two-stage AI enrichment
Claude returns titles + years. The frontend then resolves each title against the TMDB Search API and fetches full movie details in parallel — keeping the backend lean and the UI data-rich.

### Multilingual AI responses
The UI language (`en` / `ru` / `ro`) is sent to the backend with each request. The prompt instructs Claude to write its reasoning in that language, so the AI output always matches the interface.

---

## Running locally

```bash
# Frontend
npm install
npm run dev

# Backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Requires `ANTHROPIC_API_KEY` and `VITE_TMDB_TOKEN` environment variables.
