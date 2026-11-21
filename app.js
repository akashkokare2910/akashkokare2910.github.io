// Progressive enhancement: without this script every panel is shown in sequence.
(function () {
  var root = document.documentElement;

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var hashFor = { "tab-eng": "engineering", "tab-res": "research", "tab-per": "tools" };
  // Old links used #personal for the Tools tab.
  if (location.hash === "#personal" && history.replaceState) history.replaceState(null, "", "#tools");

  function select(tab, moveFocus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (moveFocus) tab.focus();
    if (history.replaceState) history.replaceState(null, "", "#" + hashFor[tab.id]);
  }

  if (tabs.length) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    var initial = tabs[0];
    var wanted = location.hash.slice(1);
    tabs.forEach(function (t) { if (hashFor[t.id] === wanted) initial = t; });
    tabs.forEach(function (t) {
      document.getElementById(t.getAttribute("aria-controls")).hidden = t !== initial;
      t.setAttribute("aria-selected", t === initial ? "true" : "false");
      t.tabIndex = t === initial ? 0 : -1;
    });

    // In-page links such as #research open that tab and bring it into view.
    window.addEventListener("hashchange", function () {
      var wanted = location.hash.slice(1);
      tabs.forEach(function (t) {
        if (hashFor[t.id] !== wanted) return;
        select(t, false);
        document.getElementById("work").scrollIntoView();
      });
    });
  }

  var grid = document.querySelector(".grid");
  var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-version]"));
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var v = btn.getAttribute("data-version");
      grid.setAttribute("data-state", v);
      toggles.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      document.querySelectorAll(".state-text").forEach(function (s) { s.hidden = s.getAttribute("data-for") !== v; });
    });
  });

  root.classList.remove("no-js");
})();

// Yug model card: toggle, keep inside the viewport, close on Escape or outside click.
(function () {
  var toggle = document.querySelector(".hf-toggle");
  if (!toggle) return;
  var card = document.getElementById(toggle.getAttribute("aria-controls"));
  var wrap = toggle.parentNode;
  function place() {
    card.style.left = "0px";
    var r = card.getBoundingClientRect();
    var overflow = r.right - (document.documentElement.clientWidth - 16);
    if (overflow > 0) card.style.left = -overflow + "px";
  }
  function set(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    card.hidden = !open;
    if (open) place();
  }
  toggle.addEventListener("click", function () { set(card.hidden); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !card.hidden) { set(false); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!card.hidden && !wrap.contains(e.target)) set(false);
  });
  window.addEventListener("resize", function () { if (!card.hidden) place(); });
})();

