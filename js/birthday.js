/* ============================================================
   Happy Birthday, Anishka
   Everything you'd want to change lives in the EDIT ME block.
   ============================================================ */
(function () {
  'use strict';

  /* ══════════════════ EDIT ME ══════════════════════════════ */

  var CONFIG = {
    name: 'Anishka',
    from: 'Prasuk',
    birthMonth: 9,          // September
    birthDay: 20,
    birthYear: 2000,        // drives the "26" on the cake and the years tile
    metYear: 2023,          // the Theory of Computation study group
    togetherSince: null     // e.g. '2023-08-14' — adds a "days of us" tile
  };

  // The photo deck, top card first. Each is images/photos/<name>.jpg at 3:4.
  var PHOTOS = [
    ['p03', 'The night the fairy lights met their match'],
    ['g01', 'Yellow wall. Main character.'],
    ['p02', 'The night the pink dress won'],
    ['g04', 'Sat down. Ended the conversation.'],
    ['g19', 'Sunlight, clearly, has favourites'],
    ['p01', 'Rooftop, looking up, completely unbothered'],
    ['g12', 'Blue backdrop, zero competition'],
    ['g24', 'Still the only person who made automata look good']
  ];

  // Balloon pop. Each balloon holds one word; they assemble into this line.
  var POP_WORDS = ['Happy', 'birthday', 'to', 'the', 'prettiest', 'woman', 'alive'];

  var GIFTS = [
    ['🎈', 'Your laugh',         'It arrives before the punchline lands and hangs around long after. Best sound my phone has ever recorded.'],
    ['🌙', 'Your 2am brain',     'Softer, funnier, more honest than the daytime edition. I would lose sleep for it every single night.'],
    ['🔥', 'Your fight',         'Life handed you hard things and you kept showing up anyway. That is not stubbornness, that is spine.'],
    ['☕',       'Your ordinary days', 'You make groceries, traffic and a random Tuesday feel like something worth turning up for.'],
    ['📚', 'Your brain',         'You out-argued me on pumping lemmas in 2023 and you have not stopped being the smartest person in the room since.'],
    ['🎧', 'Your taste',         'Songs, outfits, food, people — somehow always right. Honestly a bit unfair on the rest of us.'],
    ['🛟', 'Your instinct',      'You know something is wrong with me before I have said a word, and you have never once been mistaken.'],
    ['♾️', 'Everything else',    'Eight boxes was never going to be enough. Ask me in person — the real list does not fit on a website.']
  ];

  var TIMELINE = [
    ['Before 2023', 'The world, pre-you',
     'Fine, honestly. Functional. Just running in a noticeably duller colour palette than it does now.'],
    ['2023', 'A Theory of Computation study group',
     'That is genuinely how this started. A common study group for ToC — automata, pumping lemmas, a subject most people were just trying to survive. I was not trying to survive it after you turned up.'],
    ['Somewhere after', 'Not about the syllabus any more',
     'The group chats stopped being about the syllabus. A thousand unremarkable days that turned out to be the entire point — late calls, terrible plans, far better company.'],
    ['20 September 2026', 'Twenty-six',
     'You get a whole website. It is not enough, but it is handmade, and next year I am aiming higher.'],
    ['From here', 'Everything after',
     'More birthdays, more photos for the deck, more of this absurd stroke of luck I keep getting away with.']
  ];

  /* ══════════════════ END EDIT ME ══════════════════════════ */

  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function age() {
    if (!CONFIG.birthYear) return null;
    var now = new Date(), y = now.getFullYear() - CONFIG.birthYear;
    var m = now.getMonth() + 1, d = now.getDate();
    if (m < CONFIG.birthMonth || (m === CONFIG.birthMonth && d < CONFIG.birthDay)) y--;
    return y;
  }

  /* ── Confetti ────────────────────────────────────────────── */
  var Confetti = (function () {
    var canvas = $('confetti'), ctx = canvas.getContext('2d');
    var pieces = [], raf = null, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var colours = ['#ff5f8d', '#f6c96b', '#b88cff', '#ffa7c0', '#7ad7c3', '#fff8f2'];

    function size() {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    addEventListener('resize', size);

    // x/y are viewport fractions; spread scales the initial kick
    function burst(n, y, x, spread) {
      if (reduced) return;
      n = n || 120;
      var oy = y == null ? 0.35 : y, ox = x == null ? 0.5 : x, sp = spread || 1;
      for (var i = 0; i < n; i++) {
        pieces.push({
          x: innerWidth * (ox + (Math.random() - 0.5) * 0.7 * sp),
          y: innerHeight * oy + (Math.random() - 0.5) * 60 * sp,
          vx: (Math.random() - 0.5) * 11 * sp,
          vy: Math.random() * -13 * sp - 4,
          w: 6 + Math.random() * 7,
          h: 4 + Math.random() * 9,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          c: colours[(Math.random() * colours.length) | 0],
          round: Math.random() < 0.28
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = pieces.length - 1; i >= 0; i--) {
        var p = pieces[i];
        p.vy += 0.34;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > innerHeight + 60) { pieces.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      raf = pieces.length ? requestAnimationFrame(tick) : (ctx.clearRect(0, 0, innerWidth, innerHeight), null);
    }

    return { burst: burst };
  })();

  /* ── Toast ───────────────────────────────────────────────── */
  var toastTimer;
  function toast(msg, ms) {
    var el = $('toast');
    el.textContent = msg;
    el.classList.add('is-up');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-up'); }, ms || 4200);
  }

  /* ── Ambient: bokeh + balloons ───────────────────────────── */
  function ambience() {
    if (reduced) return;
    var bokeh = $('bokeh'), frag = document.createDocumentFragment();
    for (var i = 0; i < 26; i++) {
      var s = document.createElement('span');
      var d = 8 + Math.random() * 26;
      s.style.left = (Math.random() * 100) + '%';
      s.style.width = s.style.height = d + 'px';
      s.style.animationDuration = (11 + Math.random() * 14) + 's';
      s.style.animationDelay = (-Math.random() * 20) + 's';
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 120 | 0) + 'px');
      frag.appendChild(s);
    }
    bokeh.appendChild(frag);

    var hues = ['#ff5f8d', '#f6c96b', '#b88cff', '#7ad7c3', '#ffa7c0'];
    var wrap = $('balloons'), frag2 = document.createDocumentFragment();
    for (var j = 0; j < 7; j++) {
      var b = document.createElement('div');
      b.className = 'balloon';
      var c = hues[j % hues.length];
      b.style.background = 'radial-gradient(circle at 32% 24%, rgba(255,255,255,.5) 2%, ' + c + ' 48%)';
      b.style.left = (4 + Math.random() * 92) + '%';
      b.style.animationDuration = (26 + Math.random() * 22) + 's';
      b.style.animationDelay = (-Math.random() * 40) + 's';
      b.style.transform = 'scale(' + (0.6 + Math.random() * 0.7) + ')';
      frag2.appendChild(b);
    }
    wrap.appendChild(frag2);
  }

  /* ── The card ────────────────────────────────────────────── */
  var opener = $('opener'), site = $('site');
  var openerTimers = [];

  function clearTimers() {
    openerTimers.forEach(clearTimeout);
    openerTimers = [];
  }
  function later(fn, ms) { openerTimers.push(setTimeout(fn, ms)); }

  function openCard() {
    if (opener.classList.contains('is-unsealed')) return;
    opener.classList.add('is-unsealed');
    later(function () { opener.classList.add('is-out'); }, 820);
    later(function () { opener.classList.add('is-open'); }, 1700);
    later(function () {
      Confetti.burst(150, 0.3);
      var btn = $('enterBtn');
      btn.hidden = false;
      requestAnimationFrame(function () { btn.classList.add('is-in'); });
      // the card sits in a fixed, non-scrolling layer, so make sure the button
      // is actually on screen on short laptop and landscape-tablet viewports
      later(function () {
        try { btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
      }, 400);
    }, 2700);
  }

  function enterSite() {
    if (opener.classList.contains('is-done')) return;
    opener.classList.add('is-done');
    document.body.classList.remove('is-sealed');
    site.setAttribute('aria-hidden', 'false');
    site.classList.add('is-live');
    try { sessionStorage.setItem('card-opened', '1'); } catch (e) {}
    later(function () { toast('Tap ♪ in the corner for the song'); }, 1400);
  }

  function replayCard() {
    clearTimers();
    try { sessionStorage.removeItem('card-opened'); } catch (e) {}
    opener.className = 'opener';
    var btn = $('enterBtn');
    btn.hidden = true;
    btn.classList.remove('is-in');
    site.classList.remove('is-live');
    site.setAttribute('aria-hidden', 'true');
    document.body.classList.add('is-sealed');
    opener.scrollTop = 0;
    scrollTo(0, 0);
  }

  function skipCard() {
    opener.classList.add('is-unsealed', 'is-out', 'is-open', 'is-done');
    document.body.classList.remove('is-sealed');
    site.setAttribute('aria-hidden', 'false');
    site.classList.add('is-live');
  }

  /* ── Stats ───────────────────────────────────────────────── */
  function renderStats() {
    var now = new Date();
    var isToday = (now.getMonth() + 1) === CONFIG.birthMonth && now.getDate() === CONFIG.birthDay;
    var items = [];

    if (isToday) {
      var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      var mins = Math.max(0, Math.round((end - now) / 60000));
      items.push([Math.floor(mins / 60) + 'h ' + (mins % 60) + 'm', 'left of your day']);
    } else {
      var next = new Date(now.getFullYear(), CONFIG.birthMonth - 1, CONFIG.birthDay);
      if (next < now) next.setFullYear(next.getFullYear() + 1);
      items.push([Math.ceil((next - now) / 86400000), 'days to go']);
    }

    if (CONFIG.birthYear) items.push([age(), 'years of you']);
    if (CONFIG.metYear) items.push([now.getFullYear() - CONFIG.metYear, 'years since ToC']);
    if (CONFIG.togetherSince) {
      var d = Math.floor((now - new Date(CONFIG.togetherSince)) / 86400000);
      if (d > 0) items.push([d.toLocaleString(), 'days of us']);
    }
    items.push(['∞', 'birthdays to go']);

    $('stats').innerHTML = items.map(function (it) {
      return '<li><b>' + it[0] + '</b><span>' + it[1] + '</span></li>';
    }).join('');
  }

  /* ── Cake ────────────────────────────────────────────────── */
  var candlesOut = false, mic = null;

  function buildCandles() {
    var a = age();
    var html;
    if (a) {
      // number candles, one per digit — 26 individual candles would not fit
      html = String(a).split('').map(function (d) {
        return '<div class="candle candle--num"><span class="smoke"></span>' +
               '<span class="flame"></span><span class="digit">' + d + '</span></div>';
      }).join('');
    } else {
      html = '';
      for (var i = 0; i < 6; i++) {
        html += '<div class="candle"><span class="smoke"></span><span class="flame"></span></div>';
      }
    }
    $('candles').innerHTML = html;
    $('candles').classList.toggle('is-numeric', !!a);
    candlesOut = false;
  }

  function blowOut(viaBreath) {
    if (candlesOut) return;
    candlesOut = true;
    var list = $('candles').querySelectorAll('.candle');
    list.forEach(function (c, i) {
      setTimeout(function () { c.classList.add('is-out'); }, i * 160);
    });
    setTimeout(function () {
      $('cake').classList.add('is-wished');
      Confetti.burst(180, 0.45);
      $('cakeStatus').textContent = viaBreath
        ? 'All of them. In one breath. Show-off. 🎂 Wish locked in.'
        : 'Candles: out. Wish: registered, and I am legally obliged to help it come true. 🎂';
      $('blowBtn').textContent = 'Light them again';
      stopMic();
    }, list.length * 160 + 200);
  }

  function relight() {
    buildCandles();
    $('cake').classList.remove('is-wished');
    $('cakeStatus').textContent = 'Candles: lit. Wish: pending.';
    $('blowBtn').textContent = 'Blow them out';
  }

  function stopMic() {
    if (!mic) return;
    try { mic.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    try { mic.ctx.close(); } catch (e) {}
    mic = null;
    $('micBtn').textContent = 'Use my breath 🎤';
  }

  function startMic() {
    if (mic) { stopMic(); $('cakeStatus').textContent = 'Microphone off.'; return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      $('cakeStatus').textContent = 'This browser will not lend me the microphone. Use the button instead.';
      return;
    }
    $('cakeStatus').textContent = 'Asking for the microphone…';
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      var src = ctx.createMediaStreamSource(stream);
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
      var buf = new Uint8Array(analyser.fftSize);
      mic = { ctx: ctx, stream: stream, loud: 0 };
      $('micBtn').textContent = 'Stop listening';
      $('cakeStatus').textContent = 'Listening… now blow at your screen like you mean it.';

      (function listen() {
        if (!mic) return;
        analyser.getByteTimeDomainData(buf);
        var sum = 0;
        for (var i = 0; i < buf.length; i++) {
          var v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        var rms = Math.sqrt(sum / buf.length);
        mic.loud = rms > 0.18 ? mic.loud + 1 : 0;
        if (mic.loud > 7) { blowOut(true); return; }
        requestAnimationFrame(listen);
      })();
    }).catch(function () {
      $('cakeStatus').textContent = 'No microphone, no problem — the button works just as well.';
    });
  }

  /* ── Photo deck ──────────────────────────────────────────── */
  var order = PHOTOS.map(function (_, i) { return i; });
  var deckEl, dragging = null;

  function renderDeck() {
    deckEl.innerHTML = PHOTOS.map(function (p, i) {
      return '<figure class="polaroid" data-i="' + i + '">' +
        '<img src="images/photos/' + p[0] + '.jpg" alt="' + p[1] + '" draggable="false" ' +
        (i < 2 ? '' : 'loading="lazy" ') + 'decoding="async">' +
        '<figcaption>' + p[1] + '</figcaption></figure>';
    }).join('');
    layoutDeck();
  }

  function layoutDeck() {
    var cards = deckEl.children;
    order.forEach(function (photoIdx, pos) {
      var el = cards[photoIdx];
      el.style.zIndex = order.length - pos;
      el.classList.toggle('is-top', pos === 0);
      el.style.pointerEvents = pos === 0 ? 'auto' : 'none';
      if (pos === 0) {
        el.style.transform = '';
        el.style.opacity = '1';
      } else if (pos < 4) {
        el.style.transform = 'translateY(' + (pos * -10) + 'px) scale(' + (1 - pos * 0.05) +
                             ') rotate(' + (pos % 2 ? 1.6 : -1.6) * pos + 'deg)';
        el.style.opacity = '1';
      } else {
        el.style.transform = 'translateY(-30px) scale(0.85)';
        el.style.opacity = '0';
      }
    });
    // order[0] is the photo currently on top, and order starts in sequence,
    // so it doubles as the position in the deck
    $('deckCount').textContent = (order[0] + 1) + ' / ' + PHOTOS.length;
  }

  function sendToBack(dir) {
    var top = deckEl.querySelector('.is-top');
    if (!top) return;
    top.style.transform = 'translateX(' + (dir * 130) + '%) rotate(' + (dir * 22) + 'deg)';
    top.style.opacity = '0';
    setTimeout(function () {
      order.push(order.shift());
      layoutDeck();
    }, 340);
  }

  function bringToFront() {
    order.unshift(order.pop());
    var top = deckEl.children[order[0]];
    top.classList.add('no-anim');
    top.style.transform = 'translateX(-130%) rotate(-22deg)';
    top.style.opacity = '0';
    void top.offsetWidth;            // flush, so the move back in animates
    top.classList.remove('no-anim');
    layoutDeck();
  }

  function wireDeck() {
    deckEl.addEventListener('pointerdown', function (e) {
      var top = e.target.closest('.polaroid.is-top');
      if (!top) return;
      dragging = { el: top, x: e.clientX, y: e.clientY, dx: 0, moved: false, id: e.pointerId };
      top.setPointerCapture(e.pointerId);
      top.style.transition = 'none';
    });

    deckEl.addEventListener('pointermove', function (e) {
      if (!dragging || e.pointerId !== dragging.id) return;
      dragging.dx = e.clientX - dragging.x;
      var dy = e.clientY - dragging.y;
      if (Math.abs(dragging.dx) > 6 || Math.abs(dy) > 6) dragging.moved = true;
      dragging.el.style.transform =
        'translate(' + dragging.dx + 'px,' + dy * 0.25 + 'px) rotate(' + dragging.dx * 0.06 + 'deg)';
    });

    function release(e) {
      if (!dragging || (e && e.pointerId !== dragging.id)) return;
      var d = dragging;
      dragging = null;
      d.el.style.transition = '';
      if (!d.moved) { openLb(order[0]); layoutDeck(); return; }
      if (Math.abs(d.dx) > 70) sendToBack(d.dx > 0 ? 1 : -1);
      else layoutDeck();
    }
    deckEl.addEventListener('pointerup', release);
    deckEl.addEventListener('pointercancel', release);

    deckEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(order[0]); }
      if (e.key === 'ArrowRight') { e.preventDefault(); sendToBack(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); bringToFront(); }
    });

    $('deckNext').addEventListener('click', function () { sendToBack(1); });
    $('deckPrev').addEventListener('click', bringToFront);
  }

  /* ── Lightbox ────────────────────────────────────────────── */
  function openLb(i) {
    var p = PHOTOS[(i + PHOTOS.length) % PHOTOS.length];
    $('lbImg').src = 'images/photos/' + p[0] + '.jpg';
    $('lbImg').alt = p[1];
    $('lbCap').textContent = p[1];
    $('lightbox').hidden = false;
    document.body.style.overflow = 'hidden';
    $('lbClose').focus();
  }
  function closeLb() {
    $('lightbox').hidden = true;
    document.body.style.overflow = '';
  }

  /* ── Balloon pop ─────────────────────────────────────────── */
  var popped = 0;
  var popHues = ['#ff5f8d', '#f6c96b', '#b88cff', '#7ad7c3', '#ffa7c0', '#ff8a5c', '#5aa9e6'];

  function renderPops() {
    $('pops').innerHTML = POP_WORDS.map(function (w, i) {
      var c = popHues[i % popHues.length];
      return '<button class="pop" type="button" data-i="' + i + '" aria-label="Pop balloon ' + (i + 1) + '">' +
        '<span class="pop__skin" style="--c:' + c + '"></span></button>';
    }).join('');
    $('popLine').innerHTML = POP_WORDS.map(function (w, i) {
      return '<span class="word" data-i="' + i + '">' + w + '</span>';
    }).join(' ');
    $('popHint').textContent = 'Pop all ' + POP_WORDS.length + ' to read the message.';
  }

  function popBalloon(btn) {
    if (btn.classList.contains('is-popped')) return;
    btn.classList.add('is-popped');
    btn.disabled = true;
    var i = +btn.dataset.i;
    $('popLine').querySelector('.word[data-i="' + i + '"]').classList.add('is-shown');

    var r = btn.getBoundingClientRect();
    Confetti.burst(18, (r.top + r.height / 2) / innerHeight, (r.left + r.width / 2) / innerWidth, 0.45);

    popped++;
    if (popped === POP_WORDS.length) {
      $('popHint').textContent = 'That is the whole message. It was true before the balloons, too.';
      setTimeout(function () { Confetti.burst(200, 0.5); }, 350);
      // collapse the empty balloon row so the message settles in the middle
      var pops = $('pops');
      pops.style.height = pops.offsetHeight + 'px';
      setTimeout(function () { pops.classList.add('is-cleared'); }, 500);
    } else {
      $('popHint').textContent = (POP_WORDS.length - popped) + ' to go.';
    }
  }

  /* ── Gifts ───────────────────────────────────────────────── */
  var opened = 0;
  var giftColours = [['#ff5f8d', '#b88cff'], ['#f6c96b', '#ff8a5c'], ['#7ad7c3', '#5aa9e6'],
                     ['#b88cff', '#5aa9e6'], ['#ffa7c0', '#f6c96b'], ['#5aa9e6', '#7ad7c3'],
                     ['#ff8a5c', '#ff5f8d'], ['#f6c96b', '#b88cff']];

  function renderGifts() {
    $('giftGrid').innerHTML = GIFTS.map(function (g, i) {
      var c = giftColours[i % giftColours.length];
      return '<button class="gift" type="button" data-i="' + i + '" aria-label="Open gift ' + (i + 1) + '">' +
        '<span class="gift__reveal"><h3>' + g[1] + '</h3><p>' + g[2] + '</p></span>' +
        '<span class="gift__box" style="--c1:' + c[0] + ';--c2:' + c[1] + '"></span>' +
        '<span class="gift__lid"></span>' +
        '<span class="gift__tag">' + g[0] + '</span></button>';
    }).join('');
    $('giftCount').textContent = '0 of ' + GIFTS.length + ' opened';
  }

  function openGift(btn) {
    if (btn.classList.contains('is-open')) return;
    btn.classList.add('is-open');
    opened++;
    $('giftCount').textContent = opened + ' of ' + GIFTS.length + ' opened';
    if (opened === GIFTS.length) {
      Confetti.burst(200, 0.5);
      $('giftCount').textContent = 'All ' + GIFTS.length + ' opened — and that was the short list. ❤';
    }
  }

  /* ── Timeline ────────────────────────────────────────────── */
  function renderTimeline() {
    $('timeline').innerHTML = TIMELINE.map(function (t) {
      return '<li><span class="when">' + t[0] + '</span><h3>' + t[1] + '</h3><p>' + t[2] + '</p></li>';
    }).join('');
  }

  /* ── Letter ──────────────────────────────────────────────── */
  var letterDone = false, letterTimer = null;

  function revealLetter() {
    if (letterDone) return;
    letterDone = true;
    clearTimeout(letterTimer);
    $('letterOut').innerHTML = $('letterSource').innerHTML;
    $('letterSkip').hidden = true;
  }

  function typeLetter() {
    var paras = Array.prototype.map.call($('letterSource').children, function (p) { return p.innerHTML; });
    var out = $('letterOut');
    var pi = 0;

    function nextPara() {
      if (pi >= paras.length) { letterDone = true; $('letterSkip').hidden = true; return; }
      var el = document.createElement('p');
      var caret = document.createElement('span');
      caret.className = 'caret';
      out.appendChild(el);
      el.appendChild(caret);

      var text = paras[pi], ci = 0;
      (function step() {
        if (letterDone) return;
        ci += 2;
        el.innerHTML = text.slice(0, ci);
        el.appendChild(caret);
        if (ci < text.length) {
          letterTimer = setTimeout(step, 16);
        } else {
          el.innerHTML = text;
          pi++;
          letterTimer = setTimeout(nextPara, 420);
        }
      })();
    }
    nextPara();
  }

  /* ── The song (Web Audio, no files) ──────────────────────── */
  var Song = (function () {
    var N = { G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
    var MELODY = [
      ['G4', .5], ['G4', .5], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
      ['G4', .5], ['G4', .5], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
      ['G4', .5], ['G4', .5], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
      ['F5', .5], ['F5', .5], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3]
    ];
    var ctx = null, master = null, playing = false, loopTimer = null;

    function note(freq, at, dur) {
      var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle';
      o2.type = 'sine';
      o.frequency.value = freq;
      o2.frequency.value = freq * 2;
      o2.detune.value = 6;
      var g2 = ctx.createGain();
      g2.gain.value = 0.22;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.32, at + 0.03);
      g.gain.exponentialRampToValueAtTime(0.16, at + dur * 0.55);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur * 0.98);
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(master);
      o.start(at); o2.start(at);
      o.stop(at + dur); o2.stop(at + dur);
    }

    function schedule() {
      var beat = 0.52, t = ctx.currentTime + 0.12;
      MELODY.forEach(function (m) {
        note(N[m[0]], t, m[1] * beat * 0.96);
        t += m[1] * beat;
      });
      loopTimer = setTimeout(function () { if (playing) schedule(); }, (t - ctx.currentTime + 1.1) * 1000);
    }

    function start() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { toast('This browser will not play the song, sorry.'); return false; }
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        var filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 3200;
        master.connect(filter);
        filter.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume();
      playing = true;
      schedule();
      return true;
    }

    function stop() {
      playing = false;
      clearTimeout(loopTimer);
      if (ctx) { try { ctx.close(); } catch (e) {} ctx = null; }
    }

    return {
      toggle: function () {
        if (playing) { stop(); return false; }
        return start();
      }
    };
  })();

  /* ── Scroll reveal ───────────────────────────────────────── */
  function watchReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-shown'); });
      typeLetter();
      return;
    }
    // threshold stays at 0: some sections are far taller than the viewport, so
    // any ratio-based threshold could never be satisfied for them.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-shown');
        io.unobserve(e.target);
        if (e.target.closest('#letter')) {
          reduced ? revealLetter() : typeLetter();
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Wiring ──────────────────────────────────────────────── */
  function init() {
    $('openerTo').innerHTML = 'a letter for <span>' + CONFIG.name + '</span>';
    var a = age();
    if (a) {
      $('cardAge').textContent = a;
      $('heroAge').textContent = a;
    }

    ambience();
    renderStats();
    setInterval(renderStats, 30000);
    buildCandles();

    deckEl = $('deck');
    renderDeck();
    wireDeck();

    renderPops();
    renderGifts();
    renderTimeline();
    watchReveals();

    // card
    $('seal').addEventListener('click', openCard);
    $('stage').addEventListener('click', openCard);
    $('enterBtn').addEventListener('click', enterSite);
    // once the card is open, a tap anywhere gets her in — the button can sit
    // off screen on short viewports and this is the guaranteed way through
    opener.addEventListener('click', function () {
      if (opener.classList.contains('is-open')) enterSite();
    });
    $('replayBtn').addEventListener('click', replayCard);
    $('footerReplay').addEventListener('click', replayCard);

    var alreadyOpened = false;
    try { alreadyOpened = sessionStorage.getItem('card-opened') === '1'; } catch (e) {}
    if (alreadyOpened) skipCard();

    // hero
    $('confettiBtn').addEventListener('click', function () { Confetti.burst(220, 0.55); });

    // cake
    $('blowBtn').addEventListener('click', function () { candlesOut ? relight() : blowOut(false); });
    $('micBtn').addEventListener('click', startMic);

    // lightbox
    $('lbClose').addEventListener('click', closeLb);
    $('lightbox').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeLb(); });
    addEventListener('keydown', function (e) {
      if (!$('lightbox').hidden && e.key === 'Escape') closeLb();
    });

    // balloons
    $('pops').addEventListener('click', function (e) {
      var b = e.target.closest('.pop');
      if (b) popBalloon(b);
    });

    // gifts
    $('giftGrid').addEventListener('click', function (e) {
      var g = e.target.closest('.gift');
      if (g) openGift(g);
    });

    // letter
    $('letterSkip').addEventListener('click', revealLetter);

    // song
    $('musicBtn').addEventListener('click', function () {
      var on = Song.toggle();
      this.setAttribute('aria-pressed', on ? 'true' : 'false');
      this.title = on ? 'Stop the birthday song' : 'Play the birthday song';
      if (on) toast('🎵 Happy birthday to you…');
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
