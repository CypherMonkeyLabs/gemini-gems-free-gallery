# App starters

Both starters load a Gem's instructions from `gems/*.md` and send them as the system prompt.
The API key is read from the `GEMINI_API_KEY` environment variable. Never commit keys.

| File | Run |
|---|---|
| `gem_app.py` | `pip install google-genai` then `python examples/gem_app.py gems/02-meeting-recap-desk.md "..."` |
| `gem_app.mjs` | `npm install @google/genai` then `node examples/gem_app.mjs gems/02-meeting-recap-desk.md "..."` |

Optional: set `GEMINI_MODEL` to use a different model. Get a key at https://aistudio.google.com/apikey.
