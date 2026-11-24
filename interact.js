/* Portfolio v1.0.0 — 交互 */
(function () {
  "use strict";

  const { $, esc, cover, tagList } = window.UI;
  const $$ = (s) => [...document.querySelectorAll(s)];
  const pad = window.UI.pad;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const body = document.body;

  /* ---------- 时钟 ---------- */
  const clock = $("#clock");
  const tick = () => {
    const d = new Date();
    clock.textContent = `LOCAL ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);

  /* ---------- 菜单 ---------- */
  const menuBtn = $("#menuBtn");
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    body.classList.toggle("lock", open);
    menuBtn.setAttribute("aria-expanded", open);
    $("#menu").setAttribute("aria-hidden", !open);
    menuBtn.querySelector("span").textContent = open ? "CLOSE" : "MENU";
  }
  menuBtn.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  $$(".menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- 筛选 ---------- */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    const tag = btn.dataset.tag;
    $$(".project").forEach((el) =>
      el.classList.toggle("hidden", tag !== "全部" && !el.dataset.tags.split("|").includes(tag))
    );
  });

  /* ---------- 手风琴 ---------- */
  $("#facts").addEventListener("click", (e) => {
    const el = e.target.closest(".fact");
    if (!el) return;
    el.setAttribute("aria-expanded", el.classList.toggle("open"));
  });

  /* ---------- 复制 ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy");
    if (!btn) return;
    const done = () => {
      btn.textContent = "COPIED ✓";
      setTimeout(() => (btn.textContent = "COPY"), 1600);
    };
    navigator.clipboard ? navigator.clipboard.writeText(btn.dataset.copy).then(done, done) : done();
  });

  /* ---------- 光标标签 + 项目预览 ---------- */
  const cursor = $("#cursor");
  const preview = document.createElement("div");
  preview.className = "preview";
  body.appendChild(preview);
  let mx = 0, my = 0, cx = 0, cy = 0, px = 0, py = 0;

  function hideCursor() {
    cursor.classList.remove("show");
    preview.classList.remove("show");
  }

  if (fine) {
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      cx += (mx - cx) * 0.25; cy += (my - cy) * 0.25;
      px += (mx - px) * 0.12; py += (my - py) * 0.12;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      preview.style.left = px + 40 + "px";
      preview.style.top = py - 120 + "px";
      requestAnimationFrame(loop);
    })();

    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("[data-cursor]");
      if (!el || modal.classList.contains("open")) return hideCursor();
      cursor.querySelector("span").textContent = el.dataset.cursor;
      cursor.classList.toggle("light", !!el.closest(".section--dark"));
      cursor.classList.add("show");
      if (el.classList.contains("project")) {
        const p = PROJECTS.find((x) => x.id === el.dataset.id);
        preview.innerHTML = `<div class="cover">${cover(p.cover, p.title, "COVER")}</div>`;
        preview.classList.add("show");
      } else preview.classList.remove("show");
    });
  }

  /* ---------- 弹窗 ---------- */
  const modal = $("#modal");
  const content = $("#modalContent");
  const panel = $(".modal__panel");

  function openModal(html, videoMode) {
    content.innerHTML = html;
    modal.classList.toggle("video-mode", !!videoMode);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("lock");
    panel.scrollTop = 0;
    hideCursor();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("lock");
    setTimeout(() => { if (!modal.classList.contains("open")) content.innerHTML = ""; }, 700);
    if (location.hash.startsWith("#project/")) history.replaceState(null, "", location.pathname);
  }
  modal.addEventListener("click", (e) => e.target.closest("[data-close]") && closeModal());
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("open")) closeModal();
    else if (body.classList.contains("menu-open")) setMenu(false);
  });

  function renderText(str) {
    return String(str).split("\n").map((l) => l.trim()).filter(Boolean)
      .map((l) => (l.startsWith("## ") ? `<h3>${esc(l.slice(3))}</h3>` : `<p>${esc(l)}</p>`)).join("");
  }

  function openProject(id) {
    const i = PROJECTS.findIndex((x) => x.id === id);
    if (i < 0) return;
    const p = PROJECTS[i];
    const blocks = (p.content || []).map((b) =>
      b.type === "image"
        ? `<figure><div class="cover">${cover(b.src, b.caption || p.title)}</div>${b.caption ? `<figcaption>FIG. ${esc(b.caption)}</figcaption>` : ""}</figure>`
        : renderText(b.value || "")
    ).join("");
    openModal(`
      <article class="detail">
        <div class="detail__meta mono"><span>PROJECT ${pad(i + 1)}</span><span>·</span><span>${esc(p.year)}</span>${tagList(p.tags)}</div>
        <h1>${esc(p.title)}</h1>
        <p class="detail__summary">${esc(p.summary)}</p>
        <div class="cover">${cover(p.cover, p.title, "COVER")}</div>
        <div class="detail__body">
          ${blocks}
          ${p.link ? `<a class="btn" href="${esc(p.link)}" target="_blank" rel="noopener">VISIT PROJECT <span>↗</span></a>` : ""}
        </div>
      </article>`);
    history.replaceState(null, "", `#project/${id}`);
  }

  function openVideo(i) {
    const v = VIDEOS[i];
    let player;
    if (!v.src) player = `<div class="player__empty">还没有设置视频源<br/>在 data.js 中为「${esc(v.title)}」填写 src</div>`;
    else if (v.type === "bilibili") player = `<iframe src="https://player.bilibili.com/player.html?bvid=${encodeURIComponent(v.src)}&autoplay=1&high_quality=1" allowfullscreen allow="autoplay; fullscreen"></iframe>`;
    else if (v.type === "youtube") player = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.src)}?autoplay=1" allowfullscreen allow="autoplay; fullscreen"></iframe>`;
    else player = `<video src="${esc(v.src)}" ${v.cover ? `poster="${esc(v.cover)}"` : ""} controls autoplay playsinline></video>`;
    openModal(`<div class="player">${player}</div>`, true);
  }

  $("#projectList").addEventListener("click", (e) => {
    const el = e.target.closest(".project");
    el && openProject(el.dataset.id);
  });
  $("#videoList").addEventListener("click", (e) => {
    const el = e.target.closest(".video");
    el && openVideo(+el.dataset.index);
  });
  if (location.hash.startsWith("#project/")) openProject(decodeURIComponent(location.hash.slice(9)));

  /* ---------- 进场动画 + 数字滚动 ---------- */
  function countUp(el) {
    const to = +el.dataset.to, suffix = el.dataset.suffix, t0 = performance.now(), dur = 1400;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(to * e) + suffix;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      const num = en.target.querySelector("[data-to]");
      num && countUp(num);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
})();
