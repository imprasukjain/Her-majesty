# Her Majesty

A birthday site for Anishka, live at **[prettiestwomanalive.in](https://prettiestwomanalive.in)**.

It opens as a sealed envelope. Tap the wax seal → the flap swings open, the card
slides out and unfolds → confetti → the rest of the site.

## Running it

No build step. It's plain HTML, CSS and JS, served straight from the repo root.

```bash
python -m http.server 8000     # then open http://localhost:8000
```

## Deploying

GitHub Pages serves `main` at the repo root, with `CNAME` pointing the custom
domain at it. **Pushing to `main` is the deploy.** Give it a minute, then
hard-refresh (Pages caches hard).

The `webpack.config.prod.js` build is left over from the original boilerplate
and is not used for deployment.

## Changing things

Everything you'd want to edit is at the top of `js/birthday.js`, between the
`EDIT ME` markers:

| What | Where |
| --- | --- |
| Name, birthday, candle count | `CONFIG` |
| Photos and their captions | `PHOTOS` |
| The eight gift-box reasons | `GIFTS` |
| The "How we got here" timeline | `TIMELINE` |

Two optional fields in `CONFIG` unlock extra tiles on the hero when you fill
them in — they're `null` by default and their tiles simply don't render:

```js
birthYear: 2001,              // adds a "years of you" tile, and uses it for the candle count
togetherSince: '2023-02-14',  // adds a "days of us" tile
```

The letter itself is prose, so it lives in `index.html` instead — look for
`EDIT THE LETTER HERE`. One `<p>` per paragraph; it types itself out on screen.

### Adding a photo

Each photo needs two files with the same name:

- `images/thumb/<name>.jpg` — max 560px, for the grid
- `images/full/<name>.jpg` — max 1200px, for the lightbox

Then add one line to `PHOTOS`:

```js
['name', 'her', 'Your caption here'],   // category: 'her' | 'us' | 'crew'
```

If the photo isn't the usual 3:4 portrait, add it to `RATIOS` too (just below
`PHOTOS`). That only stops the grid jumping while the image loads — leave it out
and it defaults to 3:4.

To resize a batch:

```bash
python -c "
from PIL import Image, ImageOps
import sys, os
for f in sys.argv[1:]:
    n = os.path.splitext(os.path.basename(f))[0]
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    for d, px, q in (('full', 1200, 82), ('thumb', 560, 76)):
        o = im.copy(); o.thumbnail((px, px), Image.LANCZOS)
        o.save(f'images/{d}/{n}.jpg', quality=q, optimize=True, progressive=True)
" path/to/*.jpg
```

## Notes

- `robots.txt` and a `noindex` meta tag keep this out of search results. It's a
  private gift on a public host — anyone with the link can still see it.
- The birthday song is generated in the browser with the Web Audio API, so
  there's no audio file to ship and nothing to license.
- "Use my breath" asks for the microphone and listens for a sustained loud
  sound. Declining it is fine — the button next to it does the same thing.
- Everything respects `prefers-reduced-motion`: no confetti, balloons or
  typewriter for anyone who's asked their device to tone animation down.
