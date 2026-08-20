# Arshad Khan — 3D Scroll Portfolio

Scroll-scrubbed portfolio: as you scroll, pre-rendered camera flights fly through a continuous 3D world, with a `<video>` element scrubbing frame-by-frame against scroll position. Built with the `lets-scroll` skill (Higgsfield/Monid clip chain).

## Structure

- `index.html` — single-page site; mounts the engine with section configs (`scrub-engine.js`).
- `scrub-engine.js` — the scroll-scrub engine (scroll-driven `currentTime` seeking, blob loading, lazy prefetch, still posters).
- `serve.js` — zero-dependency Node server with full `206 Partial Content` byte-range support (required for smooth video scrubbing).
- `assets/clip0.mp4`–`clip5.mp4` — pre-rendered 8s camera clips (1920x1080, 24fps, faststart / moov-at-front).
- `assets/still_00.png`–`still_06.png` — poster frames shown before each clip loads (and when `prefers-reduced-motion` is respected).
- `prompts/` + `prompts-manifest.md` — the generation prompts used for each clip/still.
- `.agents/skills/lets-scroll/` — the skill definition and reference implementation.

## Setup

Requires [Node.js](https://nodejs.org) (18+). No dependencies — no `npm install` needed.

Clone and start the server:

```bash
git clone https://github.com/Arshad2048/3d-developer-portfolio.git
cd 3d-developer-portfolio
node serve.js
```

Then open <http://localhost:3000>.

> The engine fetches clips by range and falls back to direct `<video src>` if `fetch` fails. A plain static file server without range support can make scrubbing stutter.

## Commands

```bash
# Run the site locally (default port 3000, override with PORT=8080)
node serve.js

# Start it in the background (Windows PowerShell)
Start-Process node serve.js

# Verify clips are faststart / moov-at-front (0.1% or lower)
ffprobe -v error -select_streams v:0 -show_entries format=start_time -of csv=p=0 assets/clip0.mp4
```

### Re-encoding clips (maintainers)

If you regenerate clips, re-encode them so the moov atom sits at the front and the GOP is short — otherwise scrubbing stalls:

```bash
ffmpeg -y -i source.mp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart \
  assets/clipN.mp4
```

### Committing and pushing

```bash
git add -A
git commit -m "your message"
git push origin main
```

If the push fails with `RPC failed; curl 55` (large video uploads), force HTTP/1.1 and a larger buffer once, then push again:

```bash
git config http.version HTTP/1.1
git config http.postBuffer 524288000
git push origin main
```

If you push with a token, prefer `http.extraheader` over embedding the token in the URL so it never lands in `git config`/history:

```powershell
$b64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$env:GH_TOKEN"))
git -c http.extraheader="AUTHORIZATION: basic $b64" push origin main
```

## Notes

- Scene 6 currently reuses `clip5.mp4` (no `clip6.mp4`).
- `app.js`, `style.css`, and `ai-copilot.js` are legacy/unused.
- The engine honors `prefers-reduced-motion` unless the site config sets `motion: 'always'` (this site does).