// Photos on a time axis: each print sits at its month, linked to the axis by a leader line.
// Plays forward through time every few seconds while in view. Hover pauses it; picking a print stops it.
(function () {
  var section = document.querySelector(".moments");
  if (!section) return;
  var axis = section.querySelector(".m-axis");
  var wrap = section.querySelector(".m-axis-wrap");
  var svg = section.querySelector(".m-leaders");
  var img = section.querySelector(".m-img img");
  var timer = section.querySelector(".m-timer");
  var cap = section.querySelector(".m-cap");
  var items = Array.prototype.slice.call(section.querySelectorAll(".m-point"));
  var buttons = items.map(function (li) { return li.querySelector("button"); });
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DWELL = 3000;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function monthOf(d) { var a = d.split("-"); return Number(a[0]) * 12 + Number(a[1]) - 1; }
  function label(d) { var a = d.split("-"); return MONTHS[Number(a[1]) - 1] + " " + a[0]; }

  var now = new Date();
  var todayM = now.getFullYear() * 12 + now.getMonth() + now.getDate() / 31;
  var months = items.map(function (li) { return monthOf(li.getAttribute("data-date")) + 0.5; });
  var start = Math.floor(Math.min.apply(null, months)) - 2;
  var end = Math.ceil(todayM) + 2;
  function x(m) { return ((m - start) / (end - start)) * 100; }

  for (var m = start; m <= end; m++) {
    var t = document.createElement("i");
    var quarter = m % 3 === 0;
    t.className = "m-tick" + (quarter ? " major" : "");
    t.style.left = x(m) + "%";
    if (quarter) t.innerHTML = "<span>" + MONTHS[m % 12] + " " + Math.floor(m / 12) + "</span>";
    axis.appendChild(t);
  }
  section.querySelector(".m-line").style.width = x(todayM) + "%";
  section.querySelector(".m-future").style.left = x(todayM) + "%";
  section.querySelector(".m-today").style.left = x(todayM) + "%";
  var dots = months.map(function (mm) {
    var d = document.createElement("i");
    d.className = "m-dot";
    d.style.left = x(mm) + "%";
    axis.appendChild(d);
    return d;
  });

  // Place prints as close above their dates as they fit, left to right, then draw the leaders.
  function layout() {
    var w = axis.clientWidth, h = axis.clientHeight, base = 30, gap = 12;
    var size = buttons[0].offsetWidth || 98;
    var lefts = [], prev = -Infinity;
    months.forEach(function (mm) {
      var l = Math.max((x(mm) / 100) * w - size / 2, prev + gap, 0);
      lefts.push(l);
      prev = l + size;
    });
    var over = prev - w;
    if (over > 0) lefts = lefts.map(function (l) { return Math.max(0, l - over); });
    svg.innerHTML = "";
    items.forEach(function (li, i) {
      li.style.left = lefts[i] + "px";
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", lefts[i] + size / 2);
      line.setAttribute("y1", size + 1);
      line.setAttribute("x2", (x(months[i]) / 100) * w);
      line.setAttribute("y2", h - base);
      if (i === at) line.setAttribute("class", "is-on");
      svg.appendChild(line);
    });
  }

  var at = 0, wait = null;
  var paused = false, hover = false, focused = false, inView = false;
  function canRun() { return !reduce && !paused && !hover && !focused && inView && !document.hidden; }
  function stopTimer() { clearTimeout(wait); timer.classList.remove("is-running"); }
  function schedule() {
    stopTimer();
    if (!canRun()) return;
    void timer.offsetWidth; // restart the timer bar
    timer.classList.add("is-running");
    wait = setTimeout(function () { select((at + 1) % items.length, false); }, DWELL);
  }

  function select(i, byReader) {
    at = i;
    var li = items[i];
    items.forEach(function (el, k) {
      el.classList.toggle("is-on", k === i);
      dots[k].classList.toggle("is-on", k === i);
      buttons[k].setAttribute("aria-pressed", k === i ? "true" : "false");
      buttons[k].tabIndex = k === i ? 0 : -1;
    });
    Array.prototype.forEach.call(svg.children, function (line, k) { line.setAttribute("class", k === i ? "is-on" : ""); });
    cap.setAttribute("aria-live", byReader ? "polite" : "off");
    cap.querySelector(".m-date").textContent = label(li.getAttribute("data-date"));
    cap.querySelector(".m-place").textContent = li.getAttribute("data-place");
    cap.querySelector(".m-text").textContent = li.getAttribute("data-text");
    cap.querySelector(".m-count").textContent = (i + 1) + " of " + items.length;
    if (byReader) paused = true;
    stopTimer();
    // Fade out, load, fade in; the next photo's countdown starts once this one is showing.
    var want = li.getAttribute("data-full");
    var show = function () {
      if (at !== i) return;
      img.alt = li.querySelector("img").alt + ".";
      var done = function () { if (at === i) { img.classList.remove("is-out"); schedule(); } };
      img.onload = done;
      img.src = want;
      if (img.complete) done();
    };
    if (reduce || img.getAttribute("src") === want) show(); else { img.classList.add("is-out"); setTimeout(show, 180); }
    if (wrap.scrollWidth > wrap.clientWidth) {
      var b = buttons[i].getBoundingClientRect(), r = wrap.getBoundingClientRect();
      wrap.scrollTo({ left: wrap.scrollLeft + (b.left + b.width / 2) - (r.left + r.width / 2), behavior: reduce ? "auto" : "smooth" });
    }
  }

  buttons.forEach(function (b, i) {
    b.addEventListener("click", function () { select(i, true); });
    b.addEventListener("keydown", function (e) {
      var k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      k = Math.max(0, Math.min(items.length - 1, k));
      select(k, true);
      buttons[k].focus({ preventScroll: true });
    });
  });
  section.addEventListener("mouseenter", function () { hover = true; stopTimer(); });
  section.addEventListener("mouseleave", function () { hover = false; schedule(); });
  section.addEventListener("focusin", function () { focused = true; stopTimer(); });
  section.addEventListener("focusout", function (e) { if (!section.contains(e.relatedTarget)) { focused = false; schedule(); } });
  document.addEventListener("visibilitychange", schedule);
  // Fetch the other large photos only once the section is on screen.
  var warmed = false;
  function warm() { if (warmed) return; warmed = true; items.forEach(function (li) { new Image().src = li.getAttribute("data-full"); }); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; if (inView) warm(); schedule(); }, { threshold: 0.4 }).observe(section);
  }

  layout();
  window.addEventListener("resize", layout);
  select(0, false);
})();
