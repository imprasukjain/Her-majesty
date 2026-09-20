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
    birthYear: null,        // e.g. 2001 — unlocks the "years of you" tile + that many candles
    togetherSince: null,    // e.g. '2023-02-14' — unlocks the "days of us" tile
    candles: 6              // used when birthYear is null
  };

  // Photos. cat: 'her' | 'us' | 'crew'.  Files live in images/thumb/ and images/full/.
  // To add one: drop the pair in those folders and add a line here.
  var PHOTOS = [
    ['hero', 'her',  'The smile that runs my whole day'],
    ['g01',  'her',  'Yellow wall. Main character.'],
    ['g02',  'her',  'Hotel corridors never recovered'],
    ['g03',  'her',  'Stairs? More like a runway'],
    ['g04',  'her',  'Sat down. Ended the conversation.'],
    ['g05',  'her',  'Parks are prettier when she is in them'],
    ['g06',  'her',  'Out-colouring an already colourful street'],
    ['g07',  'her',  'Purple hour, golden girl'],
    ['g08',  'her',  'Caught mid-joy'],
    ['g09',  'her',  'Every lighting director’s favourite subject'],
    ['g10',  'her',  'Nobody dances down a hallway like this'],
    ['g11',  'her',  'Unbothered. Thriving. Slightly dangerous.'],
    ['g12',  'her',  'Blue backdrop, zero competition'],
    ['g13',  'her',  'Peace, but make it iconic'],
    ['g14',  'her',  'Too cool for the entire afternoon'],
    ['g15',  'her',  'Small in the frame, enormous in my head'],
    ['g16',  'her',  'Two fingers, one heart attack'],
    ['g17',  'her',  'Villain origin story — in a good way'],
    ['g18',  'her',  'Mustard wall, full attitude'],
    ['g19',  'her',  'Sunlight, clearly, has favourites'],
    ['g20',  'her',  'Golden hour reports to her'],
    ['g21',  'her',  'The balloons already knew whose day it was'],
    ['g22',  'her',  'Every path looks better with her on it'],
    ['g24',  'her',  'Even her serious face is a problem'],
    ['g25',  'her',  'Black and white, still the brightest thing'],
    ['g26',  'her',  'Hair flip. The camera barely survived.'],
    ['g27',  'her',  'Sitting on stairs like they are a throne'],
    ['g28',  'her',  'Whole hallway, whole happiness'],
    ['p01',  'her',  'Rooftop, looking up, completely unbothered'],
    ['p02',  'her',  'The night the pink dress won'],
    ['p03',  'her',  'The fairy lights met their match'],
    ['us01', 'us',   'Us, dressed up, pretending to be normal people'],
    ['us02', 'us',   'Formal wear, deeply informal love'],
    ['us03', 'us',   'My favourite photo of my favourite face'],
    ['us04', 'us',   'The two of us, done up properly'],
    ['us05', 'us',   'Peace signs and permanent plans'],
    ['us06', 'us',   'Close enough to hear the heartbeat'],
    ['us07', 'us',   'Under the lights, holding on'],
    ['us08', 'us',   'Sunshine, sunglasses, you'],
    ['us09', 'us',   'Doing nothing, doing it perfectly'],
    ['us10', 'us',   'Elegance is overrated anyway'],
    ['f01',  'crew', 'Her and her partner in crime'],
    ['f02',  'crew', 'Food, friends, full volume'],
    ['f03',  'crew', 'The whole crew, one frame'],
    ['f04',  'crew', 'Chaos — but the good kind']
  ];

  // Photos whose shape is not the usual 3:4 portrait. This only exists so the
  // grid reserves the right space while lazy images load — leave a new photo
  // out and it simply gets 3:4.
  var RATIOS = {
    f02: '4/3', f03: '4/3', f04: '4/3', us04: '4/3', us08: '4/3', us09: '4/3',
    hero: '9/16', g07: '9/16', g25: '9/16', us03: '9/16', us05: '9/16', us06: '9/16', us10: '9/16'
  };

  var GIFTS = [
    ['🎈', 'Your laugh',        'It arrives before the punchline lands and hangs around long after. Best sound my phone has ever recorded.'],
    ['🌙', 'Your 2am brain',    'Softer, funnier, more honest than the daytime edition. I would lose sleep for it every single night.'],
    ['🔥', 'Your fight',        'Life handed you hard things and you kept showing up anyway. That is not stubbornness, that is spine.'],
    ['☕',       'Your ordinary days','You make groceries, traffic and a random Tuesday feel like something worth turning up for.'],
    ['💌', 'Your memory',       'You hold on to the small things nobody else clocked. Everyone you love feels seen because of it.'],
    ['🎧', 'Your taste',        'Songs, outfits, food, people — somehow always right. Honestly a bit unfair on the rest of us.'],
    ['🛟', 'Your instinct',     'You know something is wrong with me before I have said a word, and you have never once been mistaken.'],
    ['♾️', 'Everything else',   'Eight boxes was never going to be enough. Ask me in person — the real list does not fit on a website.']
  ];

  var TIMELINE = [
    ['Before',    'The world, pre-you',   'Fine, honestly. Functional. Just running in a noticeably duller colour palette than it does now.'],
    ['Day one',   'The first time',       'You said something funny inside the first two minutes and I remember thinking, very clearly: oh no. This one is going to matter.'],
    ['The middle','Becoming us',          'A thousand unremarkable days that turned out to be the entire point — late calls, terrible plans, far better company.'],
    ['Today',     '20 September',         'You get a whole website. It is not enough, but it is handmade, and next year I am aiming higher.'],
    ['From here', 'Everything after',     'More birthdays, more photos for the wall, more of this absurd stroke of luck I keep getting away with.']
  ];

  /* ══════════════════ END EDIT ME ══════════════════════════ */

  var $ = function (id) { return document.getElementById(id); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    function burst(n, originY) {
      if (reduced) return;
      n = n || 120;
      var oy = originY == null ? 0.35 : originY;
      for (var i = 0; i < n; i++) {
        pieces.push({
          x: innerWidth * (0.5 + (Math.random() - 0.5) * 0.7),
          y: innerHeight * oy + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 11,
          vy: Math.random() * -13 - 4,
          w: 6 + Math.random() * 7,
          h: 4 + Math.random() * 9,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          c: colours[(Math.random() * colours.length) | 0],
          round: Math.random() < 0.28,
          life: 1
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
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
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
      Confetti.burst(reduced ? 0 : 150, 0.3);
      var btn = $('enterBtn');
      btn.hidden = false;
      requestAnimationFrame(function () { btn.classList.add('is-in'); });
    }, 2700);
  }

  function enterSite() {
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

    if (CONFIG.birthYear) {
      var age = now.getFullYear() - CONFIG.birthYear - (isToday || (now.getMonth() + 1) > CONFIG.birthMonth ||
        ((now.getMonth() + 1) === CONFIG.birthMonth && now.getDate() > CONFIG.birthDay) ? 0 : 1);
      items.push([age, 'years of you']);
    }
    if (CONFIG.togetherSince) {
      var d = Math.floor((now - new Date(CONFIG.togetherSince)) / 86400000);
      if (d > 0) items.push([d.toLocaleString(), 'days of us']);
    }

    items.push([PHOTOS.length, 'exhibits of proof']);
    items.push(['∞', 'birthdays to go']);

    $('stats').innerHTML = items.map(function (it) {
      return '<li><b>' + it[0] + '</b><span>' + it[1] + '</span></li>';
    }).join('');
  }

  /* ── Cake ────────────────────────────────────────────────── */
  var candlesOut = false, mic = null;

  function buildCandles() {
    var n = CONFIG.birthYear ? Math.min(12, Math.max(3, new Date().getFullYear() - CONFIG.birthYear)) : CONFIG.candles;
    var html = '';
    for (var i = 0; i < n; i++) {
      html += '<div class="candle"><span class="smoke"></span><span class="flame"></span></div>';
    }
    $('candles').innerHTML = html;
    candlesOut = false;
  }

  function blowOut(viaBreath) {
    if (candlesOut) return;
    candlesOut = true;
    var list = $('candles').querySelectorAll('.candle');
    list.forEach(function (c, i) {
      setTimeout(function () { c.classList.add('is-out'); }, i * 130);
    });
    setTimeout(function () {
      $('cake').classList.add('is-wished');
      Confetti.burst(180, 0.45);
      $('cakeStatus').textContent = viaBreath
        ? 'All of them. In one breath. Show-off. 🎂 Wish locked in.'
        : 'Candles: out. Wish: registered, and I am legally obliged to help it come true. 🎂';
      $('blowBtn').textContent = 'Light them again';
      stopMic();
    }, list.length * 130 + 200);
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

  /* ── Gallery ─────────────────────────────────────────────── */
  var FILTERS = [['all', 'Everything'], ['her', 'You'], ['us', 'Us'], ['crew', 'Your people']];
  var visible = PHOTOS.slice();

  function renderFilters() {
    $('filters').innerHTML = FILTERS.map(function (f, i) {
      return '<button class="filter' + (i === 0 ? ' is-on' : '') + '" data-cat="' + f[0] + '" type="button">' + f[1] + '</button>';
    }).join('');
  }

  function renderGrid(cat) {
    visible = cat === 'all' ? PHOTOS.slice() : PHOTOS.filter(function (p) { return p[1] === cat; });
    $('photoGrid').innerHTML = visible.map(function (p, i) {
      var tilt = ((i * 37) % 5 - 2) * 0.7;
      return '<figure class="shot" data-i="' + i + '" tabindex="0" role="button" style="--tilt:' + tilt.toFixed(2) + 'deg;animation-delay:' + Math.min(i * 40, 600) + 'ms">' +
        '<img src="images/thumb/' + p[0] + '.jpg" alt="' + p[2] + '" loading="lazy" decoding="async" ' +
        'style="aspect-ratio:' + (RATIOS[p[0]] || '3/4') + '">' +
        '<figcaption>' + p[2] + '</figcaption></figure>';
    }).join('');
  }

  /* ── Lightbox ────────────────────────────────────────────── */
  var lbIndex = 0;

  function openLb(i) {
    lbIndex = (i + visible.length) % visible.length;
    var p = visible[lbIndex];
    $('lbImg').src = 'images/full/' + p[0] + '.jpg';
    $('lbImg').alt = p[2];
    $('lbCap').textContent = p[2];
    $('lightbox').hidden = false;
    document.body.style.overflow = 'hidden';
    $('lbClose').focus();
  }
  function closeLb() {
    $('lightbox').hidden = true;
    document.body.style.overflow = '';
  }
  function stepLb(d) { openLb(lbIndex + d); }

  /* ── Gifts ───────────────────────────────────────────────── */
  var opened = 0;
  var giftColours = [['#ff5f8d', '#b88cff'], ['#f6c96b', '#ff8a5c'], ['#7ad7c3', '#5aa9e6'],
                     ['#b88cff', '#5aa9e6'], ['#ffa7c0', '#f6c96b'], ['#5aa9e6', '#7ad7c3'],
                     ['#ff8a5c', '#ff5f8d'], ['#f6c96b', '#b88cff', 315, 560]];

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
    var ctx = null, master = null, playing = false, stopAt = 0, loopTimer = null;

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
      stopAt = t;
      loopTimer = setTimeout(function () { if (playing) schedule(); }, (stopAt - ctx.currentTime + 1.1) * 1000);
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
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-shown');
        io.unobserve(e.target);
        if (e.target.closest('#letter')) {
          reduced ? revealLetter() : typeLetter();
        }
      });
    // threshold stays at 0: the gallery and gift sections are far taller than the
    // viewport, so any ratio-based threshold can never be satisfied for them.
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Wiring ──────────────────────────────────────────────── */
  function init() {
    $('openerTo').innerHTML = 'a letter for <span>' + CONFIG.name + '</span>';
    ambience();
    renderStats();
    setInterval(renderStats, 30000);
    buildCandles();
    renderFilters();
    renderGrid('all');
    renderGifts();
    renderTimeline();
    watchReveals();

    // card
    $('seal').addEventListener('click', openCard);
    $('stage').addEventListener('click', openCard);
    $('enterBtn').addEventListener('click', enterSite);
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

    // gallery
    $('filters').addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      $('filters').querySelectorAll('.filter').forEach(function (f) { f.classList.remove('is-on'); });
      b.classList.add('is-on');
      renderGrid(b.dataset.cat);
    });
    $('photoGrid').addEventListener('click', function (e) {
      var s = e.target.closest('.shot');
      if (s) openLb(+s.dataset.i);
    });
    $('photoGrid').addEventListener('keydown', function (e) {
      var s = e.target.closest('.shot');
      if (s && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLb(+s.dataset.i); }
    });

    // lightbox
    $('lbClose').addEventListener('click', closeLb);
    $('lbPrev').addEventListener('click', function () { stepLb(-1); });
    $('lbNext').addEventListener('click', function () { stepLb(1); });
    $('lightbox').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeLb(); });
    addEventListener('keydown', function (e) {
      if ($('lightbox').hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') stepLb(-1);
      if (e.key === 'ArrowRight') stepLb(1);
    });
    var tx = 0;
    $('lightbox').addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    $('lightbox').addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 55) stepLb(dx < 0 ? 1 : -1);
    }, { passive: true });

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
