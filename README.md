# Her Majesty

A birthday site for Anishka, live at **[prettiestwomanalive.in](https://prettiestwomanalive.in)**.

It opens as a sealed envelope. Tap the wax seal → the flap swings open, the card
slides out and unfolds → confetti → the rest of the site.

Then: a cake with number candles you blow out (button, or actually blowing into
the mic), a deck of photos you swipe through, balloons you pop to assemble a
message, gift boxes that unwrap into reasons, a timeline, and a letter that
types itself out. The birthday song is synthesised in the browser, so there's no
audio file to ship.

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
| Name, birthday, birth year, the year you met | `CONFIG` |
| The photo deck and its captions | `PHOTOS` |
| The words hidden in the balloons | `POP_WORDS` |
| The eight gift-box reasons | `GIFTS` |
| The "How we got here" timeline | `TIMELINE` |

`CONFIG.birthYear` drives three things at once: the age on the card, the "years
of you" tile, and the number candles on the cake — `2000` puts a **2** and a
**6** on it. `CONFIG.metYear` adds the "years since ToC" tile.

One field is still empty, because I didn't know it:

```js
togetherSince: '2023-08-14',   // adds a "days of us" tile to the hero
```

The letter is prose, so it lives in `index.html` instead — look for
`EDIT THE LETTER HERE`. One `<p>` per paragraph.

### Adding or swapping a photo

Photos live in `images/photos/<name>.jpg`, cropped to **3:4 portrait** (the deck
assumes that shape), max 1200px on the long side. Then add a line to `PHOTOS`:

```js
['name', 'Your caption here'],
```

Order in the array is the order of the deck. To prepare a new one:

```bash
python -c "
from PIL import Image, ImageOps
import sys, os
for f in sys.argv[1:]:
    n = os.path.splitext(os.path.basename(f))[0]
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    im.thumbnail((1200, 1200), Image.LANCZOS)
    im.save(f'images/photos/{n}.jpg', quality=82, optimize=True, progressive=True)
" path/to/photo.jpg
```

## Notes

- `robots.txt` and a `noindex` meta tag keep this out of search results. It's a
  private gift on a public host — anyone with the link can still see it, and any
  photo you add is publicly fetchable at its URL.
- "Use my breath" asks for the microphone and listens for a sustained loud
  sound. Declining is fine — the button next to it does the same thing.
- The card layer is a fixed, non-scrolling overlay, so its size is clamped
  against viewport *height* as well as width. That's what keeps "Come inside"
  on screen on short laptops and landscape tablets. If you make the card bigger,
  re-check those sizes.
- Everything respects `prefers-reduced-motion`: no confetti, balloons or
  typewriter for anyone who's asked their device to tone animation down.
