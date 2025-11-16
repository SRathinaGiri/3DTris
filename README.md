# 3DTris

3DTris is an experimental Three.js powered Tetris prototype where pieces fall inside a cubic volume instead of a 2D well.
Rotate shapes across any axis, clear fully occupied 3D layers, and unlock new levels as you progress. The project is built
with plain HTML, CSS, and JavaScript so it can run in any modern browser without a build step.

## Playing locally

Because everything is vanilla web tech, you can simply open `index.html` in a browser. For best results (and to avoid
local file restrictions on some browsers) launch a lightweight static server and visit `http://localhost:PORT`:

```bash
# Python 3
python -m http.server 4173

# Or use any other static server
npx serve .
```

## Controls

| Action | Keys |
| --- | --- |
| Move piece (x/z axis) | Arrow keys |
| Rotate X axis | `Q` / `E` |
| Rotate Y axis | `A` / `D` |
| Rotate Z axis | `W` / `S` |
| Hard drop | `Space` |
| Pause | `P` or the pause button |

## Visual settings

The control panel exposes multiple view modes (Perspective, 2D Top, Cross View, Parallel View, Anaglyph, and Stereo 3D).
Stereo mode unlocks adjustments for eye distance, focus depth and field of view. These values are fed into Three.js'
`StereoCamera`/`AnaglyphEffect` so the playfield can be examined from different depth profiles without reloading the page.
Progress (score, level, and cleared layers) is stored in `localStorage`, letting you resume from the last level you
reached.
