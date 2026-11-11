(function () {
  var M = window.MESSAGE || { lines: [] };
  var $ = function (id) { return document.getElementById(id); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  $("hint").textContent = M.hint || "";

  /* ── starfield ── */
  var cv = $("stars"), ctx = cv.getContext("2d"), stars = [];
  function resize() {
    var d = window.devicePixelRatio || 1;
    cv.width = innerWidth * d; cv.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    stars = [];
    var n = Math.round(innerWidth * innerHeight / 7000);
    for (var i = 0; i < n; i++) {
      stars.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        r: Math.random() * 1.3 + 0.2, p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.005 });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    stars.forEach(function (s) {
      s.p += s.s;
      ctx.globalAlpha = 0.25 + 0.55 * Math.abs(Math.sin(s.p));
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize);
  resize(); draw();

  /* ── hearts ── */
  function hearts(count) {
    for (var i = 0; i < count; i++) {
      var h = document.createElement("span");
      h.className = "heart";
      h.textContent = "♥";
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 12 + Math.random() * 18 + "px";
      h.style.animationDuration = 6 + Math.random() * 6 + "s";
      h.style.animationDelay = Math.random() * 3 + "s";
      document.body.appendChild(h);
      setTimeout(function (el) { el.remove(); }.bind(null, h), 14000);
    }
  }

  /* ── flow ── */
  var started = false;
  function show(id) {
    document.querySelectorAll(".scene").forEach(function (s) { s.classList.remove("is-active"); });
    $(id).classList.add("is-active");
  }

  async function start() {
    if (started) return;
    started = true;
    hearts(8);

    // make a wish
    show("wish");
    $("wishLine").textContent = M.wishLine || "";
    await wait(4200);

    // the letter
    show("letter");
    await wait(1800);
    var body = $("letterBody");
    var scroller = $("letter");
    for (var i = 0; i < M.lines.length; i++) {
      var p = document.createElement("p");
      p.textContent = M.lines[i];
      body.appendChild(p);
      void p.offsetWidth;
      p.classList.add("show");
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
      // longer lines linger longer; blank lines are short pauses
      await wait(M.lines[i] ? 1200 + M.lines[i].length * 16 : 700);
    }
    if (M.signature) {
      $("sign").textContent = M.signature;
      $("sign").classList.add("show");
    }
    await wait(1200);
    hearts(18);
  }

  $("clockBtn").addEventListener("click", start);
})();
